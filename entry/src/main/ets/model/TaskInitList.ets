import TaskInfo from '../common/bean/TaskInfo';
import {
  GET_UP_TASK_NAME,
  DRINK_TASK_NAME,
  EAT_APPLE_TASK_NAME,
  SMILE_TASK_NAME,
  BRUSH_TEETH_TASK_NAME,
  SLEEP_TASK_NAME,
  GET_UP_CONTENT,
  DRINK_CONTENT,
  EAT_APPLE_CONTENT,
  SMILE_CONTENT,
  BRUSH_TEETH_CONTENT,
  SLEEP_CONTENT
} from '../common/constants/CommonConstants';

export interface ITaskItem {
  taskID: number;
  taskName: Resource;
  isOpen: boolean;
  unit: string;
  icon: Resource;
  dialogBg: Resource;
  targetValue: string;
  isAlarm: boolean;
  startTime: string;
  endTime: string;
  frequency: string;
  isInit: boolean;
  step: number;
}

export interface TaskInitListType {
  [key: number]: ITaskItem;
}

export interface FrequencyContentType {
  id: number,
  label: string,
  isChecked: boolean
}

export const TaskList: TaskInfo[] = [
  {
    id: 0,
    taskID: 1,
    isOpen: true,
    date: '',
    targetValue: '7:00',
    isAlarm: true,
    startTime: '',
    endTime: ';',
    frequency: '',
    isDone: false,
    finValue: ''
  },
  {
    id: 1,
    taskID: 2,
    isOpen: true,
    date: '',
    targetValue: '1',
    isAlarm: true,
    startTime: '',
    endTime: ';',
    frequency: '',
    isDone: false,
    finValue: ''
  },
  {
    id: 2,
    taskID: 3,
    isOpen: true,
    date: '',
    targetValue: '3',
    startTime: '08: 00',
    endTime: '',
    isAlarm: true,
    frequency: '',
    isDone: false,
    finValue: ''
  },
  {
    id: 3,
    taskID: 4,
    isOpen: true,
    date: '',
    targetValue: '1',
    isAlarm: true,
    startTime: '',
    endTime: ';',
    frequency: '',
    isDone: false,
    finValue: ''
  },
  {
    id: 4,
    taskID: 5,
    isOpen: true,
    date: '',
    targetValue: '21:30',
    isAlarm: true,
    startTime: '',
    endTime: ';',
    frequency: '',
    isDone: false,
    finValue: ''
  },
  {
    id: 5,
    taskID: 6,
    isOpen: true,
    date: '',
    targetValue: '22:00',
    isAlarm: true,
    startTime: '',
    endTime: ';',
    frequency: '',
    isDone: false,
    finValue: ''
  }
]

export const AchievementMap = {
  '3_off': $r('app.media.ic_badge_3_off'),
  '3_on': $r('app.media.ic_badge_3_on'),
  '7_off': $r('app.media.ic_badge_7_off'),
  '7_on': $r('app.media.ic_badge_7_on'),
  '30_off': $r('app.media.ic_badge_30_off'),
  '30_on': $r('app.media.ic_badge_30_on'),
  '50_off': $r('app.media.ic_badge_50_off'),
  '50_on': $r('app.media.ic_badge_50_on'),
  '73_off': $r('app.media.ic_badge_73_off'),
  '73_on': $r('app.media.ic_badge_73_on'),
  '99_off': $r('app.media.ic_badge_99_off'),
  '99_on': $r('app.media.ic_badge_99_on')
}


export const TaskMapById: TaskInitListType = {
  1: {
    taskID: 1,
    taskName: $r('app.string.task_morning'),
    icon: $r("app.media.ic_chinup"),
    dialogBg: $r('app.media.ic_dialog_chinup'),
    targetValue: '1',
    isOpen: false,
    unit: '个',
    step: 0,
    isInit: true,
    isAlarm: false,
    startTime: '08: 00',
    endTime: '00: 00',
    frequency: '1, 2, 3, 4, 5, 6, 7'
  },
  2: {
    taskID: 2,
    taskName: $r('app.string.task_water'),
    icon: $r("app.media.ic_plank"),
    dialogBg: $r('app.media.ic_dialog_plank'),
    targetValue: '1',
    isOpen: false,
    unit: '秒',
    step: 0,
    isInit: true,
    isAlarm: false,
    startTime: '08: 00',
    endTime: '00: 00',
    frequency: '1, 2, 3, 4, 5, 6, 7'
  },
  3: {
    taskID: 3,
    taskName: $r('app.string.task_apple'),
    icon: $r("app.media.ic_pushup"),
    dialogBg: $r('app.media.ic_dialog_pushup'),
    targetValue: '1',
    isOpen: false,
    unit: '个',
    step: 1,
    isInit: true,
    isAlarm: false,
    startTime: '08: 00',
    endTime: '00: 00',
    frequency: '1, 2, 3, 4, 5, 6, 7'
  },
  4: {
    taskID: 4,
    taskName: $r('app.string.task_smile'),
    icon: $r("app.media.ic_skip"),
    dialogBg: $r('app.media.ic_dialog_skip'),
    targetValue: '1',
    isOpen: false,
    unit: '个',
    step: 0,
    isInit: true,
    isAlarm: false,
    startTime: '08: 00',
    endTime: '00: 00',
    frequency: '1, 2, 3, 4, 5, 6, 7'
  },
  5: {
    taskID: 5,
    taskName: $r('app.string.task_brush'),
    icon: $r("app.media.ic_squat"),
    dialogBg: $r('app.media.ic_dialog_squat'),
    targetValue: '1',
    isOpen: false,
    unit: '个',
    step: 0,
    isInit: true,
    isAlarm: false,
    startTime: '08: 00',
    endTime: '00: 00',
    frequency: '1, 2, 3, 4, 5, 6, 7'
  },
  6: {
    taskID: 6,
    taskName: $r('app.string.task_night'),
    icon: $r("app.media.ic_jtsd"),
    dialogBg: $r('app.media.ic_dialog_jtsd'),
    targetValue: '1',
    isOpen: false,
    unit: '秒',
    step: 0,
    isInit: true,
    isAlarm: false,
    startTime: '08: 00',
    endTime: '00: 00',
    frequency: '1, 2, 3, 4, 5, 6, 7'
  }
}

export const TaskItem: TaskInfo = {
  id: 1,
  taskID: 0,
  isOpen: false,
  date: '',
  targetValue: '7:00',
  isAlarm: true,
  startTime: 'string',
  endTime: 'string;',
  frequency: '',
  isDone: true,
  finValue: '6:58'
};

export const RemindContentMap = {
  1: {
    title: GET_UP_TASK_NAME,
    content: GET_UP_CONTENT
  },
  2: {
    title: DRINK_TASK_NAME,
    content: DRINK_CONTENT
  },
  3: {
    title: EAT_APPLE_TASK_NAME,
    content: EAT_APPLE_CONTENT
  },
  4: {
    title: SMILE_TASK_NAME,
    content: SMILE_CONTENT
  },
  5: {
    title: BRUSH_TEETH_TASK_NAME,
    content: BRUSH_TEETH_CONTENT
  },
  6: {
    title: SLEEP_TASK_NAME,
    content: SLEEP_CONTENT
  },
};

export const ACHIEVEMENT_LEVEL_LIST = [3, 7, 30, 50, 73, 99];