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
import mediaquery from '@ohos:mediaquery';
import router from '@ohos:router';
import { WebTab } from '@bundle:com.example.healthy_life/entry/ets/common/TitleBar';
import { Browser } from '@bundle:com.example.healthy_life/entry/ets/model/Browser';
const TAG = '[index]';
async function routePage(page) {
    let options = {
        url: 'pages/' + page,
    };
    try {
        await router.pushUrl(options);
    }
    catch (err) {
        console.error(`fail callback, code: ${err.code}, msg: ${err.msg}`);
    }
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__info = new ObservedPropertyObjectPU(router.getParams() // 获取传递过来的参数对象
        // @State editedTaskInfo: ITaskItem = JSON.parse(router.getParams() ? router.getParams()['editTask'] : '{}');
        , this, "info");
        this.__isPhone = new ObservedPropertySimplePU(false, this, "isPhone");
        this.__browser = new ObservedPropertyObjectPU(new Browser(), this, "browser");
        this.isInit = false;
        this.listener = mediaquery.matchMediaSync('(orientation:landscape)');
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.info !== undefined) {
            this.info = params.info;
        }
        if (params.isPhone !== undefined) {
            this.isPhone = params.isPhone;
        }
        if (params.browser !== undefined) {
            this.browser = params.browser;
        }
        if (params.isInit !== undefined) {
            this.isInit = params.isInit;
        }
        if (params.listener !== undefined) {
            this.listener = params.listener;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__info.purgeDependencyOnElmtId(rmElmtId);
        this.__isPhone.purgeDependencyOnElmtId(rmElmtId);
        this.__browser.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__info.aboutToBeDeleted();
        this.__isPhone.aboutToBeDeleted();
        this.__browser.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get info() {
        return this.__info.get();
    }
    set info(newValue) {
        this.__info.set(newValue);
    }
    get isPhone() {
        return this.__isPhone.get();
    }
    set isPhone(newValue) {
        this.__isPhone.set(newValue);
    }
    get browser() {
        return this.__browser.get();
    }
    set browser(newValue) {
        this.__browser.set(newValue);
    }
    // editedTaskInfo = JSON.parse(router.getParams() ? router.getParams()['editTask'] : '{}');
    // editedTaskID = JSON.stringify(this.editedTaskInfo);
    // 构建界面
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/page.ets(49:5)");
            Column.width('100%');
            Column.height("100%");
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundImage({ "id": 16777237, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImageSize(ImageSize.Cover);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
            Flex.debugLine("pages/page.ets(50:7)");
            Flex.width('100%');
            Flex.height('20%');
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('AiCoach');
            Text.debugLine("pages/page.ets(51:9)");
            Text.fontSize(50);
            Text.fontWeight(10);
            Text.colorBlend("rgba(80,80,80,0.40)");
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.debugLine("pages/page.ets(55:9)");
            Button.margin({
                top: 0
            });
            Button.backgroundColor(0x1677ff);
            Button.onClick(() => {
                // routePage('MainPage')
                router.back({
                    url: 'pages/MainPage',
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('运动结束');
            Text.debugLine("pages/page.ets(56:11)");
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(0xffffff);
            Text.padding({ left: 16, right: 16 });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        Flex.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/page.ets(75:7)");
            Column.width("90%");
            Column.height("65%");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
            Flex.debugLine("pages/page.ets(76:9)");
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            __Common__.create();
            __Common__.border({ width: 3 });
            __Common__.width("100%");
            __Common__.height("100%");
            if (!isInitialRender) {
                __Common__.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new WebTab(this, { browser: this.__browser, isPhone: this.__isPhone }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        __Common__.pop();
        Flex.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/page.ets(83:7)");
            Column.width("80%");
            Column.height(50);
            Column.visibility(!WebTab ? Visibility.None : Visibility.Visible);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new Index(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=page.js.map