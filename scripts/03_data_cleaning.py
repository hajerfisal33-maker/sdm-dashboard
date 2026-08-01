import pandas as pd

# ==========================
# Load Dataset
# ==========================

from pathlib import Path
import pandas as pd

# ==========================
# Project Paths
# ==========================

project_folder = Path(__file__).resolve().parent.parent

input_file = project_folder / "Data" / "SDM selected variables.xlsx"
output_file = project_folder / "Data" / "SDM_cleaned.csv"

print("Project Folder:", project_folder)
print("Input File:", input_file)

df = pd.read_excel(input_file)

# ==========================
# Standardize Column Names
# ==========================

df.columns = (
    df.columns
      .str.strip()
      .str.lower()
      .str.replace(" ", "_")
)

# ==========================
# Remove Duplicate Rows
# ==========================

df = df.drop_duplicates()

# ==========================
# Clean Text Columns
# ==========================

text_cols = df.select_dtypes(include="object").columns

for col in text_cols:
    df[col] = df[col].str.strip()

# ==========================
# Validate Years
# ==========================

year_cols = [
    "year",
    "sdm_startdate1",
    "sdm_enddate1",
    "sdm_startdate2",
    "sdm_enddate2"
]

for col in year_cols:
    if col in df.columns:
        invalid = (
            (df[col] < 1945) &
            (~df[col].isin([8888,9999])) &
            (~df[col].isna())
        )

        print(col)
        print("Invalid values:", invalid.sum())

# ==========================
# Preserve Special Codes
# ==========================

print("\nChecking special codes...\n")

for col in ["sdm_startdate2","sdm_enddate2"]:

    if col in df.columns:

        print(col)

        print("8888 =", (df[col]==8888).sum())

        print("9999 =", (df[col]==9999).sum())

        print()

# ==========================
# Missing Values Report
# ==========================

print(df.isnull().sum())

# ==========================
# Export Clean Dataset
# ==========================

df.to_csv(output_file, index=False)

print("\nDataset saved successfully!")
print("Saved to:", output_file)

print("\nClean dataset exported successfully.")