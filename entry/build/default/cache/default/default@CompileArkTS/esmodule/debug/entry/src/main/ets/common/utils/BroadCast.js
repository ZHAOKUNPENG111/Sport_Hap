import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
const FILE_TAG = 'BroadCast';
export class BroadCast {
    constructor() {
        this.callBackArray = {};
    }
    on(event, callback) {
        Logger.info(FILE_TAG, 'register broadcast with type ' + event);
        (this.callBackArray[event] || (this.callBackArray[event] = [])).push(callback);
    }
    off(event, callback) {
        if (event == null) {
            Logger.info(FILE_TAG, 'cancel all broadcast');
            this.callBackArray = {};
        }
        Logger.info(FILE_TAG, 'cancel broadcast with type ' + event);
        const cbs = this.callBackArray[event];
        if (!cbs) {
            return;
        }
        if (callback == null) {
            this.callBackArray[event] = null;
        }
        cbs.splice(cbs.indexOf(callback), 1);
    }
    emit(event, args) {
        if (!this.callBackArray[event]) {
            Logger.info(FILE_TAG, 'emit broadcast failed for no callback');
            return;
        }
        Logger.info(FILE_TAG, 'emit broadcast with type ' + event);
        let cbs = [...this.callBackArray[event]];
        if (cbs) {
            let len = cbs.length;
            for (let i = 0; i < len; i++) {
                try {
                    cbs[i].apply(this, args);
                }
                catch (error) {
                    new Error(error);
                }
            }
        }
    }
}
export var BroadCastType;
(function (BroadCastType) {
    BroadCastType["SHOW_ACHIEVEMENT_DIALOG"] = "showAchievementDialog";
    BroadCastType["SHOW_TASK_DETAIL_DIALOG"] = "showTaskDetailDialog";
    BroadCastType["SHOW_TARGET_SETTING_DIALOG"] = "showTargetSettingDialog";
    BroadCastType["SHOW_REMIND_TIME_DIALOG"] = "showRemindTimeDialog";
    BroadCastType["SHOW_FREQUENCY_DIALOG"] = "showFrequencyDialog";
})(BroadCastType || (BroadCastType = {}));
//# sourceMappingURL=BroadCast.js.map