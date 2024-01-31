import paho.mqtt.client as mqtt
# import android
import time
import random
import re
import jieba
import multiprocessing
import os,signal
import function_run
import clean1
import android
import threading

droid = android.Android()

broker = "192.168.144.39"
port = 1883
username = ""
password = ""
topic = "Aisports"
gender = ""
age = ""
height = ""
weight = ""
bodypart = ex_type = confirm = self_selection = ex_aim = voice_txt = mode = ""
go_back = ""
push_up_flag = chin_up_flag = plank_flag = squat_flag = static_squat_flag = skipping_flag = 0
push_up_args = chin_up_args = plank_args = squat_args = static_squat_args = skipping_args = -1

def muscle2sportsname(sentence):
    push_up = ["胸部", "三角", "肱三头", "前臂", "腹部", "胸肌", "三角肌", "肱三头肌", "前臂肌", "腹", "腹肌", "手臂"]
    squat = ["大腿", "股四头", "臀", "小腿", "大腿肌", "股四头肌", "臀肌", "小腿肌", "腿部"]
    plank = ["核心", "腹", "背", "背部", "腰方肌", "腹直肌", "腹外斜肌", "腹内斜肌", "腹肌", "腹部"]
    chinup = ["背", "背部", "背阔肌", "斜方肌", "肱二头", "腹", "肱三头", "背部", "腹肌", "肱二头", "肱三头肌", "腹部"]
    static_squat = ["大腿", "股四头", "臀", "小腿", "大腿肌", "股四头肌", "臀肌", "小腿肌", "腿部", "臀部"]
    rope_skipping = ["小腿", "小腿肌", "心肺", "腓肠肌", "胫骨前肌", "胫骨后肌", "协调"]
    sports = [push_up, squat, plank, chinup, static_squat, rope_skipping]
    recommend_sports = []

    words = jieba.lcut(sentence)  # 使用jieba进行中文分词
    for word in words:  # 识别身体部位
        for sport in sports:
            if word in sport:
                sport_name = [name for name, muscles in locals().items() if muscles == sport][0]
                if sport_name not in recommend_sports:
                    recommend_sports.append(sport_name)
                    print("通过关键词：", word, "找到了匹配的运动：", sport_name)
    english_to_chinese = {
        'push_up': '俯卧撑',
        'plank': '平板支撑',
        'chinup': '引体向上',
        'squat': '深蹲',
        'static_squat': '静态深蹲',
        'rope_skipping': '跳绳'
    }
    # 将英文运动名称转换为中文字符串
    recommend_sports_chinese = [english_to_chinese.get(sport, sport) for sport in recommend_sports]
    print(recommend_sports_chinese)
    return recommend_sports_chinese
#写操作
def write_to_temp_file(filename,data):
    # 获取当前文件所在的目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # 构建临时文件的路径
    temp_file_path = os.path.join(current_dir, filename)

    # 创建临时文件
    with open(temp_file_path, 'w') as temp_file:
        # 将字符串数据写入临时文件
        temp_file.write(data)

    return temp_file_path
def execution_plan(sport_namelist, num_or_time):
    global push_up_flag, chin_up_flag, plank_flag, squat_flag, static_squat_flag, skipping_flag, push_up_args, chin_up_args, plank_args , squat_args , static_squat_args , skipping_args
    x = 0
    for a in sport_namelist:
        print(a)
        if a =="俯卧撑":
            push_up_flag = 1
            push_up_args = x
        elif a =="引体向上":
            chin_up_flag = 1
            chin_up_args = x
        elif a =="平板支撑":
            plank_flag = 1
            plank_args = x
        elif a =="深蹲":
            squat_flag = 1
            squat_args = x
        elif a =="静态深蹲":
            static_squat_flag = 1
            static_squat_args = x
        elif a =="跳绳":
            skipping_flag = 1
            skipping_args = x
        x += 1
    # if push_up_flag == 1:
    #     write_to_temp_file("./temp_args.txt", push_up_args)
    #     fwc1.app.run(host = '0.0.0.0',port = 5004, debug = True)
    # elif chin_up_flag == 1:
    #     write_to_temp_file("./temp_args.txt", chin_up_args)
    #     chinup1.app.run(host = '0.0.0.0',port = 5004, debug = True)
    # elif plank_flag == 1:
    #     write_to_temp_file("./temp_args.txt", plank_args)
    #     pbzc1.app.run(host = '0.0.0.0',port = 5004, debug = True)
    # elif squat_flag == 1:
    #     write_to_temp_file("./temp_args.txt", squat_args)
    #     sd1.app.run(host = '0.0.0.0',port = 5004, debug = True)
    # elif static_squat_flag == 1:
    #     write_to_temp_file("./temp_args.txt", static_squat_args)
    #     jtsd1.app.run(host = '0.0.0.0',port = 5004, debug = True)
    # elif skipping_flag == 1:
    #     write_to_temp_file("./temp_args.txt", skipping_args)
    #     skippingcounter1.app.run(host = '0.0.0.0',port = 5004, debug = True)


