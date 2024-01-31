import time
import cv2  # 导入OpenCV库
import numpy as np  # 导入NumPy库
import mediapipe as mp  # 导入MediaPipe库
import math
import queue
from cvs import *
import sys
from PIL import Image, ImageDraw, ImageFont
import android
import threading
import os
import signal

event = threading.Event()

droid = android.Android()
mystart_time = None
# 定义全局标志位变量

Roll = 0
LEFT_WRIST_ANGL = 0
LEFT_ELBOW_ANGL = 0
LEFT_HIP_ANGL = 0
LEFT_SHOULDER_ANGL = 0
LEFT_KNEE_ANGL = 0
LEFT_ANKLE_ANGL = 0

RIGHT_WRIST_ANGL = 0
RIGHT_ELBOW_ANGL = 0
RIGHT_HIP_ANGL = 0
RIGHT_SHOULDER_ANGL = 0
RIGHT_KNEE_ANGL = 0
RIGHT_ANKLE_ANGL = 0

RIGHT_ELBOW_BEFORE_ANGL = 180
LEFT_ELBOW_BEFORE_ANGL = 180
RIGHT_KNEE_BEFORE_ANGL = 180
LEFT_KNEE_BEFORE_ANGL = 180
frameCnt_PushUp = 0
frameCnt_squat = 0
threshold_wave = 10
pushUpCnt = 0
push_up_stander = 0
squat_stander = 0
squatCnt = 0

LEFT_HIP_COR = []
RIGHT_HIP_COR = []
LEFT_SHOULDER_COR = []
RIGHT_SHOULDER_COR = []
LEFT_ELBOW_COR = []
RIGHT_ELBOW_COR = []
LEFT_KNEE_COR = []
RIGHT_KNEE_COR = []
LEFT_WRIST_COR = []
RIGHT_WRIST_COR = []
LEFT_ANKLE_COR = []
RIGHT_ANKLE_COR = []
LEFT_HEEL_COR = []
RIGHT_HEEL_COR = []
LEFT_FOOT_COR = []
RIGHT_FOOT_COR = []

draw_hip_mid_knee = 0
draw_mid_hip_knee = 0
draw_hip_knee = 0
draw_knee_ankle = 0
draw_shoulder_elbow = 0
draw_shoulder_hip = 0
draw_elbow_wrist = 0
wrist_circle = 0
hip_circle = 0
knee_circle = 0
elbow_circle = 0

ai = queue.Queue()
bi = queue.Queue()
speaktxt = queue.Queue()

is_timing = False
start_time = None
total_time = 0
stander = 0

# 获取当前进程的ID
# 获取进程号
pids = os.listdir('/proc')
for pid in pids:
    try:
        path = '/proc/' + pid + '/cmdline'
        with open(path) as f:
            cmdline = f.read()
            if 'fwc.py' in cmdline:
                skip_pid = pid
    except:
        pass
# pid = os.getpid()

def speak(txt):
    if 1:
        isspeaking = droid.ttsIsSpeaking()
        if not isspeaking.result:
            droid.ttsSpeak(txt)

def cv2AddChineseText(img, text, position, textColor=(0, 255, 0), textSize=30):
    if (isinstance(img, np.ndarray)):  # 判断是否OpenCV图片类型
        img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    # 创建一个可以在给定图像上绘图的对象
    draw = ImageDraw.Draw(img)
    # 字体的格式
    fontStyle = ImageFont.truetype(
        "FZCuDengXian.ttf", textSize, encoding="utf-8")
    # 绘制文本
    draw.text(position, text, textColor, font=fontStyle)
    # 转换回OpenCV格式
    return cv2.cvtColor(np.asarray(img), cv2.COLOR_RGB2BGR)

def mysin(cor1, cor2):
    if cor1[0] - cor2[0] != 0:
        sin = (cor1[1] - cor2[1]) / (cor1[0] - cor2[0])
        return sin
    else:
        return 1000

