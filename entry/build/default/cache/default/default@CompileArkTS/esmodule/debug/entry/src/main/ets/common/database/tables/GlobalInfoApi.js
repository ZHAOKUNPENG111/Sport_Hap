import dataRdb from '@ohos:data.relationalStore';
import GlobalInfo from '@bundle:com.example.healthy_life/entry/ets/common/bean/GlobalInfo';
import { GLOBAL_INFO } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import RdbUtils from '@bundle:com.example.healthy_life/entry/ets/common/database/rdb/RdbUtils';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
class GlobalInfoApi {
    /**
     * Insert globalInfo.
     *
     * @param globalInfo
     * @param callback
     */
    insertData(globalInfo, callback) {
        const valueBucket = generateBucket(globalInfo);
        RdbUtils.insert('GlobalInfo', valueBucket).then(result => {
            callback(result);
        });
        Logger.info('GlobalInfoTable', 'Insert globalInfo finished.');
    }
    /**
     * Update globalInfo.
     *
     * @param globalInfo
     * @param callback
     */
    updateData(globalInfo, callback) {
        const valueBucket = generateBucket(globalInfo);
        let predicates = new dataRdb.RdbPredicates(GLOBAL_INFO.tableName);
        predicates.equalTo('id', 0);
        RdbUtils.update(valueBucket, predicates).then(result => {
            callback(result);
        });
        Logger.info('GlobalInfoTable', 'Update globalInfo finished.');
    }
    /**
     * Query globalInfo.
     *
     * @param callback
     */
    query(callback) {
        let predicates = new dataRdb.RdbPredicates(GLOBAL_INFO.tableName);
        predicates.equalTo('id', 0);
        RdbUtils.query(predicates).then(resultSet => {
            let count = resultSet.rowCount;
            if (count === 0) {
                Logger.info('GlobalInfoTable', 'query no results!');
                callback([]);
            }
            else {
                let result = new GlobalInfo('', '', 0, '');
                resultSet.goToFirstRow();
                result.firstDate = resultSet.getString(resultSet.getColumnIndex('firstDate'));
                result.lastDate = resultSet.getString(resultSet.getColumnIndex('lastDate'));
                result.checkInDays = resultSet.getDouble(resultSet.getColumnIndex('checkInDays'));
                result.achievements = resultSet.getString(resultSet.getColumnIndex('achievements'));
                callback(result);
            }
        });
    }
}
function generateBucket(globalInfo) {
    let valueBucket = {};
    GLOBAL_INFO.columns.forEach((item) => {
        if (item === 'id') {
            valueBucket[item] = 0;
        }
        else {
            valueBucket[item] = globalInfo[item];
        }
    });
    return valueBucket;
}
let globalInfoApi = new GlobalInfoApi();
export default globalInfoApi;
//# sourceMappingURL=GlobalInfoApi.js.map