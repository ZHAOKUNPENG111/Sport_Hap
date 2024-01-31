import router from '@ohos:router';
import prompt from '@ohos:prompt';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import * as commonConst from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import { TaskChooseItem, TargetSetItem, OpenRemindItem, RemindTimeItem, FrequencyItem } from '@bundle:com.example.healthy_life/entry/ets/view/task/TaskEditListItem';
import { BroadCastType } from '@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast';
import { HealthDataSrcMgr } from '@bundle:com.example.healthy_life/entry/ets/common/utils/HealthDataSrcMgr';
import { initFrequencyString, addTask, formatParams } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel';
import { TaskDialogView } from '@bundle:com.example.healthy_life/entry/ets/view/dialog/TaskDialogView';
export default class TaskDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        var _a;
        super(parent, __localStorage, elmtId);
        this.__broadCast = new ObservedPropertyObjectPU(HealthDataSrcMgr.getInstance().getBroadCast(), this, "broadCast");
        this.addProvidedVar("broadCast", this.__broadCast);
        this.__settingParams = new ObservedPropertyObjectPU(this.parseRouterParams(), this, "settingParams");
        this.addProvidedVar("settingParams", this.__settingParams);
        this.__frequency = new ObservedPropertySimplePU(initFrequencyString((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.frequency), this, "frequency");
        this.addProvidedVar("frequency", this.__frequency);
        this.isChanged = false;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("settingParams", this.onParamsChanged);
    }
    setInitiallyProvidedValue(params) {
        if (params.broadCast !== undefined) {
            this.broadCast = params.broadCast;
        }
        if (params.settingParams !== undefined) {
            this.settingParams = params.settingParams;
        }
        if (params.frequency !== undefined) {
            this.frequency = params.frequency;
        }
        if (params.isChanged !== undefined) {
            this.isChanged = params.isChanged;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__broadCast.aboutToBeDeleted();
        this.__settingParams.aboutToBeDeleted();
        this.__frequency.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get broadCast() {
        return this.__broadCast.get();
    }
    set broadCast(newValue) {
        this.__broadCast.set(newValue);
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
    parseRouterParams() {
        const routerParams = JSON.parse(router.getParams()['params']);
        return routerParams;
    }
    onParamsChanged() {
        this.isChanged = true;
    }
    backIndexParams() {
        var _a;
        return formatParams(Object.assign(Object.assign({}, this.settingParams), { isDone: true, finValue: (_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.targetValue }));
    }
    finishTaskEdit() {
        if (this.isChanged) {
            let context = getContext(this);
            addTask(Object.assign(Object.assign({ id: commonConst.ZERO, date: commonConst.GLOBAL_KEY }, this.settingParams), { isDone: false, finValue: '' }), context).then(res => {
                globalThis.taskListChange = true;
                router.back({
                    url: 'pages/MainPage',
                    params: {
                        editTask: this.backIndexParams(),
                    }
                });
                Logger.info('addTaskFinished', JSON.stringify(res));
            }).catch(error => {
                prompt.showToast({
                    message: commonConst.SETTING_FINISH_FAILED_MESSAGE
                });
                Logger.error('addTaskFailed', JSON.stringify(error));
            });
            return;
        }
        router.back({
            url: 'pages/MainPage',
        });
    }
    aboutToAppear() {
        this.broadCast.off(BroadCastType.SHOW_TARGET_SETTING_DIALOG, null);
        this.broadCast.off(BroadCastType.SHOW_REMIND_TIME_DIALOG, null);
        this.broadCast.off(BroadCastType.SHOW_FREQUENCY_DIALOG, null);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/task/TaskDetailComponent.ets(89:5)");
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/task/TaskDetailComponent.ets(90:7)");
            Column.width(commonConst.THOUSANDTH_1000);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ space: commonConst.LIST_ITEM_SPACE });
            List.debugLine("view/task/TaskDetailComponent.ets(91:9)");
            List.width(commonConst.THOUSANDTH_940);
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(commonConst.DEFAULT_56);
                ListItem.borderRadius(commonConst.DEFAULT_10);
                ListItem.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
                ListItem.debugLine("view/task/TaskDetailComponent.ets(92:11)");
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
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new TaskChooseItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new TaskChooseItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                var _a;
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(commonConst.DEFAULT_56);
                ListItem.borderRadius(commonConst.DEFAULT_10);
                ListItem.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
                ListItem.enabled((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.isOpen
                // && this.settingParams?.taskID !== taskType.smile
                // && this.settingParams?.taskID !== taskType.brushTeeth
                );
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_TARGET_SETTING_DIALOG);
                });
                ListItem.debugLine("view/task/TaskDetailComponent.ets(97:11)");
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
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new TargetSetItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new TargetSetItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                var _a;
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(commonConst.DEFAULT_56);
                ListItem.borderRadius(commonConst.DEFAULT_10);
                ListItem.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
                ListItem.enabled((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.isOpen);
                ListItem.debugLine("view/task/TaskDetailComponent.ets(111:11)");
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
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new OpenRemindItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new OpenRemindItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                var _a, _b;
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(commonConst.DEFAULT_56);
                ListItem.borderRadius(commonConst.DEFAULT_10);
                ListItem.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
                ListItem.enabled(((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.isOpen) && ((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.isAlarm));
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_REMIND_TIME_DIALOG);
                });
                ListItem.debugLine("view/task/TaskDetailComponent.ets(117:11)");
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
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new RemindTimeItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new RemindTimeItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                var _a, _b;
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(commonConst.DEFAULT_56);
                ListItem.borderRadius(commonConst.DEFAULT_10);
                ListItem.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
                ListItem.enabled(((_a = this.settingParams) === null || _a === void 0 ? void 0 : _a.isOpen) && ((_b = this.settingParams) === null || _b === void 0 ? void 0 : _b.isAlarm));
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_FREQUENCY_DIALOG);
                });
                ListItem.debugLine("view/task/TaskDetailComponent.ets(126:11)");
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
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new FrequencyItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new FrequencyItem(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        List.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.debugLine("view/task/TaskDetailComponent.ets(138:9)");
            Button.width(commonConst.THOUSANDTH_800);
            Button.height(commonConst.DEFAULT_48);
            Button.backgroundColor({ "id": 16777274, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                this.finishTaskEdit();
            });
            Button.position({
                x: commonConst.THOUSANDTH_100,
                y: commonConst.THOUSANDTH_800
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777396, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.debugLine("view/task/TaskDetailComponent.ets(139:11)");
            Text.fontSize({ "id": 16777340, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new TaskDialogView(this, {}, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=TaskDetailComponent.js.map