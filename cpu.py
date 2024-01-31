import psutil

# 获取 CPU 使用率
cpu_percent = psutil.cpu_percent(interval=1)

# 获取每个 CPU 核心的使用率
cpu_percent_per_core = psutil.cpu_percent(interval=1, percpu=True)

# 打印 CPU 使用率
print(f"总体 CPU 使用率：{cpu_percent}%")

for i, percent in enumerate(cpu_percent_per_core):
    print(f"CPU 核心 {i+1} 使用率：{percent}%")