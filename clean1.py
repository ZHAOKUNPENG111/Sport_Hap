import gc
import os
import signal
# 获取当前进程的ID
# 获取进程号
# pids = os.listdir('/proc')
# for pid in pids:
#     try:
#         path = '/proc/' + pid + '/cmdline'
#         with open(path) as f:
#             cmdline = f.read()
#             if 'clean.py' in cmdline:
#                 skip_pid = pid
#     except:
#         pass
def clean_():
    # 收集垃圾
    gc.collect()

    # 清理循环引用
    gc.garbage.clear()

    # 清理内存资源
    gc.set_threshold(0)

# 打印清理结果
print("已清理内存资源")

# os.kill(int(skip_pid), signal.SIGTERM)
