import os
import android
import Ifasr_new
import re
import myaicoach
import skippingcounter
import chinup
import time
import qiniu_upload
import cv2
from cvs import *
import paho.mqtt.client as mqtt
import miao_test

droid = android.Android()
isspeaking = droid.ttsIsSpeaking()
duration = 1000  # 声音持续时间（毫秒）
freq = 440  # 声音频率（赫兹）
# 俯卧撑主要锻炼胸肌（胸大肌、胸小肌）、三角肌（前束）、肱三头肌、前臂肌群以及腹肌。
# 深蹲主要锻炼大腿肌群，包括股四头肌、臀大肌、腘绳肌、腓肠肌以及小腿肌群。
# 平板支撑主要锻炼核心肌群，包括腹直肌、腹外斜肌、腹内斜肌、腰方肌以及背部肌群。
# 引体向上主要锻炼背部肌群，包括背阔肌、斜方肌、肱二头肌、肱三头肌以及腹肌。
# 静态深蹲主要锻炼大腿肌群，特别是股四头肌、臀大肌以及小腿肌群。
# 跳绳主要锻炼小腿肌群，包括腓肠肌、胫骨前肌以及胫骨后肌。同时，跳绳还可以增强心肺功能和协调性。
sportslist = []
words = []
gender = ""
age = ""
height = ""
weight = ""
def client():
    broker = "192.168.25.39"
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
    # speak("俯卧撑运动检测开始")
    # myaicoach.aicoach("./video/myfwc.mp4", "push_up")  # 调用俯卧撑检测模块
    os.system("python3 fwc.py")
    # bg_img = cv2.imread('./image/Aicoach.png')
    # cvs.imshow(bg_img)

def pbzc():
    # speak("平板支撑运动检测开始")
    # myaicoach.aicoach("./video/mypbzc.mp4","plank")  # 调用平板支撑检测模块
        os.system("python3 pbzc.py")
    # bg_img = cv2.imread('./image/Aicoach.png')
    # cvs.imshow(bg_img)

def ytxs():
    # source = './video/chinup.mp4'
    # save_path = './outputvideo/chinup.avi'
    # chinup.detectFromVideo(source, save_path)
    os.system("python3 chinup.py")
    # bg_img = cv2.imread('./image/Aicoach.png')
    # cvs.imshow(bg_img)

def sd():
    # speak("深蹲运动检测开始")
    # myaicoach.aicoach("./video/mysd.mp4", "squat")  # 调用深蹲检测模块
    os.system("python3 sd.py")
    # bg_img = cv2.imread('./image/Aicoach.png')
    # cvs.imshow(bg_img)

def jtsd():
    # speak("静态深蹲运动检测开始")
    # myaicoach.aicoach("./video/mysd.mp4", "static_squat")  # 调用静态深蹲检测模块
    os.system("python3 jtsd.py")
    # bg_img = cv2.imread('./image/Aicoach.png')
    # cvs.imshow(bg_img)

def ts():
    # skippingcounter.rope_skip()
    os.system("python3 skippingcounter.py")
    # bg_img = cv2.imread('./image/Aicoach.png')
    # cvs.imshow(bg_img)

def remove_duplicates(arr):
    unique_arr = list(set(arr))
    return unique_arr

def voice_save(savepath,times):
    roll = 0
    droid.recorderStartMicrophone(savepath)
    while roll < times:
        roll += 1
        print(roll)
        time.sleep(1)
    droid.recorderStop()
    return savepath

def speak(txt):
    if 1:
        droid.ttsSpeak(txt)
        isspeaking = droid.ttsIsSpeaking()
        while isspeaking.result:
            isspeaking = droid.ttsIsSpeaking()
            # print(".")
            time.sleep(0.1)
            # print("..")
            time.sleep(0.1)
            # print("...")
            time.sleep(0.1)
            # print("..")
            time.sleep(0.1)
            # print(".")

