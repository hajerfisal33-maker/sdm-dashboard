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
# 2. Read Cleaned CSV
# =========================================================

df = pd.read_csv(file_path)

print("\nDataset Loaded Successfully!")
print("Original CSV Rows:", len(df))

original_rows = len(df)

# =========================================================
# 3. Convert Truly Empty Cells to NULL
# =========================================================

# Empty strings / spaces become missing values.
# When inserted into MySQL, these will become SQL NULL.
#
# IMPORTANT:
# We do NOT convert 8888 or 9999 to NULL because
# they are meaningful codes in the dataset/codebook.

df = df.replace(r"^\s*$", pd.NA, regex=True)

# =========================================================
# 4. Database Connection
# Local MySQL Database
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
# 5. Check Movement Observations Table
# =========================================================

current_count = pd.read_sql(
    """
    SELECT COUNT(*) AS total
    FROM movement_observations
    """,
    con=engine
).iloc[0]["total"]

print(
    "\nCurrent movement_observations Rows:",
    current_count
)

# Prevent accidental duplicate import
if current_count > 0:

    print(
        "\nERROR:"
        "\nmovement_observations is not empty."
        "\nPlease empty the table before running this script."
    )

    raise SystemExit


# =========================================================
# 6. Load Countries
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
# 7. Match Country IDs
# =========================================================

df = df.merge(
    db_countries,
    left_on="country",
    right_on="country_name",
    how="left",
    validate="many_to_one"
)

print(
    "\nRows After Country Mapping:",
    len(df)
)

# The row count must NOT change
if len(df) != original_rows:

    print(
        "\nERROR:"
        "\nCountry merge changed the number of rows."
    )

    print(
        "Original rows:",
        original_rows
    )

    print(
        "Rows after country merge:",
        len(df)
    )

    raise SystemExit


# =========================================================
# 8. Check for Unmatched Countries
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
        "\nERROR:"
        "\nThe following countries were not found"
        " in the countries table:"
    )

    for country in missing_countries:
        print("-", country)

    raise SystemExit


# =========================================================
# 9. Load Ethnic Groups Mapping
# =========================================================

db_groups = pd.read_sql(
    """
    SELECT
        group_id,
        group_name,
        country_id,
        region
    FROM ethnic_groups
    """,
    con=engine
)

print(
    "\nEthnic Groups Loaded:",
    len(db_groups)
)


# =========================================================
# 10. Check Ethnic Groups Mapping Uniqueness
# =========================================================

duplicate_group_keys = (
    db_groups
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
    "Duplicate Group Mapping Keys:",
    duplicate_group_keys
)

if duplicate_group_keys > 0:

    print(
        "\nERROR:"
        "\nDuplicate movement keys exist in ethnic_groups."
    )

    print(
        "Fix ethnic_groups before importing observations."
    )

    raise SystemExit


# =========================================================
# 11. Match Each Observation to ONE group_id
# =========================================================

df = df.merge(

    db_groups,

    left_on=[
        "group",
        "country_id",
        "region"
    ],

    right_on=[
        "group_name",
        "country_id",
        "region"
    ],

    how="left",

    validate="many_to_one"
)

print(
    "\nRows After Group Mapping:",
    len(df)
)

# The row count MUST remain exactly the same
if len(df) != original_rows:

    print(
        "\nERROR:"
        "\nGroup merge changed the number of rows."
    )

    print(
        "Original rows:",
        original_rows
    )

    print(
        "Rows after group merge:",
        len(df)
    )

    raise SystemExit


# =========================================================
# 12. Check Missing group_id
# =========================================================

missing_group_count = df["group_id"].isna().sum()

print(
    "\nObservations Without group_id:",
    missing_group_count
)

if missing_group_count > 0:

    print(
        "\nERROR:"
        "\nSome observations could not be linked"
        " to an ethnic group."
    )

    print(
        "\nExamples:"
    )

    print(
        df.loc[
            df["group_id"].isna(),
            [
                "country",
                "group",
                "region"
            ]
        ]
        .drop_duplicates()
        .head(20)
    )

    raise SystemExit


# =========================================================
# 13. Build Movement Observations DataFrame
# =========================================================

movement_df = df[
    [
        "group_id",

        "year",

        # These may vary across observations,
        # so they are kept in the annualized table.
        "groupsize",
        "groupcon",
        "pwrstat",

        "sdm_startdate1",
        "sdm_enddate1",

        "sdm_startdate2",
        "sdm_enddate2",

        "domclaim",
        "domindclaim",
        "domirrclaim",
        "domsecclaim",

        "sovdec",

        "violsd",
        "violsd_onset",
        "viol_escal",

        "con",
        "cultcon",
        "autcon",
        "indcon",

        "res",
        "cultres",
        "autres",
        "indres"
    ]
].copy()


# =========================================================
# 14. Rename Columns to Match MySQL
# =========================================================

movement_df = movement_df.rename(
    columns={
        "groupsize": "group_size",
        "groupcon": "group_con"
    }
)


# =========================================================
# 15. Verify Final Row Count Before Import
# =========================================================

print(
    "\nRows Ready for Import:",
    len(movement_df)
)

if len(movement_df) != original_rows:

    print(
        "\nERROR:"
        "\nThe number of observations changed"
        " before database insertion."
    )

    raise SystemExit


# =========================================================
# 16. Display NULL Summary
# =========================================================

print(
    "\nMissing Values Summary:"
)

print(
    movement_df.isna().sum()
)


# =========================================================
# 17. Insert into movement_observations
# =========================================================

movement_df.to_sql(

    name="movement_observations",

    con=engine,

    if_exists="append",

    index=False,

    chunksize=1000,

    method="multi"

)


print(
    "\nMovement observations imported successfully!"
)


# =========================================================
# 18. Verify Final Database Row Count
# =========================================================

db_count = pd.read_sql(
    """
    SELECT COUNT(*) AS total
    FROM movement_observations
    """,
    con=engine
).iloc[0]["total"]

print(
    "\nRows in MySQL movement_observations:",
    db_count
)


# =========================================================
# 19. Final Validation
# =========================================================

if db_count == original_rows:

    print(
        "\n============================================"
    )

    print(
        "SUCCESS!"
    )

    print(
        f"CSV Rows: {original_rows}"
    )

    print(
        f"Database Rows: {db_count}"
    )

    print(
        "The row counts match exactly."
    )

    print(
        "============================================"
    )

else:

    print(
        "\nWARNING!"
    )

    print(
        "The CSV row count and database row count"
        " do not match."
    )

    print(
        f"CSV Rows: {original_rows}"
    )

    print(
        f"Database Rows: {db_count}"
    )