from ultralytics import YOLO
MODEL_PATH = '../runs/classify/train17/weights/best.pt'
MODEL = YOLO(MODEL_PATH)
# IMAGE = '/Users/normanchen/Desktop/food.jpeg'

def get_good(image):
  results = MODEL(image)
  name_dict = results[0].names
  classes = results[0].probs.top5
  probabilities = [round(i, 2) for i in results[0].probs.top5conf.tolist()]
  names = []
  for i in classes:
    names.append(name_dict[i])
    
  print(names)
  print(probabilities)
  return (names, probabilities)
# get_good(IMAGE)