import { GET_UP_TASK_NAME, DRINK_TASK_NAME, EAT_APPLE_TASK_NAME, SMILE_TASK_NAME, BRUSH_TEETH_TASK_NAME, SLEEP_TASK_NAME, GET_UP_CONTENT, DRINK_CONTENT, EAT_APPLE_CONTENT, SMILE_CONTENT, BRUSH_TEETH_CONTENT, SLEEP_CONTENT } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export const TaskList = [
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
];
export const AchievementMap = {
    '3_off': { "id": 16777254, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '3_on': { "id": 16777252, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '7_off': { "id": 16777253, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '7_on': { "id": 16777259, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '30_off': { "id": 16777256, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '30_on': { "id": 16777323, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '50_off': { "id": 16777386, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '50_on': { "id": 16777313, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '73_off': { "id": 16777318, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '73_on': { "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '99_off': { "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
    '99_on': { "id": 16777321, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
};
export const TaskMapById = {
    1: {
        taskID: 1,
        taskName: { "id": 16777430, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777260, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777391, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
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
        taskName: { "id": 16777433, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777262, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777238, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
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
        taskName: { "id": 16777426, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777316, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777385, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
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
        taskName: { "id": 16777432, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777329, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777314, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
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
        taskName: { "id": 16777427, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777319, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
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
        taskName: { "id": 16777431, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777317, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777390, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
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
};
export const TaskItem = {
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
//# sourceMappingURL=TaskInitList.js.map