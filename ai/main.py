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
    global enters_cnt
    global roi_points
    global np_roi_points
    global state_dict
    boxes = result.boxes
    if boxes is not None:
        if boxes.id is not None:
            xywh_coords = boxes.xywh.cpu().numpy()
            ids = boxes.id.cpu().numpy().astype(int)
            for box, id in zip(xywh_coords, ids):
                x, y, w, h = box
                center = (int(x), int(y))
                if len(roi_points) >= 3:
                    tested_value = cv2.pointPolygonTest(np_roi_points, center, False)
                    if(tested_value > 0):
                        cv2.circle(frame, center, 5, (0, 255, 0), -1, cv2.LINE_AA)
                        previous_state = state_dict.get(id)
                        if(previous_state is not None):
                            if(previous_state is False):
                                enters_cnt += 1
                        state_dict.update({id:True})
                    else:                
                        cv2.circle(frame, center, 5, (0, 0, 255), -1, cv2.LINE_AA)
                        state_dict.update({id:False})
    print(f"Conunt: {enters_cnt}")

roi_points = []
np_roi_points = [] # to convert roi_points to np.array
state_dict = {} # True - in roi; False - out of roi
enters_cnt = 0

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