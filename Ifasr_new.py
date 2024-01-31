# -*- coding: utf-8 -*-
import base64
import hashlib
import hmac
import json
import os
import time
import requests
import urllib

lfasr_host = 'https://raasr.xfyun.cn/v2/api'
# 请求的接口名
api_upload = '/upload'
api_get_result = '/getResult'


class RequestApi(object):
    def __init__(self, appid, secret_key, upload_file_path):
        self.appid = appid
        self.secret_key = secret_key
        self.upload_file_path = upload_file_path
        self.ts = str(int(time.time()))
        self.signa = self.get_signa()

    def get_signa(self):
        appid = self.appid
        secret_key = self.secret_key
        m2 = hashlib.md5()
        m2.update((appid + self.ts).encode('utf-8'))
        md5 = m2.hexdigest()
        md5 = bytes(md5, encoding='utf-8')
        # 以secret_key为key, 上面的md5为msg， 使用hashlib.sha1加密结果为signa
        signa = hmac.new(secret_key.encode('utf-8'), md5, hashlib.sha1).digest()
        signa = base64.b64encode(signa)
        signa = str(signa, 'utf-8')
        return signa


    def upload(self):
        print("上传部分：")
        upload_file_path = self.upload_file_path
        file_len = os.path.getsize(upload_file_path)
        file_name = os.path.basename(upload_file_path)

        param_dict = {}
        param_dict['appId'] = self.appid
        param_dict['signa'] = self.signa
        param_dict['ts'] = self.ts
        param_dict["fileSize"] = file_len
        param_dict["fileName"] = file_name
        param_dict["duration"] = "200"
        print("upload参数：", param_dict)
        data = open(upload_file_path, 'rb').read(file_len)

        response = requests.post(url =lfasr_host + api_upload+"?"+urllib.parse.urlencode(param_dict),
                                headers = {"Content-type":"application/json"},data=data)
        print("upload_url:",response.request.url)
        result = json.loads(response.text)
        print("upload resp:", result)
        return result


    def get_result(self):
        uploadresp = self.upload()
        orderId = uploadresp['content']['orderId']
        param_dict = {}
        param_dict['appId'] = self.appid
        param_dict['signa'] = self.signa
        param_dict['ts'] = self.ts
        param_dict['orderId'] = orderId
        param_dict['resultType'] = "transfer,predict"
        print("")
        print("查询部分：")
        # print("get result参数：", param_dict)
        status = 3
        # 建议使用回调的方式查询结果，查询接口有请求频率限制
        while status == 3:
            response = requests.post(url=lfasr_host + api_get_result + "?" + urllib.parse.urlencode(param_dict),
                                     headers={"Content-type": "application/json"})
            # print(response.text)
            # print("get_result_url:",response.request.url)
            result = json.loads(response.text)
            # order_result = result['content']['orderResult']
            # print(order_result)
            # value_w = order_result["lattice"][0]["json_1best"]["st"]["rt"][0]["ws"][0]["cw"][0]["w"]
            # value_og = order_result["lattice"][0]["json_1best"]["st"]["rt"][0]["ws"][0]["cw"][0]["og"]
            # print(value_w+value_og)
            status = result['content']['orderInfo']['status']
            print("status=",status)
            if status == 4:
                break
            # time.sleep(5)
        # print("get_result resp:",result)
        return result

# {'code': '000000', 'descInfo': 'success', 'content': {'orderInfo': {'orderId': 'DKHJQ2023071612290311552u3UtsWttNWCE8i', 'failType': 11, 'status': -1, 'originalDuration': 200, 'realDuration': 4921, 'expireTime': 1689740823766}, 'orderResult': '{"lattice":[{"json_1best":"{\\"st\\":{\\"sc\\":\\"0.00\\",\\"pa\\":\\"0\\",\\"rt\\":[{\\"ws\\":[{\\"cw\\":[{\\"w\\":\\"12345678901234567890123\\",\\"og\\":\\"幺二三四五六七八九零幺二三四五六七八九零幺二三\\",\\"wp\\":\\"n\\",\\"wc\\":\\"0.0000\\"}],\\"wb\\":1,\\"we\\":444},{\\"cw\\":[{\\"w\\":\\". \\",\\"og\\":\\".\\",\\"wp\\":\\"p\\",\\"wc\\":\\"0.0000\\"}],\\"wb\\":444,\\"we\\":444},{\\"cw\\":[{\\"w\\":\\"\\",\\"wp\\":\\"g\\",\\"wc\\":\\"0.0000\\"}],\\"wb\\":444,\\"we\\":444}]}],\\"bg\\":\\"370\\",\\"rl\\":\\"0\\",\\"ed\\":\\"4880\\"}}"}],"lattice2":[{"lid":"0","end":"4880","begin":"370","json_1best":{"st":{"sc":"0.00","pa":"0","rt":[{"nb":"1","nc":"1.0","ws":[{"cw":[{"w":"12345678901234567890123","og":"幺二三四五六七八九零幺二三四五六七八九零幺二三","wp":"n","wc":"0.0000"}],"wb":1,"we":444},{"cw":[{"w":". ","og":".","wp":"p","wc":"0.0000"}],"wb":444,"we":444},{"cw":[{"w":"","wp":"g","wc":"0.0000"}],"wb":444,"we":444}]}],"pt":"reserved","bg":"370","si":"0","rl":"0","ed":"4880"}},"spk":"段落-0"}]}', 'taskEstimateTime': 0}}

def voice_save(savepath,times):
    roll = 0
    droid.recorderStartMicrophone(savepath)
    while roll < times:
        roll += 1
        print(roll)
        time.sleep(1)
    droid.recorderStop()
    return savepath

def voice_txt(filepath):
    words = []
    api = RequestApi(appid="d8671d83",
                     secret_key="1c8ac4e7f0993540a46570dbf2c3d4b2",
                     # upload_file_path=r"audio/lfasr_涉政.wav")
                     # upload_file_path=r"audios/input.wav")
                     upload_file_path= filepath)

    result = api.get_result()
    order_result = result['content']['orderResult']
    # print(result)
    # print(order_result)
    # 转换为标准的JSON字符串
    json_str = json.loads(order_result)


    json_str = json_str['lattice'][0]['json_1best']
    json_str = json.loads(json_str)
    word = json_str["st"]["rt"][0]['ws']
    for item in word:
        for word in item["cw"]:
            words.append(word["w"])
    print(words)
    return words



# 输入讯飞开放平台的appid，secret_key和待转写的文件路径
if __name__ == '__main__':
    # voiceadd("./temp./1.wav",15)#参数为录制循环的次数（时间长度）
    a()
