import router from '@ohos.router';
import * as commonConst from '../../common/constants/CommonConstants';
import { formatParams } from '../../viewmodel/TaskViewModel';
import { ITaskItem } from '../../model/TaskInitList';

@Component
export default struct TaskList {
  @Consume taskList: ITaskItem[];

  build() {
    List({ space: commonConst.LIST_ITEM_SPACE }) {
      ForEach(this.taskList, (item) => {
        ListItem() {
          Row() {
            Row() {
              Image(item?.icon)
                .width(commonConst.DEFAULT_24)
                .height(commonConst.DEFAULT_24)
                .margin({ right: commonConst.DEFAULT_8 })
              Text(item?.taskName).fontSize(commonConst.DEFAULT_20).fontColor($r('app.color.titleColor'))
            }.width(commonConst.THOUSANDTH_500)

            Blank()
              .layoutWeight(1)
            if (item?.isOpen) {
              Text($r('app.string.already_open'))
                .fontSize(commonConst.DEFAULT_16)
                .flexGrow(1)
                .align(Alignment.End)
                .margin({ right: commonConst.DEFAULT_8 })
                .fontColor($r('app.color.titleColor'))
            }
            Image($r('app.media.ic_right_grey'))
            .width(commonConst.DEFAULT_8)
            .height(commonConst.DEFAULT_16)
          }
          .width(commonConst.THOUSANDTH_1000)
          .justifyContent(FlexAlign.SpaceBetween)
          .padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 })
        }
        .height(commonConst.THOUSANDTH_80)
        .borderRadius(commonConst.DEFAULT_12)
        .onClick(() => {
          router.pushUrl({
            url: 'pages/TaskEditPage',
            params: {
              params: formatParams(item),
            }
          })
        })
        .backgroundColor($r('app.color.white'))
      })
    }
    .height(commonConst.THOUSANDTH_1000)
    .width(commonConst.THOUSANDTH_940)
  }
}