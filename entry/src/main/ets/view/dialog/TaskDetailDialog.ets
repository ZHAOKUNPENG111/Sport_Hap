import { CustomDialogCallback } from './CustomDialogView';
import TaskInfo from '../../common/bean/TaskInfo';
import { TaskMapById } from '../../model/TaskInitList';
import { DEFAULT_8, DEFAULT_12 } from '../../common/constants/CommonConstants';
import router from '@ohos.router';
import { ITaskItem } from '../../model/TaskInitList';

@Extend(Text) function textStyle () {
  .fontColor($r('app.color.white'))
  .fontFamily($r('app.string.HarmonyHeiTi'))
}

@Extend(Text) function taskTextStyle () {
  .fontColor($r('app.color.white'))
  .width('100%')
}

@CustomDialog
export struct TaskDetailDialog {
  @State editedTaskInfo: ITaskItem = JSON.parse(router.getParams() ? router.getParams()['editTask'] : '{}');
  controller: CustomDialogController;
  @Consume currentTask: TaskInfo;
  @State showButton: boolean = true;
  @Consume dialogCallBack: CustomDialogCallback;

  build() {
    Column() {
      TaskBaseInfo({
        taskName: TaskMapById[this.currentTask?.taskID].taskName
      });

      TaskClock({
        confirm: () => {
          this.dialogCallBack.confirmCallback(this.currentTask);
          router.pushUrl({
            url: 'pages/Index',////点击弹窗打卡转跳网页进行运动检测
            params: {
              targetValue:this.editedTaskInfo.targetValue.toString(),
              taskID:this.editedTaskInfo.taskID.toString(),
              unit :this.editedTaskInfo.unit.toString()
            }
          })
          this.controller.close();
        },
        cancel: () => {
          this.controller.close();
        },
        showButton: this.showButton
      })
    }
    .height($r('app.float.default_451'))
    .width($r('app.float.default_316'))
    .backgroundImage(TaskMapById[this.currentTask?.taskID].dialogBg, ImageRepeat.NoRepeat)
    .backgroundImageSize({
      width: '100%',
      height: '100%'
    })
    .justifyContent(FlexAlign.End)
    .padding({
      bottom: $r('app.float.default_12'),
      left: $r('app.float.default_20')
    })
  }
}

@Component
struct TaskBaseInfo {
  taskName: string | Resource;

  build() {
    Column({ space: DEFAULT_8 }) {
      Text(this.taskName)
        .fontSize($r('app.float.default_22'))
        .fontWeight(FontWeight.Bold)
        .fontFamily($r('app.string.HarmonyHeiTi_Bold'))
        .taskTextStyle()
        .margin({left: $r('app.float.default_12')})
    }
    .position({ y: $r('app.float.default_267') })
  }
}

@Component
struct TaskClock {
  confirm: () => void;
  cancel: () => void;
  showButton: boolean = false;

  build() {
    Column({ space: DEFAULT_12 }) {
      Button() {
        Text("运动打卡").colorBlend(0)
          .height($r('app.float.default_42'))
          .fontSize($r('app.float.default_20'))
          .fontWeight(FontWeight.Normal)
          .textStyle()
      }
      .width($r('app.float.default_220'))
      .borderRadius($r('app.float.default_24'))
      .backgroundColor('rgba(180,180,180,0.40)')
      .onClick(() => {
        globalThis.taskListChange = true;
        this.confirm();
      })
      .visibility(!this.showButton ? Visibility.None : Visibility.Visible)

      Text($r('app.string.got_it'))
        .fontSize($r('app.float.default_14'))
        .fontWeight(FontWeight.Regular)
        .textStyle()
        .onClick(() => {
          this.cancel();
        })
    }
  }
}



