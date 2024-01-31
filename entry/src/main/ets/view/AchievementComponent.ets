import * as commonConst from '../common/constants/CommonConstants';
import { BadgePanel } from './BadgePanelComponent';
import { TitleBar } from './TitleBarComponent';
import Logger from '../common/utils/Logger';

@Component
export struct AchievementIndex {
  aboutToAppear(){
    Logger.debug('AchievementIndex', 'aboutToAppear')
  }

  onPageShow () {
    Logger.debug('AchievementIndex', 'onPageShow')
  }

  build() {
    Column({space: commonConst.DEFAULT_20}) {
      TitleBar()
      BadgePanel()
    }
    .padding(commonConst.DEFAULT_10)
    .height(commonConst.FULL_HEIGHT)
    .width(commonConst.FULL_WIDTH)
    .backgroundColor($r('app.color.black'))
  }
}
