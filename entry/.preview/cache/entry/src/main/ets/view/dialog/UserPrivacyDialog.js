import { FONT_WEIGHT_400, OPACITY_6, OPACITY_4, FULL_WIDTH } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
function __Text__descStyle() {
    Text.fontSize({ "id": 16777337, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontWeight(FONT_WEIGHT_400);
    Text.fontFamily({ "id": 16777384, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontColor($r(`app.element.color.titleColor`));
    Text.width(FULL_WIDTH);
    Text.lineHeight({ "id": 16777340, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.margin({ top: { "id": 16777363, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
}
export default class UserPrivacyDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.controller = undefined;
        this.cancel = undefined;
        this.confirm = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    setController(ctr) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/UserPrivacyDialog.ets(20:5)");
            Column.padding({ "id": 16777338, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777407, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/UserPrivacyDialog.ets(21:7)");
            __Text__descStyle();
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777406, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/UserPrivacyDialog.ets(23:7)");
            __Text__descStyle();
            Text.opacity(OPACITY_6);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/dialog/UserPrivacyDialog.ets(26:7)");
            Row.width(FULL_WIDTH);
            Row.margin({ top: { "id": 16777341, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Row.justifyContent(FlexAlign.SpaceEvenly);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel({ "id": 16777394, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.debugLine("view/dialog/UserPrivacyDialog.ets(27:9)");
            Button.backgroundColor(Color.White);
            Button.fontColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                this.controller.close();
                this.cancel();
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("view/dialog/UserPrivacyDialog.ets(34:9)");
            Divider.vertical(true);
            Divider.height({ "id": 16777341, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Divider.opacity(OPACITY_4);
            if (!isInitialRender) {
                Divider.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel({ "id": 16777410, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.debugLine("view/dialog/UserPrivacyDialog.ets(38:9)");
            Button.backgroundColor(Color.White);
            Button.fontColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                this.controller.close();
                this.confirm();
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=UserPrivacyDialog.js.map