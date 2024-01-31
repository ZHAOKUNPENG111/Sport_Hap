import router from '@ohos:router';
import notificationManager from '@ohos:notificationManager';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import * as commonConst from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import { NavList, TabId } from '@bundle:com.example.healthy_life/entry/ets/model/NavItemModel';
import HomeIndex from '@bundle:com.example.healthy_life/entry/ets/view/HomeComponent';
import { AchievementIndex } from '@bundle:com.example.healthy_life/entry/ets/view/AchievementComponent';
import { MineIndex } from '@bundle:com.example.healthy_life/entry/ets/pages/MinePage';
import { HomeStore } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/HomeViewModel';
import GlobalInfoApi from '@bundle:com.example.healthy_life/entry/ets/common/database/tables/GlobalInfoApi';
import { THOUSANDTH_1000 } from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
import { createHeightRange, createWeightRange, createAgeRange, createPeriodRange } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel';
let clickcheck = "";
class GetClientInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__select = new ObservedPropertySimplePU(2, this, "select");
        this.controller = undefined;
        this.heightRange = createHeightRange();
        this.weightRange = createWeightRange();
        this.ageRange = createAgeRange();
        this.periodRange = createPeriodRange();
        this.__tempHeight = new ObservedPropertySimplePU("身高", this, "tempHeight");
        this.__tempWeight = new ObservedPropertySimplePU("体重", this, "tempWeight");
        this.__tempAge = new ObservedPropertySimplePU("年龄", this, "tempAge");
        this.__tempSex = new ObservedPropertySimplePU("", this, "tempSex");
        this.__tempPeriod = new ObservedPropertySimplePU("运动周期", this, "tempPeriod");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.heightRange !== undefined) {
            this.heightRange = params.heightRange;
        }
        if (params.weightRange !== undefined) {
            this.weightRange = params.weightRange;
        }
        if (params.ageRange !== undefined) {
            this.ageRange = params.ageRange;
        }
        if (params.periodRange !== undefined) {
            this.periodRange = params.periodRange;
        }
        if (params.tempHeight !== undefined) {
            this.tempHeight = params.tempHeight;
        }
        if (params.tempWeight !== undefined) {
            this.tempWeight = params.tempWeight;
        }
        if (params.tempAge !== undefined) {
            this.tempAge = params.tempAge;
        }
        if (params.tempSex !== undefined) {
            this.tempSex = params.tempSex;
        }
        if (params.tempPeriod !== undefined) {
            this.tempPeriod = params.tempPeriod;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__select.purgeDependencyOnElmtId(rmElmtId);
        this.__tempHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__tempWeight.purgeDependencyOnElmtId(rmElmtId);
        this.__tempAge.purgeDependencyOnElmtId(rmElmtId);
        this.__tempSex.purgeDependencyOnElmtId(rmElmtId);
        this.__tempPeriod.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__select.aboutToBeDeleted();
        this.__tempHeight.aboutToBeDeleted();
        this.__tempWeight.aboutToBeDeleted();
        this.__tempAge.aboutToBeDeleted();
        this.__tempSex.aboutToBeDeleted();
        this.__tempPeriod.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get select() {
        return this.__select.get();
    }
    set select(newValue) {
        this.__select.set(newValue);
    }
    get tempHeight() {
        return this.__tempHeight.get();
    }
    set tempHeight(newValue) {
        this.__tempHeight.set(newValue);
    }
    get tempWeight() {
        return this.__tempWeight.get();
    }
    set tempWeight(newValue) {
        this.__tempWeight.set(newValue);
    }
    get tempAge() {
        return this.__tempAge.get();
    }
    set tempAge(newValue) {
        this.__tempAge.set(newValue);
    }
    get tempSex() {
        return this.__tempSex.get();
    }
    set tempSex(newValue) {
        this.__tempSex.set(newValue);
    }
    get tempPeriod() {
        return this.__tempPeriod.get();
    }
    set tempPeriod(newValue) {
        this.__tempPeriod.set(newValue);
    }
    onCancel() {
        console.info('Callback when the first button is clicked');
    }
    onAccept() {
        console.info('Callback when the second button is clicked');
    }
    onPageShow() {
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.height(THOUSANDTH_1000);
            Row.backgroundColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Navigation.create();
            Navigation.size({ width: THOUSANDTH_1000, height: THOUSANDTH_1000 });
            if (!isInitialRender) {
                Navigation.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(THOUSANDTH_1000);
            Column.height(THOUSANDTH_1000);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(commonConst.THOUSANDTH_1000);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ space: commonConst.LIST_ITEM_SPACE });
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
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.layoutWeight(1);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Radio.create({ value: 'Radio1', group: 'radioGroup' });
                    Radio.onChange((isChecked) => {
                        if (isChecked) {
                            //需要执行的操作
                        }
                    });
                    if (!isInitialRender) {
                        Radio.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("男");
                    Text.layoutWeight(1);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Radio.create({ value: 'Radio2', group: 'radioGroup' });
                    Radio.onChange((isChecked) => {
                        if (isChecked) {
                            //需要执行的操作
                        }
                    });
                    if (!isInitialRender) {
                        Radio.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create('女');
                    Text.layoutWeight(1);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Row.pop();
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Row.create();
                    if (!isInitialRender) {
                        Row.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Blank.create();
                    Blank.layoutWeight(1);
                    if (!isInitialRender) {
                        Blank.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Blank.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Radio.create({ value: 'Radio1', group: 'radioGroup' });
                    Radio.onChange((isChecked) => {
                        if (isChecked) {
                            //需要执行的操作
                        }
                    });
                    if (!isInitialRender) {
                        Radio.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create("男");
                    Text.layoutWeight(1);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Radio.create({ value: 'Radio2', group: 'radioGroup' });
                    Radio.onChange((isChecked) => {
                        if (isChecked) {
                            //需要执行的操作
                        }
                    });
                    if (!isInitialRender) {
                        Radio.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create('女');
                    Text.layoutWeight(1);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
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
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(commonConst.DEFAULT_56);
                ListItem.borderRadius(commonConst.DEFAULT_10);
                ListItem.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
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
                    Text.create(`${this.tempAge}`);
                    Text.textAlign(TextAlign.Center);
                    Text.width("100%");
                    Text.height(commonConst.DEFAULT_48);
                    Text.onClick(() => {
                        TextPickerDialog.show({
                            range: this.ageRange,
                            selected: this.select,
                            onAccept: (value) => {
                                // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                                this.select = value.index;
                                this.tempAge = "年龄： " + value.value;
                            },
                            onCancel: () => {
                                this.tempAge = "年龄";
                            },
                            onChange: (value) => {
                            }
                        });
                    });
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(`${this.tempAge}`);
                    Text.textAlign(TextAlign.Center);
                    Text.width("100%");
                    Text.height(commonConst.DEFAULT_48);
                    Text.onClick(() => {
                        TextPickerDialog.show({
                            range: this.ageRange,
                            selected: this.select,
                            onAccept: (value) => {
                                // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                                this.select = value.index;
                                this.tempAge = "年龄： " + value.value;
                            },
                            onCancel: () => {
                                this.tempAge = "年龄";
                            },
                            onChange: (value) => {
                            }
                        });
                    });
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
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
                ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(commonConst.DEFAULT_56);
                ListItem.borderRadius(commonConst.DEFAULT_10);
                ListItem.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
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
                    Text.create(`${this.tempHeight}`);
                    Text.textAlign(TextAlign.Center);
                    Text.width("100%");
                    Text.height(commonConst.DEFAULT_48);
                    Text.onClick(() => {
                        TextPickerDialog.show({
                            range: this.heightRange,
                            selected: this.select,
                            onAccept: (value) => {
                                // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                                this.select = value.index;
                                this.tempHeight = "身高： " + value.value;
                            },
                            onCancel: () => {
                                this.tempHeight = "身高";
                            },
                            onChange: (value) => {
                            }
                        });
                    });
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(`${this.tempHeight}`);
                    Text.textAlign(TextAlign.Center);
                    Text.width("100%");
                    Text.height(commonConst.DEFAULT_48);
                    Text.onClick(() => {
                        TextPickerDialog.show({
                            range: this.heightRange,
                            selected: this.select,
                            onAccept: (value) => {
                                // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                                this.select = value.index;
                                this.tempHeight = "身高： " + value.value;
                            },
                            onCancel: () => {
                                this.tempHeight = "身高";
                            },
                            onChange: (value) => {
                            }
                        });
                    });
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
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
                ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(commonConst.DEFAULT_56);
                ListItem.borderRadius(commonConst.DEFAULT_10);
                ListItem.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
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
                    Text.create(`${this.tempWeight}`);
                    Text.textAlign(TextAlign.Center);
                    Text.width("100%");
                    Text.height(commonConst.DEFAULT_48);
                    Text.onClick(() => {
                        TextPickerDialog.show({
                            range: this.weightRange,
                            selected: this.select,
                            onAccept: (value) => {
                                // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                                this.select = value.index;
                                this.tempWeight = "体重： " + value.value;
                            },
                            onCancel: () => {
                                this.tempWeight = "体重";
                            },
                            onChange: (value) => {
                            }
                        });
                    });
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(`${this.tempWeight}`);
                    Text.textAlign(TextAlign.Center);
                    Text.width("100%");
                    Text.height(commonConst.DEFAULT_48);
                    Text.onClick(() => {
                        TextPickerDialog.show({
                            range: this.weightRange,
                            selected: this.select,
                            onAccept: (value) => {
                                // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                                this.select = value.index;
                                this.tempWeight = "体重： " + value.value;
                            },
                            onCancel: () => {
                                this.tempWeight = "体重";
                            },
                            onChange: (value) => {
                            }
                        });
                    });
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
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
                ListItem.backgroundColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(commonConst.DEFAULT_56);
                ListItem.borderRadius(commonConst.DEFAULT_10);
                ListItem.padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 });
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
                    Text.create(`${this.tempPeriod}`);
                    Text.textAlign(TextAlign.Center);
                    Text.width("100%");
                    Text.height(commonConst.DEFAULT_48);
                    Text.onClick(() => {
                        TextPickerDialog.show({
                            range: this.periodRange,
                            selected: this.select,
                            onAccept: (value) => {
                                // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                                this.select = value.index;
                                this.tempPeriod = "运动周期： " + value.value;
                            },
                            onCancel: () => {
                                this.tempPeriod = "运动周期";
                            },
                            onChange: (value) => {
                            }
                        });
                    });
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(`${this.tempPeriod}`);
                    Text.textAlign(TextAlign.Center);
                    Text.width("100%");
                    Text.height(commonConst.DEFAULT_48);
                    Text.onClick(() => {
                        TextPickerDialog.show({
                            range: this.periodRange,
                            selected: this.select,
                            onAccept: (value) => {
                                // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                                this.select = value.index;
                                this.tempPeriod = "运动周期： " + value.value;
                            },
                            onCancel: () => {
                                this.tempPeriod = "运动周期";
                            },
                            onChange: (value) => {
                            }
                        });
                    });
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
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
            // .width(commonConst.THOUSANDTH_940)
            Button.createWithChild();
            // .width(commonConst.THOUSANDTH_940)
            Button.width(commonConst.THOUSANDTH_800);
            // .width(commonConst.THOUSANDTH_940)
            Button.height(commonConst.DEFAULT_48);
            // .width(commonConst.THOUSANDTH_940)
            Button.backgroundColor({ "id": 16777270, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // .width(commonConst.THOUSANDTH_940)
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/UserInfoPage',
                    params: {
                        age: this.tempAge,
                        sex: this.tempSex,
                        weight: this.tempWeight,
                        height: this.tempHeight,
                        period: this.tempPeriod
                    }
                });
            });
            // .width(commonConst.THOUSANDTH_940)
            Button.position({
                x: commonConst.THOUSANDTH_100,
                y: commonConst.THOUSANDTH_800
            });
            if (!isInitialRender) {
                // .width(commonConst.THOUSANDTH_940)
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777314, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777268, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        // .width(commonConst.THOUSANDTH_940)
        Button.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        Navigation.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__currentPage = new ObservedPropertySimplePU(0, this, "currentPage");
        this.__editedTaskInfo = new ObservedPropertyObjectPU(JSON.parse(router.getParams() ? router.getParams()['editTask'] : '{}'), this, "editedTaskInfo");
        this.__editedTaskID = new ObservedPropertySimplePU('0', this, "editedTaskID");
        this.__homeStore = new ObservedPropertyObjectPU(new HomeStore(new Date()), this, "homeStore");
        this.tabController = new TabsController();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
        if (params.editedTaskInfo !== undefined) {
            this.editedTaskInfo = params.editedTaskInfo;
        }
        if (params.editedTaskID !== undefined) {
            this.editedTaskID = params.editedTaskID;
        }
        if (params.homeStore !== undefined) {
            this.homeStore = params.homeStore;
        }
        if (params.tabController !== undefined) {
            this.tabController = params.tabController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__editedTaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__editedTaskID.purgeDependencyOnElmtId(rmElmtId);
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__editedTaskInfo.aboutToBeDeleted();
        this.__editedTaskID.aboutToBeDeleted();
        this.__homeStore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue) {
        this.__currentPage.set(newValue);
    }
    get editedTaskInfo() {
        return this.__editedTaskInfo.get();
    }
    set editedTaskInfo(newValue) {
        this.__editedTaskInfo.set(newValue);
    }
    get editedTaskID() {
        return this.__editedTaskID.get();
    }
    set editedTaskID(newValue) {
        this.__editedTaskID.set(newValue);
    }
    get homeStore() {
        return this.__homeStore.get();
    }
    set homeStore(newValue) {
        this.__homeStore.set(newValue);
    }
    aboutToAppear() {
        notificationManager.requestEnableNotification().then(() => {
            Logger.info('onPageShow', `requestEnableNotification success`);
        }).catch((err) => {
            Logger.error('onPageShow', `requestEnableNotification failed, code is ${err.code}, message is ${err.message}`);
        });
    }
    onPageShow() {
        Logger.info('onPageShow', JSON.stringify(router.getParams()));
        this.editedTaskInfo = JSON.parse(router.getParams() ? router.getParams()['editTask'] : '{}');
        this.editedTaskID = JSON.stringify(this.editedTaskInfo);
        if (globalThis.isForeground) {
            globalThis.isForeground = false;
            if (this.homeStore.currentDate.getDate() !== (new Date()).getDate()) {
                globalThis.taskListChange = true;
                this.homeStore = new HomeStore(new Date());
            }
            this.checkCurrentTime();
        }
    }
    checkCurrentTime() {
        GlobalInfoApi.query((result) => {
            let predate = new Date(result.lastDate);
            let date = new Date();
            if (result.length !== 0 && date.getTime() < predate.getTime()) {
                AlertDialog.show({
                    title: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                    message: { "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                    autoCancel: false,
                    alignment: DialogAlignment.Bottom,
                    offset: { dx: 0, dy: -20 },
                    gridCount: 3,
                    confirm: {
                        value: { "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                        action: () => {
                            getContext(this).terminateSelf();
                            console.info('Button-clicking callback');
                        }
                    },
                    cancel: () => {
                        console.info('Closed callbacks');
                    }
                });
            }
            else {
                this.homeStore.initData();
            }
        });
    }
    TabBuilder(index, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.width(commonConst.THOUSANDTH_1000);
            Column.height(commonConst.THOUSANDTH_1000);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(index === this.currentPage ? NavList[index].icon_selected : NavList[index].icon);
            Image.width({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.height({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(NavList[index].text);
            Text.fontSize({ "id": 16777306, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(commonConst.FONT_WEIGHT_500);
            Text.fontColor(this.currentPage === index ? { "id": 16777268, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777291, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Tabs.create({ barPosition: BarPosition.End, controller: this.tabController });
            Tabs.scrollable(false);
            Tabs.width(commonConst.THOUSANDTH_1000);
            Tabs.height(commonConst.THOUSANDTH_1000);
            Tabs.barWidth(commonConst.THOUSANDTH_940);
            Tabs.barMode(BarMode.Fixed);
            Tabs.vertical(false);
            Tabs.onChange((index) => {
                this.currentPage = index;
            });
            if (!isInitialRender) {
                Tabs.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    __Common__.create();
                    __Common__.borderWidth({ bottom: 1 });
                    __Common__.borderColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    if (!isInitialRender) {
                        __Common__.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new HomeIndex(this, { homeStore: this.__homeStore, editedTaskInfo: this.__editedTaskInfo, editedTaskID: this.__editedTaskID }, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                __Common__.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, TabId.HOME);
                } });
            TabContent.align(Alignment.Start);
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new AchievementIndex(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, TabId.ACHIEVEMENT);
                } });
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new GetClientInfo(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, TabId.PLAN);
                } });
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    __Common__.create();
                    __Common__.borderWidth({ bottom: 1 });
                    __Common__.borderColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    if (!isInitialRender) {
                        __Common__.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new MineIndex(this, {}, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                __Common__.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, TabId.MINE);
                } });
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new Index(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=MainPage.js.map