def muscle2sportsname(words,sportslist):
    push_up = ["胸部", "三角", "肱三头", "前臂", "腹部", "胸肌", "三角肌", "肱三头肌", "前臂肌", "腹","腹肌","手臂"]
    squat = ["大腿", "股四头", "臀", "小腿", "大腿肌", "股四头肌", "臀肌", "小腿肌", "腿部"]
    plank = ["核心", "腹", "背", "背部", "腰方肌", "腹直肌", "腹外斜肌", "腹内斜肌","腹肌","腹部"]
    chinup = ["背", "背部", "背阔肌", "斜方肌", "肱二头", "腹", "肱三头", "背部", "腹肌", "肱二头", "肱三头肌", "腹部"]
    static_squat = ["大腿", "股四头", "臀", "小腿", "大腿肌", "股四头肌", "臀肌", "小腿肌", "腿部", "臀部"]
    rope_skipping = ["小腿", "小腿肌", "心肺", "腓肠肌", "胫骨前肌", "胫骨后肌", "协调"]
    sports = [push_up, squat, plank, chinup, static_squat, rope_skipping]
    recommend_sports = []
    for word in words:  # 识别身体部位
        if re.search('[\u4e00-\u9fff]', word):
            for sport in sports:
                for muscle in sport:
                    if word == muscle:
                        sport_name = next((name for name, muscles in locals().items() if muscles == sport), None)
                        if sport_name:
                            sportslist.append(sport_name)
                            print("通过关键词：",str(muscle),"找到了匹配的运动：", sport_name)
    if sportslist != []:  # 检测到身体部位——识别运动名称
        sportslist = remove_duplicates(sportslist)
        for sport in sportslist:
            if sport == "push_up":
                recommend_sports.append("俯卧撑")
            if sport == "squat":
                recommend_sports.append("深蹲")
            if sport == "plank":
                recommend_sports.append("平板支撑")
            if sport == "chinup":
                recommend_sports.append("引体向上")
            if sport == "static_squat":
                recommend_sports.append("静态深蹲")
            if sport == "rope_skipping":
                recommend_sports.append("跳绳")
        print(recommend_sports)
        return recommend_sports
    else:
        print("未识别到身体部位,开始识别运动语音")
        return recommend_sports

def sports_detecte_run(words,recommend_sports):
    sport = ""
    qiniu_filename = ""
    recommendlist1 = []
    recommendlist2 = []
    while True:
        for word in words:
            if "深蹲" in word:
                if ("静态深蹲" in word) or ("静态" in word):
                    sport = "静态深蹲"
                    break
                else:
                    sport = "深蹲"
                    break
            elif ("俯卧撑" in word) or ("俯卧" in word) or ("握" in word):
                sport = "俯卧撑"
                break
            elif ("平板支撑" in word) or ("平板" in word) or ("支撑" in word):
                sport = "平板支撑"
                break
            elif ("引体向上" in word) or ("引体" in word) or ("向上" in word):
                sport = "引体向上"
                break
            elif ("跳绳" in word) or ("跳" in word) or ("绳" in word):
                sport = "跳绳"
                break
            elif ("方案一" in word) or ("一" in word) or ("1" in word):
                sport = "方案一"
                break
            elif ("方案二" in word) or ("二" in word) or ("2" in word):
                sport = "方案二"
                break
            elif ("方案三" in word) or ("三" in word) or ("3" in word):
                sport = "方案三"
                break
            else:
                sport = "error"

        if sport == "error":
            return "error"
            
        if sport == "俯卧撑":
            fwc()
            return "push_up"
        if sport == "平板支撑":
            pbzc()
            return "plank"
        if sport == "引体向上":
            ytxs()
            return "chinup"
        if sport == "深蹲":
            sd()
            return "squat"
        if sport == "静态深蹲":
            jtsd()
            return "static_squat"
        if sport == "跳绳":
            ts()
            return "rope_skip"
        if sport == "方案一":
            a = sports_detecte_run([recommend_sports[0]],None)
            b = sports_detecte_run([recommend_sports[1]],None)
            return [a, b]
        if sport == "方案二":
            a = sports_detecte_run([recommend_sports[0]],None)
            b = sports_detecte_run([recommend_sports[2]],None)
            return [a, b]
        if sport == "方案三":
            a = sports_detecte_run([recommend_sports[1]],None)
            b = sports_detecte_run([recommend_sports[2]],None)
            return [a, b]

def yes_no(words):
    while 1:
        for word in words:
            if ("是" in word) or ("视" in word) or ("事" in word) or ("式" in word):
                return True
            elif ("否" in word) or ("缶" in word) or ("偶" in word) or ("呕" in word) or ("藕" in word):
                return False
            else:
                return "error"

