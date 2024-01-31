import { MineInfoList, InfoItem, InfoUser,MineInfoUserList } from '../model/Mine';
import router from '@ohos.router';
@Entry
@Component
export struct ListInfo {
  @State UserInfo: object = router.getParams()
  scroller: Scroller = new Scroller();
  private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  build() {
    List() {
      ListItem(){
        Column().width("100%")
      .height("15%")
      .margin({ top: $r('app.float.default_n8') })
      .border({ radius: $r('app.float.default_5') })
      .backgroundColor($r('app.color.leveBgColor'))
      .justifyContent(FlexAlign.Center)
      }.borderRadius(15)
      ForEach(MineInfoUserList, (item: InfoUser) => {
        ListItem() {
          Flex({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center }) {
            Text(item.title).fontSize($r('app.float.default_16')).height($r('app.float.default_40'))
            Image($r('app.media.ic_right_grey'))
              .objectFit(ImageFit.Contain)
              .height($r('app.float.default_12'))
              .width($r('app.float.default_7'))

          }
        }
        .backgroundColor($r('app.color.white'))
        .margin({
          left: $r('app.float.default_24'),
          right: $r('app.float.default_24')
        })
        .height($r('app.float.default_48'))
        .border({
          width: { bottom: $r('app.float.default_1') },
          color: $r('app.color.borderColor')
        })
      }, item => item.id);
      // ListItem(){
      //   Column(){
      //     Blank().color("rgb(10.10.10)").padding(5)
      //     Text("根据您提供的信息，为您制定一个初步的健身计划。请注意，由于您的年龄较小，所以在进行任何健身计划之前，请务必咨询医生或专业健身教练。")
      //     }.width('95%').backgroundColor($r('app.color.leveBgColor'))
      // }
      // ListItem(){
      //   // Scroll(this.scroller) {
      //     Column() {
      //       Blank().color("rgb(10.10.10)").padding(5)
      //       Column() {
      //         Text("俯卧撑：").margin({left:1})
      //         Row() {
      //           Text("次数：10次").textAlign(TextAlign.Center)
      //         }
      //         Row(){
      //           Text("时间：每天").textAlign(TextAlign.Center)
      //         }
      //       }
      //       .width('90%')
      //       .height(80)
      //       .backgroundColor(0xFFFFFF).padding(20)
      //       .borderRadius(15)
      //       .margin({ top: 10 })
      //       Blank().color("rgb(10.10.10)").padding(5)
      //
      //       Column() {
      //         Text("引体向上：")
      //         Row() {
      //               Text("次数：5 次").textAlign(TextAlign.Center)
      //             }
      //             Row(){
      //               Text("时间：每天").textAlign(TextAlign.Center)
      //             }
      //           }
      //       .width('90%')
      //       .height(80)
      //       .backgroundColor(0xFFFFFF)
      //       .borderRadius(15)
      //       Blank().color("rgb(10.10.10)").padding(5)
      //
      //       Column() {
      //         Text("深蹲：")
      //         Row() {
      //           Text("次数：15 次").textAlign(TextAlign.Center)
      //         }
      //         Row(){
      //           Text("时间：每天").textAlign(TextAlign.Center)
      //         }
      //       }
      //       .width('90%')
      //       .height(80)
      //       .backgroundColor(0xFFFFFF)
      //       .borderRadius(15)
      //       Blank().color("rgb(10.10.10)").padding(5)
      //
      //       Column() {
      //         Text("跳绳：")
      //         Row() {
      //           Text("次数： 50 次").textAlign(TextAlign.Center)
      //         }
      //         Row(){
      //           Text("时间：每天").textAlign(TextAlign.Center)
      //         }
      //       }
      //       .width('90%')
      //       .height(80)
      //       .backgroundColor(0xFFFFFF)
      //       .borderRadius(15)
      //       Blank().color("rgb(10.10.10)").padding(5)
      //
      //       Column() {
      //         Text("静态深蹲：")
      //         Row() {
      //           Text("次数： 30 秒").textAlign(TextAlign.Center)
      //         }
      //         Row(){
      //           Text("时间：每天").textAlign(TextAlign.Center)
      //         }
      //       }
      //       .width('90%')
      //       .height(80)
      //       .backgroundColor(0xFFFFFF)
      //       .borderRadius(15)
      //       Blank().color("rgb(10.10.10)").padding(5)
      //
      //       Column() {
      //         Text("平板支撑：")
      //         Row() {
      //           Text("次数： 30 秒").textAlign(TextAlign.Center)
      //         }
      //         Row(){
      //           Text("时间：每天").textAlign(TextAlign.Center)
      //         }
      //       }
      //       .width('90%')
      //       .height(80)
      //       .backgroundColor(0xFFFFFF)
      //       .borderRadius(15)
      //       Blank().color("rgb(10.10.10)").padding(5)
      //
      //     }.width('100%').backgroundColor($r('app.color.leveBgColor'))
      //
      //
      //   //   Row(){
      //   //     Text("静态深蹲：")
      //   //     Row(){
      //   //       Text("次数：30秒")
      //   //       Text("时间：每天")
      //   //     }
      //   //   }
      //   //   Row(){
      //   //     Text("平板支撑：")
      //   //     Row(){
      //   //       Text("次数：30秒")
      //   //       Text("时间：每天")
      //   //     }
      //   //   }
      //   //
      //   // }
      // }

    }.scrollBar(BarState.Auto)


  }
}