import os
import android
import Ifasr_new
import re
import myaicoach
import time
import qiniu_upload
import cv2
from cvs import *



duration = 1000  # 声音持续时间（毫秒）
freq = 440  # 声音频率（赫兹）
# 俯卧撑主要锻炼胸肌（胸大肌、胸小肌）、三角肌（前束）、肱三头肌、前臂肌群以及腹肌。
# 深蹲主要锻炼大腿肌群，包括股四头肌、臀大肌、腘绳肌、腓肠肌以及小腿肌群。
# 平板支撑主要锻炼核心肌群，包括腹直肌、腹外斜肌、腹内斜肌、腰方肌以及背部肌群。
# 引体向上主要锻炼背部肌群，包括背阔肌、斜方肌、肱二头肌、肱三头肌以及腹肌。
# 静态深蹲主要锻炼大腿肌群，特别是股四头肌、臀大肌以及小腿肌群。
# 跳绳主要锻炼小腿肌群，包括腓肠肌、胫骨前肌以及胫骨后肌。同时，跳绳还可以增强心肺功能和协调性。
droid = android.Android()
sportslist = []
words = []

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
            print(".")
            time.sleep(0.1)
            print("..")
            time.sleep(0.1)
            print("...")
            time.sleep(0.1)
            print("..")
            time.sleep(0.1)
            print(".")


def muscle2sportsname(words,sportslist):
    push_up = ["胸部", "三角", "肱三头", "前臂", "腹部", "胸肌", "三角肌", "肱三头肌", "前臂肌", "腹","腹肌","手臂"]
    squat = ["大腿", "股四头", "臀", "小腿", "大腿肌", "股四头肌", "臀肌", "小腿肌", "腿部"]
    plank = ["核心", "腹", "背", "背部", "腰方肌", "腹直肌", "腹外斜肌", "腹内斜肌","腹肌","腹部"]
    chinup = ["背", "背阔肌", "斜方肌", "肱二头", "腹", "肱三头", "背部", "腹肌", "肱二头", "肱三头肌", "腹部"]
    static_squat = ["大腿", "股四头", "臀", "小腿", "大腿肌", "股四头肌", "臀肌", "小腿肌", "腿部", "臀部"]
    rope_skipping = ["背部","小腿", "小腿肌", "心肺", "腓肠肌", "胫骨前肌", "胫骨后肌", "协调"]
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
            if ("静态深蹲" in word) or ("静态" in word):
                sport = "静态深蹲"
                break
            if ("深蹲" in word) or ("深" in word) or ("蹲" in word):
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
            speak("语音识别错误请重新输入")
            print("开始录音")
            voice_save('/sdcard/Music/test.wav', 4)
            words = Ifasr_new.voice_txt('/sdcard/Music/test.wav')
        if sport == "俯卧撑":
            speak("俯卧撑运动检测开始")
            qiniu_filename = myaicoach.aicoach("/home/Aisports/video/myfwc.mp4", "push_up")  # 调用俯卧撑检测模块
            break
        if sport == "平板支撑":
            speak("平板支撑运动检测开始")
            qiniu_filename = myaicoach.aicoach("/home/Aisports/video/mypbzc.mp4","plank")  # 调用平板支撑检测模块
            # myaicoach.aicoach("./test1.mp4", "plank")  # 调用平板支撑检测模块
            break
        if sport == "引体向上":
            os.system("python chinup.py")  # 调用引体向上检测模块
            bg_img = cv2.imread('/home/Aisports/image/Aicoach.png')
            cvs.imshow(bg_img)
            # qiniu_filename = "chinup/chinup" + str(qiniu_upload.beijing_time_1) + ".avi"
            # qiniu_upload.qiniu_upload_file("./outputvideo/chinupdetect.avi", qiniu_filename)
            break
        if sport == "深蹲":
            speak("深蹲运动检测开始")
            qiniu_filename = myaicoach.aicoach("/home/Aisports/video/mysd.mp4", "squat")  # 调用深蹲检测模块
            break
        if sport == "静态深蹲":
            speak("静态深蹲运动检测开始")
            qiniu_filename = myaicoach.aicoach("/home/Aisports/video/myjtsd.mp4", "static_squat")  # 调用静态深蹲检测模块
            break
        if sport == "跳绳":
            os.system("python skippingcounter.py")  # 调用跳绳检测模块
            bg_img = cv2.imread('/home/Aisports/image/Aicoach.png')
            cvs.imshow(bg_img)
            # qiniu_filename = "rope_skip/rope_skip" + str(qiniu_upload.beijing_time_1) + ".avi"
            # qiniu_upload.qiniu_upload_file("./outputvideo/skippdetect.avi", qiniu_filename)
            break
        if sport == "方案一":
            recommendlist1.append(recommend_sports[0])
            recommendlist2.append(recommend_sports[1])
            sports_detecte_run(recommendlist1,None)
            sports_detecte_run(recommendlist2,None)
            break
        if sport == "方案二":
            recommendlist1.append(recommend_sports[0])
            recommendlist2.append(recommend_sports[2])
            sports_detecte_run(recommendlist1,None)
            sports_detecte_run(recommendlist2,None)
            break
        if sport == "方案三":
            recommendlist1.append(recommend_sports[1])
            recommendlist2.append(recommend_sports[2])
            sports_detecte_run(recommendlist1,None)
            sports_detecte_run(recommendlist2,None)
            break
    return qiniu_filename

