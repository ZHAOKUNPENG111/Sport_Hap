import dataRdb from '@ohos:data.relationalStore';
import TaskInfo from '@bundle:com.example.healthy_life/entry/ets/common/bean/TaskInfo';
import { TASK_INFO } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import RdbUtils from '@bundle:com.example.healthy_life/entry/ets/common/database/rdb/RdbUtils';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
class TaskInfoApi {
    /**
     * insert taskInfo
     *
     * @param taskInfo
     * @param callback
     */
    insertData(taskInfo, callback) {
        const valueBucket = generateBucket(taskInfo);
        RdbUtils.insert('taskInfo', valueBucket).then(result => {
            callback(result);
        });
        Logger.info('TaskInfoTable', `Insert taskInfo {${taskInfo.date}:${taskInfo.taskID}} finished.`);
    }
    /**
     * delete taskInfo
     *
     * @param taskInfo
     * @param callback
     */
    deleteDataByID(taskInfo, callback) {
        let predicates = new dataRdb.RdbPredicates(TASK_INFO.tableName);
        predicates.equalTo('date', taskInfo.date).and().equalTo('taskID', taskInfo.taskID);
        RdbUtils.del(predicates).then(result => {
            callback(result);
        });
        Logger.info('TaskInfoTable', `Delete taskInfo {${taskInfo.date}:${taskInfo.taskID}} finished.`);
    }
    /**
     * update taskInfo
     *
     * @param taskInfo
     * @param callback
     */
    updateDataByDate(taskInfo, callback) {
        const valueBucket = generateBucket(taskInfo);
        let predicates = new dataRdb.RdbPredicates(TASK_INFO.tableName);
        predicates.equalTo('date', taskInfo.date).and().equalTo('taskID', taskInfo.taskID);
        RdbUtils.update(valueBucket, predicates).then(result => {
            callback(result);
        });
        Logger.info('TaskInfoTable', `Update data {${taskInfo.date}:${taskInfo.taskID}} finished.`);
    }
    /**
     * query taskInfo
     *
     * @param date
     * @param callback
     */
    query(date, isOpen = true, callback) {
        let predicates = new dataRdb.RdbPredicates(TASK_INFO.tableName);
        predicates.equalTo('date', date);
        if (isOpen) {
            predicates.equalTo('isOpen', true);
        }
        predicates.orderByAsc('taskID');
        RdbUtils.query(predicates).then(resultSet => {
            let count = resultSet.rowCount;
            if (count === 0 || typeof count === 'string') {
                Logger.error('TaskInfoTable', `${date} query no results!`);
                callback([]);
            }
            else {
                resultSet.goToFirstRow();
                const result = [];
                for (let i = 0; i < count; i++) {
                    let tmp = new TaskInfo(0, '', 0, '', false, '', '', '', false, '');
                    tmp.isOpen = resultSet.getDouble(resultSet.getColumnIndex('isOpen')) ? true : false;
                    tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
                    tmp.date = resultSet.getString(resultSet.getColumnIndex('date'));
                    tmp.taskID = resultSet.getDouble(resultSet.getColumnIndex('taskID'));
                    tmp.targetValue = resultSet.getString(resultSet.getColumnIndex('targetValue'));
                    tmp.isAlarm = resultSet.getDouble(resultSet.getColumnIndex('isAlarm')) ? true : false;
                    tmp.startTime = resultSet.getString(resultSet.getColumnIndex('startTime'));
                    tmp.endTime = resultSet.getString(resultSet.getColumnIndex('endTime'));
                    tmp.frequency = resultSet.getString(resultSet.getColumnIndex('frequency'));
                    tmp.isDone = resultSet.getDouble(resultSet.getColumnIndex('isDone')) ? true : false;
                    tmp.finValue = resultSet.getString(resultSet.getColumnIndex('finValue'));
                    result[i] = tmp;
                    resultSet.goToNextRow();
                }
                callback(result);
            }
        });
    }
}
function generateBucket(taskInfo) {
    let valueBucket = {};
    TASK_INFO.columns.forEach((item) => {
        if (item !== 'id') {
            valueBucket[item] = taskInfo[item];
        }
    });
    return valueBucket;
}
let taskInfoApi = new TaskInfoApi();
export default taskInfoApi;
//# sourceMappingURL=TaskInfoApi.js.map