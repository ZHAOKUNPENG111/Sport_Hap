import { WeekCalendar } from '@bundle:com.example.healthy_life/entry/ets/view/home/WeekCalendarComponent';
import * as commonConst from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import HealthText from '@bundle:com.example.healthy_life/entry/ets/view/HealthTextComponent';
function __Text__titleTextStyle() {
    Text.fontSize({ "id": 16777338, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontWeight(commonConst.FONT_WEIGHT_500);
    Text.width(commonConst.THOUSANDTH_1000);
    Text.fontFamily({ "id": 16777386, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontColor($r(`app.element.color.titleColor`));
}
export default class HomeTopView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__homeStore = new SynchedPropertyObjectTwoWayPU(params.homeStore, this, "homeStore");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__homeStore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get homeStore() {
        return this.__homeStore.get();
    }
    set homeStore(newValue) {
        this.__homeStore.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/home/HomeTopComponent.ets(19:5)");
            Column.height(commonConst.THOUSANDTH_500);
            Column.backgroundImagePosition({ x: 0, y: 0 });
            Column.backgroundImage({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImageSize({ width: commonConst.THOUSANDTH_1000, height: commonConst.THOUSANDTH_900 });
            Column.justifyContent(FlexAlign.End);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777415, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/home/HomeTopComponent.ets(20:7)");
            __Text__titleTextStyle();
            Text.opacity(commonConst.OPACITY_6);
            Text.padding({ left: { "id": 16777343, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/home/HomeTopComponent.ets(24:7)");
            Row.width(commonConst.THOUSANDTH_1000);
            Row.padding({ left: { "id": 16777343, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new HealthText(this, {
                        title: this.homeStore.getDonePercent(),
                        fontSize: { "id": 16777362, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        fontFamily: { "id": 16777385, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        fontWeight: commonConst.FONT_WEIGHT_700
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: this.homeStore.getDonePercent()
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('%');
            Text.debugLine("view/home/HomeTopComponent.ets(31:9)");
            __Text__titleTextStyle();
            Text.fontSize({ "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777334, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }, left: { "id": 16777363, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new WeekCalendar(this, { homeStore: this.__homeStore }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=HomeTopComponent.js.map