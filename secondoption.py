import os
import cv2
from cvs import *
import signal
import android
import qiniu_upload
import miao_test
droid = android.Android()
# # 获取当前进程的进程号
# pids = os.listdir('/proc')
# for pid in pids: 
#     try:
#         path = '/proc/' + pid + '/cmdline'  
#         with open(path) as f:
#             cmdline = f.read()
#             if 'sd.py' in cmdline:   
#                 skip_pid = pid
#     except:
#         pass
os.system("python3 skippingcounter.py")

os.system("python3 jtsd.py")
# 调用引体向上模块 
os.system("python3 chinup.py")

# bg_img = cv2.imread('./image/Aicoach.png')
# cvs.imshow(bg_img)
# os.kill(int(skip_pid), signal.SIGTERM)

droid.ttsSpeak("运动检测完成，现在开始数据上行")
qiniu_upload.qiniu_upload_file("./outputvideo/rope_skip.avi",f"rope_skip/rope_skip{str(qiniu_upload.beijing_time_1)}.avi")                        
qiniu_upload.qiniu_upload_file("./outputvideo/push_up.avi",f"static_squat/static_squat{str(qiniu_upload.beijing_time_1)}.avi")                        
miao_test.send_note(f"rope_skip/rope_skip")
miao_test.send_note(f"static_squat/static_squat")
droid.ttsSpeak("数据上行完成，请注意在公众号上查收")