def yes_no(words):
    while 1:
        for word in words:
            if ("是" in word) or ("视" in word) or ("事" in word) or ("式" in word):
                return True
            elif ("否" in word) or ("缶" in word) or ("偶" in word) or ("呕" in word) or ("藕" in word):
                return False
            else:
                speak("语音识别错误，请重新输入")
                words = Ifasr_new.voice_txt('/sdcard/Music/test.wav')

isspeaking = droid.ttsIsSpeaking()

def run():
    img_bg1 = cv2.imread('/home/Aisports/image/Aicoachbg.png')
    cvs.imshow(img_bg1)
    while True:
        # speak("请在“嘀”,声响后说出你想锻炼的部位或想进行的运动，如:我想锻炼腹肌,或,我想做引体向上")
        speak("欢迎使用AidLux智能运动检测助手")
        speak("请在“嘀”,声响后说出你想锻炼的部位或想进行的运动")
        droid.ttsSpeak("嘀")
        time.sleep(1)
        print("开始录音")
        voice_save('/sdcard/Music/test.wav',4)#录音
        words = Ifasr_new.voice_txt('/sdcard/Music/test.wav')#语音转文字
        recommend_sports = muscle2sportsname(words, sportslist)

        if recommend_sports != []:#语音转文字有效 
            result = ", ".join(recommend_sports)
            if len(recommend_sports) == 1:
                speak("推荐运动为：" + result + "，是否进行" + result + "运动，请回答,是或否")
                voice_save('/sdcard/Music/test.wav',4)
                words = Ifasr_new.voice_txt('/sdcard/Music/test.wav')
                if yes_no(words):
                    sports_detecte_run(recommend_sports,None)
                # else:

            if len(recommend_sports) == 2:
                speak("推荐运动如下：" + result + "，为您提供运动方案如下：组合方案一：" + recommend_sports[0] + "加" + recommend_sports[1] + "，请回答组合方案序号，或运动名称")
                print("开始录音......")
                voice_save('/sdcard/Music/test.wav',4)
                words = Ifasr_new.voice_txt('/sdcard/Music/test.wav')
                sports_detecte_run(words,recommend_sports)
            
            if len(recommend_sports) == 3:
                speak("推荐运动如下：" + result + "，为您提供运动方案如下：组合方案一：" + recommend_sports[0] + "加" + recommend_sports[1] + "：组合方案二：" + recommend_sports[0] + "加" + recommend_sports[2] + "：组合方案三：" + recommend_sports[1] + "加" + recommend_sports[2] +"，请回答组合方案序号，或运动名称")
                print("开始录音......")
                voice_save('/sdcard/Music/test.wav',4)
                words = Ifasr_new.voice_txt('/sdcard/Music/test.wav')
                sports_detecte_run(words,recommend_sports)
                speak("当前训练检测结束，数据开始上行，请注意查收")
                break
        else:
            sports_detecte_run(words,None)

if __name__ == '__main__':
    run()
    qiniu_filename = "chinup/chinup" + str(qiniu_upload.beijing_time_1) + ".avi"
    qiniu_upload.qiniu_upload_file("./outputvideo/chinupdetect.avi", qiniu_filename)
    qiniu_filename = "rope_skip/rope_skip" + str(qiniu_upload.beijing_time_1) + ".avi"
    qiniu_upload.qiniu_upload_file("./outputvideo/skippdetect.avi", qiniu_filename)
    speak("上传成功")