def extract_params(text):
    pattern = r'(\w+),运动个数：(\d+)'
    params = re.findall(pattern, text)
    return params

def extract_info(text):
    if text != "":
        # 提取天数
        days = re.findall(r'(\d+)天', text)
        days = int(days[0]) if days else 'none'
        # 提取公斤数
        weight = re.findall(r'(\d+)(公斤|斤)', text)
        if weight:
            weight, unit = weight[0]
            weight = int(weight) if unit == '公斤' else int(weight) / 2
        else:
            weight = 'none'
        # 判断动作
        if '减肥' in text or '胖' in text or '肥' in text or '体重超标' in text:
            action = '减肥'
        elif '增肌' in text or '增重' in text:
            action = '增肌'
        else:
            action = 'none'
        return days, action, weight
    else:#    健身目的为空
        return -1, "", -1

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

def plan_make(gender, weight, height, age, action, target_weight_loss, days):

    def generate_fitness_plan(target_calories, exercises):
        plan = {exercise[0]: 0 for exercise in exercises}  # 初始化运动计划
        total_calories = 0  # 初始化总卡路里消耗

        # 创建一个运动池，池中的每个运动出现的次数与其权重成正比
        exercise_pool = [exercise for exercise in exercises for _ in range(int(100 * exercise[2]))]
        while total_calories < target_calories:
            # 从运动池中随机选择一个运动
            selected_exercise = random.choice(exercise_pool)
            # 更新运动计划和总卡路里消耗
            plan[selected_exercise[0]] += (selected_exercise[1])
            total_calories += 1
        plan['俯卧撑'] = int(plan['俯卧撑'])
        plan['引体向上'] = int(plan['引体向上'])
        plan['深蹲'] = int(plan['深蹲'])
        plan['静态深蹲'] = int(plan['静态深蹲'])
        plan['跳绳'] = int(plan['跳绳'])
        plan['平板支撑'] = int(plan['平板支撑'])
        if 1:
            if plan['俯卧撑'] < 10:
                plan['俯卧撑'] = 0
            elif plan['俯卧撑'] > 50:
                plan['俯卧撑'] = 50
            if plan['引体向上'] < 10:
                plan['引体向上'] = 0
            elif plan['引体向上'] > 50:
                plan['引体向上'] = 50
            if plan['深蹲'] < 10:
                plan['深蹲'] = 0
            elif plan['深蹲'] > 100:
                plan['深蹲'] = 100
            if plan['静态深蹲'] < 1:
                plan['静态深蹲'] = 0
            elif plan['静态深蹲'] > 20:
                plan['静态深蹲'] = 20
            if plan['跳绳'] < 60:
                plan['跳绳'] = 0
            elif plan['跳绳'] > 1000:
                plan['跳绳'] = 1000
            if plan['平板支撑'] < 1:
                plan['平板支撑'] = 0
            elif plan['平板支撑'] > 20:
                plan['平板支撑'] = 20
        filtered_data = {key: value for key, value in plan.items() if value != 0}
        data_with_units = {key: f"{value} {'分钟' if key in ['静态深蹲', '平板支撑'] else '个'}" for key, value in
                           filtered_data.items()}
        data_with_units = str(data_with_units)
        data_str = data_with_units.replace("{", "").replace("}", "")
        return data_str

    calories_per_kg = 7700
    if action == "" or action == None or action == "none":
        action = "减肥"  ###################写死的可以改
    if days == -1 or days == None or days == "none":
        days = 30
    if days == 0:
        days = 0.01
    if target_weight_loss == -1 or target_weight_loss == None or target_weight_loss == "none":
        target_weight_loss = 2
    if action == "减肥":
        exercises = [
            ('俯卧撑', 0.1, 0.2),
            ('引体向上', 0.1, 0.1),
            ('深蹲', 0.5, 0.2),
            ('静态深蹲', 0.15, 0.1),
            ('平板支撑', 0.1, 0.01),
            ('跳绳', 1, 0.9)
        ]
    elif action == "增肌":
        exercises = [
            ('俯卧撑', 0.1, 0.5),
            ('引体向上', 0.1, 0.4),
            ('深蹲', 0.5, 0.5),
            ('静态深蹲', 0.15, 0.3),
            ('平板支撑', 0.1, 0.4),
            ('跳绳', 1, 0.4)
        ]
    # 定义运动
    if gender == '男':
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
    elif gender == '女':
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
    print(target_weight_loss, "target_weight_loss")
    daily_calories = target_weight_loss * (calories_per_kg - bmr) / days  # 每天运动需要消耗的卡路里
    print("要在 " + str(days)+" 天内 " + "每天运动需要消耗的卡路里", daily_calories)
    # 生成健身计划
    fitness_plan = generate_fitness_plan(daily_calories, exercises)
    print(fitness_plan)
    return fitness_plan

