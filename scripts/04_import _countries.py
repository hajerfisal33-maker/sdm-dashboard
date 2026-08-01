import pandas as pd
from pathlib import Path
from sqlalchemy import create_engine
import urllib.parse

# ==========================
# Project Paths
# ==========================

project_folder = Path(__file__).resolve().parent.parent

file_path = project_folder / "Data" / "SDM_cleaned.csv"

print("=" * 60)
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

# ==========================
# Database Connection
# ==========================

password = urllib.parse.quote_plus("#123Hajerfisal")

engine = create_engine(
    f"mysql+pymysql://root:{password}@https://sdm-dashboard-pe46.onrender.com:3306/sdm_database",
    pool_pre_ping=True,
    future=True
)

print("\nConnected to MySQL Successfully!")

# ==========================
# Test Connection
# ==========================

try:
    with engine.connect():
        print("Database Connection Successful!")

except Exception as e:
    print(e)
    # ==========================
# Import Countries
# ==========================

print("\nImporting Countries...")

countries_df = (
    df[['country']]
    .drop_duplicates()
    .sort_values('country')
)

countries_df = countries_df.rename(columns={
    'country': 'country_name'
})

countries_df.to_sql(
    name='countries',
    con=engine,
    if_exists='append',
    index=False
)

print(f"{len(countries_df)} countries imported successfully.")
# ==========================
# Retrieve country_id
# ==========================

db_countries = pd.read_sql(
    "SELECT country_id, country_name FROM countries",
    con=engine
)

df = df.merge(
    db_countries,
    left_on="country",
    right_on="country_name",
    how="left"
)

print("Country IDs linked successfully.")



