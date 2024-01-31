import { MineInfoUserList } from '@bundle:com.example.healthy_life/entry/ets/model/Mine';
import router from '@ohos:router';
export class ListInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__UserInfo = new ObservedPropertyObjectPU(router.getParams(), this, "UserInfo");
        this.scroller = new Scroller();
        this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.UserInfo !== undefined) {
            this.UserInfo = params.UserInfo;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__UserInfo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__UserInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get UserInfo() {
        return this.__UserInfo.get();
    }
    set UserInfo(newValue) {
        this.__UserInfo.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create();
            List.debugLine("pages/UserInfoPage.ets(11:5)");
            List.scrollBar(BarState.Auto);
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
                ListItem.borderRadius(15);
                ListItem.debugLine("pages/UserInfoPage.ets(12:7)");
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
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(13:9)");
                    Column.width("100%");
                    Column.height("15%");
                    Column.margin({ top: { "id": 16777372, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                    Column.border({ radius: { "id": 16777363, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                    Column.backgroundColor({ "id": 16777280, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Column.justifyContent(FlexAlign.Center);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Column.pop();
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(13:9)");
                    Column.width("100%");
                    Column.height("15%");
                    Column.margin({ top: { "id": 16777372, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                    Column.border({ radius: { "id": 16777363, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
                    Column.backgroundColor({ "id": 16777280, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    Column.justifyContent(FlexAlign.Center);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Column.pop();
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
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
                        ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.margin({
                            left: { "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                            right: { "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                        ListItem.height({ "id": 16777362, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.border({
                            width: { bottom: { "id": 16777339, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                            color: { "id": 16777274, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                        ListItem.debugLine("pages/UserInfoPage.ets(21:9)");
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
                            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
                            Flex.debugLine("pages/UserInfoPage.ets(22:11)");
                            if (!isInitialRender) {
                                Flex.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.title);
                            Text.debugLine("pages/UserInfoPage.ets(23:13)");
                            Text.fontSize({ "id": 16777346, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.height({ "id": 16777358, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create({ "id": 16777240, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.debugLine("pages/UserInfoPage.ets(24:13)");
                            Image.objectFit(ImageFit.Contain);
                            Image.height({ "id": 16777342, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.width({ "id": 16777368, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Flex.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
                            Flex.debugLine("pages/UserInfoPage.ets(22:11)");
                            if (!isInitialRender) {
                                Flex.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.title);
                            Text.debugLine("pages/UserInfoPage.ets(23:13)");
                            Text.fontSize({ "id": 16777346, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.height({ "id": 16777358, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create({ "id": 16777240, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.debugLine("pages/UserInfoPage.ets(24:13)");
                            Image.objectFit(ImageFit.Contain);
                            Image.height({ "id": 16777342, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Image.width({ "id": 16777368, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Flex.pop();
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
            this.forEachUpdateFunction(elmtId, MineInfoUserList, forEachItemGenFunction, item => item.id, false, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.debugLine("pages/UserInfoPage.ets(42:7)");
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
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(43:9)");
                    Column.width('95%');
                    Column.backgroundColor({ "id": 16777280, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(44:11)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("根据您提供的信息，为您制定一个初步的健身计划。请注意，由于您的年龄较小，所以在进行任何健身计划之前，请务必咨询医生或专业健身教练。");
                    Text.debugLine("pages/UserInfoPage.ets(45:11)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Column.pop();
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(43:9)");
                    Column.width('95%');
                    Column.backgroundColor({ "id": 16777280, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(44:11)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("根据您提供的信息，为您制定一个初步的健身计划。请注意，由于您的年龄较小，所以在进行任何健身计划之前，请务必咨询医生或专业健身教练。");
                    Text.debugLine("pages/UserInfoPage.ets(45:11)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Column.pop();
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
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.debugLine("pages/UserInfoPage.ets(48:7)");
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
                    // Scroll(this.scroller) {
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(50:11)");
                    // Scroll(this.scroller) {
                    Column.width('100%');
                    // Scroll(this.scroller) {
                    Column.backgroundColor({ "id": 16777280, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    if (!isInitialRender) {
                        // Scroll(this.scroller) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(51:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(52:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.padding(20);
                    Column.borderRadius(15);
                    Column.margin({ top: 10 });
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("俯卧撑：");
                    Text.debugLine("pages/UserInfoPage.ets(53:15)");
                    Text.margin({ left: 1 });
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(54:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数：10次");
                    Text.debugLine("pages/UserInfoPage.ets(55:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(57:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(58:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(66:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(68:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.borderRadius(15);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("引体向上：");
                    Text.debugLine("pages/UserInfoPage.ets(69:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(70:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数：5 次");
                    Text.debugLine("pages/UserInfoPage.ets(71:21)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(73:19)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(74:21)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(81:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(83:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.borderRadius(15);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("深蹲：");
                    Text.debugLine("pages/UserInfoPage.ets(84:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(85:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数：15 次");
                    Text.debugLine("pages/UserInfoPage.ets(86:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(88:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(89:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(96:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(98:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.borderRadius(15);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("跳绳：");
                    Text.debugLine("pages/UserInfoPage.ets(99:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(100:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数： 50 次");
                    Text.debugLine("pages/UserInfoPage.ets(101:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(103:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(104:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(111:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(113:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.borderRadius(15);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("静态深蹲：");
                    Text.debugLine("pages/UserInfoPage.ets(114:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(115:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数： 30 秒");
                    Text.debugLine("pages/UserInfoPage.ets(116:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(118:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(119:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(126:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(128:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.borderRadius(15);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("平板支撑：");
                    Text.debugLine("pages/UserInfoPage.ets(129:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(130:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数： 30 秒");
                    Text.debugLine("pages/UserInfoPage.ets(131:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(133:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(134:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(141:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                // Scroll(this.scroller) {
                Column.pop();
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    // Scroll(this.scroller) {
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(50:11)");
                    // Scroll(this.scroller) {
                    Column.width('100%');
                    // Scroll(this.scroller) {
                    Column.backgroundColor({ "id": 16777280, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    if (!isInitialRender) {
                        // Scroll(this.scroller) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(51:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(52:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.padding(20);
                    Column.borderRadius(15);
                    Column.margin({ top: 10 });
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("俯卧撑：");
                    Text.debugLine("pages/UserInfoPage.ets(53:15)");
                    Text.margin({ left: 1 });
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(54:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数：10次");
                    Text.debugLine("pages/UserInfoPage.ets(55:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(57:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(58:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(66:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(68:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.borderRadius(15);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("引体向上：");
                    Text.debugLine("pages/UserInfoPage.ets(69:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(70:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数：5 次");
                    Text.debugLine("pages/UserInfoPage.ets(71:21)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(73:19)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(74:21)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(81:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(83:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.borderRadius(15);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("深蹲：");
                    Text.debugLine("pages/UserInfoPage.ets(84:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(85:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数：15 次");
                    Text.debugLine("pages/UserInfoPage.ets(86:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(88:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(89:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(96:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(98:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.borderRadius(15);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("跳绳：");
                    Text.debugLine("pages/UserInfoPage.ets(99:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(100:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数： 50 次");
                    Text.debugLine("pages/UserInfoPage.ets(101:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(103:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(104:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(111:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(113:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.borderRadius(15);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("静态深蹲：");
                    Text.debugLine("pages/UserInfoPage.ets(114:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(115:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数： 30 秒");
                    Text.debugLine("pages/UserInfoPage.ets(116:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(118:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(119:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(126:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("pages/UserInfoPage.ets(128:13)");
                    Column.width('90%');
                    Column.height(80);
                    Column.backgroundColor(0xFFFFFF);
                    Column.borderRadius(15);
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("平板支撑：");
                    Text.debugLine("pages/UserInfoPage.ets(129:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(130:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("次数： 30 秒");
                    Text.debugLine("pages/UserInfoPage.ets(131:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    Row.debugLine("pages/UserInfoPage.ets(133:15)");
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("时间：每天");
                    Text.debugLine("pages/UserInfoPage.ets(134:17)");
                    Text.textAlign(TextAlign.Center);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.debugLine("pages/UserInfoPage.ets(141:13)");
                    Blank.color("rgb(10.10.10)");
                    Blank.padding(5);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                // Scroll(this.scroller) {
                Column.pop();
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
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new ListInfo(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=UserInfoPage.js.map