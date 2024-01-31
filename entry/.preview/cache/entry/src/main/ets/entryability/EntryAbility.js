import UIAbility from '@ohos:app.ability.UIAbility';
import { RDB_NAME, DAY_INFO, GLOBAL_INFO, TASK_INFO, FORM_INFO } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import { columnDayInfoList, columnGlobalInfoList, columnTaskInfoInfoList, columnFormInfoList } from '@bundle:com.example.healthy_life/entry/ets/model/RdbColumnModel';
import RdbUtils from '@bundle:com.example.healthy_life/entry/ets/common/database/rdb/RdbUtils';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import FormUtils from '@bundle:com.example.healthy_life/entry/ets/common/utils/FormUtils';
export default class EntryAbility extends UIAbility {
    async onCreate(want, launchParam) {
        globalThis.abilityWant = want;
        globalThis.launchParam = launchParam;
        RdbUtils.initDb(this.context, RDB_NAME.dbName);
        await RdbUtils.createDb();
        RdbUtils.createTable(DAY_INFO.tableName, columnDayInfoList).then(() => {
            Logger.info(`RdbHelper createTable dayInfo success`);
        }).catch(err => {
            Logger.error(`RdbHelper dayInfo err : ${JSON.stringify(err)}`);
        });
        RdbUtils.createTable(GLOBAL_INFO.tableName, columnGlobalInfoList).then(() => {
            Logger.info(`RdbHelper createTable globalInfo success`);
        }).catch(err => {
            Logger.error(`RdbHelper globalInfo err : ${JSON.stringify(err)}`);
        });
        RdbUtils.createTable(TASK_INFO.tableName, columnTaskInfoInfoList).then(() => {
            Logger.info(`RdbHelper createTable taskInfo success`);
        }).catch(err => {
            Logger.error(`RdbHelper taskInfo err : ${JSON.stringify(err)}`);
        });
        RdbUtils.createTable(FORM_INFO.tableName, columnFormInfoList).catch(err => {
            Logger.error(`RdbHelper formInfo err : ${JSON.stringify(err)}`);
        });
    }
    onWindowStageCreate(windowStage) {
        // Main window is created, set main page for this ability
        globalThis.isForeground = true;
        windowStage.loadContent('pages/SplashPage', (err, data) => {
            if (err.code) {
                Logger.error('windowStage', 'Failed to load the content. Cause:' + JSON.stringify(err));
                return;
            }
            Logger.info('windowStage', 'Succeeded in loading the content. Data: ' + JSON.stringify(data));
        });
    }
    onForeground() {
        // Ability has brought to foreground
        globalThis.isForeground = true;
        globalThis.taskListChange = false;
    }
    onBackground() {
        // Ability has back to background
        FormUtils.backgroundUpdateCard(globalThis.taskListChange);
    }
    onNewWant(want, launchParam) {
        // Ability has new want
        globalThis.abilityWant = want;
        globalThis.launchParam = launchParam;
    }
}
EntryAbility.TAG = 'EntryAbility';
;
//# sourceMappingURL=EntryAbility.js.map