def run():
    # isspeaking = droid.ttsIsSpeaking()
    i = 1#########################################   改
    speak("请在“嘀”声响后说出你想锻炼的部位或想进行的运动:嘀")
    while True:
        print("开始录音")
        voice_save('/sdcard/Music/test.wav',1)#录音
        if i > 0:
            words = Ifasr_new.voice_txt('/sdcard/Music/fuji.wav')#锻炼腹肌
        else:
            words = Ifasr_new.voice_txt('/sdcard/Music/error.wav')#语音转文字
        i += 1
        recommend_sports = muscle2sportsname(words, sportslist)

        if recommend_sports != []:#身体部位语音转文字有效 
            result = ", ".join(recommend_sports)
            if len(recommend_sports) == 1:
                speak("推荐运动为：" + result + "，是否进行" + result + "运动，请回答,是或否")
                speak("嘀")
                while True:
                    print("开始录音......")
                    voice_save('/sdcard/Music/test.wav',1)
                    words = Ifasr_new.voice_txt('/sdcard/Music/yes.wav')
                    Y_N = yes_no(words)
                    if Y_N == "error":
                        speak("抱歉我没有听清，请再说一次。嘀")
                        continue
                    elif Y_N:
                        qiniu_flodernanme = sports_detecte_run(recommend_sports,None)
                        speak("运动检测完成，现在开始数据上行")
                        qiniu_upload.qiniu_upload_file(f"./outputvideo/{qiniu_flodernanme}.avi",f"{qiniu_flodernanme}/{qiniu_flodernanme}{str(qiniu_upload.beijing_time_1)}.avi")
                        miao_test.send_note(f"{qiniu_flodernanme}/{qiniu_flodernanme}")
                        speak("数据上行完成，请注意在微信·公众号上查收")
                        break
                    speak("已取消运动")
                    break
                break

            if len(recommend_sports) == 2:
                print("推荐运动如下：" + result + "，为您提供运动方案如下：组合方案一：" + recommend_sports[0] + "加" + recommend_sports[1] + "，请回答组合方案序号，或运动名称")
                speak("推荐运动如下：" + result + "，为您提供运动方案如下：组合方案一：" + recommend_sports[0] + "加" + recommend_sports[1] + "，请回答组合方案序号，或运动名称")
                while True:
                    print("开始录音......")
                    voice_save('/sdcard/Music/test.wav',1)
                    words = Ifasr_new.voice_txt('/sdcard/Music/plan1.wav')
                    qiniu_flodernanme = sports_detecte_run(words,recommend_sports)
                    print(qiniu_flodernanme)
                    print("运动完成")
                    speak("运动完成")
                    if len(qiniu_flodernanme) > 3 and qiniu_flodernanme != "error":####语音检测为运动名称
                        print("语音检测为运动名称...........",qiniu_flodernanme)
                        speak("运动检测完成，现在开始数据上行")
                        qiniu_upload.qiniu_upload_file(f"./outputvideo/{qiniu_flodernanme}.avi",f"{qiniu_flodernanme}/{qiniu_flodernanme}{str(qiniu_upload.beijing_time_1)}.avi")                        
                        miao_test.send_note(f"{qiniu_flodernanme}/{qiniu_flodernanme}")
                        speak("数据上行完成，请注意在微信·公众号上查收")
                        break
                    elif len(qiniu_flodernanme) == 2 and qiniu_flodernanme != "error":####语音检测为方案名称
                        print("语音检测为方案名称...........",qiniu_flodernanme)
                        speak("运动检测完成，现在开始数据上行")
                        qiniu_upload.qiniu_upload_file(f"./outputvideo/{qiniu_flodernanme[0]}.avi",f"{qiniu_flodernanme[0]}/{qiniu_flodernanme[0]}{str(qiniu_upload.beijing_time_1)}.avi")                        
                        qiniu_upload.qiniu_upload_file(f"./outputvideo/{qiniu_flodernanme[1]}.avi",f"{qiniu_flodernanme[1]}/{qiniu_flodernanme[1]}{str(qiniu_upload.beijing_time_1)}.avi")                        
                        miao_test.send_note(f"{qiniu_flodernanme[0]}/{qiniu_flodernanme[0]}")
                        miao_test.send_note(f"{qiniu_flodernanme[1]}/{qiniu_flodernanme[1]}")
                        speak("数据上行完成，请注意在微信·公众号上查收")
                        break
                    elif qiniu_flodernanme == "error":
                        speak("抱歉我没有听清，请再说一次。嘀")
                break
                    
            
            if len(recommend_sports) == 3:
                print("推荐运动如下：" + result + "，为您提供运动方案如下：组合方案一：" + recommend_sports[0] + "加" + recommend_sports[1] + "：组合方案二：" + recommend_sports[0] + "加" + recommend_sports[2] + "：组合方案三：" + recommend_sports[1] + "加" + recommend_sports[2] +"，请回答组合方案序号，或运动名称")
                speak("推荐运动如下：" + result + "，为您提供运动方案如下：组合方案一：" + recommend_sports[0] + "加" + recommend_sports[1] + "：组合方案二：" + recommend_sports[0] + "加" + recommend_sports[2] + "：组合方案三：" + recommend_sports[1] + "加" + recommend_sports[2] +"，请回答组合方案序号，或运动名称")
                while True:
                    print("开始录音......")
                    voice_save('/sdcard/Music/test.wav',1)
                    words = Ifasr_new.voice_txt('/sdcard/Music/plan1.wav')
                    print("..................................................../n,,,,,,,,...\n................................")
                    print(words,recommend_sports)
                    print("..................................................../n,,,,,,,,...\n................................")
                    qiniu_flodernanme = sports_detecte_run(words,recommend_sports)
                    if len(qiniu_flodernanme) > 3 and qiniu_flodernanme != "error":####语音检测为运动名称
                        print("语音检测为运动名称...........",qiniu_flodernanme)
                        speak("运动检测完成，现在开始数据上行")
                        qiniu_upload.qiniu_upload_file(f"./outputvideo/{qiniu_flodernanme}.avi",f"{qiniu_flodernanme}/{qiniu_flodernanme}{str(qiniu_upload.beijing_time_1)}.avi")                        
                        miao_test.send_note(f"{qiniu_flodernanme}/{qiniu_flodernanme}")
                        speak("数据上行完成，请注意在微信·公众号上查收")
                        break
                    elif len(qiniu_flodernanme) == 2:####语音检测为方案名称
                        print("语音检测为方案名称...........",qiniu_flodernanme)
                        speak("运动检测完成，现在开始数据上行")
                        qiniu_upload.qiniu_upload_file(f"./outputvideo/{qiniu_flodernanme[0]}.avi",f"{qiniu_flodernanme[0]}/{qiniu_flodernanme[0]}{str(qiniu_upload.beijing_time_1)}.avi")                        
                        qiniu_upload.qiniu_upload_file(f"./outputvideo/{qiniu_flodernanme[1]}.avi",f"{qiniu_flodernanme[1]}/{qiniu_flodernanme[1]}{str(qiniu_upload.beijing_time_1)}.avi")                        
                        miao_test.send_note(f"{qiniu_flodernanme[0]}/{qiniu_flodernanme[0]}")
                        miao_test.send_note(f"{qiniu_flodernanme[1]}/{qiniu_flodernanme[1]}")
                        speak("数据上行完成，请注意在微信·公众号上查收")
                        break
                    elif qiniu_flodernanme == "error":
                        speak("抱歉我没有听清，请再说一次。嘀")
                break 
        else:
            ret = sports_detecte_run(words,None)
            if ret == "error":
                speak("抱歉我没有听清，请再说一次。嘀")
            else:
                speak("运动检测完成，现在开始数据上行")
                qiniu_upload.qiniu_upload_file(f"./outputvideo/{ret}.avi",f"{ret}/{ret}{str(qiniu_upload.beijing_time_1)}.avi")                        
                miao_test.send_note(f"{ret}/{ret}")
                speak("数据上行完成，请注意在微信·公众号上查收")
                break

