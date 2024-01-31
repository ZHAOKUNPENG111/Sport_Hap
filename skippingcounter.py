import cv2
from cvs import *
import mediapipe as mp
import numpy as np
from collections import deque
from PIL import Image, ImageDraw, ImageFont
import time
import android
import os
import signal
from flask import Flask, render_template, Response
import multiprocessing
import write_file
app = Flask(__name__)

# # 获取当前进程的进程号
# pids = os.listdir('/proc')

# for pid in pids: 
#     try:
#         path = '/proc/' + pid + '/cmdline'  
#         with open(path) as f:
#             cmdline = f.read()
#             if 'skippingcounter.py' in cmdline:   
#                 skip_pid = pid
#     except:
#         pass

def cv2AddChineseText(img, text, position, textColor=(0, 255, 0), textSize=30):
    if (isinstance(img, np.ndarray)):  # 判断是否OpenCV图片类型
        img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    # 创建一个可以在给定图像上绘图的对象
    draw = ImageDraw.Draw(img)
    # 字体的格式
    fontStyle = ImageFont.truetype(
        "/home/Aisports/front/FZCuDengXian.ttf", textSize, encoding="utf-8")
    # 绘制文本
    draw.text(position, text, textColor, font=fontStyle)
    # 转换回OpenCV格式
    return cv2.cvtColor(np.asarray(img), cv2.COLOR_RGB2BGR)

def get_current_process_id():
    current_process = multiprocessing.current_process()
    return current_process.pid

