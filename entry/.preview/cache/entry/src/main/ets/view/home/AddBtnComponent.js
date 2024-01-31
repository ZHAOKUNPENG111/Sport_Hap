import * as commonConst from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export default class AddBtn extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.clickAction = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.clickAction !== undefined) {
            this.clickAction = params.clickAction;
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
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild({ type: ButtonType.Circle, stateEffect: false });
            Button.debugLine("view/home/AddBtnComponent.ets(13:5)");
            Button.onClick(() => this.clickAction());
            Button.zIndex(commonConst.HOME_BTN_Z);
            Button.position({ x: commonConst.THOUSANDTH_830, y: commonConst.THOUSANDTH_880 });
            Button.width({ "id": 16777354, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.height({ "id": 16777354, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777298, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("view/home/AddBtnComponent.ets(14:7)");
            Image.width(commonConst.THOUSANDTH_1000);
            Image.height(commonConst.THOUSANDTH_1000);
            Image.borderRadius(commonConst.BORDER_RADIUS_PERCENT_50);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=AddBtnComponent.js.map