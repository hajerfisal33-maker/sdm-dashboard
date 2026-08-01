import pandas as pd
from pathlib import Path

# ==========================
# Locate Project Folder
# ==========================

project_folder = Path(__file__).resolve().parent.parent
file_path = project_folder / "Data" / "SDM selected variables.xlsx"

print("Project Folder :", project_folder)
print("Excel File :", file_path)

# ==========================
# Load Dataset
# ==========================

df = pd.read_excel(file_path)

print("="*60)
print("DATASET SHAPE")
print("="*60)
print(df.shape)

print("\n")

print("="*60)
print("COLUMN NAMES")
print("="*60)
print(df.columns.tolist())

print("\n")

print("="*60)
print("DATA TYPES")
print("="*60)
print(df.dtypes)

print("\n")

print("="*60)
print("MISSING VALUES")
print("="*60)
print(df.isnull().sum())

print("\n")

print("="*60)
print("DUPLICATED ROWS")
print("="*60)
print(df.duplicated().sum())

print("\n")

print("="*60)
print("NUMERICAL SUMMARY")
print("="*60)
print(df.describe(include='all'))