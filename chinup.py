import cv2
import os
import signal
from cvs import *
from PIL import Image, ImageDraw, ImageFont
import mediapipe as mp
import numpy as np
import android
from common import Triangle, Point
import multiprocessing


# 创建绘图方法
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_holistic = mp.solutions.holistic
# 重构安卓方法
droid = android.Android()
# 构建全局变量
_PUSHUP = ""
_SQUAT = "squat"
_CHINUP = ""
shoulder_before = 180
elbow_before = 180
pushUpCnt = 0
chinUpCnt = 0
frameCnt_PushUp = 0
frameCnt_ChinUp = 0
up_complete = 0
down_complete = 0
chinUp_cnt_changed = chinUpCnt
up_complete_changed = up_complete
down_complete_changed = down_complete

# 获取进程号
# pids = os.listdir('/proc')
# for pid in pids: 
#     try:
#         path = '/proc/' + pid + '/cmdline'  
#         with open(path) as f:
#             cmdline = f.read()
#             if 'chinup1.py' in cmdline:   
#                 skip_pid = pid
#     except:
#         pass

def get_current_process_id():
    current_process = multiprocessing.current_process()
    return current_process.pid

def poseDetect(pose_landmarks, image_width, image_height):
    
    """
    根据输入的身体各个部位的定位坐标，判断pose类型并计数
    """
    global up_complete, down_complete, elbow_before, pushUpCnt, chinUpCnt, frameCnt_PushUp, frameCnt_ChinUp, shoulder_before
    threshold_t = 165  # 腰部弯曲度阈值
    threshold_y = 70  # 肩腰膝的y方向标准偏差阈值
    threshold_x = 70  # 肩腰膝的x方向标准偏差阈值
    threshold_wave = 10  # 运动轨迹可以类似为一个波形，这个数字为波长的阈值
    pose = "NAN"
    # 左肩的三维坐标值
    LEFT_SHOULDER_x = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_SHOULDER].x * image_width
    LEFT_SHOULDER_y = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_SHOULDER].y * image_height
    LEFT_SHOULDER_z = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_SHOULDER].z * image_width
    # 腰部的三维坐标值
    LEFT_HIP_x = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_HIP].x * image_width
    LEFT_HIP_y = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_HIP].y * image_height
    LEFT_HIP_z = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_HIP].z * image_width
    # 膝盖的三维坐标值
    LEFT_KNEE_x = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_KNEE].x * image_width
    LEFT_KNEE_y = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_KNEE].y * image_height
    LEFT_KNEE_z = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_KNEE].z * image_width
    # 脚踝的三维坐标值（暂时不用）
    LEFT_ANKLE_x = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_ANKLE].x * image_width
    LEFT_ANKLE_y = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_ANKLE].y * image_height
    LEFT_ANKLE_z = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_ANKLE].z * image_width
    # 左肘部的三维坐标
    LEFT_ELBOW_x = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_ELBOW].x * image_width
    LEFT_ELBOW_y = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_ELBOW].y * image_height
    LEFT_ELBOW_z = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_ELBOW].z * image_width
    # 左手腕三维坐标
    LEFT_WRIST_x = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_WRIST].x * image_width
    LEFT_WRIST_y = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_WRIST].y * image_height
    LEFT_WRIST_z = pose_landmarks.landmark[mp_holistic.PoseLandmark.LEFT_WRIST].z * image_width
    # 肩部，腰部和膝盖三点组成的三角形，用来求出腰部的弯曲角度
    HIP_t = Triangle(Point(LEFT_SHOULDER_x, LEFT_SHOULDER_y, LEFT_SHOULDER_z),
                     Point(LEFT_HIP_x, LEFT_HIP_y, LEFT_HIP_z),
                     Point(LEFT_KNEE_x, LEFT_KNEE_y, LEFT_KNEE_z))
    # 肩部，肘部和腕部三点组成的三角形，用来求出肘部的弯曲角度
    ELBOW_t = Triangle(Point(LEFT_SHOULDER_x, LEFT_SHOULDER_y, LEFT_SHOULDER_z),
                       Point(LEFT_ELBOW_x, LEFT_ELBOW_y, LEFT_ELBOW_z),
                       Point(LEFT_WRIST_x, LEFT_WRIST_y, LEFT_WRIST_z))
    # LEFT_KNEE_t = Triangle(Point(LEFT_HIP_x, LEFT_HIP_y, LEFT_HIP_z),
    #                        Point(LEFT_KNEE_x, LEFT_KNEE_y, LEFT_KNEE_z),
    #                        Point(LEFT_ANKLE_x, LEFT_ANKLE_y, LEFT_ANKLE_z))
    # 肘部,肩部和腰部三点组成的三角形，用来求出肩部的弯曲角度
    SHOULDER_t = Triangle(Point(LEFT_ELBOW_x, LEFT_ELBOW_y, LEFT_ELBOW_z),
                          Point(LEFT_SHOULDER_x, LEFT_SHOULDER_y, LEFT_SHOULDER_z),
                          Point(LEFT_HIP_x, LEFT_HIP_y, LEFT_HIP_z))
    # 求出肩部，腰部，膝盖部三点的Y方向的标准偏差。
    # 标准偏差越大，越偏向于直立。反之越偏向于平躺
    yArray = np.array([LEFT_SHOULDER_y, LEFT_HIP_y, LEFT_KNEE_y])
    yStdInt = np.std(yArray)
    # 求出肩部，腰部，膝盖部三点的Y方向的标准偏差。
    # 标准偏差越小，越偏向于直立。反之越偏向于平躺
    xArray = np.array([LEFT_SHOULDER_x, LEFT_HIP_x, LEFT_KNEE_x])
    xStdInt = np.std(xArray)
    # 腰部的弯曲角度接近于180度，并且肩部，腰部，膝盖几乎处于一个水平方向，则判定为俯卧撑姿势
    if (HIP_t.angle_p2() > threshold_t) & (float(yStdInt) < threshold_y):
        pose = _PUSHUP
        # 获取肘部弯曲度，以用来判定是否已经完成一个标准的俯卧撑动作
        elbow = ELBOW_t.angle_p2()
        frameCnt_PushUp += 1
        # print("elbow_before", elbow_before, "elbow", elbow, "frameCnt_PushUp", frameCnt_PushUp)
        # 如果上一帧和当前帧肘部的弯曲度分别处于90度的两侧，则可以理解为完成一次标准的俯卧撑动作
        if ((elbow > 90) & (elbow_before < 90)) | ((elbow < 90) & (elbow_before > 90)):
            # 有时候数据会有一些波动，导致连续很短的时间内，肘部弯曲角度在90度左右连续波动，这样子就会误判为做完多次俯卧撑
            # 为了防止这个问题，设定波长阈值，只有大于这个阈值才会计数+1
            if frameCnt_PushUp < threshold_wave:
                return "NAN", pushUpCnt, chinUpCnt
            pushUpCnt += 1
            # 把上一帧的角度反转并保存
            if elbow_before == 180:
                elbow_before = 0
            else:
                elbow_before = 180
            frameCnt_PushUp = 0

    # 肩部，腰部，膝盖几乎处于一个垂直方向，并且手的高度高于肘部，则判定为引体向上姿势
    if (float(xStdInt) < threshold_x) & (LEFT_WRIST_y < LEFT_ELBOW_y):
        pose = _CHINUP
        # 获取肘部弯曲度，以用来判定是否已经完成一个标准的引体向上动作
        shoulder = SHOULDER_t.angle_p2()
        # 获取肘部弯曲度变化，以用来判定引体向上上下动作完成度
        shoulder_change = shoulder_before - shoulder
        # return pose, pushUpCnt, int(elbow)
        frameCnt_ChinUp += 1
        # print("shoulder_before", shoulder_before, "shoulder", shoulder, "frameCnt_ChinUp", frameCnt_ChinUp)
        # 如果上一帧和当前帧肘部的弯曲度分别处于90度的两侧，则可以理解为完成一次标准的 引体向上动作
        if ((shoulder > 90) & (shoulder_before < 90)) | ((shoulder < 90) & (shoulder_before > 90)):
            # 有时候数据会有一些波动，导致连续很短的时间内，肘部弯曲角度在90度左右连续波动，这样子就会误判为做完多次引体向上
            # 为了防止这个问题，设定波长阈值，只有大于这个阈值才会计数+1
            if frameCnt_ChinUp < threshold_wave:
                return "NAN", pushUpCnt, chinUpCnt
            chinUpCnt += 1
            
            # 把上一帧的角度反转并保存
            if shoulder_before == 180:
                shoulder_before = 0
            else:
                shoulder_before = 180
            frameCnt_ChinUp = 0   
            if ((shoulder_change > 0) & (shoulder_change < 120)):
                up_complete = round(shoulder_change / 120,2)
                if up_complete < 0.8:
                    droid.ttsSpeak("注意手臂上拉弯曲度")
                # print(up_complete)
            else:
                down_complete = round(abs(shoulder_change) / 160,2)
                if down_complete < 0.8:
                    droid.ttsSpeak("注意手臂下放伸展度")
                # print(down_complete)        

    return pose, pushUpCnt, chinUpCnt
    
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

    
skip_pid = 0
def detectFromVideo():
    global skip_pid
    # source = "./video/chinup.mp4"
    source = -1
    save_path = './outputvideo/chinup.avi'
    bg_img = '/home/Aisports/image/Aicoach.png'

    skip_pid = get_current_process_id()
    droid.ttsSpeak("引体向上运动现在开始")

    # 读取视频:
    cap = cvs.VideoCapture(source)
    cap1 = cv2.VideoCapture(bg_img)
    width = int(cap1.get(cv2.CAP_PROP_FRAME_WIDTH))      # 获取视频的宽度
    height = int(cap1.get(cv2.CAP_PROP_FRAME_HEIGHT))    # 获取视频的高度
    fps = cap1.get(cv2.CAP_PROP_FPS)                     # 获取视频的帧率
    print(fps)
    print(width,height)
    # 视频的编码
    fourcc = cv2.VideoWriter_fourcc(*'MJPG') 
    #定义视频对象输出
    writer = cv2.VideoWriter(save_path, fourcc, 30, (width, height))
    # cap = cvs.VideoCapture('/home/Aisports/video/chinup.mp4')
    # fourcc = cv2.VideoWriter_fourcc(*'MJPG')  # 视频编解码器
    bg_img = cv2.imread('image/Aicoach.png')
    # writer = cv2.VideoWriter('chinup_4930.mp4', fourcc, fps, (width, height))  # 写入视频
    ll = 0
    with mp_holistic.Holistic(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5) as holistic:

        while True:
            # ll += 1
            image = cap.read()
            # if ll < 40:
            #     print(ll)
            # else:
            #     print("kill ", skip_pid)
            #     os.kill(int(skip_pid), signal.SIGTERM)
            #     break
            if image is None :
                # print(skip_pid)
                # print("未获取到图像")
                # # os.kill(int(skip_pid), signal.SIGTERM)
                continue
            image = cv2.resize(image, (930,524), interpolation=cv2.INTER_AREA)
            bg_img=cv2AddChineseText(bg_img,"引体向上个数：", (1400, 220),(0, 0, 0), 30)
            bg_img=cv2AddChineseText(bg_img,"上拉完成率：", (1400, 260),(0, 0, 0), 30)
            bg_img=cv2AddChineseText(bg_img,"伸展完成率：", (1400, 300),(0, 0, 0), 30)      
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            # 为了提高性能，可选择将图像标记为只读。
            image.flags.writeable = False
            # 通过姿势检测器进行检测全身坐标
            results = holistic.process(image)

            # Draw landmark annotation on the image.
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            image_height, image_width, channel = image.shape
            # newImg = np.zeros((image_height, image_width, channel), np.uint8)
            # 绘制面部网格
            mp_drawing.draw_landmarks(
                image=image,
                landmark_list=results.face_landmarks,
                connections=mp_holistic.FACEMESH_TESSELATION,
                landmark_drawing_spec=None,
                connection_drawing_spec=mp_drawing_styles.get_default_face_mesh_tesselation_style())
            # 绘制身体部位的标志点
            mp_drawing.draw_landmarks(
                image=image,
                landmark_list=results.pose_landmarks,
                connections=mp_holistic.POSE_CONNECTIONS,
                landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())
            # x = results.pose_landmarks.landmark[mp_holistic.PoseLandmark.NOSE].x * image_width
            # y = results.pose_landmarks.landmark[mp_holistic.PoseLandmark.NOSE].y * image_height
            if results.pose_landmarks is not None:
                pose, pushUp_cnt, chinUp_cnt = poseDetect(results.pose_landmarks, image_width, image_height)

                if pose != "NAN":                 
                    if pose == _CHINUP:                    
                        # 在图像中输出引体向上以及次数以及完成度
                        if chinUp_cnt_changed != -1:
                            # 擦除原来的文本
                            cv2.rectangle(bg_img, (1590, 222, 50, 50), (245,245,245), -1)
                            cv2.rectangle(bg_img, (1565, 262, 100, 100), (245,245,245), -1)
                            # 绘制新的文本
                            pose_text = pose + " " + str(int(chinUp_cnt / 2)) 
                        cv2.putText(bg_img, pose_text, (1575, 252), cv2.FONT_HERSHEY_SIMPLEX, 1,(0, 0, 0), 2)                     
                        cv2.putText(bg_img, f" {up_complete}", (1545, 300), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2)
                        cv2.putText(bg_img, f" {down_complete}", (1545, 338), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2) 
            x_offset = 400  # 视频帧在背景图片中的x坐标
            y_offset = 200  # 视频帧在背景图片中的y坐标
            bg_img[y_offset:y_offset+image.shape[0], x_offset:x_offset+image.shape[1]] = image
            # 写入帧
            # 显示混合后的图像
            cvs.imshow(bg_img)
            writer.write(bg_img)
            ret, buffer = cv2.imencode('.jpg', bg_img)
            image = buffer.tobytes()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + image + b'\r\n')

    writer.release()
    return bg_img


if __name__ == "__main__":
    # source = -1
    # source = "./video/chinup.mp4"
    # save_path = './outputvideo/chinup.avi'
    # bg_img = '/home/Aisports/image/Aicoach.png'
    detectFromVideo()
