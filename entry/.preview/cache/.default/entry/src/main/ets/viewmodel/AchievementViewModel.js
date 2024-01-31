import { ACHIEVEMENT_LEVEL_LIST, AchievementMap } from '@bundle:com.example.healthy_life/entry/ets/model/TaskInitList';
export function getBadgeCardItems(successiveDays) {
    let badgeMileStones = ACHIEVEMENT_LEVEL_LIST;
    let cardItems = [];
    for (let i = 0; i < badgeMileStones.length; i++) {
        let onOrOff = successiveDays >= badgeMileStones[i] ? 'on' : 'off';
        let titleContent = String(badgeMileStones[i]);
        let oneItem = [titleContent, AchievementMap[`${badgeMileStones[i]}_${onOrOff}`]];
        cardItems.push(oneItem);
    }
    return cardItems;
}
//# sourceMappingURL=AchievementViewModel.js.map