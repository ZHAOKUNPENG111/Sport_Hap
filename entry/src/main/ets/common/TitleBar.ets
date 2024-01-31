/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              { Browser, LoadingStatus, WebObject } from '../model/Browser'
// import Logger from '../model/Logger'
import Logger from '../common/utils/Logger';

const TAG: string = '[TitleBar]'
const BUTTON_WIDTH: number = 22
const BUTTON_RADIUS: number = 4
const DOWN_COLOR: string = '#e4e4e4'
const UP_COLOR: string = '#00000000'
const PAD_USER_AGENT: string = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTMl, like Gecko) Chrome/92.0.4515.105 Safari/537.36'
const PHONE_USER_AGENT: string = 'Mozilla/5.0 (Linux; Android 9; VRD-AL10; HMSCore 6.3.0.331) AppleWebKit/537.36 (KHTMl, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/12.0.4.1 Mobile Safari/537.36'

@Component
export struct WebTab {
  @Link browser: Browser;
  @Link isPhone: boolean;
  isRegistered: boolean = false
  testObj = {
    test: (addr) => {
      Logger.info(TAG, `addr= ${this.browser.tabArrayIndex}`)
      this.browser.webControllerArray[this.browser.tabArrayIndex].controller.loadUrl({ url: `https://${addr}` })
    },
    searchWord: (word: string) => {
      Logger.info(`search word= ${word}`)
      let code = encodeURI(word)
      this.browser.webControllerArray[this.browser.tabArrayIndex].controller.loadUrl({
        url: `https://www.bing.com/search?q=${code}`
        // url:`https://www.baidu.com`
      })
    }
  }

  build() {
    Tabs({ barPosition: BarPosition.Start, controller: this.browser.tabsController }) {
      ForEach(this.browser.webArray, item => {
        TabContent() {
          Web({
            // src: 'https://www.w3schools.com/html/movie.mp4',//////////////////////////////////////////////这里
            src: "http://192.168.137.228:5001/",
            controller: this.browser.webControllerArray[item.key] !== undefined ?
            this.browser.webControllerArray[item.key].controller : undefined
          })
            .javaScriptAccess(true)
            .fileAccess(true)
            .domStorageAccess(true)
            .userAgent(this.isPhone ? PHONE_USER_AGENT : PAD_USER_AGENT)
            .onPageBegin((event) => {
              Logger.info(TAG, `onPageBegin= ${JSON.stringify(event)}`)
              this.browser.loadingStatus = LoadingStatus.LOADING
            })
            .onPageEnd((event) => {
              Logger.info(TAG, `onPageEnd= ${JSON.stringify(event)}`)
              if (item.key < this.browser.webControllerArray.length && this.browser.webControllerArray[item.key].controller) {
                this.browser.webControllerArray[item.key].controller.runJavaScript({ script: 'adapterDevice()' })
                this.browser.loadingStatus = LoadingStatus.END
                this.registerFunc(this.browser.webControllerArray[item.key])
                if (event.url.startsWith('http')) {
                  this.browser.inputValue = event.url
                } else {
                  this.browser.inputValue = ''
                }
              }
            })
            .onProgressChange((event) => {
              Logger.info(TAG, `onProgressChange`)
              this.browser.progress = event.newProgress
              if (this.browser.progress === 100) {
                this.browser.hideProgress = true
              } else {
                this.browser.hideProgress = false
              }
            })
        }
      }, item => item.timestamp.toString())
    }
    .barHeight(0)
    .scrollable(false)
  }

  registerFunc(webObject: WebObject) {
    if (!webObject.isRegistered) {
      Logger.info(TAG, `registerFunc`)
      webObject.controller.registerJavaScriptProxy({
        object: this.testObj, name: 'etsObj', methodList: ['test', 'searchWord']
      })
      webObject.isRegistered = true
      webObject.controller.refresh()
    }
  }
}