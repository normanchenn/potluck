from ultralytics import YOLO
import cv2
import numpy as np
import os
from collections import defaultdict

FOOD_DICT = {1: 'rice', 2: 'eels on rice', 3: 'pilaf', 4: "chicken-'n'-egg on rice", 5: 'pork cutlet on rice', 6: 'beef curry', 7: 'sushi', 8: 'chicken rice', 9: 'fried rice', 10: 'tempura bowl', 11: 'bibimbap', 12: 'toast', 13: 'croissant', 14: 'roll bread', 15: 'raisin bread', 16: 'chip butty', 17: 'hamburger', 18: 'pizza', 19: 'sandwiches', 20: 'udon noodle', 21: 'tempura udon', 22: 'soba noodle', 23: 'ramen noodle', 24: 'beef noodle', 25: 'tensin noodle', 26: 'fried noodle', 27: 'spaghetti', 28: 'Japanese-style pancake', 29: 'takoyaki', 30: 'gratin', 31: 'sauteed vegetables', 32: 'croquette', 33: 'grilled eggplant', 34: 'sauteed spinach', 35: 'vegetable tempura', 36: 'miso soup', 37: 'potage', 38: 'sausage', 39: 'oden', 40: 'omelet', 41: 'ganmodoki', 42: 'jiaozi', 43: 'stew', 44: 'teriyaki grilled fish', 45: 'fried fish', 46: 'grilled salmon', 47: 'salmon meuniere', 48: 'sashimi', 49: 'grilled pacific saury', 50: 'sukiyaki', 51: 'sweet and sour pork', 52: 'lightly roasted fish', 53: 'steamed egg hotchpotch', 54: 'tempura', 55: 'fried chicken', 56: 'sirloin cutlet', 57: 'nanbanzuke', 58: 'boiled fish', 59: 'seasoned beef with potatoes', 60: 'hambarg steak', 61: 'beef steak', 62: 'dried fish', 63: 'ginger pork saute', 64: 'spicy chili-flavored tofu', 65: 'yakitori', 66: 'cabbage roll', 67: 'rolled omelet', 68: 'egg sunny-side up', 69: 'fermented soybeans', 70: 'cold tofu', 71: 'egg roll', 72: 'chilled noodle', 73: 'stir-fried beef and peppers', 74: 'simmered pork', 75: 'boiled chicken and vegetables', 76: 'sashimi bowl', 77: 'sushi bowl', 78: 'fish-shaped pancake with bean jam', 79: 'shrimp with chill source', 80: 'roast chicken', 81: 'steamed meat dumpling', 82: 'omelet with fried rice', 83: 'cutlet curry', 84: 'spaghetti meat sauce', 85: 'fried shrimp', 86: 'potato salad', 87: 'green salad', 88: 'macaroni salad', 89: 'Japanese tofu and vegetable chowder', 90: 'pork miso soup', 91: 'chinese soup', 92: 'beef bowl', 93: 'kinpira-style sauteed burdock', 94: 'rice ball', 95: 'pizza toast', 96: 'dipping noodles', 97: 'hot dog', 98: 'french fries', 99: 'mixed rice', 100: 'goya chanpuru'}
MODEL_PATH = '../runs/classify/train14/weights/best.pt'
IMAGE_PATH = '/Users/normanchen/Desktop/food.jpeg'
MODEL = YOLO(MODEL_PATH)
RESULTS = MODEL(IMAGE_PATH)
image = cv2.imread(IMAGE_PATH)
grid_sizes = [(1, 1), (2, 2), (3, 3)]

def get_prob(results):
  class_map = results[0].names
  top_5_names = results[0].probs.top5
  top_5_classes = [class_map[i] for i in top_5_names]
  top_5_foods = [FOOD_DICT[int(i)] for i in top_5_classes]
  top_5_prob = results[0].probs.top5conf.tolist()
  top_5_prob_rounded = [round(i, 2) for i in top_5_prob]
  print(top_5_foods)
  print(top_5_prob)
  return top_5_foods, top_5_prob_rounded


def get_subimages(image, grid_size):
  ret = []
  step_size = (image.shape[0] // grid_size[0], image.shape[1] // grid_size[1])
  for y in range(0, image.shape[0], step_size[0]):
    for x in range(0, image.shape[1], step_size[1]):
      sub_image = image[y:y+step_size[0], x:x+step_size[1]]
      ret.append(sub_image)
  return ret

def get_averages(grid_sizes, image, MODEL=MODEL):
  predictions = []
  for size in grid_sizes:
    subimages = get_subimages(image, size)
    grid_predictions = []
    for subimage in subimages:
      temp = "temp.jpg"
      cv2.imwrite(temp, subimage)
      results = MODEL(temp)
      top_foods, top_prob = get_prob(results)
      grid_predictions.append((top_foods, top_prob))
      # temp.unlink()
      os.remove(temp)
    predictions.append(grid_predictions)

  item_scores = defaultdict(list)
  for sublist in predictions:
    for subsublist in sublist:
      for item, score in zip(subsublist[0], subsublist[1]):
        item_scores[item].append(score)
        
  sorted_items = sorted(item_scores.keys(), key=lambda x: sum(item_scores[x])/len(item_scores[x]), reverse=True)
  print(sorted_items)
  return sorted_items

get_averages(grid_sizes, image)