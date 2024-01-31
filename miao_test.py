
import time
import requests
from datetime import datetime
# from test2 import aid_env, ch_flag
# import execjs
import json

now = datetime.now()
current_time = now.strftime("%H:%M:%S")
def send_note(filename):
    # filename2 = None
    # filename3 = None
    # text2 = ""
    # text3 = ""
    id = 't18mLS4'  # string，喵码。指定发出的提醒，一个提醒对应一个喵码。（必填）

    text = '用户于'+ current_time +'完成训练' + '反馈视频链接如下：' + "http://rvga5hogv.hn-bkt.clouddn.com/" + filename  # string，提醒附加内容。收到的提醒时，会在标题换行后显示该内容，默认为空。
    # if filename2 is not None:
    #     text2 = '用户于'+ current_time +'完成训练' + '反馈视频链接如下：' + "http://rvga5hogv.hn-bkt.clouddn.com/" + filename2  # string，提醒附加内容。收到的提醒时，会在标题换行后显示该内容，默认为空。
    # if filename3 is not None:
    #     text3 = '用户于'+ current_time +'完成训练' + '反馈视频链接如下：' + "http://rvga5hogv.hn-bkt.clouddn.com/" + filename3  # string，提醒附加内容。收到的提醒时，会在标题换行后显示该内容，默认为空。

    ts = str(time.time())  # 时间戳
    print(ts)

    type = 'json'  # 返回内容格式

    request_url = "http://miaotixing.com/trigger?"

    # 伪装一个浏览器头发送请求（反爬的一个习惯操作，实际上不加请求头伪装也可以使用）
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36 Edg/87.0.664.47'}

    result = requests.post(request_url + "id=" + id + "&text=" + text + "&ts=" + ts + "&type=" + type, headers=headers)
    print(result)

    # aid_env("IotApp", "H8YQRouDZ", "_zVCEMEiHw", "192.168.80.133", "emqxsecret", text, "1")
    # ch_flag(0)
    # 执行JavaScript代码
    # # 读取JavaScript文件内容
    # with open("upload_data.js", "r", encoding="utf-8") as f:
    #     js_code = f.read()
    # ctx = execjs.compile(js_code)
    # # 在ctx.eval()中的字符串中使用占位符，例如"{0}"表示第一个参数的位置。     在调用ctx.eval()时，使用字符串的format()方法将text的值传递给占位符。
    # formatted_code = "device.uploadData('{0}', 'sample')".format(text)
    # # 执行JavaScript函数或代码
    # result = ctx.eval(formatted_code)
    # print(result)
    return text


def send_note2():
    id = 't18mLS4'  # string，喵码。指定发出的提醒，一个提醒对应一个喵码。（必填）

    text = '司机存在疲劳风险请注意'  # string，提醒附加内容。收到的提醒时，会在标题换行后显示该内容，默认为空。

    ts = str(time.time())  # 时间戳
    print(ts)

    type = 'json'  # 返回内容格式

    request_url = "http://miaotixing.com/trigger?"

    # 伪装一个浏览器头发送请求（反爬的一个习惯操作，实际上不加请求头伪装也可以使用）
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36 Edg/87.0.664.47'}

    result = requests.post(request_url + "id=" + id + "&text=" + text + "&ts=" + ts + "&type=" + type, headers=headers)
    print(result)


if __name__ == '__main__':
    send_note("1111/1")