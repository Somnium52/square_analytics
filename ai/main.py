import numpy as np
import cv2
from ultralytics import YOLO
from ultralytics.engine.results import Results

MODEL = YOLO("yolov8n.pt")
TRACKER = "bytetrack.yaml"
CONF = 0.60
WINDOW_NAME = "MAIN"
cv2.namedWindow(WINDOW_NAME)

def mouse_callback(event, x, y, flags, param):
    global roi_points
    global np_roi_points
    if event == cv2.EVENT_LBUTTONDOWN:
        roi_points.append([x, y])
        np_roi_points = np.array(roi_points, dtype=np.int32)
        print(f"Added point: {x, y}")

def print_roi_points(frame: cv2.typing.MatLike):
    for p in roi_points:
        cv2.circle(frame, (p[0], p[1]), 5, (0, 255, 0), 2, cv2.LINE_AA)

def print_roi_lines(frame: cv2.typing.MatLike):
    for i in range(len(roi_points)):
        if i == len(roi_points) - 1:
            cv2.line(frame, roi_points[i], roi_points[0], (0, 255, 0), 2, cv2.LINE_AA)
        else:
            cv2.line(frame, roi_points[i], roi_points[i+1], (0, 255, 0), 2, cv2.LINE_AA)

def print_center_points(frame: cv2.typing.MatLike, result: Results):
    boxes = result.boxes
    if boxes is not None:
        xywh_coords = boxes.xywh.cpu().numpy()
        for box in xywh_coords:
            x, y, w, h = box
            center = (int(x), int(y))
            if len(roi_points) != 0:
                tested_value = cv2.pointPolygonTest(np_roi_points, center, False)
                if(tested_value > 0):
                    cv2.circle(frame, center, 5, (0, 255, 0), -1, cv2.LINE_AA)
                else:                
                    cv2.circle(frame, center, 5, (0, 0, 255), -1, cv2.LINE_AA)

roi_points = []
np_roi_points = []

cv2.setMouseCallback(WINDOW_NAME, mouse_callback)
cap = cv2.VideoCapture(0)

while(True):
    ret, raw_frame = cap.read()
    result = MODEL.track(
        source=raw_frame,
        tracker=TRACKER,
        classes=[0],
        verbose=False,
        show=False,
        conf=CONF
    )
    frame = result[0].plot()
    print_roi_points(frame)
    print_roi_lines(frame)
    print_center_points(frame, result[0])

    cv2.imshow(WINDOW_NAME, frame)
    if cv2.waitKey(30) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()