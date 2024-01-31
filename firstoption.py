import os
import cv2
from cvs import *
import signal
import android
import qiniu_upload
import miao_test
# 获取当前进程的进程号
pids = os.listdir('/proc')
for pid in pids: 
    try:
        path = '/proc/' + pid + '/cmdline'  
        with open(path) as f:
            cmdline = f.read()
            if 'firstoption.py' in cmdline:   
                skip_pid = pid
    except:
        pass
os.system("python3 app.py")
os.kill(int(skip_pid), signal.SIGTERM)



