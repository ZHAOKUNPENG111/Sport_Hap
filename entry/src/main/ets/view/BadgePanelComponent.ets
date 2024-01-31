import { BadgeCard } from './BadgeCardComponent'
import { getAchievementLevel} from '../model/AchieveModel'
import { getBadgeCardItems } from '../viewmodel/AchievementViewModel'
import Logger from '../common/utils/Logger'
import { ACHIEVEMENT_LEVEL_KEY } from '../model/AchieveModel'
import * as commonConst from '../common/constants/CommonConstants';

@Component
export struct BadgePanel {
  @StorageProp(ACHIEVEMENT_LEVEL_KEY) successiveDays: number = 0;

  aboutToAppear() {
    Logger.debug('BadgePanel','aboutToAppear')
    getAchievementLevel()
  }

  build() {
    Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
      ForEach(getBadgeCardItems(this.successiveDays), (item) => {
        BadgeCard({ content: item[0], imgSrc: item[1]})
      })
    }
    .width(commonConst.FULL_WIDTH)
  }
}
