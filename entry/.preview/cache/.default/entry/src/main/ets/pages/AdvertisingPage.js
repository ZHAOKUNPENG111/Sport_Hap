import router from '@ohos:router';
import { FONT_WEIGHT_400, FONT_WEIGHT_700, SPACE_4, OPACITY_4, DURATION_1000, LETTER_1, LETTER_34, AD_DURATION } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
class AdvertisingPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__duration = new ObservedPropertySimplePU(AD_DURATION, this, "duration");
        this.intervalId = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__duration.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__duration.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue) {
        this.__duration.set(newValue);
    }
    goToHomePage() {
        clearInterval(this.intervalId);
        router.replaceUrl({ url: 'pages/MainPage' });
    }
    aboutToAppear() {
        this.intervalId = setInterval(() => {
            if (this.duration > 0) {
                this.duration -= 1;
            }
            else {
                this.goToHomePage();
            }
        }, DURATION_1000);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/AdvertisingPage.ets(35:5)");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundImagePosition({ x: 0, y: 0 });
            Column.backgroundImage({ "id": 16777237, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImageSize({ width: '100%', height: '100%' });
            Column.justifyContent(FlexAlign.SpaceBetween);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/AdvertisingPage.ets(36:7)");
            Row.width('90%');
            Row.justifyContent(FlexAlign.End);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777408, "type": 10003, params: [this.duration], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("pages/AdvertisingPage.ets(37:9)");
            Text.fontSize({ "id": 16777342, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.borderRadius({ "id": 16777346, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.letterSpacing(LETTER_1);
            Text.height({ "id": 16777356, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.backgroundColor('rgba(0,0,0,0.20)');
            Text.border({ color: { "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, width: { "id": 16777339, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Text.margin({ top: { "id": 16777356, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Text.padding({ "id": 16777371, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => this.goToHomePage());
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/AdvertisingPage.ets(52:7)");
            Row.height({ "id": 16777341, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777220, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("pages/AdvertisingPage.ets(53:9)");
            Image.width({ "id": 16777364, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777364, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: SPACE_4 });
            Column.debugLine("pages/AdvertisingPage.ets(57:9)");
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: { "id": 16777342, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("pages/AdvertisingPage.ets(58:11)");
            Text.fontFamily({ "id": 16777393, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777352, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777294, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FONT_WEIGHT_700);
            Text.letterSpacing(LETTER_1);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("pages/AdvertisingPage.ets(64:11)");
            Text.fontFamily({ "id": 16777392, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777294, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FONT_WEIGHT_400);
            Text.letterSpacing(LETTER_34);
            Text.opacity(OPACITY_4);
            Text.fontSize({ "id": 16777346, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new AdvertisingPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=AdvertisingPage.js.map