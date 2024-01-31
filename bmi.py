import android
import time

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

# 获取用户输入
gender = "男"
height = 170
weight = 80
age = 22
droid.ttsSpeak("已获取用户信息")
droid.ttsSpeak("性别"+gender+"身高"+str(height)+"体重"+str(weight)+"年龄"+str(age))
# 计算BMI指数
bmi = calculate_bmi(height, weight)

# 判断肥胖程度
obesity = assess_obesity(bmi)
droid.ttsSpeak("根据用户信息计算bmi指数可得身体情况为"+obesity)
droid.ttsSpeak("正在根据身体指标制定计划")
time.sleep(2)
droid.ttsSpeak("计划制定完成")


# 根据年龄和肥胖程度输出建议的运动计划
if age < 18:
    if obesity == "体重过轻":
        print("建议运动：跳绳、俯卧撑、深蹲")
    elif obesity == "正常体重":
        print("建议运动：跳绳、俯卧撑、深蹲、平板支撑")
    else:
        print("建议运动：跳绳、引体向上、深蹲、平板支撑")
else:
    if obesity == "体重过轻":
        print("建议运动：跳绳、俯卧撑、深蹲、平板支撑")
    elif obesity == "正常体重":
        print("建议运动：跳绳、俯卧撑、深蹲、平板支撑、引体向上")
    else:
        print("建议运动：跳绳、俯卧撑、深蹲、平板支撑、引体向上")