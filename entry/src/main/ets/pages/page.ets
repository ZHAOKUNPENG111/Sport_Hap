/*
 * 版权所有 (c) 2022 华为技术有限公司
 * 根据 Apache 许可证 2.0 版本（以下简称“许可证”）许可;
 * 除非符合许可证的规定，否则您不得使用此文件。
 * 您可以在以下网址获取许可证的副本：
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * 除非适用法律要求或书面同意，否则本软件是基于“按原样”提供的，
 * 没有任何明示或暗示的担保或条件。
 * 请参阅许可证了解特定语言下的许可证的管理权限和限制。
 */
import mediaquery from '@ohos.mediaquery'
import router from '@ohos.router';

import { WebTab } from '../common/TitleBar'
import { ITaskItem } from '../model/TaskInitList';

import { Browser, LoadingStatus } from '../model/Browser'
// import Logger from '../model/Logger'
import Logger from '../common/utils/Logger';

const TAG = '[index]'

async function routePage(page: string) {
  let options: router.RouterOptions = {
    url: 'pages/' + page,
  }
  try {
    await router.pushUrl(options)
  } catch (err) {
    console.error(`fail callback, code: ${err.code}, msg: ${err.msg}`)
  }
}

@Entry
@Component
struct Index {
  @State info: object = router.getParams()// 获取传递过来的参数对象
  // @State editedTaskInfo: ITaskItem = JSON.parse(router.getParams() ? router.getParams()['editTask'] : '{}');
  @State isPhone: boolean= false
  @State browser: Browser= new Browser()
  private isInit: Boolean= false
  listener= mediaquery.matchMediaSync('(orientation:landscape)')
  // editedTaskInfo = JSON.parse(router.getParams() ? router.getParams()['editTask'] : '{}');
  // editedTaskID = JSON.stringify(this.editedTaskInfo);
  // 构建界面
  build() {
    Column() {
      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
        Text('AiCoach')
          .fontSize(50)
          .fontWeight(10)
          .colorBlend("rgba(80,80,80,0.40)")
        Button() {
          Text('运动结束')
            .fontSize(25)
            .fontWeight(FontWeight.Bold)
            .fontColor(0xffffff)
            .padding({ left: 16, right: 16 })
        }
        .margin({
          top: 0
        })
        .backgroundColor(0x1677ff)
        .onClick(() => {
          // routePage('MainPage')
          router.back({
            url: 'pages/MainPage',
          });
        })
      }
      .width('100%')
      .height('20%')
      Column() {
        Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
          WebTab({ browser: $browser, isPhone: $isPhone })
            .border({ width: 3 })
            .width("100%")  // 设置WebTab宽度为100%
            .height("100%") // 设置WebTab高度为100%
      }
      }.width("90%").height("65%") // 设置包裹WebTab的Column宽度和高度为80%
      Column().width("80%").height(50).visibility(!WebTab ? Visibility.None : Visibility.Visible)
    }.width('100%').height("100%").justifyContent(FlexAlign.Center)
    .backgroundImage($r('app.media.ic_ad_bg')).backgroundImageSize(ImageSize.Cover)

  }


  // // 当界面即将显示时的回调
  // aboutToAppear() {
  //   try {
  //     // 通过系统参数获取设备类型（手机或平板）
  //     // let deviceType = parameter.getSync("const.build.characteristics")
  //     let deviceType = 'phone'//改！！！
  //     if (deviceType === 'phone') {
  //       this.isPhone = true
  //     }
  //   } catch (e) {
  //     Logger.info(TAG, `getSync unexpected error: ${e}`)
  //   }
  // }

  // // 屏幕方向变化时的回调
  // orientationCallback(result) {
  //   if (!this.isInit) {
  //     if (result.matches) {
  //       this.isPhone = false
  //     } else {
  //       this.isPhone = true
  //     }
  //     this.isInit = true
  //   }
  //   Logger.info(TAG, `orientationCallback end,isPhone=${this.isPhone}`)
  // }
  //
  // // 处理返回按钮的按下事件
  // onBackPress(): boolean{
  //   Logger.info(TAG, `enter onBackPress`)
  //   if (this.browser.webControllerArray[this.browser.tabArrayIndex].controller.accessBackward() ||
  //   this.browser.loadingStatus === LoadingStatus.LOADING) {
  //     this.browser.webControllerArray[this.browser.tabArrayIndex].controller.backward()
  //     return true
  //   }
  //   return false
  // }
  //
  // // 处理设备变化事件
  // onDeviceChange() {
  //   this.browser = new Browser()
  // }
}

