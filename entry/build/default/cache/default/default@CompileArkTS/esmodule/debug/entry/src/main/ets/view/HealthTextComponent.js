import * as commonConst from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export default class HealthText extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__title = new SynchedPropertySimpleOneWayPU(params.title, this, "title");
        this.titleResource = undefined;
        this.fontSize = { "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        this.fontWeight = commonConst.FONT_WEIGHT_500;
        this.fontColor = { "id": 16777293, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        this.fontFamily = { "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.titleResource !== undefined) {
            this.titleResource = params.titleResource;
        }
        if (params.fontSize !== undefined) {
            this.fontSize = params.fontSize;
        }
        if (params.fontWeight !== undefined) {
            this.fontWeight = params.fontWeight;
        }
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.fontFamily !== undefined) {
            this.fontFamily = params.fontFamily;
        }
    }
    updateStateVars(params) {
        this.__title.reset(params.title);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get title() {
        return this.__title.get();
    }
    set title(newValue) {
        this.__title.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.title || this.titleResource);
            Text.fontSize(this.fontSize);
            Text.fontWeight(this.fontWeight);
            Text.fontColor(this.fontColor);
            Text.fontFamily(this.fontFamily);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=HealthTextComponent.js.map