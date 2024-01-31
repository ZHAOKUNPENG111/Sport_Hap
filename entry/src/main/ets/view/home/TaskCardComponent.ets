import { TaskMapById } from '../../model/TaskInitList';
import HealthText from '../../view/HealthTextComponent';
import * as commonConst from '../../common/constants/CommonConstants';

@Styles function allSize () {
  .width(commonConst.THOUSANDTH_1000)
  .height(commonConst.THOUSANDTH_1000)
}

@Extend(Text) function labelTextStyle () {
  .fontSize($r('app.float.default_16'))
  .fontWeight(commonConst.FONT_WEIGHT_500)
  .opacity(commonConst.OPACITY_6)
  .fontFamily($r('app.string.HarmonyHeiTi'))
}

@Component
export struct TaskCard {
  @Prop taskInfoStr: string;
  clickAction: (isClick: boolean) => void;

  @Builder targetValueBuilder() {
    if (JSON.parse(this.taskInfoStr).isDone) {
      // HealthText({ title: '', titleResource: $r('app.string.task_done') })
      HealthText({ title: '' })

    } else {
      Row() {
        HealthText({
          title: JSON.parse(this.taskInfoStr).finValue || `--`,
          fontSize: $r('app.float.default_24')
        })
        Text(` / ${JSON.parse(this.taskInfoStr).targetValue} ${TaskMapById[JSON.parse(this.taskInfoStr).taskID].unit}`)
          .labelTextStyle()
          .fontWeight(commonConst.FONT_WEIGHT_400)
      }
    }
  }

  build() {
    Row() {
      Row({ space: commonConst.DEFAULT_6 }) {
        Image(TaskMapById[JSON.parse(this.taskInfoStr).taskID].icon)
          .width($r('app.float.default_36')).height($r('app.float.default_36'))
          .objectFit(ImageFit.Contain)
        HealthText({
          title: '',
          titleResource: TaskMapById[JSON.parse(this.taskInfoStr).taskID].taskName,
          fontFamily: $r('app.string.HarmonyHeiTi')
        })
      }

      this.targetValueBuilder();
    }
    .allSize()
    .justifyContent(FlexAlign.SpaceBetween)
    .borderRadius($r('app.float.default_24'))
    .padding({ left: commonConst.THOUSANDTH_50, right: commonConst.THOUSANDTH_33 })
    .backgroundColor($r('app.color.white'))
    .onClick(() => this.clickAction(true))
    .gesture(LongPressGesture().onAction(() => this.clickAction(false)))
  }
}