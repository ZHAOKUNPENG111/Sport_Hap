import * as commonConst from '../common/constants/CommonConstants';

@Component
export struct TitleBar {
  build() {
    Row() {
      Text($r('app.string.achievement'))
        .fontSize($r('app.float.default_24'))
        .fontColor($r('app.color.white'))
        .align(Alignment.Start)
        .padding({left: commonConst.ACHIEVE_TITLE_BAR_LEFT,top: commonConst.ACHIEVE_TITLE_BAR_TOP})
    }
    .width(commonConst.FULL_WIDTH)
  }
}