def rope_skip():
    # temp_file_path = "./temp_file.txt"
    # write_file.parse_data_from_temp_file(temp_file_path)
    # 调用函数解析临时文件中的数据
    parsed_data = write_file.parse_data_from_temp_file("./temp_file.txt")

    # 打印解析后的数据
    for key, value in parsed_data.items():
        print("运动名称:", key)
        print("时间或个数:", value)


    skip_pid = get_current_process_id()
    droid = android.Android()
    droid.ttsSpeak("跳绳运动现在开始")
    # 定义常量
    start_time = None
    THRESHOLD = 0.5  # 检测关键点的置信度阈值
    BUFFER_SIZE = 50  # 缓存队列的大小
    JUMP_THRESHOLD = 0.01  # 检测跳跃动作的阈值
    MAX_JUMP_FRAMES = 8  # 跳跃动作的最大帧数

    # 初始化MediaPipe姿态估计模型
    mp_drawing = mp.solutions.drawing_utils
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(
        min_detection_confidence=THRESHOLD, min_tracking_confidence=THRESHOLD
    )

    # 初始化缓存队列
    buffer1 = deque(maxlen=BUFFER_SIZE)

    # 定义计数器、状态变量和计时器
    count_stack = []
    count = 0
    is_jumping = False
    jump_frames = 0
    count_text = 0
    elapsed_time_text = 0
    elapsed_time = 0

    # 打开摄像头
    # source = '/home/Aisports_dead/video/skipp.mp4'
    source = -1
    save_path = './outputvideo/rope_skip.avi'
    cap1 = cv2.VideoCapture('./image/Aicoach.png')
    width = int(cap1.get(cv2.CAP_PROP_FRAME_WIDTH))  # 获取视频的宽度
    height = int(cap1.get(cv2.CAP_PROP_FRAME_HEIGHT))  # 获取视频的高度
    print(width, height)
    fps = cap1.get(cv2.CAP_PROP_FPS)  # 获取视频的帧率
    print(fps)
    print(width, height)
    # 视频的编码
    fourcc = cv2.VideoWriter_fourcc(*'MJPG')
    # 定义视频对象输出
    writer = cv2.VideoWriter(save_path, fourcc, 25, (width, height))
    video_capture = cvs.VideoCapture(source)
    bg_img = cv2.imread('/home/Aisports/image/Aicoach.png')
    bg_img = cv2AddChineseText(bg_img, "跳绳个数：", (1350, 185), (0, 0, 0), 30)
    bg_img = cv2AddChineseText(bg_img, "跳绳时间：", (1350, 260), (0, 0, 0), 30)
    # frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    # fps = cap.get(cv2.CAP_PROP_FPS)
    # duration = frame_count/fps
    ll = 0
    while True:
        # 读取视频帧
        image = video_capture.read()
        if image is None:
            ll += 1
            # if ll > 5:
            #     print("检测结束")
            #     cv2.destroyAllWindows()
            #     os.kill(int(skip_pid), signal.SIGTERM)
            #     break
            continue
        image = cv2.resize(image, (930,524), interpolation=cv2.INTER_AREA)

        # 将图像转换为RGB格式
        # image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # 检测关键点
        results = pose.process(image)

        # 绘制关键点
        if results.pose_landmarks:
            mp_drawing.draw_landmarks(
                image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS
            )

            # 获取关键点坐标
            landmarks = np.array(
                [
                    [
                        lm.x * image.shape[1],
                        lm.y * image.shape[0],
                        lm.z * image.shape[1],
                    ]
                    for lm in results.pose_landmarks.landmark
                ]
            )

            # 计算头部和脚部的中心点坐标
            head = np.mean(landmarks[[0, 15], :2], axis=0)
            foot = np.mean(landmarks[[28, 29], :2], axis=0)

            # 将中心点坐标添加到缓存队列中
            buffer1.append(head[1])

            # 判断是否进行了跳跃动作
            if not is_jumping and (
                    buffer1[-1] - buffer1[0] > JUMP_THRESHOLD * BUFFER_SIZE
            ):
                is_jumping = True
                jump_frames = 0
                if start_time is None:
                    start_time = time.time()
            elif is_jumping and (jump_frames >= MAX_JUMP_FRAMES):
                is_jumping = False
                count += 1
                count_stack.append(count)
                print(f"总跳跃次数为:{count_stack[-1]}")
                droid.ttsSpeak(f"{count_stack[-1]}")
                # print(count_stack[len(count_stack)-1])
            if is_jumping:
                jump_frames += 1
            bg_color = (245, 245, 245)
            count_text = " %s" % (count)
            if start_time is not None:
                elapsed_time = time.time() - start_time
            elapsed_time_text = " %ss" % (round((elapsed_time), 2))
            if count_text != -1:
                cv2.rectangle(bg_img, (1480, 150, 160, 130), bg_color, -1)
            cv2.putText(bg_img, count_text, (1480, 215), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2)
            if elapsed_time_text != -1:
                cv2.rectangle(bg_img, (1490, 250, 120, 50), bg_color, -1)
            cv2.putText(bg_img, elapsed_time_text, (1480, 290), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2)

            # 在图像上显示跳绳信息
            # cv2.putText(
            #     image,
            #     " {}".format(count),
            #     (50, 50),
            #     cv2.FONT_HERSHEY_SIMPLEX,
            #     1,
            #     (0, 255, 0),
            #     2,
            # )

            # if start_time is not None:
            #     elapsed_time = time.time() - start_time
            #     cv2.putText(
            #         image,
            #         " {:.2f}s".format(elapsed_time),
            #         (50, 100),
            #         cv2.FONT_HERSHEY_SIMPLEX,
            #         1,
            #         (0, 255, 0),
            #         2,
            #     )

        # 显示视频帧
        x_offset = 400  # 视频帧在背景图片中的x坐标
        y_offset = 200  # 视频帧在背景图片中的y坐标
        bg_img[y_offset:y_offset + image.shape[0], x_offset:x_offset + image.shape[1]] = image
        cvs.imshow(bg_img)
        ret, buffer = cv2.imencode('.jpg', bg_img)
        image = buffer.tobytes()
        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + image + b'\r\n')

        if cv2.waitKey(5) & 0xFF == 27:
            break
        writer.write(bg_img)

# @app.route('/')
# def index():
#     return render_template('index.html' )



# @app.route('/video_feed')
# def video_feed():
#     return Response(rope_skip(),mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    rope_skip()