def get_plan_args(fitness_plan):
    # 使用正则表达式匹配和提取有效信息
    pattern = r"'([^']+)'[^']+'([^']+)'"
    matches = re.findall(pattern, fitness_plan)
    sport_namelist = []
    num_or_time = []
    # 打印提取的有效信息
    for match in matches:
        exercise = match[0]
        value = match[1]
        # 判断value是否为数字
        if value.isdigit():
            value = int(value)
        else:
            # 提取数字部分
            num_match = re.search(r'\d+', value)
            if num_match:
                value = int(num_match.group())
        sport_namelist.append(exercise)
        num_or_time.append(value)
    print(sport_namelist)
    print(num_or_time)
    return sport_namelist, num_or_time

# def get_voice_txt(voice_txt):

def remove_duplicates(arr):
    unique_arr = list(set(arr))
    return unique_arr

def muscle2sportsname(sentence):
    push_up = ["胸部", "三角", "肱三头", "前臂", "腹部", "胸肌", "三角肌", "肱三头肌", "前臂肌", "腹", "腹肌", "手臂"]
    squat = ["大腿", "股四头", "臀", "小腿", "大腿肌", "股四头肌", "臀肌", "小腿肌", "腿部"]
    plank = ["核心", "腹", "背", "背部", "腰方肌", "腹直肌", "腹外斜肌", "腹内斜肌", "腹肌", "腹部"]
    chinup = ["背", "背部", "背阔肌", "斜方肌", "肱二头", "腹", "肱三头", "背部", "腹肌", "肱二头", "肱三头肌", "腹部"]
    static_squat = ["大腿", "股四头", "臀", "小腿", "大腿肌", "股四头肌", "臀肌", "小腿肌", "腿部", "臀部"]
    rope_skipping = ["小腿", "小腿肌", "心肺", "腓肠肌", "胫骨前肌", "胫骨后肌", "协调"]
    sports = [push_up, squat, plank, chinup, static_squat, rope_skipping]
    recommend_sports = []

    words = jieba.lcut(sentence)  # 使用jieba进行中文分词
    for word in words:  # 识别身体部位
        for sport in sports:
            if word in sport:
                sport_name = [name for name, muscles in locals().items() if muscles == sport][0]
                if sport_name not in recommend_sports:
                    recommend_sports.append(sport_name)
                    print("通过关键词：", word, "找到了匹配的运动：", sport_name)
    english_to_chinese = {
        'push_up': '俯卧撑',
        'plank': '平板支撑',
        'chinup': '引体向上',
        'squat': '深蹲',
        'static_squat': '静态深蹲',
        'rope_skipping': '跳绳'
    }
    # 将英文运动名称转换为中文字符串
    recommend_sports_chinese = [english_to_chinese.get(sport, sport) for sport in recommend_sports]
    print(recommend_sports_chinese)
    return recommend_sports_chinese

def get_voicetxt_args(voice_txt):
    if "语音识别结果：" in voice_txt:
        result = voice_txt.split("语音识别结果：")[1]
        print(result)
    else:
        print("传入参数不是语音识别结果")

