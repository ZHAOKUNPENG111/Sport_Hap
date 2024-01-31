import { ACHIEVEMENT_LEVEL_LIST } from '@bundle:com.example.healthy_life/entry/ets/model/TaskInitList';
import GlobalInfoApi from '@bundle:com.example.healthy_life/entry/ets/common/database/tables/GlobalInfoApi';
export const ACHIEVEMENT_LEVEL_KEY = 'AchievementLevelKey';
export function getAchievementLevel() {
    GlobalInfoApi.query((res) => {
        var _a;
        let globalInfo = res;
        let achievementStr = (_a = globalInfo.achievements) !== null && _a !== void 0 ? _a : '';
        let achievements = achievementStr.split(',');
        if (achievements.length > 0) {
            AppStorage.Set(ACHIEVEMENT_LEVEL_KEY, Number(achievements[achievements.length - 1]));
        }
    });
}
export function isReachNewAchievement(globalInfo) {
    var _a;
    let achievementStr = (_a = globalInfo.achievements) !== null && _a !== void 0 ? _a : '';
    let achievements = achievementStr.split(',');
    if (ACHIEVEMENT_LEVEL_LIST.indexOf(globalInfo.checkInDays) >= 0 && achievements.indexOf(String(globalInfo.checkInDays)) < 0) {
        return true;
    }
    return false;
}
//# sourceMappingURL=AchieveModel.js.map