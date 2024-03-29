import formBindingData from '@ohos:app.form.formBindingData';
import formProvider from '@ohos:app.form.formProvider';
import RdbUtils from '@bundle:com.example.healthy_life/entry/ets/common/database/rdb/RdbUtils';
import FormInfoApi from '@bundle:com.example.healthy_life/entry/ets/common/database/tables/FormInfoApi';
import DayInfoApi from '@bundle:com.example.healthy_life/entry/ets/common/database/tables/DayInfoApi';
import TaskInfoApi from '@bundle:com.example.healthy_life/entry/ets/common/database/tables/TaskInfoApi';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import { taskType } from '@bundle:com.example.healthy_life/entry/ets/common/bean/TaskInfo';
import { columnDayInfoList, columnTaskInfoInfoList, columnFormInfoList } from '@bundle:com.example.healthy_life/entry/ets/model/RdbColumnModel';
import { TAG, Unit, TaskType, RDB_NAME, DAY_INFO, TASK_INFO, FORM_INFO, TIMES_100, GLOBAL_KEY, DEFAULT_100, DEFAULT_DIMENSION_2X2, DEFAULT_DIMENSION_2X4, WIDGET_NAME_AGENCY, WIDGET_NAME_PROGRESS, } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
class FormUtils {
    /**
     * Insert form data
     *
     * @param {Context} context Indicates the context of application or capability.
     * @param {FormInfo} formInfo Insert the form information to be saved.
     */
    insertFormData(context, formInfo) {
        RdbUtils.initDb(context, RDB_NAME.dbName);
        let isCreatePromise = RdbUtils.isCreateTable(FORM_INFO.tableName, columnFormInfoList);
        isCreatePromise.then((result) => {
            if (!result) {
                Logger.error(TAG, 'insertFormData form table create error');
                return;
            }
            FormInfoApi.insertData(formInfo, (isDone) => {
                if (isDone) {
                    Logger.info(TAG, 'insert formInfo success: ' + JSON.stringify(isDone));
                    this.queryForms();
                }
            });
        });
    }
    /**
     * Update card operation
     *
     * @param {Context} context Indicates the context of application or capability.
     */
    updateCards(context) {
        RdbUtils.initDb(context, RDB_NAME.dbName);
        let isCreatePromise = RdbUtils.isCreateTable(FORM_INFO.tableName, columnFormInfoList);
        isCreatePromise.then((result) => {
            if (!result) {
                Logger.error(TAG, 'updateCards form table create error');
                return;
            }
            this.queryForms();
        });
    }
    /**
     * Delete form data
     *
     * @param {Context} context Indicates the context of application or capability.
     * @param {string} formId delete form id
     */
    deleteFormData(context, formId) {
        RdbUtils.initDb(context, RDB_NAME.dbName);
        let isCreatePromise = RdbUtils.isCreateTable(FORM_INFO.tableName, columnFormInfoList);
        isCreatePromise.then((result) => {
            if (!result) {
                Logger.error(TAG, 'deleteFormData form table create error');
                return;
            }
            FormInfoApi.deleteFormData(formId);
        });
    }
    /**
     * Update form operation
     */
    queryForms() {
        FormInfoApi.queryFormData((resultSet) => {
            resultSet.forEach((item) => {
                this.updateRectangleCards(item);
            });
        });
    }
    /**
     * Background update all card
     */
    backgroundUpdateCard(taskListChange) {
        if (taskListChange) {
            globalThis.taskListChange = false;
            let timeId = setTimeout(() => {
                this.queryForms();
                clearInterval(timeId);
            }, TIMES_100);
        }
    }
    updateRectangleCards(formInfo) {
        if ((formInfo.formName === WIDGET_NAME_AGENCY) && (formInfo.formDimension === DEFAULT_DIMENSION_2X4)) {
            let createPromise = RdbUtils.isCreateTable(TASK_INFO.tableName, columnTaskInfoInfoList);
            createPromise.then((result) => {
                if (!result) {
                    Logger.error(TAG, 'taskInfo table create error');
                    return;
                }
                this.dateQueryTaskInfo(formInfo, new Date().toDateString());
            }).catch(err => {
                Logger.error(TAG, `taskInfo err : ${JSON.stringify(err)}`);
            });
        }
        if ((formInfo.formName === WIDGET_NAME_PROGRESS) && (formInfo.formDimension === DEFAULT_DIMENSION_2X2)) {
            let createPromise = RdbUtils.isCreateTable(DAY_INFO.tableName, columnDayInfoList);
            createPromise.then((result) => {
                if (!result) {
                    Logger.error(TAG, 'dayInfo create table error');
                    return;
                }
                this.dateQueryDayInfo(formInfo, new Date().toDateString());
            }).catch(err => {
                Logger.error(TAG, `dayInfo err : ${JSON.stringify(err)}`);
            });
        }
    }
    dateQueryTaskInfo(formInfo, dateKey) {
        TaskInfoApi.query(dateKey, true, (data) => {
            if (data.length === 0) {
                // Query task data based on the global field.
                this.globalQueryTaskInfo(formInfo, GLOBAL_KEY);
            }
            else {
                this.processTaskData(formInfo, data);
            }
        });
    }
    dateQueryDayInfo(formInfo, dateKey) {
        DayInfoApi.query(dateKey, (data) => {
            if (data.length === 0) {
                // Query day data based on the global field.
                this.globalQueryDayInfo(formInfo, GLOBAL_KEY);
            }
            else {
                this.processDayData(formInfo, data);
            }
        });
    }
    globalQueryTaskInfo(formInfo, dateKey) {
        TaskInfoApi.query(dateKey, true, (data) => {
            this.processTaskData(formInfo, data);
        });
    }
    globalQueryDayInfo(formInfo, dateKey) {
        DayInfoApi.query(dateKey, (data) => {
            this.processDayData(formInfo, data);
        });
    }
    processTaskData(formInfo, data) {
        let taskList = this.fetchResult(data);
        let obj = {};
        obj.taskList = taskList;
        obj.showWidget = taskList.length === 0 ? false : true;
        let formData = formBindingData.createFormBindingData(obj);
        formProvider.updateForm(formInfo.formId, formData).catch((err) => {
            Logger.error(TAG, `processTaskData updateForm, err: ${JSON.stringify(err)}`);
        });
    }
    processDayData(formInfo, data) {
        let finTaskNum = 0;
        let targetTaskNum = 0;
        let percent = '0';
        if (data !== undefined && data.length !== 0) {
            finTaskNum = data.finTaskNum > data.targetTaskNum ? data.targetTaskNum : data.finTaskNum;
            targetTaskNum = data.targetTaskNum;
            percent = targetTaskNum === 0 ? '0' : Math.ceil(finTaskNum / targetTaskNum * DEFAULT_100).toFixed();
        }
        let obj = {
            'numerator': finTaskNum,
            'denominator': targetTaskNum,
            'percent': percent
        };
        let formData = formBindingData.createFormBindingData(obj);
        formProvider.updateForm(formInfo.formId, formData).catch((err) => {
            Logger.error(TAG, `processDayData updateForm, err: ${JSON.stringify(err)}`);
        });
    }
    getTemp(temp, taskType, unit, dateType, isDone) {
        return Object.assign(Object.assign({}, temp), { taskType,
            unit,
            dateType,
            isDone });
    }
    fetchResult(data) {
        let taskList = new Array();
        data.forEach((item) => {
            let temp = {
                targetValue: item.targetValue,
                finValue: item.isDone ? item.targetValue : item.finValue,
                finValueIsNull: item.isDone ? false : (item.finValue === '' ? true : false),
            };
            switch (item.taskID) {
                case taskType.getup:
                    temp = this.getTemp(temp, TaskType.Getup, Unit.Empty, true, item.isDone);
                    break;
                case taskType.drinkWater:
                    temp = this.getTemp(temp, TaskType.Getup, Unit.Liter, false, item.isDone);
                    break;
                case taskType.eatApple:
                    temp = this.getTemp(temp, TaskType.Apple, Unit.Pcs, false, item.isDone);
                    break;
                case taskType.smile:
                    temp = this.getTemp(temp, TaskType.Smile, Unit.Times, false, item.isDone);
                    break;
                case taskType.brushTeeth:
                    temp = this.getTemp(temp, TaskType.Clean, Unit.Times, false, item.isDone);
                    break;
                case taskType.sleepEarly:
                    temp = this.getTemp(temp, TaskType.Sleep, Unit.Empty, true, item.isDone);
                    break;
                default:
                    break;
            }
            taskList.push(temp);
        });
        Logger.info(TAG, 'fetchResult taskList ' + JSON.stringify(taskList));
        return taskList;
    }
}
export default new FormUtils();
//# sourceMappingURL=FormUtils.js.map