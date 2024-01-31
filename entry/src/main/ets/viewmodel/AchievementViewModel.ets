import { ACHIEVEMENT_LEVEL_LIST, AchievementMap } from '../model/TaskInitList';

export function getBadgeCardItems(successiveDays: number):[string, Resource][] {
  let badgeMileStones = ACHIEVEMENT_LEVEL_LIST;
  let cardItems:[string, Resource][] = [];
  for (let i = 0; i < badgeMileStones.length; i++) {
    let onOrOff = successiveDays >= badgeMileStones[i] ? 'on' : 'off';
    let titleContent = String(badgeMileStones[i]);
    let oneItem:[string, Resource] = [titleContent,AchievementMap[`${ badgeMileStones[i] }_${ onOrOff }`]];
    cardItems.push(oneItem);
  }
  return cardItems;
}