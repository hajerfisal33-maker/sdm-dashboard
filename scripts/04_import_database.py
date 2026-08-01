import pandas as pd
from pathlib import Path
from sqlalchemy import create_engine
import urllib.parse
# ==========================
project_folder = Path(__file__).resolve().parent.parent

file_path = project_folder / "Data" / "SDM_cleaned.csv"

print("="*60)
print("Project Folder")
print(project_folder)

print("\nCSV File")
print(file_path)
# ==========================
# Read CSV
# ==========================

df = pd.read_csv(file_path)

print("\nDataset Loaded Successfully!")

print(df.shape)

password = urllib.parse.quote_plus("#123Hajerfisal")

engine = create_engine(

    f"mysql+pymysql://root:{password}@localhost:3306/sdm_database",

    pool_pre_ping=True,

    future=True

)
print("\nConnected to MySQL Successfully!")
# ==========================
# Test Connection
# ==========================

try:
 with engine.connect() as conn:

        print("Database Connection Successful!")

except Exception as e:

    print(e)


# ==========================
# Prepare Ethnic Groups table
# ==========================

ethnic_groups_df = (
    df[['country', 'group', 'region', 'groupsize', 'groupcon', 'pwrstat']]
    .drop_duplicates()
)


ethnic_groups_df = ethnic_groups_df.rename(columns={
    'group': 'group_name',
    'groupsize': 'group_size',
    'groupcon': 'group_con'
})


print(ethnic_groups_df.head())
# ==========================
# Retrieve country_id
# ==========================

db_countries = pd.read_sql(
    "SELECT country_id, country_name FROM countries",
    con=engine
)


ethnic_groups_df = ethnic_groups_df.merge(
    db_countries,
    left_on="country",
    right_on="country_name",
    how="left"
)


print(ethnic_groups_df.head())
ethnic_groups_df = ethnic_groups_df.drop(
    columns=['country', 'country_name']
)
# ==========================
# Add country_id to main df
# ==========================

df = df.merge(
    db_countries,
    left_on="country",
    right_on="country_name",
    how="left"
)

df = df.drop(columns=['country_name'])

print(df[['country', 'country_id']].head())
# ==========================
# Retrieve group_id
# ==========================

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


df = df.merge(
    db_groups,
    left_on=['group', 'country_id', 'region'],
    right_on=['group_name', 'country_id', 'region'],
    how='left'
)

print("Group IDs linked successfully.")