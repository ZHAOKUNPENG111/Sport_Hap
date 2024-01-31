import {
  EVERYDAY,
  GLOBAL_KEY,
  DRINK_STEP,
  DRINK_MAX_RANGE,
  EAT_APPLE_RANGE,
  TIMES_100
} from '../common/constants/CommonConstants';
import Logger from '../common/utils/Logger';
import reminder from '../service/ReminderAgent';
import TaskInfoApi from '../common/database/tables/TaskInfoApi';
import { padTo2Digits } from '../common/utils/Utils';
import TaskInfo, { oneWeek } from '../common/bean/TaskInfo';
import { TaskMapById, RemindContentMap, ITaskItem } from '../model/TaskInitList';

const { publishReminder, cancelReminder, hasNotificationId } = reminder;
export const taskOriginData: ITaskItem[] = Object.keys(TaskMapById).map(item => {
  return TaskMapById[item];
})

/**
 * @description Get all task status
 * @return object[] Database query results
 */
export const getAllTask = async () => {
  return new Promise((resolve) => {
    TaskInfoApi.query(GLOBAL_KEY, true, (res) => {
      if (res?.length === 0) {
        Logger.warn('queryTaskList', 'has no data!!');
        resolve(res ?? []);
      }
      resolve(res);
    })
  });
}

/**
 * @description Call notification capability
 * @param params {
 *  hour: Hour
 *  minute: Minute
 *  daysOfWeek: Frequency of a week
 *  title: Notice Title
 *  content: Contents of notice
 *  notificationId: Notification ID
 */
const useReminder = (params: TaskInfo, context: Context) => {
  try {
    publishReminder({
      hour: Number(params?.startTime.split(':')[0]),
      minute: Number(params?.startTime.split(':')[1]),
      daysOfWeek: params?.frequency.split(',').map(item => Number(item)),
      title: RemindContentMap[params?.taskID].title,
      content: RemindContentMap[params?.taskID].content,
      notificationId: params?.taskID,
    }, context);
  } catch (error) {
    Logger.error('publishReminder', JSON.stringify(error));
  }
}

/**
 * @description Call cancel notification capability
 * @param reminderId Notification ID
 */
const useCancelReminder = (reminderId: number, context: Context) => {
  try {
    cancelReminder(reminderId, context);
  } catch (error) {
    Logger.error('cancelReminder', JSON.stringify(error));
  }
}

/**
 * @description Determine whether there is a notification
 * @param notificationId Notification ID
 */
const isHasNotificationId = (notificationId: number) => {
  return new Promise((resolve) => {
    resolve(hasNotificationId(notificationId));
  });
}

/**
 * @param params:TaskInfo
 */
export const addTask = (params: TaskInfo, context: Context) => {
  if (!params) {
    Logger.error('addTask', 'params is null!');
    return;
  }
  return new Promise((resolve, reject) => {
    Logger.info('TaskViewModel', 'addTask');
    if (params?.isOpen) {
      if (params?.isAlarm) {
        useReminder(params, context);
      } else {
        isHasNotificationId(params?.taskID).then(flag => {
          if (flag) {
            useCancelReminder(params.taskID, context);
          }
        });
      }
    } else {
      isHasNotificationId(params?.taskID).then(flag => {
        if (flag) {
          useCancelReminder(params.taskID, context);
        }
      });
    }
    TaskInfoApi.updateDataByDate(params, (flag) => {
      if (!flag) {
        Logger.error('insertTaskSetting', 'updateTaskSetting Error!');
        reject(flag);
      }
      resolve(flag);
    });
    TaskInfoApi.updateDataByDate({ ...params, date: new Date().toDateString(), isDone: true }, (flag) => {
      if (!flag) {
        Logger.error('insertTaskSetting', 'updateTaskSetting Error!');
        reject(flag);
      }
      resolve(flag);
    });
  });
}

/**
 * @description Used to initialize task list data from database data
 * @param taskInitList Task list initial data
 * @param taskInfoData Database query data
 */
export const taskIndexDataInit = (taskInitList, taskInfoData) => {
  const afterInitData = taskInitList.map((content) => {
    taskInfoData.forEach((item) => {
      if (item?.taskID === content?.taskID) {
        content.isOpen = item?.isOpen;
        content.targetValue = item?.targetValue;
        content.isAlarm = item?.isAlarm;
        content.startTime = item?.startTime;
        content.endTime = item?.endTime;
        content.frequency = item?.frequency;
      }
    });
    return content;
  });
  return afterInitData;
}

