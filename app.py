from flask import Flask, render_template, Response, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import signal
from chinup import detectFromVideo
from skippingcounter import rope_skip
import sd 
import jtsd 
import fwc 
import pbzc 
import os
import multiprocessing
import random
import plan
import android
import write_file
import qiniu_upload
from flask_sslify import SSLify
import datetime
import pytz

# 获取当前日期和时间
now = datetime.datetime.now()
# 创建时区对象
tz = pytz.timezone('Asia/Shanghai')

# 将当前时间转换为北京时间
beijing_time = now.astimezone(tz)
beijing_time_1 = beijing_time.strftime("%Y-%m-%d %H:%M:%S")

droid = android.Android()
isspeaking = droid.ttsIsSpeaking()
chinup_pid_ = 0
app = Flask(__name__)
sslify = SSLify(app)
# source = "./video/chinup.mp4"
# save_path = './outputvideo/chinup.avi'
# bg_img = '/home/Aisports/image/Aicoach.png'

def get_current_process_id():
    current_process = multiprocessing.current_process()
    return current_process.pid

@app.route('/')
def index():
    return render_template('indexcopy.html')

@app.route('/static/<path:path>')
def static_files(path):
    return app.send_static_file(path)



@app.route('/message', methods=['GET', 'POST'])
def message():
    if request.method == 'POST':
        data = request.get_json()
        height = data['height']
        age = data['age']
        gender = data['gender']
        weight = data['weight']
        target_weight_loss = data['miss_weight']
        days = data['plan_day']
        if gender == 'male':
            translated_gender = '男'
        elif gender == 'female':
            translated_gender = '女'
        else:
            translated_gender = '未知'
        fitness_plan, plan_str = plan.plan_make(translated_gender, float(weight), float(height), float(age), float(target_weight_loss), int(days))
        droid.ttsSpeak("要在 "+ str(days)+" 天内减去 "  +  str(target_weight_loss) + '千克' + str(plan_str) + "千卡。。为您制定每日健身计划如下" + str(fitness_plan))
        write_file.write_to_temp_file("要在 "+ str(days)+" 天内减去 "  +  str(target_weight_loss) + '千克' + str(plan_str) + "千卡为您制定每日健身计划如下" + str(fitness_plan))
        # print(str(plan_str) + "为您制定健身计划" + str(fitness_plan))
        # print("身高：", height)
        # print("年龄：", age)
        # print("性别：", translated_gender)
        # print("体重：", weight)
        # print(data)
        # 在这里进行进一步的处理，例如将数据传递给AI模型进行处理
        
        return 'Received data: height={}, weight={}, gender={}, age={}'.format(height, weight, gender, age)

@app.route('/video_feed')
def video_feed():
    global chinup_pid_
    chinup_pid_ = get_current_process_id()
    return Response(detectFromVideo(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
                    
    
@app.route('/video_feed1')
def video_feed1():
    global skip_pid_
    skip_pid_ = get_current_process_id()
    return Response(rope_skip(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed2')
def video_feed2():
    global sd_pid_
    sd_pid_ = get_current_process_id()
    return Response(sd.aicoach(0, "squat"),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed3')
def video_feed3():
    global jtsd_pid_
    jtsd_pid_ = get_current_process_id()
    return Response(jtsd.aicoach(0, "static_squat"),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed4')
def video_feed4():
    global fwc_pid_
    fwc_pid_ = get_current_process_id()
    return Response(fwc.aicoach(0, "squat"),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed5')
def video_feed5():
    global pbzc_pid_
    pbzc_pid_ = get_current_process_id()
    return Response(pbzc.aicoach(0, "plank"),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stop', methods=['POST'])
def stop():
    global chinup_pid_
    chinup_pid_ = get_current_process_id()
    # print('当前进程号:',chinup_pid_,skip_pid)
    os.kill(int(chinup_pid_), signal.SIGTERM)
    os.system("python3 app.py")
    return 'Application stopped'

@app.route('/stop1', methods=['POST1'])
def stop1():
    global skip_pid_
    skip_pid = get_current_process_id()
    # print('当前进程号:',chinup_pid_,skip_pid)
    os.kill(int(skip_pid_), signal.SIGTERM)
    os.system("python3 app.py")
    return 'Application stopped'

@app.route('/stop2', methods=['POST2'])
def stop2():
    global sd_pid_
    sd_pid_ = get_current_process_id()
    # print('当前进程号:',chinup_pid_,skip_pid)
    os.kill(int(sd_pid_), signal.SIGTERM)
    os.system("python3 app.py")
    return 'Application stopped'

@app.route('/stop3', methods=['POST3'])
def stop3():
    global jtsd_pid_
    jtsd_pid_ = get_current_process_id()
    # print('当前进程号:',chinup_pid_,skip_pid)
    os.kill(int(jtsd_pid_), signal.SIGTERM)
    os.system("python3 app.py")
    return 'Application stopped'

@app.route('/stop4', methods=['POST4'])
def stop4():
    global fwc_pid_
    fwc_pid = get_current_process_id()
    # print('当前进程号:',chinup_pid_,skip_pid)
    os.kill(int(fwc_pid_), signal.SIGTERM)
    os.system("python3 app.py")
    return 'Application stopped'

@app.route('/stop5', methods=['POST5'])
def stop5():
    global pbzc_pid_
    pbzc_pid = get_current_process_id()
    # print('当前进程号:',chinup_pid_,skip_pid)
    os.kill(int(pbzc_pid_), signal.SIGTERM)
    os.system("python3 app.py")
    return 'Application stopped'

@app.route("/read_file")
def read_file():
    file_path = "/home/Aisports_dead/temp_file.txt"
    with open(file_path, "r") as file:
        content = file.read()
    content = content.replace("'", "")
    return content

@app.route("/datatocloud", methods=["POST"])
def datatocloud():
    qiniu_upload.qiniu_upload_file("./outputvideo/chinup.avi","chinup" + str(beijing_time_1)+".avi")
    qiniu_upload.qiniu_upload_file("./outputvideo/rope_skip.avi", "rope_skip" + str(beijing_time_1) + ".avi")
    qiniu_upload.qiniu_upload_file("./outputvideo/plank.avi", "plank" + str(beijing_time_1) + ".avi")
    qiniu_upload.qiniu_upload_file("./outputvideo/pushup.avi", "push_up" + str(beijing_time_1) + ".avi")
    qiniu_upload.qiniu_upload_file("./outputvideo/squat.avi", "sd" + str(beijing_time_1) + ".avi")
    qiniu_upload.qiniu_upload_file("./outputvideo/static_squat.avi", "static_squat" + str(beijing_time_1) + ".avi")
    droid.ttsSpeak('数据上行完毕注意查收')
    return 'ok' 



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
