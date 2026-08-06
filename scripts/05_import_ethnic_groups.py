import pandas as pd
from pathlib import Path
from sqlalchemy import create_engine
import urllib.parse

# =========================================================
# 1. Project Paths
# =========================================================

project_folder = Path(__file__).resolve().parent.parent
file_path = project_folder / "Data" / "SDM_cleaned.csv"

print("=" * 60)
print("Project Folder:", project_folder)
print("CSV File:", file_path)

# =========================================================
# 2. Read CSV
# =========================================================

df = pd.read_csv(file_path)

print("\nDataset Loaded Successfully!")
print("Original CSV Rows:", len(df))

# =========================================================
# 3. Database Connection
# IMPORTANT:
# This connects to the LOCAL MySQL database
# =========================================================

password = urllib.parse.quote_plus("#123Hajerfisal")

engine = create_engine(
    f"mysql+pymysql://root:{password}@localhost:3306/sdm_database",
    pool_pre_ping=True,
    future=True
)

print("\nTesting MySQL connection...")

try:
    with engine.connect():
        print("Database Connection Successful!")

except Exception as e:
    print("\nDatabase Connection Failed!")
    print(e)
    raise SystemExit


# =========================================================
# 4. Check that ethnic_groups table is empty
# =========================================================

current_count = pd.read_sql(
    """
    SELECT COUNT(*) AS total
    FROM ethnic_groups
    """,
    con=engine
).iloc[0]["total"]

print("\nCurrent Ethnic Groups Rows:", current_count)

if current_count > 0:

    print(
        "\nERROR: ethnic_groups table is not empty."
        "\nPlease empty the table before running this script."
    )

    raise SystemExit


# =========================================================
# 5. Load Countries
# =========================================================

db_countries = pd.read_sql(
    """
    SELECT
        country_id,
        country_name
    FROM countries
    """,
    con=engine
)

print(
    "\nCountries Loaded:",
    len(db_countries)
)


# =========================================================
# 6. Match Each CSV Row to country_id
# =========================================================

df = df.merge(

    db_countries,

    left_on="country",

    right_on="country_name",

    how="left",

    validate="many_to_one"

)


# =========================================================
# 7. Check for Unmatched Countries
# =========================================================

missing_countries = (

    df.loc[
        df["country_id"].isna(),
        "country"
    ]

    .drop_duplicates()

    .tolist()

)

if len(missing_countries) > 0:

    print(
        "\nERROR: The following countries were not found"
        " in the countries table:"
    )

    for country in missing_countries:
        print("-", country)

    raise SystemExit


# =========================================================
# 8. Build Ethnic Groups Table
#
# IMPORTANT:
# ethnic_groups stores only attributes that identify
# the movement itself.
#
# group_size, group_con, and pwrstat are NOT stored here
# because they may vary across yearly observations.
# They will remain in movement_observations.
# =========================================================

ethnic_groups_df = (

    df[
        [
            "country_id",
            "group",
            "region"
        ]
    ]

    .rename(
        columns={
            "group": "group_name"
        }
    )

)


# =========================================================
# 9. Create One Row per Unique Movement
#
# Unique movement identity:
# country_id + group_name + region
# =========================================================

ethnic_groups_df = (

    ethnic_groups_df

    .drop_duplicates(
        subset=[
            "country_id",
            "group_name",
            "region"
        ]
    )

    .reset_index(drop=True)

)


# =========================================================
# 10. Remove Rows Without a Group Name
# =========================================================

ethnic_groups_df = ethnic_groups_df[
    ethnic_groups_df["group_name"].notna()
].copy()


# =========================================================
# 11. Display Final Ethnic Groups Result
# =========================================================

print(
    "\nFinal Ethnic Groups Rows:",
    len(ethnic_groups_df)
)

print(
    "\nColumns to be inserted:"
)

print(
    ethnic_groups_df.columns.tolist()
)

print(
    "\nFirst rows:"
)

print(
    ethnic_groups_df.head()
)


# =========================================================
# 12. Check Duplicate Movement Keys
# =========================================================

duplicates = (

    ethnic_groups_df

    .duplicated(
        subset=[
            "country_id",
            "group_name",
            "region"
        ]
    )

    .sum()

)

print(
    "\nDuplicate Movement Keys:",
    duplicates
)

if duplicates > 0:

    print(
        "\nERROR: Duplicate movement keys detected."
    )

    raise SystemExit


# =========================================================
# 13. Insert Ethnic Groups
# =========================================================

ethnic_groups_df.to_sql(

    name="ethnic_groups",

    con=engine,

    if_exists="append",

    index=False

)

print(
    "\nEthnic Groups Imported Successfully!"
)


# =========================================================
# 14. Verify Imported Row Count
# =========================================================

db_count = pd.read_sql(

    """
    SELECT COUNT(*) AS total
    FROM ethnic_groups
    """,

    con=engine

).iloc[0]["total"]


print(
    "\nRows in MySQL ethnic_groups:",
    db_count
)


# =========================================================
# 15. Verify No Duplicate Movement Keys in Database
# =========================================================

duplicate_check = pd.read_sql(

    """
    SELECT
        country_id,
        group_name,
        region,
        COUNT(*) AS occurrences

    FROM ethnic_groups

    GROUP BY
        country_id,
        group_name,
        region

    HAVING COUNT(*) > 1
    """,

    con=engine

)


print(
    "\nDuplicate groups in database:",
    len(duplicate_check)
)


# =========================================================
# 16. Final Result
# =========================================================

if len(duplicate_check) == 0:

    print(
        "\nSUCCESS!"
        "\nEthnic groups imported successfully."
        "\nNo duplicate movement records were found."
    )

else:

    print(
        "\nWARNING!"
        "\nDuplicate movement records were found."
    )

    print(
        duplicate_check.head()
    )