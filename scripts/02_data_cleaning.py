import pandas as pd
from pathlib import Path

# ==========================================
# Load Dataset
# ==========================================

project_folder = Path(__file__).resolve().parent.parent

input_file = project_folder / "Data" / "SDM selected variables.xlsx"
output_file = project_folder / "Data" / "SDM_cleaned.xlsx"

df = pd.read_excel(input_file)

print("="*60)
print("INITIAL SHAPE")
print(df.shape)

# ==========================================
# Standardize Column Names
# ==========================================

df.columns = (
    df.columns
      .str.strip()
      .str.lower()
      .str.replace(" ", "_")
)

# ==========================================
# Remove Duplicate Records
# ==========================================

duplicates = df.duplicated().sum()
print(f"\nDuplicate rows found: {duplicates}")

df = df.drop_duplicates()

# ==========================================
# Clean Text Variables
# ==========================================

text_columns = [
    "country",
    "group",
    "region",
    "domclaim",
    "pwrstat"
]

for col in text_columns:
    df[col] = df[col].astype(str).str.strip()

# ==========================================
# Convert Special Missing Codes
# ==========================================

# إذا في أكواد خاصة زي -99 أو -999 حتضاف هنا لاحقاً
special_missing = [-99, -999]

df.replace(special_missing, pd.NA, inplace=True)

# ==========================================
# Check Missing Values
# ==========================================

print("\nMissing Values")
print(df.isnull().sum())

# ==========================================
# Data Type Validation
# ==========================================

numeric_columns = [
    "year",
    "sdm_startdate1",
    "sdm_enddate1",
    "sdm_startdate2",
    "sdm_enddate2",
    "groupsize",
    "groupcon",
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

for col in numeric_columns:
    df[col] = pd.to_numeric(df[col], errors="coerce")

# ==========================================
# Check Invalid Years
# ==========================================

invalid_years = df[
    (df["year"] < 1945) |
    (df["year"] > 2020)
]

print(f"\nInvalid Years: {len(invalid_years)}")

# ==========================================
# Save Clean Dataset
# ==========================================

df.to_excel(output_file, index=False)

print("\nCleaning completed successfully.")
print(f"Saved to: {output_file}")