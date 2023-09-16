# python3 -m venv venv
# . venv/bin/activate
# pip install ultralytics
from ultralytics import YOLO

# model = YOLO('yolov8n.pt')
# results = model.train(data='coco128.yaml', epochs=3)
# results = model.val()
# results = model('https://ultralytics.com/images/bus.jpg')
# success = model.export(format='onnx')

model = YOLO('yolov8n-cls.pt')
results = model.train(data='UECFOOD100', epochs=5)
# results = model.train(data='caltech256', epochs=100, imgsz=416)
# metrics = model.val()
# print("metrics: ", metrics)
model.export()