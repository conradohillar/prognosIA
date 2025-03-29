import pandas as pd

# Load CSV
df = pd.read_csv("./heart_disease.csv")

# Convert categorical values
df["Gender"] = df["Gender"].map({"Male": 1, "Female": 0})  # M → 1, F → 0
df["Exercise Habits"] = df["Exercise Habits"].map({
    "High": 1, "Medium": 2, "Low": 3
})  # High → 1, Medium → 2, Low → 3
df["Smoking"] = df["Smoking"].map({
    "No": 0, "Yes": 1
})  # No → 0, Yes → 1
df["Family Heart Disease"] = df["Family Heart Disease"].map({
    "No": 0, "Yes": 1
})  # No → 0, Yes → 1
df["Diabetes"] = df["Diabetes"].map({
    "No": 0, "Yes": 1
})  # No → 0, Yes → 1
df["High Blood Pressure"] = df["High Blood Pressure"].map({
    "No": 0, "Yes": 1
})  # No → 0, Yes → 1
df["Low HDL Cholesterol"] = df["Low HDL Cholesterol"].map({
    "No": 0, "Yes": 1
})  # No → 0, Yes → 1
df["High LDL Cholesterol"] = df["High LDL Cholesterol"].map({
    "No": 0, "Yes": 1
})  # No → 0, Yes → 1
df["Alcohol Consumption"] = df["Alcohol Consumption"].map({
    "High": 1, "Medium": 2, "Low": 3
})  # High → 1, Medium → 2, Low → 3
df["Stress Level"] = df["Stress Level"].map({
    "High": 1, "Medium": 2, "Low": 3
})  # High → 1, Medium → 2, Low → 3
df["Sugar Consumption"] = df["Sugar Consumption"].map({
    "High": 1, "Medium": 2, "Low": 3
})  # High → 1, Medium → 2, Low → 3
df["Heart Disease Status"] = df["Heart Disease Status"].map({
    "No": 0, "Yes": 1
})  # No → 0, Yes → 1

# Display processed data sample
print(df.head())

# Save the new dataset
df.to_csv("clean_dataset.csv", index=False)
