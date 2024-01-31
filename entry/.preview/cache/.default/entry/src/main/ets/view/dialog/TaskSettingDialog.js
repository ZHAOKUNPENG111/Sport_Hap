import prompt from '@ohos:prompt';
import { frequencyRange } from '@bundle:com.example.healthy_life/entry/ets/common/utils/Utils';
// import { returnTimeStamp, createAppleRange, createDrinkRange, createJtsdRange, formatTime } from '../../viewmodel/TaskViewModel';
import { returnTimeStamp, createAppleRange, createDrinkRange, createJtsdRange, createGetupRange, createSmileRange, createBrushTeethRange, formatTime } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel';
import { taskType } from '@bundle:com.example.healthy_life/entry/ets/common/bean/TaskInfo';
import * as commonConst from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export class TargetSettingDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.controller = undefined;
        this.getupRange = createGetupRange();
        this.drinkRange = createDrinkRange();
        this.appleRange = createAppleRange();
        this.jtsdRange = createJtsdRange();
        this.smileRange = createSmileRange();
        this.brushTeethRange = createBrushTeethRange();
        this.currentValue = this.settingParams.targetValue;
        this.currentTime = commonConst.DEFAULT_TIME;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.getupRange !== undefined) {
            this.getupRange = params.getupRange;
        }
        if (params.drinkRange !== undefined) {
            this.drinkRange = params.drinkRange;
        }
        if (params.appleRange !== undefined) {
            this.appleRange = params.appleRange;
        }
        if (params.jtsdRange !== undefined) {
            this.jtsdRange = params.jtsdRange;
        }
        if (params.smileRange !== undefined) {
            this.smileRange = params.smileRange;
        }
        if (params.brushTeethRange !== undefined) {
            this.brushTeethRange = params.brushTeethRange;
        }
        if (params.currentValue !== undefined) {
            this.currentValue = params.currentValue;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
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
    setController(ctr) {
        this.controller = ctr;
    }
    compareTime(startTime, endTime) {
        if (returnTimeStamp(this.currentTime) < returnTimeStamp(startTime) ||
            returnTimeStamp(this.currentTime) > returnTimeStamp(endTime)) {
            prompt.showToast({
                message: commonConst.CHOOSE_TIME_OUT_RANGE
            });
            return false;
        }
        return true;
    }
    setTargetValue() {
        var _a, _b;
        if (((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.taskID) === taskType.getup) {
            if (!this.compareTime(commonConst.GET_UP_EARLY_TIME, commonConst.GET_UP_LATE_TIME)) {
                return;
            }
            this.settingParams.targetValue = this.currentTime;
            return;
        }
        if (((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.taskID) === taskType.sleepEarly) {
            if (!this.compareTime(commonConst.SLEEP_EARLY_TIME, commonConst.SLEEP_LATE_TIME)) {
                return;
            }
            this.settingParams.targetValue = this.currentTime;
            return;
        }
        this.settingParams.targetValue = this.currentValue;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/TaskSettingDialog.ets(53:5)");
            Column.justifyContent(FlexAlign.Center);
            Column.height(commonConst.THOUSANDTH_560);
            Column.padding(commonConst.DEFAULT_12);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/dialog/TaskSettingDialog.ets(54:7)");
            Row.width(commonConst.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.Start);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777424, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskSettingDialog.ets(55:9)");
            Text.fontSize(commonConst.DEFAULT_20);
            Text.margin({ right: commonConst.DEFAULT_12 });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            var _a, _b;
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.taskID) === taskType.getup ?
                commonConst.GET_UP_TIME_RANGE :
                ((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.taskID) === taskType.sleepEarly ?
                    commonConst.SLEEP_TIME_RANGE : '');
            Text.debugLine("view/dialog/TaskSettingDialog.ets(56:9)");
            Text.fontSize(commonConst.DEFAULT_16);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            var _a;
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if ([taskType.getup, taskType.sleepEarly].indexOf((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.taskID) != commonConst.HAS_NO_INDEX) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        var _a;
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        TextPicker.create({ range: ((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.taskID) === taskType.getup ? this.getupRange : this.jtsdRange });
                        TextPicker.debugLine("view/dialog/TaskSettingDialog.ets(66:9)");
                        TextPicker.width(commonConst.THOUSANDTH_900);
                        TextPicker.height(commonConst.THOUSANDTH_800);
                        TextPicker.onChange((value) => {
                            this.currentTime = value === null || value === void 0 ? void 0 : value.split(' ')[0];
                        });
                        if (!isInitialRender) {
                            TextPicker.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    TextPicker.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        var _a;
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        TextPicker.create({ range: ((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.taskID) === taskType.drinkWater ? this.drinkRange : this.appleRange });
                        TextPicker.debugLine("view/dialog/TaskSettingDialog.ets(73:9)");
                        TextPicker.width(commonConst.THOUSANDTH_900);
                        TextPicker.height(commonConst.THOUSANDTH_800);
                        TextPicker.onChange((value) => {
                            this.currentValue = value === null || value === void 0 ? void 0 : value.split(' ')[0];
                        });
                        if (!isInitialRender) {
                            TextPicker.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    TextPicker.pop();
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
            Row.create();
            Row.debugLine("view/dialog/TaskSettingDialog.ets(82:7)");
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(commonConst.THOUSANDTH_1000);
            Row.height(commonConst.DEFAULT_28);
            Row.margin({ bottom: commonConst.DEFAULT_20 });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777402, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskSettingDialog.ets(83:9)");
            Text.fontSize(commonConst.DEFAULT_20);
            Text.fontColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.currentTime = commonConst.DEFAULT_TIME;
                this.currentValue = '';
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777405, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskSettingDialog.ets(90:9)");
            Text.fontSize(commonConst.DEFAULT_20);
            Text.fontColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.setTargetValue();
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class RemindTimeDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.controller = undefined;
        this.currentTime = commonConst.DEFAULT_TIME;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.currentTime !== undefined) {
            this.currentTime = params.currentTime;
        }
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
    setController(ctr) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/TaskSettingDialog.ets(114:5)");
            Column.justifyContent(FlexAlign.Center);
            Column.height(commonConst.THOUSANDTH_560);
            Column.padding(commonConst.DEFAULT_12);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/TaskSettingDialog.ets(115:7)");
            Column.width(commonConst.THOUSANDTH_900);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777416, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskSettingDialog.ets(116:9)");
            Text.fontSize(commonConst.DEFAULT_20);
            Text.margin({ top: commonConst.DEFAULT_10 });
            Text.width(commonConst.THOUSANDTH_1000);
            Text.textAlign(TextAlign.Start);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TimePicker.create({
                selected: new Date(`${new Date().toDateString()} `),
            });
            TimePicker.debugLine("view/dialog/TaskSettingDialog.ets(124:7)");
            TimePicker.height(commonConst.THOUSANDTH_800);
            TimePicker.useMilitaryTime(true);
            TimePicker.onChange((value) => {
                this.currentTime = formatTime(value);
            });
            if (!isInitialRender) {
                TimePicker.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TimePicker.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/dialog/TaskSettingDialog.ets(133:7)");
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(commonConst.THOUSANDTH_1000);
            Row.height(commonConst.DEFAULT_28);
            Row.margin({ bottom: commonConst.DEFAULT_20 });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777402, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskSettingDialog.ets(134:9)");
            Text.fontSize(commonConst.DEFAULT_20);
            Text.fontColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.currentTime = commonConst.DEFAULT_TIME;
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777405, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskSettingDialog.ets(140:9)");
            Text.fontSize(commonConst.DEFAULT_20);
            Text.fontColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.settingParams.startTime = this.currentTime;
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class FrequencyDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.__frequency = this.initializeConsume("frequency", "frequency");
        this.controller = undefined;
        this.currentFrequency = commonConst.EVERYDAY;
        this.frequencyChooseRange = frequencyRange();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.currentFrequency !== undefined) {
            this.currentFrequency = params.currentFrequency;
        }
        if (params.frequencyChooseRange !== undefined) {
            this.frequencyChooseRange = params.frequencyChooseRange;
        }
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
    setController(ctr) {
        this.controller = ctr;
    }
    setFrequency() {
        const checkedArr = this.frequencyChooseRange.filter((item) => item === null || item === void 0 ? void 0 : item.isChecked);
        if (checkedArr.length === this.frequencyChooseRange.length || checkedArr.length === commonConst.NO_LENGTH) {
            this.currentFrequency = commonConst.EVERYDAY;
            this.settingParams.frequency = commonConst.INIT_WEEK_IDS;
            return;
        }
        this.currentFrequency = checkedArr.reduce((sum, current) => {
            return sum + ' ' + (current === null || current === void 0 ? void 0 : current.label);
        }, '');
        this.settingParams.frequency = checkedArr.reduce((sum, current) => {
            return sum === '' ? sum + (current === null || current === void 0 ? void 0 : current.id) : sum + ',' + (current === null || current === void 0 ? void 0 : current.id);
        }, '');
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/TaskSettingDialog.ets(181:5)");
            Column.justifyContent(FlexAlign.Center);
            Column.height(commonConst.THOUSANDTH_900);
            Column.padding(commonConst.DEFAULT_12);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/TaskSettingDialog.ets(182:7)");
            Column.width(commonConst.THOUSANDTH_900);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777417, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskSettingDialog.ets(183:9)");
            Text.fontSize(commonConst.DEFAULT_20);
            Text.margin({ top: commonConst.DEFAULT_10 });
            Text.width(commonConst.THOUSANDTH_1000);
            Text.textAlign(TextAlign.Start);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create();
            List.debugLine("view/dialog/TaskSettingDialog.ets(191:7)");
            List.divider({
                strokeWidth: commonConst.DEFAULT_2,
                color: { "id": 16777275, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
            List.flexGrow(1);
            List.padding(commonConst.DEFAULT_12);
            List.width(commonConst.THOUSANDTH_1000);
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        ListItem.debugLine("view/dialog/TaskSettingDialog.ets(193:11)");
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        ListItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Row.create();
                            Row.debugLine("view/dialog/TaskSettingDialog.ets(194:13)");
                            Row.width(commonConst.THOUSANDTH_1000);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.height(commonConst.DEFAULT_60);
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item === null || item === void 0 ? void 0 : item.label);
                            Text.debugLine("view/dialog/TaskSettingDialog.ets(195:15)");
                            Text.fontSize(commonConst.DEFAULT_20);
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Toggle.create({ type: ToggleType.Checkbox });
                            Toggle.debugLine("view/dialog/TaskSettingDialog.ets(196:15)");
                            Toggle.onChange((isOn) => {
                                item.isChecked = isOn;
                            });
                            if (!isInitialRender) {
                                Toggle.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Toggle.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Row.create();
                            Row.debugLine("view/dialog/TaskSettingDialog.ets(194:13)");
                            Row.width(commonConst.THOUSANDTH_1000);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.height(commonConst.DEFAULT_60);
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item === null || item === void 0 ? void 0 : item.label);
                            Text.debugLine("view/dialog/TaskSettingDialog.ets(195:15)");
                            Text.fontSize(commonConst.DEFAULT_20);
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Toggle.create({ type: ToggleType.Checkbox });
                            Toggle.debugLine("view/dialog/TaskSettingDialog.ets(196:15)");
                            Toggle.onChange((isOn) => {
                                item.isChecked = isOn;
                            });
                            if (!isInitialRender) {
                                Toggle.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Toggle.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
            };
            this.forEachUpdateFunction(elmtId, this.frequencyChooseRange, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/dialog/TaskSettingDialog.ets(215:7)");
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width(commonConst.THOUSANDTH_900);
            Row.height(commonConst.DEFAULT_28);
            Row.margin({ bottom: commonConst.DEFAULT_16 });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777402, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskSettingDialog.ets(216:9)");
            Text.fontSize(commonConst.DEFAULT_20);
            Text.fontColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777405, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/dialog/TaskSettingDialog.ets(221:9)");
            Text.fontSize(commonConst.DEFAULT_20);
            Text.fontColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.onClick(() => {
                this.setFrequency();
                this.frequency = this.currentFrequency;
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=TaskSettingDialog.js.map