def mycos(cor1, cor2):
    if cor1[1] - cor2[1] != 0:
        cos = (cor1[0] - cor2[0]) / (cor1[1] - cor2[1])
        return cos
    else:
        return 1000

def aicoach(path, sports):
    temp = 99999
    global LEFT_WRIST_ANGL, LEFT_ELBOW_ANGL, LEFT_HIP_ANGL, LEFT_SHOULDER_ANGL, LEFT_KNEE_ANGL, \
        LEFT_ANKLE_ANGL, RIGHT_WRIST_ANGL, RIGHT_ELBOW_ANGL, RIGHT_HIP_ANGL, RIGHT_SHOULDER_ANGL, \
        RIGHT_KNEE_ANGL, RIGHT_ANKLE_ANGL, RIGHT_ELBOW_BEFORE_ANGL, LEFT_ELBOW_BEFORE_ANGL, \
        frameCnt_PushUp, threshold_wave, pushUpCnt, push_up_stander, \
        LEFT_HIP_COR, RIGHT_HIP_COR, LEFT_SHOULDER_COR, RIGHT_SHOULDER_COR, LEFT_ELBOW_COR, \
        RIGHT_ELBOW_COR, LEFT_KNEE_COR, RIGHT_KNEE_COR, LEFT_WRIST_COR, RIGHT_WRIST_COR, \
        LEFT_ANKLE_COR, RIGHT_ANKLE_COR, LEFT_HEEL_COR, RIGHT_HEEL_COR, LEFT_FOOT_COR, RIGHT_FOOT_COR, \
        draw_hip_mid_knee, draw_mid_hip_knee, draw_hip_knee, draw_knee_ankle, draw_shoulder_elbow, \
        draw_shoulder_hip, draw_elbow_wrist, wrist_circle, hip_circle, knee_circle, elbow_circle, \
        stander, start_time, total_time
    body = ""
    arm = ""
    hand = ""
    hip = ""
    knee = ""
    _num = None
    _time = None
    ###单位长度
    onefoot = 0
    isspeaking = droid.ttsIsSpeaking()  # 语音播报
    mp_drawing = mp.solutions.drawing_utils  # 导入MediaPipe绘图工具
    mp_drawing_styles = mp.solutions.drawing_styles  # 导入MediaPipe绘图样式
    mp_holistic = mp.solutions.holistic  # 导入MediaPipe全身姿势估计模型
    joint_list1 = [[12, 24, 26], [11, 23, 25], [24, 26, 28], [23, 25, 27],
                   [12, 14, 16], [11, 13, 15], [14, 16, 20], [13, 15, 19],
                   [24, 12, 14], [23, 11, 13], [14, 16, 20], [13, 15, 19],
                   [26, 28, 30], [25, 27, 29], [27, 29, 31], [28, 30, 32]]

    cap = cvs.VideoCapture(path)  # 打开视频文件
    # cap = cv2.VideoCapture('./wrongfwc1.mp4')  # 打开视频文件
    # cap = cv2.VideoCapture('./pbzc1.mp4')  # 打开视频文件
    # cap = cv2.VideoCapture(0)  # 打开视频文件
    save_path = "./outputvideo/" + sports + "" + ".avi"
    fourcc = cv2.VideoWriter_fourcc(*'MJPG')
    writer = cv2.VideoWriter(save_path, fourcc, 30, (1920, 900))
    if sports == "push_up":
        speak("现在开始俯卧撑检测")

    holistic = mp_holistic.Holistic(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5)  # 创建全身姿势估计对象
    ll = 0
    while 1:  # 循环读取视频帧
        # 计时开始，用于计算fps
        event.set()
        tstart = time.time()
        ui = cv2.imread('image/Aicoach.png')
        frame = cap.read()  # 读取视频帧
        if frame is None:
            ll += 1
            print(ll)
            if ll > 100:
                print("检测结束")
                break
            continue
        ll = 0
        image = cv2.resize(frame, (960, 450))  # 调整图像大小
        image = cv2.flip(image, 1)  # 左右翻转image
        image.flags.writeable = False  # 设置图像不
        # 可写入
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # 将图像从BGR格式转换为RGB格式
        results = holistic.process(image)  # 对图像进行全身姿势估计
        image.flags.writeable = True  # 设置图像可写入
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)  # 将图像从RGB格式转换为BGR格式

        # 渲染身体姿势关键点和连接线
        mp_drawing.draw_landmarks(
            image,
            results.pose_landmarks,
            mp_holistic.POSE_CONNECTIONS,
            None,
            mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2))

        # count_time(stander, start_time, total_time)
        # print(results.pose_landmarks)
        if results.pose_landmarks:
            RHL = results.pose_landmarks
            h, w, c = image.shape

            # 得到的关键点坐标x/y/z/visibility都是比例坐标，在[0,1]之间
            # 转换为像素坐标(cx,cy)，图像的实际长宽乘以比例，像素坐标一定是整数
            # 计算关节角度
            for joint in joint_list1:
                a = np.array([RHL.landmark[joint[0]].x, RHL.landmark[joint[0]].y])
                b = np.array([RHL.landmark[joint[1]].x, RHL.landmark[joint[1]].y])
                c = np.array([RHL.landmark[joint[2]].x, RHL.landmark[joint[2]].y])
                # 计算手指关节角度的弧度
                radians_fingers = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
                angle = np.abs(radians_fingers * 180.0 / np.pi)  # 弧度转换为角度
                # if angle > 180.0:
                #     angle = 180 - angle
                if 1:
                    if joint[1] == 11:  # left_shoulder
                        LEFT_SHOULDER_COR = (int(b[0] * w), int(b[1] * h))
                        LEFT_SHOULDER_ANGL = angle
                    if joint[1] == 12:  # right_shoulder
                        RIGHT_SHOULDER_COR = (int(b[0] * w), int(b[1] * h))
                        RIGHT_SHOULDER_ANGL = angle
                    if joint[1] == 13:  # left_elbow
                        LEFT_ELBOW_ANGL = angle
                        LEFT_ELBOW_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 14:  # right_elbow
                        RIGHT_ELBOW_ANGL = angle
                        RIGHT_ELBOW_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 15:
                        LEFT_WRIST_ANGL = angle
                        LEFT_WRIST_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 16:
                        RIGHT_WRIST_ANGL = angle
                        RIGHT_WRIST_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 23:  # left_hip
                        LEFT_HIP_ANGL = angle
                        LEFT_HIP_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 24:  # right_hip
                        RIGHT_HIP_ANGL = angle
                        RIGHT_HIP_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 25:  # left_knee
                        LEFT_KNEE_ANGL = angle
                        LEFT_KNEE_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 26:  # right_knee
                        RIGHT_KNEE_ANGL = angle
                        RIGHT_KNEE_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 27:  # left_ankle
                        LEFT_ANKLE_ANGL = angle
                        LEFT_ANKLE_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 28:  # right_ankle
                        RIGHT_ANKLE_ANGL = angle
                        RIGHT_ANKLE_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 29:  # left_heel
                        LEFT_HEEL_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[1] == 30:  # right_heel
                        RIGHT_HEEL_COR = (int(b[0] * w), int(b[1] * h))
                    if joint[2] == 31:  # left_foot
                        LEFT_FOOT_COR = (int(c[0] * w), int(c[1] * h))
                    if joint[2] == 32:  # right_foot
                        RIGHT_FOOT_COR = (int(c[0] * w), int(c[1] * h))

            if 1:
                if draw_shoulder_elbow == 1:
                    cv2.line(image, LEFT_SHOULDER_COR, LEFT_ELBOW_COR, (0, 255, 0), 2)
                    cv2.line(image, RIGHT_SHOULDER_COR, RIGHT_ELBOW_COR, (0, 255, 0), 2)
                if draw_elbow_wrist == 1:
                    cv2.line(image, LEFT_WRIST_COR, LEFT_ELBOW_COR, (0, 255, 0), 2)
                    cv2.line(image, RIGHT_WRIST_COR, RIGHT_ELBOW_COR, (0, 255, 0), 2)
                if draw_hip_knee == 1:
                    cv2.line(image, LEFT_KNEE_COR, LEFT_HIP_COR, (0, 255, 0), 2)
                    cv2.line(image, RIGHT_KNEE_COR, RIGHT_HIP_COR, (0, 255, 0), 2)
                if draw_hip_mid_knee == 1:  # 屁股到大腿一半
                    cv2.line(image, (
                        int((LEFT_KNEE_COR[0] + LEFT_HIP_COR[0]) / 2),
                        int((LEFT_KNEE_COR[1] + LEFT_HIP_COR[1]) / 2)),
                             LEFT_HIP_COR, (0, 255, 0), 2)
                    cv2.line(image, (
                        int((RIGHT_KNEE_COR[0] + RIGHT_HIP_COR[0]) / 2),
                        int((RIGHT_KNEE_COR[1] + RIGHT_HIP_COR[1]) / 2)),
                             RIGHT_HIP_COR, (0, 255, 0), 2)
                if draw_mid_hip_knee == 1:  # 大腿一半到膝盖
                    cv2.line(image, (
                        int((LEFT_KNEE_COR[0] + LEFT_HIP_COR[0]) / 2),
                        int((LEFT_KNEE_COR[1] + LEFT_HIP_COR[1]) / 2)),
                             LEFT_KNEE_COR, (0, 255, 0), 2)
                    cv2.line(image, (
                        int((RIGHT_KNEE_COR[0] + RIGHT_HIP_COR[0]) / 2),
                        int((RIGHT_KNEE_COR[1] + RIGHT_HIP_COR[1]) / 2)),
                             RIGHT_KNEE_COR, (0, 255, 0), 2)
                if draw_knee_ankle == 1:
                    cv2.line(image, LEFT_KNEE_COR, LEFT_ANKLE_COR, (0, 255, 0), 2)
                    cv2.line(image, RIGHT_KNEE_COR, RIGHT_ANKLE_COR, (0, 255, 0), 2)
                if draw_shoulder_hip == 1:
                    cv2.line(image, LEFT_SHOULDER_COR, LEFT_HIP_COR, (0, 255, 0), 2)
                    cv2.line(image, RIGHT_SHOULDER_COR, RIGHT_HIP_COR, (0, 255, 0), 2)

                if wrist_circle == 1:
                    cv2.circle(image, LEFT_WRIST_COR, 10, (0, 0, 255), 2)
                    cv2.circle(image, RIGHT_WRIST_COR, 10, (0, 0, 255), 2)
                if hip_circle == 1:
                    cv2.circle(image, LEFT_HIP_COR, 10, (0, 0, 255), 2)
                    cv2.circle(image, RIGHT_HIP_COR, 10, (0, 0, 255), 2)
                if knee_circle == 1:
                    cv2.circle(image, LEFT_KNEE_COR, 10, (0, 0, 255), 2)
                    cv2.circle(image, RIGHT_KNEE_COR, 10, (0, 0, 255), 2)
                if elbow_circle == 1:
                    cv2.circle(image, LEFT_ELBOW_COR, 10, (0, 0, 255), 2)
                    cv2.circle(image, RIGHT_ELBOW_COR, 10, (0, 0, 255), 2)

            onefoot = abs(LEFT_HEEL_COR[0] - LEFT_FOOT_COR[0])
            # pushup(image)
            if sports == "push_up":
                hand, hip, knee, _num = pushup(image)

        # 计时结束
        tend = time.time()
        # 计算fps
        fps = 1 / (tend - tstart)
        fps = "%.2f fps" % fps
        # 在图片的左上角标出Fps
        cv2.putText(image, fps, (500, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 1)
        # 显示图像
        # x_offset = 320 # 视频帧在背景图片中的x坐标
        # y_offset = 150  # 视频帧在背景图片中的y坐标
        x_offset = 300  # 视频帧在背景图片中的x坐标
        y_offset = 200  # 视频帧在背景图片中的y坐标
        ui[y_offset:y_offset + image.shape[0], x_offset:x_offset + image.shape[1]] = image
        # ui = cv2.resize(ui, (640, 300))
        # out.write(frame)
        if sports == "static_squat" or sports == "plank":
            ui = cv2AddChineseText(ui, " 标准时长：%ss" % (_time), (1320, 140), textColor=(0, 0, 0), textSize=30)
            ui = cv2AddChineseText(ui, " 不规范操作如下：", (1300, 175), textColor=(0, 0, 0), textSize=40)
        if sports == "squat" or sports == "push_up":
            ui = cv2AddChineseText(ui, " 标准个数：%s" % (_num), (1320, 140), textColor=(0, 0, 0), textSize=30)
            ui = cv2AddChineseText(ui, " 不规范操作如下：", (1300, 175), textColor=(0, 0, 0), textSize=40)
            if _num != temp:
                droid.ttsSpeak(str(_num))
                temp = _num
        if arm == "前":
            ui = cv2AddChineseText(ui, "手臂过于靠前", (1320, 240), textColor=(0, 0, 0), textSize=30)
            speak("手臂过于靠前")
        if arm == "后":
            ui = cv2AddChineseText(ui, "手臂过于靠后", (1320, 240), textColor=(0, 0, 0), textSize=30)
            speak("手臂过于靠后")
        if hip == "低":
            ui = cv2AddChineseText(ui, "臀部过低", (1320, 300), textColor=(0, 0, 0), textSize=30)
            speak("臀部过低")
        if hip == "高":
            ui = cv2AddChineseText(ui, "臀部过高", (1320, 300), textColor=(0, 0, 0), textSize=30)
            speak("臀部过高")
        if knee == "前":
            ui = cv2AddChineseText(ui, "注意膝盖不要超过脚尖", (1320, 360), textColor=(0, 0, 0), textSize=30)
            speak("注意膝盖不要超过脚尖")
        if knee == "弯":
            ui = cv2AddChineseText(ui, "膝盖过于弯曲", (1320, 360), textColor=(0, 0, 0), textSize=30)
            speak("膝盖过于弯曲")
        if hand == "前":
            ui = cv2AddChineseText(ui, "手掌位置过于靠前", (1320, 420), textColor=(0, 0, 0), textSize=30)
            speak("手掌位置过于靠前")
        if hand == "后":
            ui = cv2AddChineseText(ui, "手掌位置过于靠后", (1320, 420), textColor=(0, 0, 0), textSize=30)
            speak("手掌位置过于靠后")
        if body == "后":
            ui = cv2AddChineseText(ui, "身体重心过于靠后", (1320, 480), textColor=(0, 0, 0), textSize=30)
            speak("身体重心过于靠后")
        if stander == 1:
            ui = cv2AddChineseText(ui, "动作规范请保持", (1320, 540), textColor=(0, 0, 0), textSize=30)
            speak("动作规范请保持")

        cvs.imshow(ui)
        writer.write(ui)
        ret, buffer = cv2.imencode('.jpg', ui)
        image = buffer.tobytes()
        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + image + b'\r\n')
        # cvs.imshow(image)
        if cv2.waitKey(5) == ord('q'):  # 按下q键退出循环
            break
    writer.release()
    cv2.destroyAllWindows()
    holistic.close()
    return sports

