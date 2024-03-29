import prompt from '@system.prompt';
import { ITaskItem } from '../../model/TaskInitList';
import { frequencyRange } from '../../common/utils/Utils';
// import { returnTimeStamp, createAppleRange, createDrinkRange, createJtsdRange, formatTime } from '../../viewmodel/TaskViewModel';
import { returnTimeStamp, createAppleRange, createDrinkRange, createJtsdRange, createGetupRange, createSmileRange, createBrushTeethRange, formatTime  } from '../../viewmodel/TaskViewModel';
import { taskType } from '../../common/bean/TaskInfo';
import * as commonConst from '../..//common/constants/CommonConstants';
import { FrequencyContentType } from '../../model/TaskInitList';

@CustomDialog
export struct TargetSettingDialog {
  @Consume settingParams: ITaskItem;
  controller: CustomDialogController;
  getupRange: string[] = createGetupRange();
  drinkRange: string[] = createDrinkRange();
  appleRange: string[] = createAppleRange();
  jtsdRange: string[] = createJtsdRange();
  smileRange: string[] = createSmileRange();
  brushTeethRange: string[] = createBrushTeethRange();
  currentValue: string = this.settingParams.targetValue;
  currentTime: string = commonConst.DEFAULT_TIME;

  compareTime(startTime: string, endTime: string) {
    if (returnTimeStamp(this.currentTime) < returnTimeStamp(startTime) ||
    returnTimeStamp(this.currentTime) > returnTimeStamp(endTime)) {
      prompt.showToast({
        message: commonConst.CHOOSE_TIME_OUT_RANGE
      })
      return false;
    }
    return true;
  }

  setTargetValue() {
    if (this.settingParams?.taskID === taskType.getup) {
      if (!this.compareTime(commonConst.GET_UP_EARLY_TIME, commonConst.GET_UP_LATE_TIME)) {
        return;
      }
      this.settingParams.targetValue = this.currentTime;
      return;
    }
    if (this.settingParams?.taskID === taskType.sleepEarly) {
      if (!this.compareTime(commonConst.SLEEP_EARLY_TIME, commonConst.SLEEP_LATE_TIME)) {
        return;
      }
      this.settingParams.targetValue = this.currentTime;
      return;
    }
    this.settingParams.targetValue = this.currentValue;
  }

  build() {
    Column() {
      Row() {
        Text($r('app.string.target_setting')).fontSize(commonConst.DEFAULT_20).margin({ right: commonConst.DEFAULT_12 })
        Text(this.settingParams?.taskID === taskType.getup ?
          commonConst.GET_UP_TIME_RANGE :
            this.settingParams?.taskID === taskType.sleepEarly ?
            commonConst.SLEEP_TIME_RANGE : '')
          .fontSize(commonConst.DEFAULT_16)
      }
      .width(commonConst.THOUSANDTH_1000)
      .justifyContent(FlexAlign.Start)

      if ([taskType.getup, taskType.sleepEarly].indexOf(this.settingParams?.taskID) != commonConst.HAS_NO_INDEX) {
        TextPicker({ range: this.settingParams?.taskID === taskType.getup ? this.getupRange : this.jtsdRange  })
          .width(commonConst.THOUSANDTH_900,)
          .height(commonConst.THOUSANDTH_800,)
          .onChange((value) => {
            this.currentTime = value?.split(' ')[0];
          })
      } else {
        TextPicker({ range: this.settingParams?.taskID === taskType.drinkWater ? this.drinkRange : this.appleRange  })
        // TextPicker({ range: this.settingParams?.taskID === taskType.smile ? this.smileRange : this.brushTeethRange  })
          .width(commonConst.THOUSANDTH_900,)
          .height(commonConst.THOUSANDTH_800,)
          .onChange((value) => {
            this.currentValue = value?.split(' ')[0];
          })
      }

      Row() {
        Text($r('app.string.cancel')).fontSize(commonConst.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.currentTime = commonConst.DEFAULT_TIME;
            this.currentValue = '';
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(commonConst.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.setTargetValue();
            this.controller.close();
          })
      }
      .justifyContent(FlexAlign.SpaceAround)
      .width(commonConst.THOUSANDTH_1000)
      .height(commonConst.DEFAULT_28)
      .margin({ bottom: commonConst.DEFAULT_20 })
    }
    .justifyContent(FlexAlign.Center)
    .height(commonConst.THOUSANDTH_560)
    .padding(commonConst.DEFAULT_12)
  }
}

