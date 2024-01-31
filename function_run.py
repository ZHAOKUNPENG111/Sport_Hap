# # import sd,jtsd,pbzc,fwc
# import os
# import time
# import sys
# import subprocess

# # 定义新的参数
# video_path = "./test1.mp4"  # 视频路径
# exercise_type = "squat"  # 锻炼类型
# exercise_type1 = "static_squat"  # 锻炼类型

# # # 构建命令列表
# # command = ["python3", "sd.py", "aicoach", video_path, exercise_type]
# # # 执行命令
# # subprocess.run(command)
# subprocess.run(["python3", "jtsd.py", "aicoach", video_path, "static_squat"])

# sd.aicoach("./video/mysd.mp4", "squat")
# jtsd.aicoach("./video/mysd.mp4", "static_squat")
# fwc.aicoach("./video/myfwc.mp4", "push_up")
# pbzc.aicoach("./video/mypbzc.mp4", "plank")
# video_path = "./test1.mp4"
# exercise_type = "squat"
# # 调用命令并传递参数
# # command = f"python3 sd.py aicoach('{video_path}', '{exercise_type}')"
# # os.system(command)

# # os.system("python3 jtsd.py")
# # os.system("python3 pbzc.py")
# # os.system("python3 fwc.py")
# os.system("python3 clean.py")



# # os.kill(sd.pid, 9)  # 9表 示SIGKILL信号，用于强制终止进程

# # os.system("python3 chinup.py")
# # os.system("python3 chinup.py")

import os, multiprocessing,time
import fwc1,sd1,jtsd1,ytxs1,pbzc1,ts1
# import socket

def get_current_process_id():
    current_process = multiprocessing.current_process()
    return current_process.pid

def ytxs_run():    
    def ytxs_process():
        ytxs_pid = get_current_process_id()
        ytxs1.app.run(host = '0.0.0.0',port = 50004, debug = True)
    ytxs_process = multiprocessing.Process(target=ytxs_process)
    ytxs_process.start()
    ytxs_process.join()
    ytxs_process.terminate()
def fwc_run(): 
    def fwc_process():
        fwc_pid = get_current_process_id()
        fwc1.app.run(host = '0.0.0.0',port = 50004, debug = True)
    fwc_process = multiprocessing.Process(target=fwc_process)
    fwc_process.start()
    fwc_process.join()
    fwc_process.terminate()
def jtsd_run():    
    def jtsd_process():
        jtsd_pid = get_current_process_id()
        jtsd1.app.run(host = '0.0.0.0',port = 50004, debug = True)
    jtsd_process = multiprocessing.Process(target=jtsd_process)
    jtsd_process.start()
    jtsd_process.join()
    jtsd_process.terminate()
def sd_run():    
    def sd_process():
        sd_pid = get_current_process_id()
        sd1.app.run(host = '0.0.0.0',port = 50004, debug = True)
    sd_process = multiprocessing.Process(target=sd_process)
    sd_process.start()
    sd_process.join()
    sd_process.terminate()
def pbzc_run():    
    def pbzc_process():
        pbzc1.app.run(host = '0.0.0.0',port = 50004, debug = True)
    pbzc_process = multiprocessing.Process(target=pbzc_process)
    pbzc_process.start()
    pbzc_process.join()
    pbzc_process.terminate()
def ts_run():    
    def ts_process():
        ts1.app.run(host = '0.0.0.0',port = 50004, debug = True)
    ts_process = multiprocessing.Process(target=ts_process)
    ts_process.start()
    ts_process.join()
    ts_process.terminate()
if __name__ == "__main__":
    fwc_run()
    # ytxs_run()

# # 清理端口
# app_run_result.shutdown(socket.SHUT_RDWR)
# app_run_result.close()
# 清理端口