/**
 * @description format data as json string
 * @param params = {}
 */
export const formatParams = (params = {}) => {
  return JSON.stringify(params);
}

/**
 * @description Initialization frequency string
 * @param frequencyIdCollection
 * @return string Frequency string
 */
export const initFrequencyString = (frequencyIdCollection) => {
  if (frequencyIdCollection === '') {
    return EVERYDAY;
  }
  const frequencyIdArray = frequencyIdCollection.split(',').map(item => Number(item));
  const length = frequencyIdArray.length;
  if (length === 7) {
    return EVERYDAY;
  }
  const frequencyString = frequencyIdArray.reduce((pre, current) => {
    return pre + ' ' + oneWeek[current];
  }, '')
  return frequencyString;
}

/**
 * @description Returns the timestamp of today's selected time
 * @param currentTime
 * @return timestamp
 */
export function returnTimeStamp(currentTime: string) {
  const timeString = `${new Date().toDateString()} ${currentTime}`;
  return new Date(timeString).getTime();
}

/**
 * @description It is used for formatting time and displayed in the form of HH: mm
 * @param value
 */
export const formatTime = (value: TimePickerResult) => {
  return `${padTo2Digits(value?.hour)}:${padTo2Digits(value?.minute)}`;
}

/**
 * @description Range of generated drinking water 0.25 - 5 L
 * @return Array<string>
 */
export const createDrinkRange = () => {
  const drinkRangeArr = []
  for (let i = 1; i <= EAT_APPLE_RANGE; i++) {
    drinkRangeArr.push(`${i} 秒`);
  }
  return drinkRangeArr;
}

/**
 * @description Range of generated smile
 * @return Array<string>
 */
export const createSmileRange = () => {
  const smileRangeArr = []
  for (let i = 1; i <= EAT_APPLE_RANGE; i++) {
    smileRangeArr.push(`${i} 个`);
  }
  return smileRangeArr;
}

/**
 * @description Range of generated brushTeeth
 * @return Array<string>
 */
export const createBrushTeethRange = () => {
  const brushTeethRangeArr = []
  for (let i = 1; i <= EAT_APPLE_RANGE; i++) {
    brushTeethRangeArr.push(`${i} 个`);
  }
  return brushTeethRangeArr;
}

/**
 * @description Range of generated drinking water 0.25 - 5 L
 * @return Array<string>
 */
export const createGetupRange = () => {
  const getUpRangeArr = []
  for (let i = 1; i <= EAT_APPLE_RANGE; i++) {
    getUpRangeArr.push(`${i} 个`);
  }
  return getUpRangeArr;
}

/**
 * @description Generate the range of eating apples 1 - 100
 * @return Array<string>
 */
export const createAppleRange = () => {
  const appleRangeArr = []
  for (let i = 1; i <= EAT_APPLE_RANGE; i++) {
    appleRangeArr.push(`${i} 个`);
  }
  return appleRangeArr;
}

export const createPeriodRange = () => {
  const ageRangeArr = []
  for (let i = 1; i <= 365; i++) {
    ageRangeArr.push(`${i} 天`);
  }
  return ageRangeArr;
}
export const createAgeRange = () => {
  const ageRangeArr = []
  for (let i = 5; i <= 90; i++) {
    ageRangeArr.push(`${i} 岁`);
  }
  return ageRangeArr;
}
export const createHeightRange = () => {
  const heightRangeArr = []
  for (let i = 100; i <= 300; i++) {
    heightRangeArr.push(`${i} cm/厘米`);
  }
  return heightRangeArr;
}
export const createWeightRange = () => {
  const weightRangeArr = []
  for (let i = 20; i <= 200; i++) {
    weightRangeArr.push(`${i} kg/公斤`);
  }
  return weightRangeArr;
}
/**
 * @description Generate the range of Chinup 1 - 100
 * @return Array<string>
 */
export const createJtsdRange = () => {
  const JtsdRangeArr = []
  for (let i = 1; i <= EAT_APPLE_RANGE; i++) {
    JtsdRangeArr.push(`${i} 秒 `);
  }
  return JtsdRangeArr;
}