@CustomDialog
export struct RemindTimeDialog {
  @Consume settingParams: ITaskItem;
  controller: CustomDialogController;
  currentTime: string = commonConst.DEFAULT_TIME;

  build() {
    Column() {
      Column() {
        Text($r('app.string.remind_time'))
          .fontSize(commonConst.DEFAULT_20)
          .margin({ top: commonConst.DEFAULT_10 })
          .width(commonConst.THOUSANDTH_1000)
          .textAlign(TextAlign.Start)
      }
      .width(commonConst.THOUSANDTH_900)

      TimePicker({
        selected: new Date(`${new Date().toDateString()} `),
      })
        .height(commonConst.THOUSANDTH_800)
        .useMilitaryTime(true)
        .onChange((value: TimePickerResult) => {
          this.currentTime = formatTime(value);
        })

      Row() {
        Text($r('app.string.cancel')).fontSize(commonConst.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.currentTime = commonConst.DEFAULT_TIME;
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(commonConst.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.settingParams.startTime = this.currentTime;
            this.controller.close();
          })
      }
      .justifyContent(FlexAlign.SpaceAround)
      .width(commonConst.THOUSANDTH_1000)
      .height(commonConst.DEFAULT_28)
      .margin({ bottom: commonConst.DEFAULT_20 })
    }
    .justifyContent(FlexAlign.Center)
    .height(commonConst.THOUSANDTH_560)
    .padding(commonConst.DEFAULT_12)
  }
}

@CustomDialog
export struct FrequencyDialog {
  @Consume settingParams: ITaskItem;
  @Consume frequency: string;
  private controller: CustomDialogController;
  private currentFrequency: string = commonConst.EVERYDAY;
  private frequencyChooseRange: FrequencyContentType[] = frequencyRange();

  setFrequency() {
    const checkedArr = this.frequencyChooseRange.filter((item) => item?.isChecked)
    if (checkedArr.length === this.frequencyChooseRange.length || checkedArr.length === commonConst.NO_LENGTH) {
      this.currentFrequency = commonConst.EVERYDAY;
      this.settingParams.frequency = commonConst.INIT_WEEK_IDS;
      return;
    }
    this.currentFrequency = checkedArr.reduce((sum, current) => {
      return sum + ' ' + current?.label;
    }, '')
    this.settingParams.frequency = checkedArr.reduce((sum, current) => {
      return sum === '' ? sum + current?.id : sum + ',' + current?.id;
    }, '')
  }

  build() {
    Column() {
      Column() {
        Text($r('app.string.set_your_frequency'))
          .fontSize(commonConst.DEFAULT_20)
          .margin({ top: commonConst.DEFAULT_10 })
          .width(commonConst.THOUSANDTH_1000)
          .textAlign(TextAlign.Start)
      }
      .width(commonConst.THOUSANDTH_900)

      List() {
        ForEach(this.frequencyChooseRange, (item) => {
          ListItem() {
            Row() {
              Text(item?.label).fontSize(commonConst.DEFAULT_20)
              Toggle({ type: ToggleType.Checkbox })
                .onChange((isOn) => {
                  item.isChecked = isOn;
                })
            }
            .width(commonConst.THOUSANDTH_1000)
            .justifyContent(FlexAlign.SpaceBetween)
            .height(commonConst.DEFAULT_60)
          }
        })
      }
      .divider({
        strokeWidth: commonConst.DEFAULT_2,
        color: $r('app.color.btnBgColor')
      })
      .flexGrow(1)
      .padding(commonConst.DEFAULT_12)
      .width(commonConst.THOUSANDTH_1000)

      Row() {
        Text($r('app.string.cancel')).fontSize(commonConst.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(commonConst.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.setFrequency();
            this.frequency = this.currentFrequency;
            this.controller.close();
          })
      }
      .justifyContent(FlexAlign.SpaceAround)
      .width(commonConst.THOUSANDTH_900)
      .height(commonConst.DEFAULT_28)
      .margin({ bottom: commonConst.DEFAULT_16 })
    }
    .justifyContent(FlexAlign.Center)
    .height(commonConst.THOUSANDTH_900)
    .padding(commonConst.DEFAULT_12)
  }
}