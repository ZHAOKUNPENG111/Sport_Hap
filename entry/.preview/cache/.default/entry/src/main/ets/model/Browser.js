var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
// import Logger from './Logger'
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import prompt from '@ohos:prompt';
export class WebObject {
    constructor(controller, isRegistered) {
        this.controller = controller;
        this.isRegistered = isRegistered;
    }
}
let WebKey = class WebKey {
    constructor(key, timestamp) {
        this.key = key;
        this.timestamp = timestamp;
    }
};
WebKey = __decorate([
    Observed
], WebKey);
export var LoadingStatus;
(function (LoadingStatus) {
    LoadingStatus[LoadingStatus["LOADING"] = 0] = "LOADING";
    LoadingStatus[LoadingStatus["END"] = 1] = "END";
})(LoadingStatus || (LoadingStatus = {}));
const TAG = '[browser]';
export class Browser {
    constructor() {
        this.inputValue = "";
        this.tabArrayIndex = 0;
        this.progress = 0;
        this.hideProgress = true;
        this.loadingStatus = LoadingStatus.END;
        this.webArray = [new WebKey(0, new Date().getTime())];
        this.tabsController = new TabsController();
        this.webControllerArray = [new WebObject(new WebController(), false)];
    }
    deleteTab(index) {
        Logger.info(TAG, `delete before tab index= ${index} controller length ${this.webControllerArray.length} tabArrayIndex= ${this.tabArrayIndex}`);
        this.webArray.splice(index, 1);
        this.webControllerArray.splice(index, 1);
        if (this.tabArrayIndex > index || this.tabArrayIndex === this.webArray.length) {
            this.tabArrayIndex -= 1;
        }
        for (let i = index; i < this.webArray.length; ++i) {
            this.webArray[i].key -= 1;
        }
        for (let i = 0; i < this.webArray.length; ++i) {
            Logger.info(TAG, `key ${this.webArray[i].key}, time=${this.webArray[i].timestamp}`);
        }
        Logger.info(`delete after tab index=${index}, controller length=${this.webControllerArray.length}, tabArrayIndex=${this.tabArrayIndex}`);
        this.tabsController.changeIndex(this.tabArrayIndex);
    }
    getWebArray() {
        return this.webArray;
    }
    addTab() {
        if (this.webArray.length > 10) {
            prompt.showToast({
                message: '页签数量已满'
            });
            return;
        }
        let webController = new WebController();
        let object = new WebObject(webController, false);
        this.webControllerArray.push(object);
        this.webArray.push(new WebKey(this.webArray.length, new Date().getTime()));
        this.tabArrayIndex = this.webArray.length - 1;
        Logger.info(TAG, `add tab index= ${this.tabArrayIndex}`);
        setTimeout(() => {
            this.tabsController.changeIndex(this.tabArrayIndex);
        }, 50);
    }
    setTabArrayIndex(tabArrayIndex) {
        this.tabArrayIndex = tabArrayIndex;
    }
    getTabArrayIndex() {
        return this.tabArrayIndex;
    }
    setInputVal(inputValue) {
        this.inputValue = inputValue;
    }
    getInputVal() {
        return this.inputValue;
    }
    loadUrl(addr) {
        addr = "https://" + addr;
        this.webControllerArray[this.tabArrayIndex].controller.loadUrl({ url: addr });
    }
    Back() {
        if (this.webControllerArray[this.tabArrayIndex].controller.accessBackward()) {
            this.webControllerArray[this.tabArrayIndex].controller.backward();
        }
    }
    Forward() {
        if (this.webControllerArray[this.tabArrayIndex].controller.accessForward()) {
            this.webControllerArray[this.tabArrayIndex].controller.forward();
        }
    }
    Refresh() {
        this.webControllerArray[this.tabArrayIndex].controller.refresh();
    }
}
//# sourceMappingURL=Browser.js.map