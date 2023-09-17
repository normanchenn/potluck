from ultralytics import YOLO
model = YOLO('yolov8n-cls.pt')
results = model.train(data='archive', epochs=5)
model.export()