def get_confirm():
    global broker, port, username, password, topic, confirm, go_back
    # MQTT消息回调函数
    def on_message(client, userdata, msg):
        global confirm, go_back, confirm
        confirm = msg.payload.decode("utf-8")
        # # 分割payload字符串
        if confirm == "计划已确认":
            print(confirm)
        elif "返回上一页" in confirm:
            go_back = confirm
            print("返回上一页 计划确认—→")
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
    while True:
        if ("计划已确认" not in confirm) and ("返回上一页" not in go_back):
            time.sleep(1)
        elif "计划已确认" in confirm:
            go_back = ""
            break
        else:
            break
    # 停止MQTT消息循环
    client.loop_stop()

def publish_mqtt_message(topic,message):
    global broker
    # 连接成功回调函数
    def on_connect(client, userdata, flags, rc):
        print("Connected with result code " + str(rc))
        client.subscribe(topic)
    # 发布消息回调函数
    def on_publish(client, userdata, mid):
        print("Message Published")
    # 创建MQTT客户端实例
    client = mqtt.Client()
    # 设置连接和发布消息回调函数
    client.on_connect = on_connect
    client.on_publish = on_publish
    # 连接到MQTT代理服务器
    client.connect(broker, 1883, 60)
    # 发布消息到指定主题
    client.publish(topic, message)
    # 开始客户端循环
    client.loop_start()
    time.sleep(0.5)

    # 停止客户端循环
    client.loop_stop()

def get_client_data():
    global broker, port, username, password, topic, gender, age, height, weight
    # MQTT消息回调函数
    def on_message(client, userdata, msg):
        global gender, age, height, weight
        payload = msg.payload.decode("utf-8")
        # # 分割payload字符串
        split_payload = payload.split("性别：")[1]
        gender = split_payload.split("\n")[0]
        age = split_payload.split("年龄：")[1].split(" 岁")[0]
        height = split_payload.split("身高：")[1].split(" cm")[0]
        weight = split_payload.split("体重：")[1].split(" kg")[0]
        # 输出解析后的信息
        print(gender)
        print(age)
        print(height)
        print(weight)
        print(payload)
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
    while True:
        if gender == "" or age == "" or height == "" or weight == "":
            # print("等待数据上传中")
            time.sleep(1)
        else:
            break
    # 停止MQTT消息循环
    client.loop_stop()

def get_mode():
    global broker, port, username, password, topic, mode, go_back
    # MQTT消息回调函数
    def on_message(client, userdata, msg):
        global mode, go_back
        mode = msg.payload.decode("utf-8")
        # # 分割payload字符串
        if mode == "智能AI非语音模式":
            print(mode)
        elif mode == "智能AI语音模式":
            print(mode)
        elif mode == "用户自定义模式":
            print(mode)
        elif "返回上一页" in mode:
            go_back = mode
            print("返回上一页 模式选择—→获取客户信息",go_back)
        else:
            print("接收消息非 选择模式")
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
    while True:
        if ("语音模式" not in mode) and ("用户自定义模式" not in mode) and ("返回上一页" not in go_back):
            # print("等待数据上传中",go_back)
            time.sleep(1)
        elif "语音识别结果：" in mode:
            go_back = ""
            break
        else:
            break
    # 停止MQTT消息循环
    client.loop_stop()

def get_client_voice():
    global broker, port, username, password, topic, voice_txt, go_back
    # MQTT消息回调函数
    def on_message(client, userdata, msg):
        global voice_txt, go_back
        voice_txt = msg.payload.decode("utf-8")
        print(voice_txt)
        if "返回上一页" in voice_txt:
            go_back = voice_txt
            print("返回上一页 语音—→模式选择")
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
    while True:
        if ("语音识别结果：" not in voice_txt) and ("返回上一页" not in go_back):
            # print("等待数据上传中")
            time.sleep(1)
        elif "语音识别结果：" in voice_txt:
            go_back = ""
            break
        else:
            break
    # 停止MQTT消息循环
    client.loop_stop()

