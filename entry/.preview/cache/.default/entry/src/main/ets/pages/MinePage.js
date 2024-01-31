import { ListInfo } from '@bundle:com.example.healthy_life/entry/ets/view/ListInfo';
import { UserBaseInfo } from '@bundle:com.example.healthy_life/entry/ets/view/UserBaseInfo';
import { SIGNATURE, FULL_HEIGHT } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export class MineIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__nickname = new ObservedPropertySimplePU("Hello World", this, "nickname");
        this.__signature = new ObservedPropertySimplePU(SIGNATURE, this, "signature");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__nickname.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue) {
        this.__nickname.set(newValue);
    }
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue) {
        this.__signature.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/MinePage.ets(12:5)");
            Column.height(FULL_HEIGHT);
            Column.backgroundColor({ "id": 16777283, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new UserBaseInfo(this, {
                        nickname: this.nickname,
                        signature: this.signature
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        nickname: this.nickname,
                        signature: this.signature
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new ListInfo(this, {}, undefined, elmtId));
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
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new MineIndex(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=MinePage.js.map