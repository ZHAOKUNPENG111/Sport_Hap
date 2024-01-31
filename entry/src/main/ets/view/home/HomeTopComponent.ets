import { HomeStore } from '../../viewmodel/HomeViewModel';
import { WeekCalendar } from './WeekCalendarComponent';
import * as commonConst from '../../common/constants/CommonConstants';
import HealthText from '../../view/HealthTextComponent';

@Extend(Text) function titleTextStyle () {
  .fontSize($r('app.float.default_16'))
  .fontWeight(commonConst.FONT_WEIGHT_500)
  .width(commonConst.THOUSANDTH_1000)
  .fontFamily($r('app.string.HarmonyHeiTi_Medium'))
  .fontColor($r(`app.element.color.titleColor`))
}

@Component
export default struct HomeTopView {
  @Link homeStore: HomeStore;

  build() {
    Column() {
      Text($r('app.string.target_progress'))
        .titleTextStyle()
        .opacity(commonConst.OPACITY_6)
        .padding({ left: $r('app.float.default_24') })
      Row() {
        HealthText({
          title: this.homeStore.getDonePercent(),
          fontSize: $r('app.float.default_72'),
          fontFamily: $r('app.string.HarmonyHeiTi_Bold'),
          fontWeight: commonConst.FONT_WEIGHT_700
        })
        Text('%')
          .titleTextStyle()
          .fontSize($r('app.float.default_40'))
          .margin({ top: $r('app.float.default_12'), left: $r('app.float.default_8') })
      }
      .width(commonConst.THOUSANDTH_1000)
      .padding({ left: $r('app.float.default_24') })

      WeekCalendar({ homeStore:  $homeStore })
    }
    .height(commonConst.THOUSANDTH_500)
    .backgroundImagePosition({x: 0, y: 0})
    .backgroundImage($r('app.media.ic_home_bg_1'))
    .backgroundImageSize({ width: commonConst.THOUSANDTH_1000, height: commonConst.THOUSANDTH_900 })
    .justifyContent(FlexAlign.End)
  }
}