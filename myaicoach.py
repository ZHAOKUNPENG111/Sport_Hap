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


def aicoach(path, sports):
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

    def speak(txt):
        if 1:
            droid.ttsSpeak(txt)
            isspeaking = droid.ttsIsSpeaking()
            while isspeaking.result:
                isspeaking = droid.ttsIsSpeaking()

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

    def aicoach_thread(path, sports):
        temp = 99999
        # 获取当前进程的ID
        nonlocal  LEFT_WRIST_ANGL, LEFT_ELBOW_ANGL, LEFT_HIP_ANGL, LEFT_SHOULDER_ANGL, LEFT_KNEE_ANGL, \
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

        # joint_list = [[7, 6, 5], [11, 10, 9], [15, 14, 13], [19, 18, 17]]  # 手指关节序列
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
        if sports == "static_squat":
            speak("现在开始静态深蹲检测")
        elif sports == "squat":
            speak("现在开始深蹲检测")
        elif sports == "plank":
            speak("现在开始平板支撑检测")
        elif sports == "push_up":
            speak("现在开始俯卧撑检测")
        with mp_holistic.Holistic(
                min_detection_confidence=0.5,
                min_tracking_confidence=0.5) as holistic:  # 创建全身姿势估计对象
            ll = 0
            while 1:  # 循环读取视频帧
                # 计时开始，用于计算fps
                event.set()
                tstart = time.time()
                ui = cv2.imread('image/Aicoach.png')
                frame = cap.read()  # 读取视频帧
                if frame is None:
                    ll += 1
                    if ll > 5:
                        writer.release()  # 可以实现预览
                        speaktxt.put("退出")
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

                        # print(cv2.FONT_HERSHEY_SIMPLEX, cv2.LINE_AA)
                        # cv2.putText(image, str(round(angle, 2)), tuple(np.multiply(b, (640, 360)).astype(int)),
                        #                 cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)

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
                    if sports == "static_squat":
                        body, hip, knee, _time = static_squat(image)
                    elif sports == "squat":
                        body, hip, knee, _num = squat(image)
                    elif sports == "plank":
                        arm, hip, knee, _time = plank(image)
                    elif sports == "push_up":
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
                    speaktxt.put("手臂过于靠前")
                if arm == "后":
                    ui = cv2AddChineseText(ui, "手臂过于靠后", (1320, 240), textColor=(0, 0, 0), textSize=30)
                    speaktxt.put("手臂过于靠后")
                if hip == "低":
                    ui = cv2AddChineseText(ui, "臀部过低", (1320, 300), textColor=(0, 0, 0), textSize=30)
                    speaktxt.put("臀部过低")
                if hip == "高":
                    ui = cv2AddChineseText(ui, "臀部过高", (1320, 300), textColor=(0, 0, 0), textSize=30)
                    speaktxt.put("臀部过高")
                if knee == "前":
                    ui = cv2AddChineseText(ui, "注意膝盖不要超过脚尖", (1320, 360), textColor=(0, 0, 0), textSize=30)
                    speaktxt.put("注意膝盖不要超过脚尖")
                if knee == "弯":
                    ui = cv2AddChineseText(ui, "膝盖过于弯曲", (1320, 360), textColor=(0, 0, 0), textSize=30)
                    speaktxt.put("膝盖过于弯曲")
                if hand == "前":
                    ui = cv2AddChineseText(ui, "手掌位置过于靠前", (1320, 420), textColor=(0, 0, 0), textSize=30)
                    speaktxt.put("手掌位置过于靠前")
                if hand == "后":
                    ui = cv2AddChineseText(ui, "手掌位置过于靠后", (1320, 420), textColor=(0, 0, 0), textSize=30)
                    speaktxt.put("手掌位置过于靠后")
                if body == "后":
                    ui = cv2AddChineseText(ui, "身体重心过于靠后", (1320, 480), textColor=(0, 0, 0), textSize=30)
                    speaktxt.put("身体重心过于靠后")
                if stander == 1:
                    ui = cv2AddChineseText(ui, "动作规范请保持", (1320, 540), textColor=(0, 0, 0), textSize=30)
                    speaktxt.put("动作规范请保持")

                cvs.imshow(ui)
                writer.write(ui)
                # cvs.imshow(image)
                if cv2.waitKey(5) == ord('q'):  # 按下q键退出循环
                    break

            return sports
 
    def speak_thread():
        save = []
        last_speak_time = time.time()
        while True:
            txt = speaktxt.get()
            if txt == "退出":
                break
            save.append(txt)
            if len(save) >= 2 and save[-1] == save[-2]:
                continue
            current_time = time.time()
            time_difference = current_time - last_speak_time
            if time_difference >= 3:
                speak(txt)
                last_speak_time = current_time
            speaktxt.queue.clear()
            save.clear()
    
    def plank(image):
        nonlocal  LEFT_WRIST_ANGL, LEFT_ELBOW_ANGL, LEFT_HIP_ANGL, LEFT_SHOULDER_ANGL, LEFT_KNEE_ANGL, \
            LEFT_ANKLE_ANGL, RIGHT_WRIST_ANGL, RIGHT_ELBOW_ANGL, RIGHT_HIP_ANGL, RIGHT_SHOULDER_ANGL, \
            RIGHT_KNEE_ANGL, RIGHT_ANKLE_ANGL, RIGHT_ELBOW_BEFORE_ANGL, LEFT_ELBOW_BEFORE_ANGL, \
            frameCnt_PushUp, threshold_wave, pushUpCnt, push_up_stander, \
            LEFT_HIP_COR, RIGHT_HIP_COR, LEFT_SHOULDER_COR, RIGHT_SHOULDER_COR, LEFT_ELBOW_COR, \
            RIGHT_ELBOW_COR, LEFT_KNEE_COR, RIGHT_KNEE_COR, LEFT_WRIST_COR, RIGHT_WRIST_COR, \
            LEFT_ANKLE_COR, RIGHT_ANKLE_COR, LEFT_HEEL_COR, RIGHT_HEEL_COR, LEFT_FOOT_COR, RIGHT_FOOT_COR, \
            draw_hip_mid_knee, draw_mid_hip_knee, draw_hip_knee, draw_knee_ankle, draw_shoulder_elbow, \
            draw_shoulder_hip, draw_elbow_wrist, wrist_circle, hip_circle, knee_circle, elbow_circle, \
            stander, start_time, total_time
        arm = ""
        hip = ""
        knee = ""
        if RIGHT_SHOULDER_COR[0] > RIGHT_HIP_COR[0] and LEFT_SHOULDER_COR[0] > LEFT_HIP_COR[0]:
            #####################平板支撑
            cv2.putText(image, 'Plank', (250, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
            # 人头朝向右方
            # print('cos: ' + str(mycos(RIGHT_SHOULDER_COR, RIGHT_ELBOW_COR)))
            if -0.1 < mycos(RIGHT_SHOULDER_COR, RIGHT_ELBOW_COR) < 0.1:  # 手臂垂直地面
                elbow_circle = 0
                draw_shoulder_elbow = 1
                draw_elbow_wrist = 1
            elif mycos(RIGHT_SHOULDER_COR, RIGHT_ELBOW_COR) < -0.1:
                # cv2.putText(image, 'arm backwards', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255),
                #             2)
                arm = "后"
                elbow_circle = 1
                draw_shoulder_elbow = 0
                draw_elbow_wrist = 0
            elif 0.1 < mycos(RIGHT_SHOULDER_COR, RIGHT_ELBOW_COR):
                # cv2.putText(image, 'arm forward', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255),
                #             2)
                arm = "前"
                elbow_circle = 1
                draw_shoulder_elbow = 0
                draw_elbow_wrist = 0

            # 判断上半身平行与地面
            if -0.15 < mysin(RIGHT_HIP_COR, RIGHT_SHOULDER_COR) < 0.15:  # 上半身平行与地面
                hip_circle = 0
                draw_shoulder_hip = 1
                draw_hip_mid_knee = 1
                # print(RIGHT_KNEE_ANGL)
            elif mysin(RIGHT_HIP_COR, RIGHT_SHOULDER_COR) < -0.15:  # 撅屁股
                # cv2.putText(image, 'hip too high', (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                hip = "低"
                hip_circle = 1
                draw_shoulder_hip = 0
                draw_hip_mid_knee = 0
            elif 0.15 < mysin(RIGHT_HIP_COR, RIGHT_SHOULDER_COR):
                # cv2.putText(image, 'hip too low', (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                hip = "高"
                hip_circle = 1
                draw_shoulder_hip = 0
                draw_hip_mid_knee = 0

            #  判断膝盖是否弯曲
            if 140 < RIGHT_KNEE_ANGL < 210:
                draw_mid_hip_knee = 1
                draw_knee_ankle = 1
                knee_circle = 0
            else:
                # cv2.putText(image, 'knee bending', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                knee = "弯"
                draw_mid_hip_knee = 0
                draw_knee_ankle = 0
                knee_circle = 1

            if knee_circle == hip_circle == elbow_circle == 0:
                stander = 1
            else:
                stander = 0

            # 人头朝向左方
        elif RIGHT_SHOULDER_COR[0] < RIGHT_HIP_COR[0] and LEFT_SHOULDER_COR[0] < LEFT_HIP_COR[0]:
            #############平板支撑
            cv2.putText(image, 'Plank', (250, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
            # print('cos: ' + str(mycos(LEFT_SHOULDER_COR, LEFT_ELBOW_COR)))
            if -0.1 < mycos(LEFT_SHOULDER_COR, LEFT_ELBOW_COR) < 0.1:  # 手臂垂直地面
                elbow_circle = 0
                draw_shoulder_elbow = 1
                draw_elbow_wrist = 1
                # print(mycos(LEFT_SHOULDER_COR, LEFT_ELBOW_COR))
            elif mycos(LEFT_SHOULDER_COR, LEFT_ELBOW_COR) < -0.1:
                # cv2.putText(image, 'arm too far forward', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255),
                #             2)
                arm = "前"
                elbow_circle = 1
                draw_shoulder_elbow = 0
                draw_elbow_wrist = 0
            elif 0.1 < mycos(LEFT_SHOULDER_COR, LEFT_ELBOW_COR):
                # cv2.putText(image, 'arm too far backward', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255),
                #             2)
                arm = "后"
                elbow_circle = 1
                draw_shoulder_elbow = 0
                draw_elbow_wrist = 0

            # 判断上半身平行与地面
            if -0.15 < mysin(LEFT_HIP_COR, LEFT_SHOULDER_COR) < 0.15:  # 上半身平行与地面
                draw_shoulder_hip = 1
                draw_hip_mid_knee = 1
                hip_circle = 0

            elif mysin(LEFT_HIP_COR, LEFT_SHOULDER_COR) < -0.15:
                # cv2.putText(image, 'hip too high', (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                hip = "高"
                hip_circle = 1
                draw_shoulder_hip = 0
                draw_hip_mid_knee = 0
            elif 0.15 < mysin(LEFT_HIP_COR, LEFT_SHOULDER_COR):
                # cv2.putText(image, 'hip too low', (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                hip = "低"
                hip_circle = 1
                draw_shoulder_hip = 0
                draw_hip_mid_knee = 0

            #  判断膝盖是否弯曲
            if 130 < LEFT_KNEE_ANGL < 210:
                draw_mid_hip_knee = 1
                draw_knee_ankle = 1
                knee_circle = 0

            else:
                draw_mid_hip_knee = 0
                draw_knee_ankle = 0
                knee_circle = 1
                # cv2.putText(image, 'knee bending', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                knee = "弯"

            if knee_circle == hip_circle == elbow_circle == 0:
                stander = 1
            else:
                stander = 0

            # print("总计时：", total_time)
            # #################### 规范计时
        _time = count_time(image, None)
        return arm, hip, knee, _time

    def pushup(image):
        nonlocal  LEFT_WRIST_ANGL, LEFT_ELBOW_ANGL, LEFT_HIP_ANGL, LEFT_SHOULDER_ANGL, LEFT_KNEE_ANGL, \
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

    def static_squat(image):
        nonlocal  LEFT_WRIST_ANGL, LEFT_ELBOW_ANGL, LEFT_HIP_ANGL, LEFT_SHOULDER_ANGL, LEFT_KNEE_ANGL, \
            LEFT_ANKLE_ANGL, RIGHT_WRIST_ANGL, RIGHT_ELBOW_ANGL, RIGHT_HIP_ANGL, RIGHT_SHOULDER_ANGL, \
            RIGHT_KNEE_ANGL, RIGHT_ANKLE_ANGL, RIGHT_ELBOW_BEFORE_ANGL, LEFT_ELBOW_BEFORE_ANGL, \
            frameCnt_PushUp, threshold_wave, pushUpCnt, push_up_stander, \
            LEFT_HIP_COR, RIGHT_HIP_COR, LEFT_SHOULDER_COR, RIGHT_SHOULDER_COR, LEFT_ELBOW_COR, \
            RIGHT_ELBOW_COR, LEFT_KNEE_COR, RIGHT_KNEE_COR, LEFT_WRIST_COR, RIGHT_WRIST_COR, \
            LEFT_ANKLE_COR, RIGHT_ANKLE_COR, LEFT_HEEL_COR, RIGHT_HEEL_COR, LEFT_FOOT_COR, RIGHT_FOOT_COR, \
            draw_hip_mid_knee, draw_mid_hip_knee, draw_hip_knee, draw_knee_ankle, draw_shoulder_elbow, \
            draw_shoulder_hip, draw_elbow_wrist, wrist_circle, hip_circle, knee_circle, elbow_circle, \
            stander, start_time, total_time
        onefoot = abs(LEFT_HEEL_COR[0] - LEFT_FOOT_COR[0])
        body = ""
        hip = ""
        knee = ""
        ######## 人朝向右方
        if RIGHT_FOOT_COR[0] > RIGHT_HEEL_COR[0] and LEFT_FOOT_COR[0] > LEFT_HEEL_COR[0]:
            if 1:
                if RIGHT_KNEE_ANGL > 180:
                    RIGHT_KNEE_ANGL = 360 - RIGHT_KNEE_ANGL
                if RIGHT_HIP_ANGL > 180:
                    RIGHT_HIP_ANGL = 360 - RIGHT_HIP_ANGL
                cv2.putText(image, 'Squat', (250, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                # print('cos: ' + str(mycos(RIGHT_SHOULDER_COR, RIGHT_ELBOW_COR)))
                if 60 < RIGHT_HIP_ANGL < 85:  #
                    draw_shoulder_hip = 1
                    draw_hip_mid_knee = 1
                    hip_circle = 0
                else:
                    draw_shoulder_hip = 0
                    draw_hip_mid_knee = 0
                    if 85 < RIGHT_HIP_ANGL < 130:  # 
                        if 70 < RIGHT_KNEE_ANGL < 90:  # 膝盖已经弯曲90°
                            hip_circle = 1
                            # cv2.putText(image, 'upper body too backward ', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                            #             (0, 0, 255), 1)
                            body = "后"
                    else:
                        hip_circle = 0
                    # if RIGHT_HIP_ANGL < 60:
                    #     hip_circle = 1
                    #     cv2.putText(image, 'upper body bend too much ', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                    #                 (0, 0, 255), 1)
                    #     body = "后"

                if 70 < RIGHT_KNEE_ANGL < 90:  # 膝盖在标准角度内
                    draw_knee_ankle = 1
                    draw_mid_hip_knee = 1
                    knee_circle = 0
                else:
                    draw_knee_ankle = 0
                    draw_mid_hip_knee = 0
                    if 90 < RIGHT_KNEE_ANGL < 140:
                        knee_circle = 1
                        # cv2.putText(image, 'hip too high ', (10, 40), cv2.FONT_HERSHEY_SIMPLEX,
                        #             0.7, (0, 0, 255), 1)
                    else:
                        knee_circle = 0
                    if RIGHT_KNEE_ANGL < 70:
                        knee_circle = 1
                        cv2.putText(image, 'excessive knee flexion ', (10, 40), cv2.FONT_HERSHEY_SIMPLEX,
                                    0.7, (0, 0, 255), 1)
                        # knee = "弯"

                #########  膝盖超出脚尖
                if RIGHT_KNEE_COR[0] - RIGHT_FOOT_COR[0] > onefoot * 0.4:
                    knee_circle = 1
                    draw_knee_ankle = 0
                    draw_mid_hip_knee = 0
                    # cv2.putText(image, 'knee too up front ', (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    knee = "前"
                    cv2.line(image, RIGHT_KNEE_COR, (RIGHT_KNEE_COR[0], RIGHT_FOOT_COR[1]), (0, 0, 255), 1)  # 线变红
                else:
                    cv2.line(image, RIGHT_KNEE_COR, (RIGHT_KNEE_COR[0], RIGHT_FOOT_COR[1]), (255, 255, 0), 1)

                #########  臀部低于膝盖很多
                if RIGHT_KNEE_COR[1] - RIGHT_HIP_COR[1] < -onefoot * 0.25:
                    draw_shoulder_hip = 0
                    draw_hip_mid_knee = 0
                    hip_circle = 1
                    # cv2.putText(image, 'HIP LOW ', (10, 80), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    hip = "低"
                    cv2.line(image, (RIGHT_HIP_COR[0] * 2 - RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]),
                             (RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]), (0, 0, 255), 1, cv2.LINE_AA)
                elif onefoot * 0.25 < RIGHT_KNEE_COR[1] - RIGHT_HIP_COR[1] < onefoot * 0.5:
                    # draw_shoulder_hip = 0
                    # draw_hip_mid_knee = 0
                    # hip_circle = 1
                    # cv2.putText(image, 'HIP HIGH ', (10, 80), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    hip = "高"
                else:
                    cv2.line(image, (RIGHT_HIP_COR[0] * 2 - RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]),
                             (RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]), (255, 255, 0), 1, cv2.LINE_AA)
                ########
                if onefoot * 0.25 > RIGHT_KNEE_COR[1] - RIGHT_HIP_COR[1] > -onefoot * 0.25:  #
                    cv2.line(image, (RIGHT_HIP_COR[0] * 2 - RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]),
                             (RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]), (0, 255, 0), 1, cv2.LINE_AA)

                if 70 < RIGHT_KNEE_ANGL < 90 and 60 < RIGHT_HIP_ANGL < 85:
                    stander = 1
                    # cv2.putText(image, ' Please maintain the current posture', (40, 140),
                    #             cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                else:
                    stander = 0


        ######## 人朝向左
        elif RIGHT_FOOT_COR[0] < RIGHT_HEEL_COR[0] and LEFT_FOOT_COR[0] < LEFT_HEEL_COR[0]:
            if 1:  #####################静态深蹲##############
                if LEFT_KNEE_ANGL > 180:
                    LEFT_KNEE_ANGL = 360 - LEFT_KNEE_ANGL
                if LEFT_HIP_ANGL > 180:
                    LEFT_HIP_ANGL = 360 - LEFT_HIP_ANGL
                cv2.putText(image, 'Static Squat', (250, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                # print('cos: ' + str(mycos(RIGHT_SHOULDER_COR, RIGHT_ELBOW_COR)))
                if 60 < LEFT_HIP_ANGL < 90:  # 臀部弯曲角度正常范围
                    draw_shoulder_hip = 1
                    draw_hip_mid_knee = 1
                    hip_circle = 0
                else:
                    draw_shoulder_hip = 0
                    draw_hip_mid_knee = 0
                    if 90 < LEFT_HIP_ANGL < 130:
                        if 70 < LEFT_KNEE_ANGL < 90:
                            hip_circle = 1
                            # cv2.putText(image, 'upper body too backward ', (10, 20),
                            #             cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                            #             (0, 0, 255), 1)
                            body = "后"
                    else:
                        hip_circle = 0
                    # if LEFT_HIP_ANGL < 60:
                    #     hip_circle = 1
                    #     cv2.putText(image, 'upper body too forward ', (10, 20), cv2.FONT_HERSHEY_SIMPLEX,
                    #                 0.7,
                    #                 (0, 0, 255), 1)

                if 70 < LEFT_KNEE_ANGL < 100:  # 膝盖弯曲度正常范围
                    draw_knee_ankle = 1
                    draw_mid_hip_knee = 1
                    knee_circle = 0
                else:
                    draw_knee_ankle = 0
                    draw_mid_hip_knee = 0
                    if 100 < LEFT_KNEE_ANGL < 140:
                        knee_circle = 1
                        # cv2.putText(image, 'hip too high ', (10, 40), cv2.FONT_HERSHEY_SIMPLEX,
                        #             0.7, (0, 0, 255), 1)
                    else:
                        knee_circle = 0

                    if LEFT_KNEE_ANGL < 70:
                        knee_circle = 1
                        # cv2.putText(image, 'excessive knee flexion ', (10, 40), cv2.FONT_HERSHEY_SIMPLEX,
                        #             0.7, (0, 0, 255), 1)

                #########  膝盖超出脚尖
                if LEFT_FOOT_COR[0] - LEFT_KNEE_COR[0] > onefoot * 0.4:
                    knee_circle = 1
                    draw_knee_ankle = 0
                    draw_mid_hip_knee = 0
                    # cv2.putText(image, 'knee too up front ', (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    knee = "前"
                    cv2.line(image, LEFT_KNEE_COR, (LEFT_KNEE_COR[0], LEFT_FOOT_COR[1]), (0, 0, 255), 1)
                else:
                    cv2.line(image, LEFT_KNEE_COR, (LEFT_KNEE_COR[0], LEFT_FOOT_COR[1]), (255, 255, 0), 1)

                #########  臀部低于膝盖很多
                if LEFT_KNEE_COR[1] - LEFT_HIP_COR[1] < -onefoot * 0.25:
                    draw_shoulder_hip = 0
                    draw_hip_mid_knee = 0
                    hip_circle = 1
                    # cv2.putText(image, 'HIP LOW ', (10, 80), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    hip = "低"
                    cv2.line(image, (LEFT_HIP_COR[0] * 2 - LEFT_KNEE_COR[0], LEFT_HIP_COR[1]),
                             (LEFT_KNEE_COR[0], LEFT_HIP_COR[1]), (0, 0, 255), 1, cv2.LINE_AA)
                elif onefoot * 0.25 < LEFT_KNEE_COR[1] - LEFT_HIP_COR[1] < onefoot * 0.5:  #########  臀部高于膝盖很多
                    # cv2.putText(image, 'HIP HIGH ', (10, 80), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    hip = "高"
                    cv2.line(image, (LEFT_HIP_COR[0] * 2 - LEFT_KNEE_COR[0], LEFT_HIP_COR[1]),
                             (LEFT_KNEE_COR[0], LEFT_HIP_COR[1]), (0, 0, 255), 1, cv2.LINE_AA)
                else:
                    cv2.line(image, (LEFT_HIP_COR[0] * 2 - LEFT_KNEE_COR[0], LEFT_HIP_COR[1]),
                             (LEFT_KNEE_COR[0], LEFT_HIP_COR[1]), (255, 255, 0), 1, cv2.LINE_AA)
                if onefoot * 0.25 > LEFT_KNEE_COR[1] - LEFT_HIP_COR[1] > -onefoot * 0.25:
                    cv2.line(image, (LEFT_HIP_COR[0] * 2 - LEFT_KNEE_COR[0], LEFT_HIP_COR[1]),
                             (LEFT_KNEE_COR[0], LEFT_HIP_COR[1]), (0, 255, 0), 1, cv2.LINE_AA)

                if 70 < LEFT_KNEE_ANGL < 100 and 60 < LEFT_HIP_ANGL < 90:
                    stander = 1
                    # cv2.putText(image, ' Please maintain the current posture', (40, 140),
                    #             cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                else:
                    stander = 0
        _time = count_time(image, None)
        return body, hip, knee, _time

    def squat(image):
        nonlocal  LEFT_WRIST_ANGL, LEFT_ELBOW_ANGL, LEFT_HIP_ANGL, LEFT_SHOULDER_ANGL, LEFT_KNEE_ANGL, \
            LEFT_ANKLE_ANGL, RIGHT_WRIST_ANGL, RIGHT_ELBOW_ANGL, RIGHT_HIP_ANGL, RIGHT_SHOULDER_ANGL, \
            RIGHT_KNEE_ANGL, RIGHT_ANKLE_ANGL, RIGHT_ELBOW_BEFORE_ANGL, RIGHT_KNEE_BEFORE_ANGL, \
            LEFT_KNEE_BEFORE_ANGL, frameCnt_squat, threshold_wave, squatCnt, squat_stander, \
            LEFT_HIP_COR, RIGHT_HIP_COR, LEFT_SHOULDER_COR, RIGHT_SHOULDER_COR, LEFT_ELBOW_COR, \
            RIGHT_ELBOW_COR, LEFT_KNEE_COR, RIGHT_KNEE_COR, LEFT_WRIST_COR, RIGHT_WRIST_COR, \
            LEFT_ANKLE_COR, RIGHT_ANKLE_COR, LEFT_HEEL_COR, RIGHT_HEEL_COR, LEFT_FOOT_COR, RIGHT_FOOT_COR, \
            draw_hip_mid_knee, draw_mid_hip_knee, draw_hip_knee, draw_knee_ankle, draw_shoulder_elbow, \
            draw_shoulder_hip, draw_elbow_wrist, wrist_circle, hip_circle, knee_circle, elbow_circle, \
            stander, start_time, total_time
        onefoot = abs(LEFT_HEEL_COR[0] - LEFT_FOOT_COR[0])
        stander = -1
        body = ""
        hip = ""
        knee = ""
        ######## 人朝向右方
        if RIGHT_FOOT_COR[0] > RIGHT_HEEL_COR[0] and LEFT_FOOT_COR[0] > LEFT_HEEL_COR[0]:
            if 1:

                if RIGHT_KNEE_ANGL > 180:
                    RIGHT_KNEE_ANGL = 360 - RIGHT_KNEE_ANGL
                if RIGHT_HIP_ANGL > 180:
                    RIGHT_HIP_ANGL = 360 - RIGHT_HIP_ANGL
                cv2.putText(image, 'Squat', (250, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                # print('cos: ' + str(mycos(RIGHT_SHOULDER_COR, RIGHT_ELBOW_COR)))
                if 50 < RIGHT_HIP_ANGL < 95:  #
                    draw_shoulder_hip = 1
                    draw_hip_mid_knee = 1
                    hip_circle = 0
                else:
                    draw_shoulder_hip = 0
                    draw_hip_mid_knee = 0
                    # if 85 < RIGHT_HIP_ANGL < 130:
                    #     if 70 < RIGHT_KNEE_ANGL < 90:
                    #         hip_circle = 1
                    #         cv2.putText(image, 'upper body too backward ', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                    #                     (0, 0, 255), 1)
                    # else:
                    #     hip_circle = 0
                    if RIGHT_HIP_ANGL < 50:
                        hip_circle = 1
                        # cv2.putText(image, 'upper body bend too much ', (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                        #             (0, 0, 255), 1)

                if 70 < RIGHT_KNEE_ANGL < 110:  # 正常范围膝盖
                    draw_knee_ankle = 1
                    draw_mid_hip_knee = 1
                    knee_circle = 0
                else:
                    draw_knee_ankle = 0
                    draw_mid_hip_knee = 0
                    knee_circle = 1
                    if RIGHT_KNEE_ANGL < 70:
                        knee_circle = 1
                        # cv2.putText(image, 'excessive knee flexion ', (10, 40), cv2.FONT_HERSHEY_SIMPLEX,
                        #             0.7, (0, 0, 255), 1)

                #########  膝盖超出脚尖
                if RIGHT_KNEE_COR[0] - RIGHT_FOOT_COR[0] > onefoot * 0.4:
                    draw_knee_ankle = 0
                    draw_mid_hip_knee = 0
                    knee_circle = 1
                    # cv2.putText(image, 'knee too up front ', (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    knee = "前"
                    cv2.line(image, RIGHT_KNEE_COR, (RIGHT_KNEE_COR[0], RIGHT_FOOT_COR[1]), (0, 0, 255), 1)
                else:
                    cv2.line(image, RIGHT_KNEE_COR, (RIGHT_KNEE_COR[0], RIGHT_FOOT_COR[1]), (255, 255, 0), 1)

                #########  臀部低于膝盖很多
                if RIGHT_KNEE_COR[1] - RIGHT_HIP_COR[1] < -onefoot * 0.25:
                    draw_shoulder_hip = 0
                    draw_hip_mid_knee = 0
                    hip_circle = 1
                    # cv2.putText(image, 'HIP LOW ', (10, 80), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    hip = "低"
                    cv2.line(image, (RIGHT_HIP_COR[0] * 2 - RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]),
                             (RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]), (0, 0, 255), 1, cv2.LINE_AA)
                else:
                    cv2.line(image, (RIGHT_HIP_COR[0] * 2 - RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]),
                             (RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]), (255, 255, 0), 1, cv2.LINE_AA)
                if onefoot * 0.25 > RIGHT_KNEE_COR[1] - RIGHT_HIP_COR[1] > -onefoot * 0.25:
                    cv2.line(image, (RIGHT_HIP_COR[0] * 2 - RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]),
                             (RIGHT_KNEE_COR[0], RIGHT_HIP_COR[1]), (0, 255, 0), 1, cv2.LINE_AA)

                if 70 < RIGHT_KNEE_ANGL < 110 and 50 < RIGHT_HIP_ANGL < 95:
                    squat_stander = 1
                    # cv2.putText(image, ' Please maintain the current posture', (40, 140),
                    #             cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                else:
                    squat_stander = 0

                if squat_stander == 1:
                    # if LEFT_ELBOW_ANGL >= 180:
                    #     LEFT_ELBOW_ANGL = 360 - LEFT_ELBOW_ANGL
                    frameCnt_squat += 1
                    print(frameCnt_squat)
                    # print(frameCnt_squat,threshold_wave,RIGHT_KNEE_ANGL,RIGHT_KNEE_BEFORE_ANGL)
                    # 如果上一帧和当前帧肘部的弯曲度分别处于90度的两侧，则可以理解为完成一次标准的 引体向上动作
                    if ((RIGHT_KNEE_ANGL > 100) and (RIGHT_KNEE_BEFORE_ANGL < 100)) | (
                            (RIGHT_KNEE_ANGL < 100) and (RIGHT_KNEE_BEFORE_ANGL > 100)):
                        # 有时候数据会有一些波动，导致连续很短的时间内，肘部弯曲角度在90度左右连续波动，这样子就会误判为做完多次引体向上
                        # 为了防止这个问题，设定波长阈值，只有大于这个阈值才会计数+1
                        if frameCnt_squat > threshold_wave:
                            frameCnt_squat = 0
                            squatCnt += 1
                            # 把上一帧的角度反转并保存
                            if RIGHT_KNEE_BEFORE_ANGL == 180:
                                RIGHT_KNEE_BEFORE_ANGL = 0
                            else:
                                RIGHT_KNEE_BEFORE_ANGL = 180


        ######## 人朝向左
        elif RIGHT_FOOT_COR[0] < RIGHT_HEEL_COR[0] and LEFT_FOOT_COR[0] < LEFT_HEEL_COR[0]:
            if 1:  #####################静态深蹲##############
                if LEFT_KNEE_ANGL > 180:
                    LEFT_KNEE_ANGL = 360 - LEFT_KNEE_ANGL
                if LEFT_HIP_ANGL > 180:
                    LEFT_HIP_ANGL = 360 - LEFT_HIP_ANGL
                cv2.putText(image, 'Squat', (250, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                # print('cos: ' + str(mycos(RIGHT_SHOULDER_COR, RIGHT_ELBOW_COR)))
                if 50 < LEFT_HIP_ANGL < 90:  # 臀部弯曲角度正常范围
                    draw_shoulder_hip = 1
                    draw_hip_mid_knee = 1
                    hip_circle = 0
                else:
                    draw_shoulder_hip = 0
                    draw_hip_mid_knee = 0
                    # if 90 < LEFT_HIP_ANGL < 130:
                    #     if 70 < LEFT_KNEE_ANGL < 90:
                    #         hip_circle = 1
                    #         cv2.putText(image, 'upper body too backward ', (10, 20),
                    #                     cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                    #                     (0, 0, 255), 1)
                    # else:
                    #     hip_circle = 0
                    if LEFT_HIP_ANGL < 50:
                        hip_circle = 1
                        # cv2.putText(image, 'upper body too forward ', (10, 20), cv2.FONT_HERSHEY_SIMPLEX,
                        #             0.7,
                        #             (0, 0, 255), 1)

                if 70 < LEFT_KNEE_ANGL < 110:  # 膝盖弯曲度正常范围
                    draw_knee_ankle = 1
                    draw_mid_hip_knee = 1
                    knee_circle = 0
                else:
                    draw_knee_ankle = 0
                    draw_mid_hip_knee = 0
                    knee_circle = 1
                    # if 100 < LEFT_KNEE_ANGL < 140:
                    #     knee_circle = 1
                    # cv2.putText(image, 'hip too high ', (10, 40), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    # else:
                    #     knee_circle = 0

                    if LEFT_KNEE_ANGL < 70:
                        knee_circle = 1
                        # cv2.putText(image, 'excessive knee flexion ', (10, 40), cv2.FONT_HERSHEY_SIMPLEX,
                        #             0.7, (0, 0, 255), 1)

                #########  膝盖超出脚尖
                if LEFT_FOOT_COR[0] - LEFT_KNEE_COR[0] > onefoot * 0.4:
                    draw_knee_ankle = 0
                    draw_mid_hip_knee = 0
                    knee_circle = 1
                    # cv2.putText(image, 'knee too up front ', (10, 60), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    knee = "前"
                    cv2.line(image, LEFT_KNEE_COR, (LEFT_KNEE_COR[0], LEFT_FOOT_COR[1]), (0, 0, 255), 1)
                else:
                    cv2.line(image, LEFT_KNEE_COR, (LEFT_KNEE_COR[0], LEFT_FOOT_COR[1]), (255, 255, 0), 1)

                #########  臀部低于膝盖很多
                if LEFT_KNEE_COR[1] - LEFT_HIP_COR[1] < -onefoot * 0.25:
                    draw_shoulder_hip = 0
                    draw_hip_mid_knee = 0
                    hip_circle = 1
                    # cv2.putText(image, 'HIP LOW ', (10, 80), cv2.FONT_HERSHEY_SIMPLEX,
                    #             0.7, (0, 0, 255), 1)
                    hip = "低"
                    cv2.line(image, (LEFT_HIP_COR[0] * 2 - LEFT_KNEE_COR[0], LEFT_HIP_COR[1]),
                             (LEFT_KNEE_COR[0], LEFT_HIP_COR[1]), (0, 0, 255), 1, cv2.LINE_AA)
                else:
                    cv2.line(image, (LEFT_HIP_COR[0] * 2 - LEFT_KNEE_COR[0], LEFT_HIP_COR[1]),
                             (LEFT_KNEE_COR[0], LEFT_HIP_COR[1]), (255, 255, 0), 1, cv2.LINE_AA)
                if onefoot * 0.25 > LEFT_KNEE_COR[1] - LEFT_HIP_COR[1] > -onefoot * 0.25:
                    cv2.line(image, (LEFT_HIP_COR[0] * 2 - LEFT_KNEE_COR[0], LEFT_HIP_COR[1]),
                             (LEFT_KNEE_COR[0], LEFT_HIP_COR[1]), (0, 255, 0), 1, cv2.LINE_AA)

                if 70 < LEFT_KNEE_ANGL < 110 and 50 < LEFT_HIP_ANGL < 90:
                    squat_stander = 1
                    # cv2.putText(image, ' Please maintain the current posture', (40, 140),
                    #             cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                else:
                    squat_stander = 0
                # print(LEFT_KNEE_ANGL)

                if squat_stander == 1:
                    # if LEFT_ELBOW_ANGL >= 180:
                    #     LEFT_ELBOW_ANGL = 360 - LEFT_ELBOW_ANGL
                    frameCnt_squat += 1
                    if ((LEFT_KNEE_ANGL > 95) and (LEFT_KNEE_BEFORE_ANGL == 0)) or ((LEFT_KNEE_ANGL < 95) and (LEFT_KNEE_BEFORE_ANGL == 180)):
                        if frameCnt_squat > threshold_wave:
                            frameCnt_squat = 0
                            squatCnt += 1
                            # 把上一帧的角度反转并保存
                            if LEFT_KNEE_BEFORE_ANGL == 180:
                                LEFT_KNEE_BEFORE_ANGL = 0
                            else:
                                LEFT_KNEE_BEFORE_ANGL = 180
                else:
                    frameCnt_squat=0
        _num = count_time(image, squatCnt)
        return body, hip, knee, _num

    def count_time(image, Cnt):
        nonlocal  start_time, total_time, stander
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

    # thread1 = threading.Thread(target=speak_thread)
    thread2 = threading.Thread(target=aicoach_thread, args=(path, sports))
    # thread1.start()
    thread2.start()
    event.wait()
    # thread1.join()
    thread2.join()

if __name__ == '__main__':
    # aicoach("/home/Aisports/video/mysd.mp4", "static_squat")
    aicoach("./video/mysd.mp4", "squat")
    # aicoach("./test1.mp4", "squat")
    # time.sleep(2)
    # print("next")
    # aicoach("./video/myfwc.mp4", "push_up")
