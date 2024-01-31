import paho.mqtt.client as mqtt
import android
import time
import myaicoach
import skippingcounter
import chinup

gender = ""
age = ""
height = ""
weight = ""

def client():
    broker = "192.168.39.39"
    port = 1883
    username = ""
    password = ""
    # 订阅的主题
    topic = "Aisports"
    # MQTT消息回调函数
    def on_message(client, userdata, msg):
        global gender, age, height, weight
        payload = msg.payload.decode("utf-8")
        gender = payload.split("：")[1].split()[0]
        age = int(payload.split("：")[2].split()[0])
        height = int(payload.split("：")[3].split()[0])
        weight = int(payload.split("：")[4].split()[0])

        # 输出解析后的信息
        print(gender)
        print(age)
        print(height)
        print(weight)

    # 创建MQTT客户端
    client = mqtt.Client()

    # 设置用户名和密码（如果需要）
    client.username_pw_set(username, password)

    # 设置消息回调函数
    client.on_message = on_message

    # 连接到MQTT代理
    client.connect(broker, port)

    # 订阅主题
    client.subscribe(topic)

    # 启动MQTT消息循环
    client.loop_start()

    # 等待接收到消息并解析信息
    while gender == "" or age == "" or height == "" or weight == "":
        time.sleep(1)

    # 停止MQTT消息循环
    client.loop_stop()

# 重构安卓方法
droid = android.Android()

# 定义计算BMI的函数
def calculate_bmi(height, weight):
    # 将身高从厘米转换为米
    height_m = height / 100
    # 计算BMI指数
    bmi = weight / (height_m ** 2)
    print(bmi)
    return bmi

# 定义判断肥胖程度的函数
def assess_obesity(bmi):
    if bmi < 18.5:
        return "体重过轻"
    elif bmi > 18.5 and bmi < 24.9:
        return "正常体重"
    elif bmi >= 25:
        return "超重"
    elif bmi > 25 and bmi < 29.9:
        return "偏胖"
    elif bmi > 29.9:
        return "肥胖"

#根据年龄和身高给出标准健康体重范围
def calculate_weight_range(age, height):
    if age < 18:
        if height < 160:
            weight_min = (height - 100) * 0.9
            weight_max = (height - 100) * 1.1
        else:
            weight_min = (height - 105) * 0.9
            weight_max = (height - 105) * 1.1
    else:
        weight_min = (height - 100) * 0.9
        weight_max = (height - 100) * 1.1

    return weight_min, weight_max

def fwc():
    speak("俯卧撑运动检测开始")
    myaicoach.aicoach("/home/Aisports/video/myfwc.mp4", "push_up")  # 调用俯卧撑检测模块
    bg_img = cv2.imread('/home/Aisports/image/Aicoach.png')
    cvs.imshow(bg_img)

def pbzc():
    speak("平板支撑运动检测开始")
    myaicoach.aicoach("/home/Aisports/video/mypbzc.mp4","plank")  # 调用平板支撑检测模块
    bg_img = cv2.imread('/home/Aisports/image/Aicoach.png')
    cvs.imshow(bg_img)

def ytxs():
    source = '/home/Aisports/video/chinup.mp4'
    save_path = '/home/Aisports/outputvideo/chinup.avi'
    chinup.detectFromVideo(source, save_path)
    bg_img = cv2.imread('/home/Aisports/image/Aicoach.png')
    cvs.imshow(bg_img)

def sd():
    speak("深蹲运动检测开始")
    myaicoach.aicoach("/home/Aisports/video/mysd.mp4", "squat")  # 调用深蹲检测模块
    bg_img = cv2.imread('/home/Aisports/image/Aicoach.png')
    cvs.imshow(bg_img)

def jtsd():
    speak("静态深蹲运动检测开始")
    myaicoach.aicoach("/home/Aisports/video/mysd.mp4", "static_squat")  # 调用静态深蹲检测模块
    bg_img = cv2.imread('/home/Aisports/image/Aicoach.png')
    cvs.imshow(bg_img)

def ts():
    skippingcounter.rope_skip()
    bg_img = cv2.imread('/home/Aisports/image/Aicoach.png')
    cvs.imshow(bg_img)

client()
# # 获取用户输入
print(gender, age, height, weight)
droid.ttsSpeak("已获取用户信息")
droid.ttsSpeak("身高"+str(height)+"体重"+str(weight)+"年龄"+str(age))

# 计算BMI指数
bmi = calculate_bmi(height, weight)

# 计算标准体重
weight_min, weight_max = calculate_weight_range(age, height)
droid.ttsSpeak("标准健康体重范围：{}公斤 - {}公斤".format(round(weight_min,1), round(weight_max,1)))

# 判断肥胖程度
obesity = assess_obesity(bmi)
droid.ttsSpeak("根据用户信息计算bmi指数可得身体情况为"+obesity)
droid.ttsSpeak("正在根据身体指标制定计划")
time.sleep(2)
droid.ttsSpeak("计划制定完成")


# 根据年龄和肥胖程度输出建议的运动计划
if age < 18:
    if obesity == "体重过轻":
        print("建议运动：跳绳、俯卧撑、深蹲、引体向上")
        ts()
        fwc()
        sd()
        ytxs()
    elif obesity == "正常体重":
        print("建议运动：跳绳、俯卧撑、深蹲、平板支撑")
        fwc()
        ts()
        sd()
        pbzc()
    else:
        print("建议运动：跳绳、引体向上、深蹲、平板支撑")
        ytxs()
else:
    if obesity == "体重过轻":
        print("建议运动：跳绳、俯卧撑、深蹲、平板支撑")
    elif obesity == "正常体重":
        print("建议运动：跳绳、俯卧撑、深蹲、平板支撑、引体向上")
    else:
        print("建议运动：跳绳、俯卧撑、深蹲、平板支撑、引体向上")

