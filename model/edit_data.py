import pandas as pd
import os
from shutil import move

# Load the CSV file
csv_file_path = 'train_img.csv'
df = pd.read_csv(csv_file_path)

# Base directories for train and test images
train_base_dir = './archive/train_images/train_images'
test_base_dir = './archive/test_images/test_images'

# Create subdirectories for each unique ClassName and move the respective images
for base_dir in [train_base_dir, test_base_dir]:
    for index, row in df.iterrows():
        # Get the ImageId and ClassName
        image_id, class_name = row['ImageId'], row['ClassName']
        
        # Create a new directory path based on the ClassName
        new_dir_path = os.path.join(base_dir, class_name)
        os.makedirs(new_dir_path, exist_ok=True)
        
        # Create the current image file path and the new file path
        current_file_path = os.path.join(base_dir, f"{image_id}")
        new_file_path = os.path.join(new_dir_path, f"{image_id}")
        
        # Check if the file exists in the current directory before moving it
        if os.path.exists(current_file_path):
            move(current_file_path, new_file_path)
        else:
            print(f"File not found: {current_file_path}")
