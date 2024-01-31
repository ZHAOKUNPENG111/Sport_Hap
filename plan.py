import random

# # 计算每天需要消耗的卡路里
# # time = 60
# gender = "男"
# weight = 70
# height = 178
# age = 21

# target_weight_loss = 5  # 目标减肥的体重，千克
# days = 3  # 减肥的天数
def plan_make(gender, weight, height, age, target_weight_loss, days):
    calories_per_kg = 7700
    exercises_lose_weight = [
        ('俯卧撑', 0.1, 0.2),
        ('引体向上', 0.1, 0.1),
        ('深蹲', 0.5, 0.2),
        ('静态深蹲', 0.15, 0.1),
        ('平板支撑', 0.1, 0.01),
        ('跳绳', 1, 0.9)
    ]
    exercises_muscle = [
        ('俯卧撑', 0.1, 0.5),
        ('引体向上', 0.1, 0.4),
        ('深蹲', 0.5, 0.5),
        ('静态深蹲', 0.15, 0.3),
        ('平板支撑', 0.1, 0.4),
        ('跳绳', 1, 0.4)
    ]
    def generate_fitness_plan(target_calories, exercises):
        plan = {exercise[0]: 0 for exercise in exercises}  # 初始化运动计划
        total_calories = 0  # 初始化总卡路里消耗

        # 创建一个运动池，池中的每个运动出现的次数与其权重成正比
        exercise_pool = [exercise for exercise in exercises for _ in range(int(100 * exercise[2]))]

        while total_calories < target_calories:
            # 从运动池中随机选择一个运动
            selected_exercise = random.choice(exercise_pool)

            # 更新运动计划和总卡路里消耗
            plan[selected_exercise[0]] += (selected_exercise[1])
            total_calories += 1
        plan['俯卧撑'] = int(plan['俯卧撑'])
        plan['引体向上'] = int(plan['引体向上'])
        plan['深蹲'] = int(plan['深蹲'])
        plan['静态深蹲'] = int(plan['静态深蹲'])
        plan['跳绳'] = int(plan['跳绳'])
        plan['平板支撑'] = int(plan['平板支撑'])
        if 1:
            if plan['俯卧撑'] < 10:
                plan['俯卧撑'] = 0
            elif plan['俯卧撑'] > 50:
                plan['俯卧撑'] = 50
            if plan['引体向上'] < 10:
                plan['引体向上'] = 0
            elif plan['引体向上'] > 50:
                plan['引体向上'] = 50
            if plan['深蹲'] < 10:
                plan['深蹲'] = 0
            elif plan['深蹲'] > 100:
                plan['深蹲'] = 100
            if plan['静态深蹲'] < 1:
                plan['静态深蹲'] = 0
            elif plan['静态深蹲'] > 20:
                plan['静态深蹲'] = 20
            if plan['跳绳'] < 60:
                plan['跳绳'] = 0
            elif plan['跳绳'] > 600:
                plan['跳绳'] = 600
            if plan['平板支撑'] < 1:
                plan['平板支撑'] = 0
            elif plan['平板支撑'] > 20:
                plan['平板支撑'] = 20
        filtered_data = {key: value for key, value in plan.items() if value != 0}
        data_with_units = {key: f"{value} {'分钟' if key in ['静态深蹲', '平板支撑'] else '个'}" for key, value in
                           filtered_data.items()}
        data_with_units = str(data_with_units)
        # combined_data = [f"{key}: {value}" for key, value in data_with_units.items()]
        # print(str(data_with_units))
        data_str = data_with_units.replace("{", "").replace("}", "")

        return data_str
    # 定义运动
    bmr = 0
    if gender == '男':
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
    elif gender == '女':
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
    print("bmr:",bmr)
    daily_calories = target_weight_loss * (calories_per_kg - bmr) / days  # 每天运动需要消耗的卡路里
    planstr = "每天运动需要消耗的卡路里",int(daily_calories)
    # 生成健身计划
    fitness_plan = generate_fitness_plan(daily_calories, exercises_lose_weight)

    return fitness_plan, planstr

# plan_make(gender, weight, height, age, target_weight_loss, days)