def app_in():
    global gender, age, height, weight
    client()
    # # 获取用户输入
    print(gender, age, height, weight)
    speak("已获取用户信息")
    speak("身高" + str(height) + "厘米。" + "体重" + str(weight) + "千克。" + "年龄" + str(age) + "岁")

    # 计算BMI指数
    bmi = calculate_bmi(height, weight)

    # 计算标准体重
    weight_min, weight_max = calculate_weight_range(age, height)
    speak("标准健康体重范围：{}千克 至 {}千克".format(round(weight_min, 1), round(weight_max, 1)))

    # 判断肥胖程度
    obesity = assess_obesity(bmi)
    speak("根据bmi指数可得身体情况为:" + obesity)
    speak("正在根据身体指标制定计划")
    time.sleep(2)
    speak("计划制定完成")

    # 根据年龄和肥胖程度输出建议的运动计划
    if age < 80:
        if obesity == "体重过轻":
            speak("建议运动：俯卧撑、引体向上")
            os.system("python firstoption.py")
            # ts()
            # fwc()
            # ytxs()
            speak("运动检测完成，现在开始数据上行")
            qiniu_upload.qiniu_upload_file("./outputvideo/rope_skip.avi",f"rope_skip/rope_skip{str(qiniu_upload.beijing_time_1)}.avi")                        
            qiniu_upload.qiniu_upload_file("./outputvideo/push_up.avi",f"push_up/push_up{str(qiniu_upload.beijing_time_1)}.avi")                        
            qiniu_upload.qiniu_upload_file("./outputvideo/chinup.avi",f"chinup/chinup{str(qiniu_upload.beijing_time_1)}.avi")                        
            speak("数据上行完成，请注意在微信·公众号上查收")
        elif obesity == "正常体重":
            speak("建议运动：俯卧撑、引体向上")
            os.system("python firstoption.py")
            # fwc()
            # ts()
            # sd()
            # pbzc()
            speak("运动检测完成，现在开始数据上行")
            qiniu_upload.qiniu_upload_file("./outputvideo/push_up.avi",f"push_up/push_up{str(qiniu_upload.beijing_time_1)}.avi")                        
            qiniu_upload.qiniu_upload_file("./outputvideo/rope_skip.avi",f"rope_skip/rope_skip{str(qiniu_upload.beijing_time_1)}.avi")                        
            qiniu_upload.qiniu_upload_file("./outputvideo/squat.avi",f"squat/squat{str(qiniu_upload.beijing_time_1)}.avi")                        
            qiniu_upload.qiniu_upload_file("./outputvideo/plank.avi",f"plank/plank{str(qiniu_upload.beijing_time_1)}.avi")                        
            speak("数据上行完成，请注意在微信·公众号上查收")
        else:
            speak("建议运动：俯卧撑、引体向上")
            os.system("python firstoption.py")
            # sd()
            # pbzc()
            speak("运动检测完成，现在开始数据上行")
            qiniu_upload.qiniu_upload_file("./outputvideo/squat.avi",f"squat/squat{str(qiniu_upload.beijing_time_1)}.avi")                        
            qiniu_upload.qiniu_upload_file("./outputvideo/plank.avi",f"plank/plank{str(qiniu_upload.beijing_time_1)}.avi")                        
            speak("数据上行完成，请注意在微信·公众号上查收")
    else:
        if obesity == "体重过轻":
            speak("建议运动：跳绳、静态深蹲、引体向上")
            os.system("python secondoption.py")
            # ts()
            # jtsd()
            speak("运动检测完成，现在开始数据上行")
            qiniu_upload.qiniu_upload_file("./outputvideo/rope_skip.avi",f"rope_skip/rope_skip{str(qiniu_upload.beijing_time_1)}.avi")                        
            qiniu_upload.qiniu_upload_file("./outputvideo/static_squat.avi",f"static_squat/static_squat{str(qiniu_upload.beijing_time_1)}.avi")                        
            speak("数据上行完成，请注意在微信·公众号上查收")
        elif obesity == "正常体重":
            os.system("python secondoption.py")
            # ytxs()
            # fwc()
            speak("运动检测完成，现在开始数据上行")
            qiniu_upload.qiniu_upload_file("./outputvideo/chinup.avi",f"chinup/chinup{str(qiniu_upload.beijing_time_1)}.avi")                        
            qiniu_upload.qiniu_upload_file("./outputvideo/push_up.avi",f"push_up/push_up{str(qiniu_upload.beijing_time_1)}.avi")                        
            speak("数据上行完成，请注意在微信·公众号上查收")
        else:
            os.system("python secondoption.py")
            # jtsd()
            # pbzc()
            speak("运动检测完成，现在开始数据上行")
            qiniu_upload.qiniu_upload_file("./outputvideo/static_squat.avi",f"static_squat/static_squat{str(qiniu_upload.beijing_time_1)}.avi")                        
            qiniu_upload.qiniu_upload_file("./outputvideo/plank.avi",f"plank/plank{str(qiniu_upload.beijing_time_1)}.avi")                        
            speak("数据上行完成，请注意在微信·公众号上查收")

if __name__ == '__main__':
    img = cv2.imread('./image/Aicoachbg.png')
    cvs.imshow(img)
    speak("欢迎使用AidLux智能运动检测助手")
    speak("请用户自定个性化方案，1,,A P P,输入身体数据，为您制定健康运动方案。 2.身体部位专项训练,,,。 嘀")
    while True:
        print("开始录音")
        voice_save('/sdcard/Music/test.wav',1.5)#录音
        words = Ifasr_new.voice_txt('/sdcard/Music/test.wav')
        a = None
        for word in words:
            if ("1" in word) or ("一" in word) or ("意" in word) or ("忆" in word):
                speak("请上传数据")
                app_in()
                a = "ok"
                break
            elif ("2" in word) or ("二" in word) or ("尔" in word) or ("而" in word):
                run()
                a = "ok"
                break
            else:
                speak("抱歉我没有听清，请再说一次。嘀")
                break
        if a == "ok":
            break
