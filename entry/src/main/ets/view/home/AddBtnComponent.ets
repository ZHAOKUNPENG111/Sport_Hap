import * as commonConst from '../../common/constants/CommonConstants';

@Styles function allSize () {
  .width(commonConst.THOUSANDTH_1000)
  .height(commonConst.THOUSANDTH_1000)
}

@Component
export default struct AddBtn {
  clickAction: Function;

  build() {
    Button({ type: ButtonType.Circle, stateEffect: false }) {
      Image($r('app.media.ic_home_add'))
        .allSize()
        .borderRadius(commonConst.BORDER_RADIUS_PERCENT_50)
    }
    .onClick(() => this.clickAction())
    .zIndex(commonConst.HOME_BTN_Z)
    .position({ x: commonConst.THOUSANDTH_830, y: commonConst.THOUSANDTH_880 })
    .width($r('app.float.default_48'))
    .height($r('app.float.default_48'))
  }
}