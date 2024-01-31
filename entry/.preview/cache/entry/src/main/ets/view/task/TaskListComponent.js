import router from '@ohos:router';
import * as commonConst from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import { formatParams } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel';
export default class TaskList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__taskList = this.initializeConsume("taskList", "taskList");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__taskList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get taskList() {
        return this.__taskList.get();
    }
    set taskList(newValue) {
        this.__taskList.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ space: commonConst.LIST_ITEM_SPACE });
            List.debugLine("view/task/TaskListComponent.ets(11:5)");
            List.height(commonConst.THOUSANDTH_1000);
            List.width(commonConst.THOUSANDTH_940);
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
                        ListItem.height(commonConst.THOUSANDTH_80);
                        ListItem.borderRadius(commonConst.DEFAULT_12);
                        ListItem.onClick(() => {
                            router.pushUrl({
                                url: 'pages/TaskEditPage',
                                params: {
                                    params: formatParams(item),
                                }
                            });
                        });
                        ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.debugLine("view/task/TaskListComponent.ets(13:9)");
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
                            Row.debugLine("view/task/TaskListComponent.ets(14:11)");
                            Row.width(commonConst.THOUSANDTH_1000);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Row.create();
                            Row.debugLine("view/task/TaskListComponent.ets(15:13)");
                            Row.width(commonConst.THOUSANDTH_500);
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(item === null || item === void 0 ? void 0 : item.icon);
                            Image.debugLine("view/task/TaskListComponent.ets(16:15)");
                            Image.width(commonConst.DEFAULT_24);
                            Image.height(commonConst.DEFAULT_24);
                            Image.margin({ right: commonConst.DEFAULT_8 });
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item === null || item === void 0 ? void 0 : item.taskName);
                            Text.debugLine("view/task/TaskListComponent.ets(20:15)");
                            Text.fontSize(commonConst.DEFAULT_20);
                            Text.fontColor({ "id": 16777294, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Blank.create();
                            Blank.debugLine("view/task/TaskListComponent.ets(23:13)");
                            Blank.layoutWeight(1);
                            if (!isInitialRender) {
                                Blank.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Blank.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            if (item === null || item === void 0 ? void 0 : item.isOpen) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create({ "id": 16777393, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        Text.debugLine("view/task/TaskListComponent.ets(26:15)");
                                        Text.fontSize(commonConst.DEFAULT_16);
                                        Text.flexGrow(1);
                                        Text.align(Alignment.End);
                                        Text.margin({ right: commonConst.DEFAULT_8 });
                                        Text.fontColor({ "id": 16777294, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
                                });
                            }
                            else {
                                If.branchId(1);
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
                            Image.debugLine("view/task/TaskListComponent.ets(33:13)");
                            Image.width(commonConst.DEFAULT_8);
                            Image.height(commonConst.DEFAULT_16);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Row.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Row.create();
                            Row.debugLine("view/task/TaskListComponent.ets(14:11)");
                            Row.width(commonConst.THOUSANDTH_1000);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Row.create();
                            Row.debugLine("view/task/TaskListComponent.ets(15:13)");
                            Row.width(commonConst.THOUSANDTH_500);
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(item === null || item === void 0 ? void 0 : item.icon);
                            Image.debugLine("view/task/TaskListComponent.ets(16:15)");
                            Image.width(commonConst.DEFAULT_24);
                            Image.height(commonConst.DEFAULT_24);
                            Image.margin({ right: commonConst.DEFAULT_8 });
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item === null || item === void 0 ? void 0 : item.taskName);
                            Text.debugLine("view/task/TaskListComponent.ets(20:15)");
                            Text.fontSize(commonConst.DEFAULT_20);
                            Text.fontColor({ "id": 16777294, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Blank.create();
                            Blank.debugLine("view/task/TaskListComponent.ets(23:13)");
                            Blank.layoutWeight(1);
                            if (!isInitialRender) {
                                Blank.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Blank.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            if (item === null || item === void 0 ? void 0 : item.isOpen) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create({ "id": 16777393, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        Text.debugLine("view/task/TaskListComponent.ets(26:15)");
                                        Text.fontSize(commonConst.DEFAULT_16);
                                        Text.flexGrow(1);
                                        Text.align(Alignment.End);
                                        Text.margin({ right: commonConst.DEFAULT_8 });
                                        Text.fontColor({ "id": 16777294, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
                                });
                            }
                            else {
                                If.branchId(1);
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
                            Image.debugLine("view/task/TaskListComponent.ets(33:13)");
                            Image.width(commonConst.DEFAULT_8);
                            Image.height(commonConst.DEFAULT_16);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
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
            this.forEachUpdateFunction(elmtId, this.taskList, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=TaskListComponent.js.map