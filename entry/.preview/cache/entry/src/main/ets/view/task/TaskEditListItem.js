import { DEFAULT_8, DEFAULT_12, DEFAULT_20, DEFAULT_16, DEFAULT_32, DEFAULT_56, THOUSANDTH_1000, PER_DAY } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
function __Text__targetSetCommon() {
    Text.fontSize(DEFAULT_16);
    Text.flexGrow(1);
    Text.margin({ right: DEFAULT_8 });
    Text.align(Alignment.End);
}
function __Text__targetSettingStyle(isOpen, taskID) {
    Text.fontColor(isOpen && taskID !== -1 && taskID !== -1 ? { "id": 16777294, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777277, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
function __Text__remindTimeStyle(isOpen, isAlarm) {
    Text.fontColor(isOpen && isAlarm ? { "id": 16777294, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777277, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
function __Text__frequencyStyle(isOpen, isAlarm) {
    Text.fontSize(DEFAULT_12);
    Text.flexGrow(1);
    Text.margin({ right: DEFAULT_8 });
    Text.textAlign(TextAlign.End);
    Text.fontColor(isOpen && isAlarm ? { "id": 16777294, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777277, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
export class TaskChooseItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/task/TaskEditListItem.ets(45:5)");
            Row.width(THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.settingParams.taskName);
            Text.debugLine("view/task/TaskEditListItem.ets(46:7)");
            Text.fontSize(DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Toggle.create({ type: ToggleType.Switch, isOn: this.settingParams.isOpen });
            Toggle.debugLine("view/task/TaskEditListItem.ets(47:7)");
            Toggle.width(DEFAULT_56);
            Toggle.height(DEFAULT_32);
            Toggle.selectedColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Toggle.onChange((isOn) => {
                this.settingParams.isOpen = isOn;
            });
            if (!isInitialRender) {
                Toggle.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Toggle.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class TargetSetItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/task/TaskEditListItem.ets(65:5)");
            Row.width(THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777416, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/task/TaskEditListItem.ets(66:7)");
            Text.fontSize(DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("view/task/TaskEditListItem.ets(70:7)");
            Blank.layoutWeight(1);
            if (!isInitialRender) {
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            var _a;
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.unit) === '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        var _a, _b, _c;
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Text.create(`${(_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.targetValue}`);
                        Text.debugLine("view/task/TaskEditListItem.ets(73:9)");
                        __Text__targetSetCommon();
                        __Text__targetSettingStyle((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.isOpen, (_c = this.settingParams) === null || _c === void 0 ? void 0 : _c.taskID);
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        var _a, _b, _c, _d;
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Text.create(`${(_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.targetValue} ${(_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.unit} ${PER_DAY}`);
                        Text.debugLine("view/task/TaskEditListItem.ets(77:9)");
                        __Text__targetSetCommon();
                        __Text__targetSettingStyle((_c = this.settingParams) === null || _c === void 0 ? void 0 : _c.isOpen, (_d = this.settingParams) === null || _d === void 0 ? void 0 : _d.taskID);
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
                });
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777240, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("view/task/TaskEditListItem.ets(81:7)");
            Image.width(DEFAULT_8);
            Image.height(DEFAULT_16);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class OpenRemindItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/task/TaskEditListItem.ets(93:5)");
            Row.width(THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777405, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/task/TaskEditListItem.ets(94:7)");
            Text.fontSize(DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            var _a;
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Toggle.create({ type: ToggleType.Switch, isOn: (_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.isAlarm });
            Toggle.debugLine("view/task/TaskEditListItem.ets(98:7)");
            Toggle.width(DEFAULT_56);
            Toggle.height(DEFAULT_32);
            Toggle.selectedColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Toggle.onChange((isOn) => {
                this.settingParams.isAlarm = isOn;
            });
            if (!isInitialRender) {
                Toggle.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Toggle.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class RemindTimeItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/task/TaskEditListItem.ets(116:5)");
            Row.width(THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777408, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/task/TaskEditListItem.ets(117:7)");
            Text.fontSize(DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("view/task/TaskEditListItem.ets(118:7)");
            Blank.layoutWeight(1);
            if (!isInitialRender) {
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            var _a, _b, _c;
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.startTime);
            Text.debugLine("view/task/TaskEditListItem.ets(120:7)");
            __Text__targetSetCommon();
            __Text__remindTimeStyle((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.isOpen, (_c = this.settingParams) === null || _c === void 0 ? void 0 : _c.isAlarm);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777240, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("view/task/TaskEditListItem.ets(123:7)");
            Image.width(DEFAULT_8);
            Image.height(DEFAULT_16);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class FrequencyItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.__frequency = this.initializeConsume("frequency", "frequency");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        this.__frequency.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue) {
        this.__settingParams.set(newValue);
    }
    get frequency() {
        return this.__frequency.get();
    }
    set frequency(newValue) {
        this.__frequency.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/task/TaskEditListItem.ets(136:5)");
            Row.width(THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777398, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/task/TaskEditListItem.ets(137:7)");
            Text.fontSize(DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            var _a, _b;
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.frequency);
            Text.debugLine("view/task/TaskEditListItem.ets(138:7)");
            __Text__targetSetCommon();
            __Text__frequencyStyle((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.isOpen, (_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.isAlarm);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777240, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.debugLine("view/task/TaskEditListItem.ets(141:7)");
            Image.width(DEFAULT_8);
            Image.height(DEFAULT_16);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=TaskEditListItem.js.map