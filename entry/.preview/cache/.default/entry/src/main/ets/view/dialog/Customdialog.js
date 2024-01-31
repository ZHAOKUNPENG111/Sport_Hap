"use strict";
class CustomDialogExample extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.cancel = () => {
            console.info('Callback when the first button is clicked');
        };
        this.confirm = () => {
            console.info('Callback when the second button is clicked');
        };
        this.controller = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample(this, {
                    cancel: this.cancel,
                    confirm: this.confirm,
                });
                jsDialog.setController(this.controller);
                ViewPU.create(jsDialog);
            }
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
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
    setController(ctr) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/Customdialog.ets(17:5)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('我是内容');
            Text.debugLine("view/dialog/Customdialog.ets(18:7)");
            Text.fontSize(20);
            Text.margin({ top: 10, bottom: 10 });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({ justifyContent: FlexAlign.SpaceAround });
            Flex.debugLine("view/dialog/Customdialog.ets(19:7)");
            Flex.margin({ bottom: 10 });
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('cancel');
            Button.debugLine("view/dialog/Customdialog.ets(20:9)");
            Button.onClick(() => {
                this.controller.close();
                this.cancel();
            });
            Button.backgroundColor(0xffffff);
            Button.fontColor(Color.Black);
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('confirm');
            Button.debugLine("view/dialog/Customdialog.ets(25:9)");
            Button.onClick(() => {
                this.controller.close();
                this.confirm();
            });
            Button.backgroundColor(0xffffff);
            Button.fontColor(Color.Red);
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class CustomDialogUser extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__bud = new ObservedPropertyObjectPU({ 'cancel': this.onCancel(), 'confirm': this.onAccept() }, this, "bud");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample(this, this.bud);
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
            }
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.bud !== undefined) {
            this.bud = params.bud;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__bud.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__bud.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get bud() {
        return this.__bud.get();
    }
    set bud(newValue) {
        this.__bud.set(newValue);
    }
    onCancel() {
        console.info('Callback when the first button is clicked');
    }
    onAccept() {
        console.info('Callback when the second button is clicked');
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/dialog/Customdialog.ets(51:5)");
            Column.width('100%');
            Column.margin({ top: 5 });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('click me');
            Button.debugLine("view/dialog/Customdialog.ets(52:7)");
            Button.onClick(() => {
                this.dialogController.open();
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new CustomDialogUser(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=Customdialog.js.map