def get_ex_aim():
    global broker, port, username, password, topic, ex_aim, go_back
    # MQTT消息回调函数
    def on_message(client, userdata, msg):
        global ex_aim, go_back
        ex_aim = msg.payload.decode("utf-8")
        # # 分割payload字符串
        if "健身目的：" in ex_aim:
            print(ex_aim)
        elif "返回上一页" in ex_aim:
            go_back = ex_aim
            print("返回上一页 健身目的—→模式选择")
        else:
            print("接收消息非 健身目的",ex_aim)
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
    while True:
        if ("健身目的：" not in ex_aim) and ("返回上一页" not in go_back):
            # print(""'语音模式'" not in ex_aim",ex_aim)
            time.sleep(1)
        elif "健身目的：" in ex_aim:
            go_back = ""
            break
        else:
            break
    # 停止MQTT消息循环
    client.loop_stop()

def get_bodypart():
    global broker, port, username, password, topic, bodypart, go_back
    # MQTT消息回调函数
    def on_message(client, userdata, msg):
        global bodypart, go_back
        bodypart = msg.payload.decode("utf-8")
        # # 分割payload字符串
        if "锻炼部位：" in bodypart:
            print(bodypart)
        elif "返回上一页" in bodypart:
            go_back = bodypart
            print("返回上一页 锻炼部位—→用户自定义模式选择")
        else:
            print("接收消息非 锻炼部位：",bodypart)
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
    while True:
        if ("锻炼部位：" not in bodypart) and ("返回上一页" not in go_back):
            # print(""'语音模式'" not in ex_aim",ex_aim)
            time.sleep(1)
        elif "锻炼部位：" in bodypart:
            go_back = ""
            break
        else:
            break
    # 停止MQTT消息循环
    client.loop_stop()
def get_ex_type():
    global broker, port, username, password, topic, ex_type, go_back
    # MQTT消息回调函数
    def on_message(client, userdata, msg):
        global ex_type, go_back
        ex_type = msg.payload.decode("utf-8")
        # # 分割payload字符串
        if "运动选择：" in ex_type:
            print(ex_type)
        elif "返回上一页" in ex_type:
            go_back = ex_type
            print("返回上一页 运动选择—→用户自定义模式选择")
        else:
            print("接收消息非 运动选择",ex_type)
    client = mqtt.Client()
    client.username_pw_set(username, password)
    client.on_message = on_message
    client.connect(broker, port)
    client.subscribe(topic)
    client.loop_start()
    while True:
        if ("运动选择：" not in ex_aim) and ("返回上一页" not in go_back):
            time.sleep(1)
        elif "运动选择：" in ex_aim:
            go_back = ""
            break
        else:
            break
    # 停止MQTT消息循环
    client.loop_stop()
def get_self_selection():
    global broker, port, username, password, topic, self_selection, go_back
    # MQTT消息回调函数
    def on_message(client, userdata, msg):
        global self_selection, go_back
        self_selection = msg.payload.decode("utf-8")
        # # 分割payload字符串
        if "返回上一页" in self_selection:
            go_back = self_selection
            print("返回上一页 健身目的—→模式选择")
        elif "无" in self_selection:
            self_selection = ""
            print("未输入健身目的，自动制定计划")
    client = mqtt.Client()
    client.username_pw_set(username, password)
    client.on_message = on_message
    client.connect(broker, port)
    client.subscribe(topic)
    client.loop_start()
    while True:
        if ("身体部位" not in self_selection) and ("运动类型" not in self_selection) and ("返回上一页" not in go_back):
            time.sleep(1)
        elif ("身体部位" in self_selection) or ("运动类型" in self_selection):
            go_back = ""
            break
        else:
            break
    # 停止MQTT消息循环
    client.loop_stop()

def ai_no_voice():
    global ex_aim, go_back, gender, weight, height, age, confirm
    droid.ttsSpeak("请输入健身目的如我想在30天内减肥3公斤等，也可点击确认跳过")
    get_ex_aim()#获取健身目的
    print("test", ex_aim)
    if "返回上一页" in go_back:
        ex_aim = ""
        print("返回上一页 AI无语音—→模式选择")
        return 1
    elif ex_aim == "健身目的：":
        ex_aim = ""
    print("test1", ex_aim)
    days, action, weight_lossorgain = extract_info(ex_aim)#  提取ex_aim文字作为参数
    print(gender, float(weight), float(height), int(age), action, weight_lossorgain, days)
    plan = plan_make(gender, float(weight), float(height), int(age), action, weight_lossorgain, days)  # 制定计划
    print(plan)
    publish_mqtt_message("Aisports", plan)#上传计划至app
    get_confirm()# 计划确认
    if "返回上一页" in go_back:
        confirm = ""
        print("返回上一页 AI无语音—→模式选择")
        return 1
    sport_namelist, num_or_time = get_plan_args(plan)
    print(sport_namelist, num_or_time)
    print(sport_namelist, num_or_time, "开始进行运动检测")
    execution_plan(sport_namelist, num_or_time)

