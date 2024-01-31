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
import { LoadingStatus } from '@bundle:com.example.healthy_life/entry/ets/model/Browser';
// import Logger from '../model/Logger'
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
const TAG = '[TitleBar]';
const BUTTON_WIDTH = 22;
const BUTTON_RADIUS = 4;
const DOWN_COLOR = '#e4e4e4';
const UP_COLOR = '#00000000';
const PAD_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTMl, like Gecko) Chrome/92.0.4515.105 Safari/537.36';
const PHONE_USER_AGENT = 'Mozilla/5.0 (Linux; Android 9; VRD-AL10; HMSCore 6.3.0.331) AppleWebKit/537.36 (KHTMl, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/12.0.4.1 Mobile Safari/537.36';
export class WebTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__browser = new SynchedPropertyObjectTwoWayPU(params.browser, this, "browser");
        this.__isPhone = new SynchedPropertySimpleTwoWayPU(params.isPhone, this, "isPhone");
        this.isRegistered = false;
        this.testObj = {
            test: (addr) => {
                Logger.info(TAG, `addr= ${this.browser.tabArrayIndex}`);
                this.browser.webControllerArray[this.browser.tabArrayIndex].controller.loadUrl({ url: `https://${addr}` });
            },
            searchWord: (word) => {
                Logger.info(`search word= ${word}`);
                let code = encodeURI(word);
                this.browser.webControllerArray[this.browser.tabArrayIndex].controller.loadUrl({
                    url: `https://www.bing.com/search?q=${code}`
                    // url:`https://www.baidu.com`
                });
            }
        };
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.isRegistered !== undefined) {
            this.isRegistered = params.isRegistered;
        }
        if (params.testObj !== undefined) {
            this.testObj = params.testObj;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__browser.purgeDependencyOnElmtId(rmElmtId);
        this.__isPhone.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__browser.aboutToBeDeleted();
        this.__isPhone.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get browser() {
        return this.__browser.get();
    }
    set browser(newValue) {
        this.__browser.set(newValue);
    }
    get isPhone() {
        return this.__isPhone.get();
    }
    set isPhone(newValue) {
        this.__isPhone.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Tabs.create({ barPosition: BarPosition.Start, controller: this.browser.tabsController });
            Tabs.barHeight(0);
            Tabs.scrollable(false);
            if (!isInitialRender) {
                Tabs.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    TabContent.create(() => {
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Web.create({
                                // src: 'https://www.w3schools.com/html/movie.mp4',//////////////////////////////////////////////这里
                                src: "http://192.168.137.228:5001/",
                                controller: this.browser.webControllerArray[item.key] !== undefined ?
                                    this.browser.webControllerArray[item.key].controller : undefined
                            });
                            Web.javaScriptAccess(true);
                            Web.fileAccess(true);
                            Web.domStorageAccess(true);
                            Web.userAgent(this.isPhone ? PHONE_USER_AGENT : PAD_USER_AGENT);
                            Web.onPageBegin((event) => {
                                Logger.info(TAG, `onPageBegin= ${JSON.stringify(event)}`);
                                this.browser.loadingStatus = LoadingStatus.LOADING;
                            });
                            Web.onPageEnd((event) => {
                                Logger.info(TAG, `onPageEnd= ${JSON.stringify(event)}`);
                                if (item.key < this.browser.webControllerArray.length && this.browser.webControllerArray[item.key].controller) {
                                    this.browser.webControllerArray[item.key].controller.runJavaScript({ script: 'adapterDevice()' });
                                    this.browser.loadingStatus = LoadingStatus.END;
                                    this.registerFunc(this.browser.webControllerArray[item.key]);
                                    if (event.url.startsWith('http')) {
                                        this.browser.inputValue = event.url;
                                    }
                                    else {
                                        this.browser.inputValue = '';
                                    }
                                }
                            });
                            Web.onProgressChange((event) => {
                                Logger.info(TAG, `onProgressChange`);
                                this.browser.progress = event.newProgress;
                                if (this.browser.progress === 100) {
                                    this.browser.hideProgress = true;
                                }
                                else {
                                    this.browser.hideProgress = false;
                                }
                            });
                            if (!isInitialRender) {
                                Web.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                    });
                    if (!isInitialRender) {
                        TabContent.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, this.browser.webArray, forEachItemGenFunction, item => item.timestamp.toString(), false, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Tabs.pop();
    }
    registerFunc(webObject) {
        if (!webObject.isRegistered) {
            Logger.info(TAG, `registerFunc`);
            webObject.controller.registerJavaScriptProxy({
                object: this.testObj, name: 'etsObj', methodList: ['test', 'searchWord']
            });
            webObject.isRegistered = true;
            webObject.controller.refresh();
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=TitleBar.js.map