import { BroadCast } from '@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
const APP_KEY_GROUP_DATA_SOURCE_MANAGER = 'app_key_group_data_source_manager';
export class HealthDataSrcMgr {
    constructor() {
        Logger.debug('HealthDataSourceManager', 'constructor');
        this.broadCast = new BroadCast();
    }
    static getInstance() {
        if (AppStorage.Get(APP_KEY_GROUP_DATA_SOURCE_MANAGER) == null) {
            AppStorage.SetOrCreate(APP_KEY_GROUP_DATA_SOURCE_MANAGER, new HealthDataSrcMgr());
        }
        return AppStorage.Get(APP_KEY_GROUP_DATA_SOURCE_MANAGER);
    }
    getBroadCast() {
        return this.broadCast;
    }
}
//# sourceMappingURL=HealthDataSrcMgr.js.map