def ai_with_voice():
    global voice_txt, go_back, gender, weight, height, age, confirm
    droid.ttsSpeak("请语音输入健身目的如我想在30天内减肥3公斤")
    get_client_voice()
    if "返回上一页" in go_back:
        voice_txt = ""
        print("返回上一页 AI语音—→模式选择")
        return 1
    elif voice_txt == "健身目的：":
        voice_txt = ""
    days, action, weight_lossorgain = extract_info(voice_txt)  # 提取ex_aim文字作为参数
    print(gender, float(weight), float(height), int(age), action, weight_lossorgain, days)
    plan = plan_make(gender, float(weight), float(height), int(age), action, weight_lossorgain, days)  # 制定计划
    print(plan)
    publish_mqtt_message("Aisports", plan)  # 上传计划至app
    get_confirm()  # 计划确认
    if "返回上一页" in go_back:
        confirm = ""
        print("返回上一页 AI无语音—→模式选择")
        return 1
    sport_namelist, num_or_time = get_plan_args(plan)
    print(sport_namelist, num_or_time)
    print(sport_namelist, num_or_time, "开始进行运动检测")
    execution_plan(sport_namelist, num_or_time)

def custome_mode():
    global go_back, self_selection, bodypart,confirm
    get_self_selection()   #获取健身自定义模式目的
    print("test", self_selection)
    if "返回上一页" in go_back:
        self_selection = ""
        print("返回上一页 自定义—→模式选择")
        return 1
    print(self_selection)
    if self_selection == "身体部位":
        print("进入部位锻炼模块")
        body_custome_mode()
    elif self_selection == "运动类型":
        ex_type_custome_mode()
    days, action, weight_lossorgain = extract_info(ex_aim)#  提取ex_aim文字作为参数
    print(gender, float(weight), float(height), int(age), action, weight_lossorgain, days)
    plan = plan_make(gender, float(weight), float(height), int(age), action, weight_lossorgain, days)  # 制定计划
    print(plan)
    publish_mqtt_message("Aisports", plan)#上传计划至app
    get_confirm()#获取计划确认
    if "返回上一页" in go_back:
        confirm = ""
        print("返回上一页 自定义—→模式选择")
        return 1

def body_custome_mode():
    global go_back, bodypart
    get_bodypart()
    if "返回上一页" in go_back:
        bodypart = ""
        print("返回上一页 自定义—→模式选择")
        return 1
    recommend_sportslist = muscle2sportsname(bodypart)
    print(recommend_sportslist)
    if "返回上一页" in go_back:
        bodypart = ""
        print("返回上一页 自定义—→模式选择")
        return 1




def ex_type_custome_mode():
    global go_back, ex_type
    get_ex_type()
    if "返回上一页" in go_back:
        ex_type = ""
        print("返回上一页 自定义—→模式选择")
        return 1

c = 0
droid.ttsSpeak("欢迎使用AidLux智能健身语音助手")
while True:
    get_client_data()
    sport_namelist, num_or_time = calculate_weight_range(float(age), float(height))
    if c == 0:
        droid.ttsSpeak("用户正常体重范围在" + str(sport_namelist) + "千克，到" + str(num_or_time)+"千克")
        c += 1
    if float(weight) < sport_namelist:
        print("体重过轻")
        droid.ttsSpeak("当前用户体重过轻")
    if float(weight) > sport_namelist:
        print("体重超重")
        droid.ttsSpeak("当前用户体重超重")

    while True:
        get_mode()
        if mode == "智能AI非语音模式":
            print(mode)
            ai_no_voice()
            mode = ""
            if "返回上一页" in go_back:
                go_back = ""
                break
        elif mode == "智能AI语音模式":
            droid.ttsSpeak("智能AI语音模式")
            print(mode)
            ai_with_voice()
            mode = ""
            if "返回上一页" in go_back:
                go_back = ""
                break
        elif mode == "用户自定义模式":
            print(mode)
            custome_mode()

        elif "返回上一页" in go_back:
            go_back = ""
            gender = age = height = weight = ""
            print("返回上一页111", go_back,)
            break

