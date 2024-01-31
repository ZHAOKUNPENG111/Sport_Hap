import { oneWeekDictFunc } from '@bundle:com.example.healthy_life/entry/ets/common/utils/Utils';
/**
 * TaskInfo
 *
 * @param id
 * @param date
 * @param taskID
 * @param targetValue
 * @param isAlarm
 * @param startTime
 * @param endTime
 * @param frequency
 * @param isDone
 * @param doneValue
 * @param isOpen
 */
export default class TaskInfo {
    constructor(id, date, taskID, targetValue, isAlarm, startTime, endTime, frequency, isDone, finValue, isOpen = false) {
        this.id = id;
        this.date = date;
        this.taskID = taskID;
        this.targetValue = targetValue;
        this.isAlarm = isAlarm;
        this.startTime = startTime;
        this.endTime = endTime;
        this.frequency = frequency;
        this.isDone = isDone;
        this.finValue = finValue;
        this.isOpen = isOpen;
    }
}
export var taskType;
(function (taskType) {
    taskType[taskType["getup"] = 1] = "getup";
    taskType[taskType["drinkWater"] = 2] = "drinkWater";
    taskType[taskType["eatApple"] = 3] = "eatApple";
    taskType[taskType["smile"] = 4] = "smile";
    taskType[taskType["brushTeeth"] = 5] = "brushTeeth";
    taskType[taskType["sleepEarly"] = 6] = "sleepEarly";
})(taskType || (taskType = {}));
export const oneWeek = oneWeekDictFunc();
//# sourceMappingURL=TaskInfo.js.map