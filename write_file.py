import tempfile
import os

#写操作
def write_to_temp_file(data):
    # 获取当前文件所在的目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # 构建临时文件的路径
    temp_file_path = os.path.join(current_dir, 'temp_file.txt')

    # 创建临时文件
    with open(temp_file_path, 'w') as temp_file:
        # 将字符串数据写入临时文件
        temp_file.write(data)

    return temp_file_path


#读操作
def parse_data_from_temp_file(temp_file_path):
    # 打开临时文件并读取数据，指定编码方式为UTF-8
    with open(temp_file_path, 'r', encoding='utf-8') as temp_file:
        data = temp_file.read()
    # 打开临时文件并读取数据


    # 使用字符串处理方法解析数据
    parsed_data = {}
    entries = data.split(",")
    for entry in entries:
        key_value = entry.strip().split(":")
        if len(key_value) == 2:
            key = key_value[0].strip().strip("'")
            value = key_value[1].strip().strip("'")
            parsed_data[key] = value

    return parsed_data

if __name__ == '__main__':
    # # # 要写入的字符串数据
    # data = "'俯卧撑': '50 个', '引体向上': '50 个', '深蹲': '100 个', '静态深蹲': '20 分钟', '平板支撑': '6 分钟', '跳绳': '600 个'"
    
    # # 调用函数将字符串数据写入临时文件
    # temp_file_path = write_to_temp_file(data)
    
    # # 打开临时文件并读取数据
    # with open(temp_file_path, 'r') as temp_file:
    #     temp_data = temp_file.read()
    
    # print("临时文件路径:", temp_file_path)
    # print("临时文件内容:", temp_data)



    # 调用函数解析临时文件中的数据
    parsed_data = parse_data_from_temp_file("./temp_args.txt")

    # 打印解析后的数据
    for key, value in parsed_data.items():
        print("运动名称:", key)
        print("时间或个数:", value)
        # print()

