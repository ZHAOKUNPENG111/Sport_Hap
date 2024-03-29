import router from '@ohos.router';
import prompt from '@system.prompt';
import common from '@ohos.app.ability.common';
import { ITaskItem } from '../../model/TaskInitList';
import Logger from '../../common/utils/Logger';
import * as commonConst from '../../common/constants/CommonConstants';
import { taskType } from '../../common/bean/TaskInfo';
import {
  TaskChooseItem,
  TargetSetItem,
  OpenRemindItem,
  RemindTimeItem,
  FrequencyItem
} from './TaskEditListItem';
import { BroadCast, BroadCastType } from '../../common/utils/BroadCast';
import { HealthDataSrcMgr } from '../../common/utils/HealthDataSrcMgr';
import { initFrequencyString, addTask, formatParams } from '../../viewmodel/TaskViewModel';
import { TaskDialogView } from '../dialog/TaskDialogView';

@Styles function listItemStyle() {
  .backgroundColor($r('app.color.white'))
  .height(commonConst.DEFAULT_56)
  .borderRadius(commonConst.DEFAULT_10)
  .padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 })
}

@Component
export default struct TaskDetail {
  @Provide broadCast: BroadCast = HealthDataSrcMgr.getInstance().getBroadCast();
  @Provide @Watch('onParamsChanged') settingParams: ITaskItem = this.parseRouterParams();
  @Provide frequency: string = initFrequencyString(this.settingParams?.frequency);
  private isChanged: boolean = false;

  parseRouterParams() {
    const routerParams: ITaskItem = JSON.parse(router.getParams()['params']);
    return routerParams;
  }

  onParamsChanged() {
    this.isChanged = true;
  }

  backIndexParams() {
    return formatParams({
      ...this.settingParams,
      isDone: false,
      finValue: this.settingParams?.targetValue,
    });
  }

  finishTaskEdit() {
    if (this.isChanged) {
      let context: Context = getContext(this) as common.Context;
      addTask({
        id: commonConst.ZERO,
        date: commonConst.GLOBAL_KEY,
        ...this.settingParams,
        isDone: false,
        finValue: ''
      }, context).then(res => {
        globalThis.taskListChange = true;
        router.back({
          url: 'pages/MainPage',
          params: {
            editTask: this.backIndexParams(),
          }
        })
        Logger.info('addTaskFinished', JSON.stringify(res));
      }).catch(error => {
        prompt.showToast({
          message: commonConst.SETTING_FINISH_FAILED_MESSAGE
        })
        Logger.error('addTaskFailed', JSON.stringify(error));
      })
      return;
    }
    router.back({
      url: 'pages/MainPage',
    });
  }

  aboutToAppear() {
    this.broadCast.off(BroadCastType.SHOW_TARGET_SETTING_DIALOG, null);
    this.broadCast.off(BroadCastType.SHOW_REMIND_TIME_DIALOG, null);
    this.broadCast.off(BroadCastType.SHOW_FREQUENCY_DIALOG, null);
  }

  build() {
    Row() {
      Column() {
        List({ space: commonConst.LIST_ITEM_SPACE }) {
          ListItem() {
            TaskChooseItem()
          }
          .listItemStyle()

          ListItem() {
            TargetSetItem()
          }
          .listItemStyle()
          .enabled(
            this.settingParams?.isOpen
            // && this.settingParams?.taskID !== taskType.smile
            // && this.settingParams?.taskID !== taskType.brushTeeth
          )
          .onClick(() => {
            this.broadCast.emit(
            BroadCastType.SHOW_TARGET_SETTING_DIALOG);
          })

          ListItem() {
            OpenRemindItem()
          }
          .listItemStyle()
          .enabled(this.settingParams?.isOpen)

          ListItem() {
            RemindTimeItem()
          }
          .listItemStyle()
          .enabled(this.settingParams?.isOpen && this.settingParams?.isAlarm)
          .onClick(() => {
            this.broadCast.emit(BroadCastType.SHOW_REMIND_TIME_DIALOG);
          })

          ListItem() {
            FrequencyItem()
          }
          .listItemStyle()
          .enabled(this.settingParams?.isOpen && this.settingParams?.isAlarm)
          .onClick(() => {
            this.broadCast.emit(BroadCastType.SHOW_FREQUENCY_DIALOG);
          })

        }
        .width(commonConst.THOUSANDTH_940)
        // Text(this.settingParams.unit.toString())
        // Text(this.settingParams.taskID.toString())
        // Text(this.settingParams.taskName.moduleName.toString())
        // Text(this.settingParams.targetValue.toString())
        Button() {
          Text($r('app.string.complete')).fontSize($r('app.float.default_20')).fontColor($r('app.color.blueColor'))
        }
        .width(commonConst.THOUSANDTH_800)
        .height(commonConst.DEFAULT_48)
        .backgroundColor($r('app.color.borderColor'))
        .onClick(() => {
          this.finishTaskEdit();
          // router.pushUrl({
          //   url: 'pages/Index' // 目标url
          // }, router.RouterMode.Standard, (err) => {
          //   if (err) {
          //     console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
          //     return;
          //   }
          //   console.info('Invoke pushUrl succeeded.');
          // });

        })
        .position({
          x: commonConst.THOUSANDTH_100,
          y: commonConst.THOUSANDTH_800
        })

        TaskDialogView()
      }
      .width(commonConst.THOUSANDTH_1000)
    }
  }
}




