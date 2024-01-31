from qiniu import Auth, put_file
# from qiniu import CdnManager
import os
import android
import datetime
import pytz
# 获取当前日期和时间
now = datetime.datetime.now()
# 创建时区对象
tz = pytz.timezone('Asia/Shanghai')

# 将当前时间转换为北京时间
beijing_time = now.astimezone(tz)
beijing_time_1 = beijing_time.strftime("%Y-%m-%d %H:%M:%S")

# 重构安卓方法
droid = android.Android()
# droid.ttsSpeak("运动视频开始上云")
access_key = "ZURbWDWDvZFdxrCDT0MeRVN2aOuU_a12l4sAUxFa"
secret_key = "DVmh4EXnmiO-VEHCLkmUBHlkcOgm8aMO_PflUg0N"
bucket_name = "aisports1"
bucket_url = "rzh40h2ip.hn-bkt.clouddn.com"
q = Auth(access_key, secret_key)
# cdn_manager = CdnManager(q)
# 构建鉴权对象
# 生成上传 Token，可以指定过期时间等参数
token = q.upload_token(bucket_name, None, 36000)

def qiniu_upload_file(localfile,key):#文件路径，上传为名字

    # 上传文件，None是文件名，指定None的话七牛云会自动生成一个文件名，也可以自己指定，但自己指定文件名时不能上传重复的文件
    ret, res = put_file(token, key, localfile)
    ret.get('key')
    print('done')
    print(ret)

    print(res)

    if res.status_code != 200:
        raise Exception("upload failed")
    # return ret, res


def qiniu_upload_folder(localpath):
    # localpath = './save'
    # 遍历本地文件夹，依次上传文件
    for root, dirs, files in os.walk(localpath):
        for file in files:
            # 本地文件的绝对路径
            localfile = os.path.join(root, file)
            # 上传到七牛云的文件名，使用相对路径，去掉本地文件夹路径前缀
            key = os.path.relpath(localfile, localpath)
            # 调用 put_file 方法上传文件
            ret, info = put_file(token, key, localfile)
            # 打印上传结果信息
            print(info)
            droid.ttsSpeak("运动数据已上传，请注意查收")

            # print('localfile:'+localfile)
            # print('key:'+key)

# def upload_img(bucket_name, file_name, file_path):
#     token = q.upload_token(bucket_name, file_name)
#     put_file(token, file_name, file_path)

# def get_img_url(bucket_url, key):
#     img_url = 'http://%s%s' % (bucket_url, key)
#     return img_url

# image_up_name = "./save"

# urls = [localfile]
# refresh_url_result = cdn_manager.refresh_urls(urls)
i = 0
list_=[]
if __name__ == '__main__':
    # list_.append()
    # while True:
    # save_name = "{}.mp4".format(i+1)
    # list_.append(save_name)
    qiniu_upload_file("./outputvideo/chinup.avi","chinup" + str(beijing_time_1)+".avi")
    qiniu_upload_file("./outputvideo/rope_skip.avi", "rope_skip" + str(beijing_time_1) + ".avi")
    qiniu_upload_file("./outputvideo/plank.avi", "plank" + str(beijing_time_1) + ".avi")
    qiniu_upload_file("./outputvideo/pushup.avi", "push_up" + str(beijing_time_1) + ".avi")
    qiniu_upload_file("./outputvideo/squat.avi", "sd" + str(beijing_time_1) + ".avi")
    qiniu_upload_file("./outputvideo/static_squat.avi", "static_squat" + str(beijing_time_1) + ".avi")
    chinup_url = "http://rzh40h2ip.hn-bkt.clouddn.com/chinup" + str(beijing_time_1)+".avi"
    # i=i+1