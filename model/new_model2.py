# import os
# import shutil

# # Base directories
# train_dir = "archive/train"
# val_dir = "archive/val"

# # Get the list of class names (subdirectories in the train directory)
# class_names = [d for d in os.listdir(train_dir) if os.path.isdir(os.path.join(train_dir, d))]

# # Go through each class name and copy one image from the train to the val directory
# for class_name in class_names:
#     # Get the list of images in the current train class directory
#     train_class_dir = os.path.join(train_dir, class_name)
#     images = [f for f in os.listdir(train_class_dir) if os.path.isfile(os.path.join(train_class_dir, f))]
    
#     # If there are no images, skip this class
#     if not images:
#         print(f"No images found for class '{class_name}', skipping...")
#         continue

#     # Make sure the val class directory exists
#     val_class_dir = os.path.join(val_dir, class_name)
#     os.makedirs(val_class_dir, exist_ok=True)

#     # Copy the first image from the train to the val directory
#     shutil.copy(os.path.join(train_class_dir, images[0]), val_class_dir)
    
#     print(f"Copied '{images[0]}' from train to val directory for class '{class_name}'")


import os
import shutil

# Base directories
train_dir = "archive/train"
val_dir = "archive/val"

# Get the list of class names (subdirectories in the train directory)
class_names = [d for d in os.listdir(train_dir) if os.path.isdir(os.path.join(train_dir, d))]

# Go through each class name and move up to 10 images from the train to the val directory
for class_name in class_names:
    # Get the list of images in the current train class directory
    train_class_dir = os.path.join(train_dir, class_name)
    images = [f for f in os.listdir(train_class_dir) if os.path.isfile(os.path.join(train_class_dir, f))]

    # If there are no images, skip this class
    if not images:
        print(f"No images found for class '{class_name}', skipping...")
        continue

    # Make sure the val class directory exists
    val_class_dir = os.path.join(val_dir, class_name)
    os.makedirs(val_class_dir, exist_ok=True)

    # Move up to 10 images from the train to the val directory
    for image in images[:10]:
        shutil.move(os.path.join(train_class_dir, image), val_class_dir)
        print(f"Moved '{image}' from train to val directory for class '{class_name}'")
