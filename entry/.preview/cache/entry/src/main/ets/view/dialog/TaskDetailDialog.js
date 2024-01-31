import { TaskMapById } from '@bundle:com.example.healthy_life/entry/ets/model/TaskInitList';
import { DEFAULT_8, DEFAULT_12 } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
function __Text__textStyle() {
    Text.fontColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontFamily({ "id": 16777384, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
function __Text__taskTextStyle() {
    Text.fontColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.width('100%');
}
export class TaskDetailDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.controller = undefined;
        this.__currentTask = this.initializeConsume("currentTask", "currentTask");
        this.__showButton = new ObservedPropertySimplePU(true, this, "showButton");
        this.__dialogCallBack = this.initializeConsume("dialogCallBack", "dialogCallBack");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.showButton !== undefined) {
            this.showButton = params.showButton;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__showButton.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentTask.aboutToBeDeleted();
        this.__showButton.aboutToBeDeleted();
        this.__dialogCallBack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    setController(ctr) {
        this.controller = ctr;
    }
    get currentTask() {
        return this.__currentTask.get();
    }
    set currentTask(newValue) {
        this.__currentTask.set(newValue);
    }
    get showButton() {
        return this.__showButton.get();
    }
    set showButton(newValue) {
        this.__showButton.set(newValue);
    }
    get dialogCallBack() {
        return this.__dialogCallBack.get();
    }
    set dialogCallBack(newValue) {
        this.__dialogCallBack.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            var _a;
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/TaskDetailDialog.ets(24:5)");
            Column.height({ "id": 16777353, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.width({ "id": 16777347, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImage(TaskMapById[(_a = this.currentTask) === null || _a === void 0 ? void 0 : _a.taskID].dialogBg, ImageRepeat.NoRepeat);
            Column.backgroundImageSize({
                width: '100%',
                height: '100%'
            });
            Column.justifyContent(FlexAlign.End);
            Column.padding({
                bottom: { "id": 16777334, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                left: { "id": 16777340, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                var _a;
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new TaskBaseInfo(this, {
                        taskName: TaskMapById[(_a = this.currentTask) === null || _a === void 0 ? void 0 : _a.taskID].taskName
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new TaskClock(this, {
                        confirm: () => {
                            this.dialogCallBack.confirmCallback(ObservedObject.GetRawObject(this.currentTask));
                            this.controller.close();
                        },
                        cancel: () => {
                            this.controller.close();
                        },
                        showButton: this.showButton
                    }, undefined, elmtId));
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
class TaskBaseInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.taskName = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.taskName !== undefined) {
            this.taskName = params.taskName;
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
            Column.create({ space: DEFAULT_8 });
            Column.debugLine("view/dialog/TaskDetailDialog.ets(60:5)");
            Column.position({ y: { "id": 16777345, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.taskName);
            Text.debugLine("view/dialog/TaskDetailDialog.ets(61:7)");
            Text.fontSize({ "id": 16777341, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontFamily({ "id": 16777385, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            __Text__taskTextStyle();
            Text.margin({ left: { "id": 16777334, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class TaskClock extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.confirm = undefined;
        this.cancel = undefined;
        this.showButton = false;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.showButton !== undefined) {
            this.showButton = params.showButton;
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
            Column.create({ space: DEFAULT_12 });
            Column.debugLine("view/dialog/TaskDetailDialog.ets(79:5)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.debugLine("view/dialog/TaskDetailDialog.ets(80:7)");
            Button.width({ "id": 16777342, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777343, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.backgroundColor('rgba(255,255,255,0.40)');
            Button.onClick(() => {
                globalThis.taskListChange = true;
                this.confirm();
            });
            Button.visibility(!this.showButton ? Visibility.None : Visibility.Visible);
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777395, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskDetailDialog.ets(81:9)");
            Text.height({ "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777340, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Normal);
            __Text__textStyle();
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777399, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskDetailDialog.ets(96:7)");
            Text.fontSize({ "id": 16777337, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Regular);
            __Text__textStyle();
            Text.onClick(() => {
                this.cancel();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=TaskDetailDialog.js.map