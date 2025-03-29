import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer
from imblearn.over_sampling import SMOTE
import random

# Load the dataset
df = pd.read_csv("./datasets/clean_dataset.csv")  # Change to the correct filename

# Display basic info
print(df.head())  # Check the first few rows
print(df.info())  # Check for missing values

# Separate features and target
X = df.drop(columns=["Heart Disease Status"])  # Features
y = df["Heart Disease Status"]  # Target variable

# # Remove rows with null values in the target and feature columns
# df = df.dropna(subset=X.columns.tolist() + ['Heart Disease Status'])

# # Display the cleaned dataset
# print(df.info())  # Check that there are no null values

# Handle missing values (if any)
imputer = SimpleImputer(strategy='most_frequent')
X = pd.DataFrame(imputer.fit_transform(X), columns=X.columns)

# Balance the dataset using SMOTE (if needed)
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

# X_resampled, y_resampled = X, y

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=random.randint(1, 1000), stratify=y_resampled)

# Train the model
model = RandomForestClassifier(
    n_estimators=50,
    max_depth=10,
    min_samples_split=5,
    class_weight='balanced',
    random_state=random.randint(1, 1000)
)
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Count patients used for training
num_train_patients = len(X_train)

# Count patients used for testing
num_test_patients = len(X_test)

# Count users predicted to have heart disease
num_heart_disease = sum(y_pred)
total_patients = len(y_pred)
accuracy = accuracy_score(y_test, y_pred) * 100  # Convert to percentage

# Evaluation
print(f'Accuracy: {accuracy_score(y_test, y_pred):.4f}')
print('Classification Report:\n', classification_report(y_test, y_pred))
print('Confusion Matrix:\n', confusion_matrix(y_test, y_pred))
print(f"{num_train_patients} patients were used for training.")
print(f"{num_heart_disease} out of {total_patients} patients are predicted to have heart disease with {accuracy:.1f}% accuracy.")