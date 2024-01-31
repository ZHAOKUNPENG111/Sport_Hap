/**
 * GlobalInfo
 *
 * @param firstDate
 * @param lastDate
 * @param checkInDays
 * @param achievements
 */
export default class GlobalInfo {
    firstDate: string;
    lastDate: string;
    checkInDays: number;
    achievements: string;

    constructor(firstDate: string, lastDate: string, checkInDays: number, achievements: string) {
        this.firstDate = firstDate;
        this.lastDate = lastDate;
        this.checkInDays = checkInDays;
        this.achievements = achievements;
    }
}