def count_time(image, Cnt):
    global start_time, total_time, stander
    # #################### 规范计时
    if stander == 1:  # 动作规范
        if start_time is None:
            start_time = time.time()  # 开始计时
        else:
            total_time += time.time() - start_time  # 加上上一次动作规范的计时
            start_time = time.time()  # 开始新的计时
    elif stander == 0:  # 动作不规范
        if start_time is not None:
            total_time += time.time() - start_time  # 停止计时，并加上这段时间
            start_time = None
    if stander == 1 or stander == 0:
        cv2.putText(image, " Timer:%ss" % (round((total_time), 2)), (350, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                    (0, 255, 255), 2)
        return round(total_time)
    if stander == -1:
        cv2.putText(image, " Count:%s" % (Cnt), (350, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
        return Cnt

def pushup(image):
    global  LEFT_WRIST_ANGL, LEFT_ELBOW_ANGL, LEFT_HIP_ANGL, LEFT_SHOULDER_ANGL, LEFT_KNEE_ANGL, \
        LEFT_ANKLE_ANGL, RIGHT_WRIST_ANGL, RIGHT_ELBOW_ANGL, RIGHT_HIP_ANGL, RIGHT_SHOULDER_ANGL, \
        RIGHT_KNEE_ANGL, RIGHT_ANKLE_ANGL, RIGHT_ELBOW_BEFORE_ANGL, LEFT_ELBOW_BEFORE_ANGL, \
        frameCnt_PushUp, threshold_wave, pushUpCnt, push_up_stander, \
        LEFT_HIP_COR, RIGHT_HIP_COR, LEFT_SHOULDER_COR, RIGHT_SHOULDER_COR, LEFT_ELBOW_COR, \
        RIGHT_ELBOW_COR, LEFT_KNEE_COR, RIGHT_KNEE_COR, LEFT_WRIST_COR, RIGHT_WRIST_COR, \
        LEFT_ANKLE_COR, RIGHT_ANKLE_COR, LEFT_HEEL_COR, RIGHT_HEEL_COR, LEFT_FOOT_COR, RIGHT_FOOT_COR, \
        draw_hip_mid_knee, draw_mid_hip_knee, draw_hip_knee, draw_knee_ankle, draw_shoulder_elbow, \
        draw_shoulder_hip, draw_elbow_wrist, wrist_circle, hip_circle, knee_circle, elbow_circle, \
        stander, start_time, total_time
    hand = ""
    hip = ""
    knee = ""
    # 人头朝向右方
    if RIGHT_SHOULDER_COR[0] > RIGHT_HIP_COR[0] and LEFT_SHOULDER_COR[0] > LEFT_HIP_COR[0]:
        #####################俯卧撑
        stander = -1
        cv2.putText(image, 'Push Up', (250, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
        # print('cos: ' + str(mycos(RIGHT_SHOULDER_COR, RIGHT_ELBOW_COR)))
        if 170 < RIGHT_ELBOW_ANGL < 185:  # 手臂伸直时
            if -0.12 < mycos(RIGHT_SHOULDER_COR, RIGHT_WRIST_COR) < 0.11:  # 手臂垂直地面
                draw_shoulder_elbow = 1
                draw_elbow_wrist = 1
                wrist_circle = 0
            elif 0.11 < mycos(RIGHT_SHOULDER_COR, RIGHT_WRIST_COR):
                draw_elbow_wrist = 0
                draw_shoulder_elbow = 0
                wrist_circle = 1
                # cv2.putText(image, 'hands too far back ', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                #             (0, 0, 255), 1)
                hand = "后"
            elif mycos(RIGHT_SHOULDER_COR, RIGHT_WRIST_COR) < -0.12:
                draw_elbow_wrist = 0
                draw_shoulder_elbow = 0
                wrist_circle = 1
                # cv2.putText(image, 'hands too far forward', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                #             (0, 0, 255), 1)
                hand = "前"

        # 判断上半身平行与地面
        if 130 < RIGHT_HIP_ANGL < 185:  # 上半身平行与地面
            hip_circle = 0
            draw_shoulder_hip = 1
            draw_hip_mid_knee = 1
        elif RIGHT_HIP_ANGL < 130:  # 撅屁股
            hip_circle = 1
            draw_shoulder_hip = 0
            draw_hip_mid_knee = 0
            # cv2.putText(image, 'hip too high', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 1)
            hip = "高"
        elif 185 < RIGHT_HIP_ANGL:
            hip_circle = 1
            draw_shoulder_hip = 0
            draw_hip_mid_knee = 0
            # cv2.putText(image, 'hip too low', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 1)
            hip = "低"
        #  判断膝盖是否弯曲
        if 150 < RIGHT_KNEE_ANGL < 210:
            draw_mid_hip_knee = 1
            draw_knee_ankle = 1
            knee_circle = 0
        else:
            draw_mid_hip_knee = 0
            draw_knee_ankle = 0
            knee_circle = 1
            # cv2.putText(image, 'knee bending', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            knee = "弯"
        if knee_circle == hip_circle == elbow_circle == wrist_circle == 0:
            push_up_stander = 1
        else:
            push_up_stander = 0
        if push_up_stander == 1 and RIGHT_ELBOW_ANGL < 80:
            frameCnt_PushUp += 1
            # print("shoulder_before", shoulder_before, "shoulder", shoulder, "frameCnt_ChinUp", frameCnt_ChinUp)
            # 如果上一帧和当前帧肘部的弯曲度分别处于90度的两侧，则可以理解为完成一次标准的 引体向上动作
            if ((RIGHT_ELBOW_ANGL > 90) and (RIGHT_ELBOW_BEFORE_ANGL < 90)) | (
                    (RIGHT_ELBOW_ANGL < 90) and (RIGHT_ELBOW_BEFORE_ANGL > 90)):
                # 有时候数据会有一些波动，导致连续很短的时间内，肘部弯曲角度在90度左右连续波动，这样子就会误判为做完多次引体向上
                # 为了防止这个问题，设定波长阈值，只有大于这个阈值才会计数+1
                if frameCnt_PushUp > threshold_wave:
                    frameCnt_PushUp = 0
                    pushUpCnt += 1
                    # 把上一帧的角度反转并保存
                    if RIGHT_ELBOW_BEFORE_ANGL == 180:
                        RIGHT_ELBOW_BEFORE_ANGL = 0
                    else:
                        RIGHT_ELBOW_BEFORE_ANGL = 180
    # 人头朝向左方
    elif RIGHT_SHOULDER_COR[0] < RIGHT_HIP_COR[0] and LEFT_SHOULDER_COR[0] < LEFT_HIP_COR[0]:
        stander = -1
        cv2.putText(image, 'Push Up', (250, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255),
                    2)
        # print('cos: ' + str(mycos(LEFT_SHOULDER_COR, LEFT_ELBOW_COR)))
        # print(mycos(LEFT_SHOULDER_COR, LEFT_WRIST_COR), wrist_circle, draw_elbow_wrist)
        if 160 < LEFT_ELBOW_ANGL < 185:  # 手臂伸直时
            if -0.2 < mycos(LEFT_SHOULDER_COR, LEFT_WRIST_COR) < 0.4:  # 手掌在胸前
                draw_shoulder_elbow = 1
                draw_elbow_wrist = 1
                wrist_circle = 0
            elif mycos(LEFT_SHOULDER_COR, LEFT_WRIST_COR) < -0.2:
                draw_elbow_wrist = 0
                draw_shoulder_elbow = 0
                wrist_circle = 1

            elif 0.4 < mycos(LEFT_SHOULDER_COR, LEFT_WRIST_COR):
                draw_elbow_wrist = 0
                draw_shoulder_elbow = 0
                wrist_circle = 2
        # print(wrist_circle)
        if wrist_circle == 1:
            # cv2.putText(image, 'hands too far forward ', (10, 20), cv2.FONT_HERSHEY_SIMPLEX,
            #             0.7,
            #             (0, 0, 255), 1)
            hand = "前"
        if wrist_circle == 2:
            # cv2.putText(image, 'hands too far back', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
            #             (0, 0, 255), 1)
            hand = "后"

        # 判断上半身平行与地面
        # if LEFT_HIP_ANGL > 180:
        #     LEFT_HIP_ANGL = 360 - LEFT_HIP_ANGL
        # print(LEFT_HIP_ANGL)
        if 175 < LEFT_HIP_ANGL < 220:  # 上半身平行与地面
            hip_circle = 0
            draw_shoulder_hip = 1
            draw_hip_mid_knee = 1
        elif 220 < LEFT_HIP_ANGL or LEFT_HIP_ANGL < 120:  # 撅屁股
            hip_circle = 1
            draw_shoulder_hip = 0
            draw_hip_mid_knee = 0
            # cv2.putText(image, 'hip too high', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255),
            #             1)
            hip = "高"
        elif 120 < LEFT_HIP_ANGL < 175:
            hip_circle = 1
            draw_shoulder_hip = 0
            draw_hip_mid_knee = 0
            # cv2.putText(image, 'hip too low', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255),
            #             1)
            hip = "低"

        #  判断膝盖是否弯曲
        if 135 < LEFT_KNEE_ANGL < 210:
            draw_mid_hip_knee = 1
            draw_knee_ankle = 1
            knee_circle = 0
        else:
            draw_mid_hip_knee = 0
            draw_knee_ankle = 0
            knee_circle = 1
            # cv2.putText(image, 'knee bending', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            knee = "弯"
        if knee_circle == hip_circle == elbow_circle == wrist_circle == 0:
            push_up_stander = 1
        else:
            push_up_stander = 0

        if push_up_stander == 1:
            if LEFT_ELBOW_ANGL >= 180:
                LEFT_ELBOW_ANGL = 360 - LEFT_ELBOW_ANGL
            if LEFT_ELBOW_ANGL < 90:
                frameCnt_PushUp += 1

            # 如果上一帧和当前帧肘部的弯曲度分别处于90度的两侧，则可以理解为完成一次标准的 引体向上动作
            if ((LEFT_ELBOW_ANGL > 90) and (LEFT_ELBOW_BEFORE_ANGL < 90)) | (
                    (LEFT_ELBOW_ANGL < 90) and (LEFT_ELBOW_BEFORE_ANGL > 90)):
                # 有时候数据会有一些波动，导致连续很短的时间内，肘部弯曲角度在90度左右连续波动，这样子就会误判为做完多次引体向上
                # 为了防止这个问题，设定波长阈值，只有大于这个阈值才会计数+1
                if frameCnt_PushUp > threshold_wave - 2:
                    frameCnt_PushUp = 0
                    pushUpCnt += 1
                    # 把上一帧的角度反转并保存
                    if LEFT_ELBOW_BEFORE_ANGL == 180:
                        LEFT_ELBOW_BEFORE_ANGL = 0
                    else:
                        LEFT_ELBOW_BEFORE_ANGL = 180
    _num = count_time(image, pushUpCnt)
    return hand, hip, knee, _num

def count_time(image, Cnt):
    global start_time, total_time, stander
    # #################### 规范计时
    if stander == 1:  # 动作规范
        if start_time is None:
            start_time = time.time()  # 开始计时
        else:
            total_time += time.time() - start_time  # 加上上一次动作规范的计时
            start_time = time.time()  # 开始新的计时
    elif stander == 0:  # 动作不规范
        if start_time is not None:
            total_time += time.time() - start_time  # 停止计时，并加上这段时间
            start_time = None
    if stander == 1 or stander == 0:
        cv2.putText(image, " Timer:%ss" % (round((total_time), 2)), (350, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                    (0, 255, 255), 2)
        return round(total_time)
    if stander == -1:
        cv2.putText(image, " Count:%s" % (Cnt), (350, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
        return Cnt


if __name__ == '__main__':
    # aicoach(0, "push_up")
    aicoach(-1, "pushup")
    # time.sleep(2)
    # print("next")
    # aicoach("./video/myfwc.mp4", "push_up")
# if __name__ == '__main__':
#     args = sys.argv[2:]  # 获取命令行参数，排除脚本名称
#     print(len(args))
#     if len(args) == 2:
#         video_file = args[0]
#         exercise = args[1]
#         if video_file in ["0","1","-1"]:
#             aicoach(int(video_file), exercise)
#         else:
#             aicoach(video_file, exercise)
#     else:
#         print("请提供正确的参数！")