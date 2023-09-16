from fastapi import FastAPI, UploadFile
from ultralytics import YOLO
import tempfile
import os
from load_model import *

app = FastAPI()

# FOOD_DICT = {1: 'rice', 2: 'eels on rice', 3: 'pilaf', 4: "chicken-'n'-egg on rice", 5: 'pork cutlet on rice', 6: 'beef curry', 7: 'sushi', 8: 'chicken rice', 9: 'fried rice', 10: 'tempura bowl', 11: 'bibimbap', 12: 'toast', 13: 'croissant', 14: 'roll bread', 15: 'raisin bread', 16: 'chip butty', 17: 'hamburger', 18: 'pizza', 19: 'sandwiches', 20: 'udon noodle', 21: 'tempura udon', 22: 'soba noodle', 23: 'ramen noodle', 24: 'beef noodle', 25: 'tensin noodle', 26: 'fried noodle', 27: 'spaghetti', 28: 'Japanese-style pancake', 29: 'takoyaki', 30: 'gratin', 31: 'sauteed vegetables', 32: 'croquette', 33: 'grilled eggplant', 34: 'sauteed spinach', 35: 'vegetable tempura', 36: 'miso soup', 37: 'potage', 38: 'sausage', 39: 'oden', 40: 'omelet', 41: 'ganmodoki', 42: 'jiaozi', 43: 'stew', 44: 'teriyaki grilled fish', 45: 'fried fish', 46: 'grilled salmon', 47: 'salmon meuniere', 48: 'sashimi', 49: 'grilled pacific saury', 50: 'sukiyaki', 51: 'sweet and sour pork', 52: 'lightly roasted fish', 53: 'steamed egg hotchpotch', 54: 'tempura', 55: 'fried chicken', 56: 'sirloin cutlet', 57: 'nanbanzuke', 58: 'boiled fish', 59: 'seasoned beef with potatoes', 60: 'hambarg steak', 61: 'beef steak', 62: 'dried fish', 63: 'ginger pork saute', 64: 'spicy chili-flavored tofu', 65: 'yakitori', 66: 'cabbage roll', 67: 'rolled omelet', 68: 'egg sunny-side up', 69: 'fermented soybeans', 70: 'cold tofu', 71: 'egg roll', 72: 'chilled noodle', 73: 'stir-fried beef and peppers', 74: 'simmered pork', 75: 'boiled chicken and vegetables', 76: 'sashimi bowl', 77: 'sushi bowl', 78: 'fish-shaped pancake with bean jam', 79: 'shrimp with chill source', 80: 'roast chicken', 81: 'steamed meat dumpling', 82: 'omelet with fried rice', 83: 'cutlet curry', 84: 'spaghetti meat sauce', 85: 'fried shrimp', 86: 'potato salad', 87: 'green salad', 88: 'macaroni salad', 89: 'Japanese tofu and vegetable chowder', 90: 'pork miso soup', 91: 'chinese soup', 92: 'beef bowl', 93: 'kinpira-style sauteed burdock', 94: 'rice ball', 95: 'pizza toast', 96: 'dipping noodles', 97: 'hot dog', 98: 'french fries', 99: 'mixed rice', 100: 'goya chanpuru'}
# MODEL_PATH = '../runs/classify/train14/weights/best.pt'
# # IMAGE_PATH = '/Users/normanchen/Desktop/food.jpeg'
# MODEL = YOLO(MODEL_PATH)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/predict/")
async def predict(file: UploadFile):
  fd, name = tempfile.mkstemp(suffix=file.filename)
  os.write(fd, file.file.read())
  items = get_mickey(image=name)
  print(items)
  return {"ingredients": items[0], "confidence": items[1]}