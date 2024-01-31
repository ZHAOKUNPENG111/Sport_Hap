import dataRdb from '@ohos:data.relationalStore';
import FormInfo from '@bundle:com.example.healthy_life/entry/ets/common/bean/FormInfo';
import { FORM_INFO } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import RdbUtils from '@bundle:com.example.healthy_life/entry/ets/common/database/rdb/RdbUtils';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
class FormInfoApi {
    /**
     * Insert formInfo.
     *
     * @param {FormInfo} formInfo Insert form info
     * @param {Function} callback Return processing callback
     */
    insertData(formInfo, callback) {
        const valueBucket = generateBucket(formInfo);
        RdbUtils.insert('formInfo', valueBucket).then(result => {
            callback(result);
        });
        Logger.info('FormInfoTable', 'Insert formInfo finished.');
    }
    /**
     * Query form data
     *
     * @param {Function} callback Return processing callback
     */
    queryFormData(callback) {
        let predicates = new dataRdb.RdbPredicates(FORM_INFO.tableName);
        RdbUtils.query(predicates).then(resultSet => {
            let count = resultSet.rowCount;
            if (count === 0) {
                callback([]);
            }
            else {
                resultSet.goToFirstRow();
                let resultArray = new Array();
                do {
                    let result = new FormInfo();
                    result.formId = resultSet.getString(resultSet.getColumnIndex('formId'));
                    result.formName = resultSet.getString(resultSet.getColumnIndex('formName'));
                    result.formDimension = resultSet.getLong(resultSet.getColumnIndex('formDimension'));
                    resultArray.push(result);
                } while (resultSet.goToNextRow());
                resultSet.close();
                callback(resultArray);
            }
        }).catch((error) => {
            Logger.error('FormInfoTable', 'queryFormData error ' + JSON.stringify(error));
        });
    }
    /**
     * Delete form data.
     *
     * @param {string} formId Form ID
     */
    deleteFormData(formId) {
        let predicates = new dataRdb.RdbPredicates(FORM_INFO.tableName);
        predicates.equalTo('formId', formId);
        RdbUtils.del(predicates).catch((error) => {
            Logger.error('FormInfoTable', 'deleteFormData error ' + JSON.stringify(error));
        });
    }
}
function generateBucket(formInfo) {
    let valueBucket = {};
    FORM_INFO.columns.forEach((item) => {
        if (item !== 'id') {
            valueBucket[item] = formInfo[item];
        }
    });
    return valueBucket;
}
let formInfoApi = new FormInfoApi();
export default formInfoApi;
//# sourceMappingURL=FormInfoApi.js.map