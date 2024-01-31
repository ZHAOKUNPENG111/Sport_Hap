import { MqttAsync } from '@bundle:com.example.healthy_life/entry@ohos_Mqtt/index';
import LogUtil from '@bundle:com.example.healthy_life/entry/ets/pages/utils/LogUtil';
import TimeUtil from '@bundle:com.example.healthy_life/entry/ets/pages/utils/TimeUtil';
import router from '@ohos:router';
const TAG = 'mqttasync';
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
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('开始运动');
            Text.fontSize(20);
            Text.margin({ top: 10, bottom: 10 });
            Text.height(80);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({ justifyContent: FlexAlign.SpaceAround });
            Flex.margin({ bottom: 10 });
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('cancel');
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
            Button.onClick(() => {
                this.controller.close();
                this.confirm();
                // this.publish(this.sportsname() + this.info?.['targetValue'] + this.info?.['unit'])
                router.pushUrl({
                    url: 'pages/page', ////点击弹窗打卡转跳网页进行运动检测
                });
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
function start(a) {
    if (interval != null) { //判断计时器是否为空
        clearInterval(interval);
        interval = null;
    }
    interval = setInterval(a, 1000); //启动计时器，调用overs函数，
}
function stop() {
    clearInterval(interval);
    interval = null;
}
let i = 0;
var interval = null; //计时器
class EmqxPage extends ViewPU {
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
        this.__info = new ObservedPropertyObjectPU(router.getParams() // 获取传递过来的参数对象
        , this, "info");
        this.__arr = new ObservedPropertyObjectPU([], this, "arr");
        this.mqttAsyncClient = null;
        this.scroller = new Scroller();
        this.__topic = new ObservedPropertySimplePU('Aisports', this, "topic");
        this.__payload = new ObservedPropertySimplePU('你好呀', this, "payload");
        this.__url = new ObservedPropertySimplePU(' 192.168.105.39', this, "url");
        this.__clientId = new ObservedPropertySimplePU('', this, "clientId");
        this.__userName = new ObservedPropertySimplePU("", this, "userName");
        this.__password = new ObservedPropertySimplePU("", this, "password");
        this.__connectedCount = new ObservedPropertySimplePU(0, this, "connectedCount");
        this.__isConnect = new ObservedPropertySimplePU(false, this, "isConnect");
        this.__isPromise = new ObservedPropertySimplePU(false, this, "isPromise");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.bud !== undefined) {
            this.bud = params.bud;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.info !== undefined) {
            this.info = params.info;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.mqttAsyncClient !== undefined) {
            this.mqttAsyncClient = params.mqttAsyncClient;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.topic !== undefined) {
            this.topic = params.topic;
        }
        if (params.payload !== undefined) {
            this.payload = params.payload;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.clientId !== undefined) {
            this.clientId = params.clientId;
        }
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.connectedCount !== undefined) {
            this.connectedCount = params.connectedCount;
        }
        if (params.isConnect !== undefined) {
            this.isConnect = params.isConnect;
        }
        if (params.isPromise !== undefined) {
            this.isPromise = params.isPromise;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__bud.purgeDependencyOnElmtId(rmElmtId);
        this.__info.purgeDependencyOnElmtId(rmElmtId);
        this.__arr.purgeDependencyOnElmtId(rmElmtId);
        this.__topic.purgeDependencyOnElmtId(rmElmtId);
        this.__payload.purgeDependencyOnElmtId(rmElmtId);
        this.__url.purgeDependencyOnElmtId(rmElmtId);
        this.__clientId.purgeDependencyOnElmtId(rmElmtId);
        this.__userName.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__connectedCount.purgeDependencyOnElmtId(rmElmtId);
        this.__isConnect.purgeDependencyOnElmtId(rmElmtId);
        this.__isPromise.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__bud.aboutToBeDeleted();
        this.__info.aboutToBeDeleted();
        this.__arr.aboutToBeDeleted();
        this.__topic.aboutToBeDeleted();
        this.__payload.aboutToBeDeleted();
        this.__url.aboutToBeDeleted();
        this.__clientId.aboutToBeDeleted();
        this.__userName.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__connectedCount.aboutToBeDeleted();
        this.__isConnect.aboutToBeDeleted();
        this.__isPromise.aboutToBeDeleted();
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
    get info() {
        return this.__info.get();
    }
    set info(newValue) {
        this.__info.set(newValue);
    }
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue) {
        this.__arr.set(newValue);
    }
    get topic() {
        return this.__topic.get();
    }
    set topic(newValue) {
        this.__topic.set(newValue);
    }
    get payload() {
        return this.__payload.get();
    }
    set payload(newValue) {
        this.__payload.set(newValue);
    }
    get url() {
        return this.__url.get();
    }
    set url(newValue) {
        this.__url.set(newValue);
    }
    get clientId() {
        return this.__clientId.get();
    }
    set clientId(newValue) {
        this.__clientId.set(newValue);
    }
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue) {
        this.__userName.set(newValue);
    }
    get password() {
        return this.__password.get();
    }
    set password(newValue) {
        this.__password.set(newValue);
    }
    get connectedCount() {
        return this.__connectedCount.get();
    }
    set connectedCount(newValue) {
        this.__connectedCount.set(newValue);
    }
    get isConnect() {
        return this.__isConnect.get();
    }
    set isConnect(newValue) {
        this.__isConnect.set(newValue);
    }
    get isPromise() {
        return this.__isPromise.get();
    }
    set isPromise(newValue) {
        this.__isPromise.set(newValue);
    }
    overs() {
        // this.i++;
        this.showLog(i.toString());
    }
    sportsname() {
        var _a, _b, _c, _d, _e, _f;
        if (((_a = this.info) === null || _a === void 0 ? void 0 : _a['taskID']) == "1")
            return "引体向上";
        else if (((_b = this.info) === null || _b === void 0 ? void 0 : _b['taskID']) == '2')
            return "平板支撑";
        else if (((_c = this.info) === null || _c === void 0 ? void 0 : _c['taskID']) == '3')
            return "俯卧撑";
        else if (((_d = this.info) === null || _d === void 0 ? void 0 : _d['taskID']) == '4')
            return "跳绳";
        else if (((_e = this.info) === null || _e === void 0 ? void 0 : _e['taskID']) == '5')
            return "深蹲";
        else if (((_f = this.info) === null || _f === void 0 ? void 0 : _f['taskID']) == '6')
            return "静态深蹲";
        else
            return "erro";
    }
    aboutToAppear() {
        this.showLog("开始");
        while (1) {
            if (this.createClient()) {
                break;
            }
        }
    }
    onPageShow() {
        while (1) {
            this.connect();
            if (this.isConnected()) {
                break;
            }
        }
    }
    onPageHide() {
        var _a, _b;
        this.publish(this.sportsname() + ((_a = this.info) === null || _a === void 0 ? void 0 : _a['targetValue']) + ((_b = this.info) === null || _b === void 0 ? void 0 : _b['unit']));
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width("100%");
            Column.height("100%");
            Column.backgroundImage({ "id": 16777357, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImageSize(ImageSize.Cover);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("服务器连接");
            Text.textAlign(TextAlign.Center);
            Text.fontSize(40);
            Text.fontWeight(FontWeight.Bold);
            Text.margin(30);
            Text.backgroundColor('rgba(200,200,200,0.40)');
            Text.width("100%");
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            var _a, _b;
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.sportsname() + ((_a = this.info) === null || _a === void 0 ? void 0 : _a['targetValue']) + ((_b = this.info) === null || _b === void 0 ? void 0 : _b['unit']));
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.width("40%");
            Button.height("10%");
            Button.margin(40);
            Button.onClick(() => {
                var _a, _b;
                this.publish(this.sportsname() + ((_a = this.info) === null || _a === void 0 ? void 0 : _a['targetValue']) + ((_b = this.info) === null || _b === void 0 ? void 0 : _b['unit']));
                this.dialogController.open();
            });
            Button.fontColor(12);
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("开始运动");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.maxLines(1);
            Text.textAlign(TextAlign.Center);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create(this.scroller);
            Scroll.width("95%");
            Scroll.height("45%");
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.scrollBar(BarState.On);
            Scroll.padding(16);
            Scroll.align(Alignment.TopStart);
            Scroll.border({ width: 3 });
            Scroll.backgroundColor('rgba(200,200,200,0.40)');
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: 8 });
            Column.alignItems(HorizontalAlign.Start);
            Column.width("100%");
            Column.padding(10);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(item);
                    Text.fontSize(15);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.arr, forEachItemGenFunction, (item) => item, false, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    showLog(info) {
        let time = TimeUtil.currentTimeStamp();
        this.arr.push(time + " | " + info);
        this.scroller.scrollEdge(Edge.Bottom);
    }
    createClient() {
        this.showLog("create client");
        if (this.mqttAsyncClient) {
            this.showLog("client is created");
            return true;
        }
        this.mqttAsyncClient = MqttAsync.createMqtt({
            url: this.url,
            clientId: this.clientId,
            persistenceType: 1,
        });
        if (!this.mqttAsyncClient) {
            this.showLog("create client failed");
            return false;
        }
        this.messageArrived();
        this.connectLost();
        this.mqttAsyncClient.setMqttTrace(6);
        this.showLog("create client success");
        return true;
    }
    async connect() {
        LogUtil.info(TAG, "connect");
        this.showLog("connect");
        let options = {
            userName: this.userName,
            password: this.password,
            connectTimeout: 300
        };
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (!(await this.isConnected())) {
            if (this.isPromise) {
                this.mqttAsyncClient.connect(options).then((data) => {
                    LogUtil.info(TAG, "connect result:" + JSON.stringify(data));
                    this.showLog(JSON.stringify(data.message));
                    this.connectedCount++;
                }).catch((data) => {
                    LogUtil.info(TAG, "connect fail result:" + JSON.stringify(data));
                    this.showLog(JSON.stringify(data.message));
                });
            }
            else {
                this.mqttAsyncClient.connect(options, (err, data) => {
                    if (!err) {
                        LogUtil.info(TAG, "connect result:" + JSON.stringify(data));
                        this.showLog(data.message);
                        if (data.message == "Connect Success") {
                            LogUtil.info(TAG, "connect result connectedCount:");
                            this.connectedCount++;
                            return true;
                        }
                    }
                    else {
                        this.showLog("connect error");
                        this.showLog(JSON.stringify(err));
                        LogUtil.info(TAG, "connect error:" + JSON.stringify(err));
                    }
                });
            }
        }
    }
    async publish(massage) {
        LogUtil.info(TAG, "publish");
        this.showLog("publish");
        let publishOption = {
            topic: this.topic,
            qos: 1,
            payload: massage
        };
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (await this.isConnected()) {
            if (this.isPromise) {
                this.mqttAsyncClient.publish(publishOption).then((data) => {
                    LogUtil.info(TAG, "publish success result:" + JSON.stringify(data));
                    this.showLog(data.message);
                }).catch((err) => {
                    LogUtil.info(TAG, "publish fail result:" + JSON.stringify(err));
                    this.showLog(err.message);
                });
            }
            else {
                this.mqttAsyncClient.publish(publishOption, (err, data) => {
                    LogUtil.info(TAG, "publish response:");
                    if (!err) {
                        this.showLog(data.message);
                        LogUtil.info(TAG, "publish result:" + JSON.stringify(data));
                    }
                    else {
                        this.showLog("publish error");
                        this.showLog(JSON.stringify(err));
                        LogUtil.info(TAG, "publish error:" + JSON.stringify(err));
                    }
                });
            }
        }
    }
    async subscribe() {
        LogUtil.info(TAG, "subscribe");
        this.showLog("subscribe");
        let subscribeOption = {
            topic: this.topic,
            qos: 2
        };
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (await this.isConnected()) {
            if (this.isPromise) {
                this.mqttAsyncClient.subscribe(subscribeOption).then((data) => {
                    LogUtil.info(TAG, "subscribe success result:" + JSON.stringify(data));
                    this.showLog(data.message);
                }).catch((err) => {
                    LogUtil.info(TAG, "subscribe fail result:" + JSON.stringify(err));
                    this.showLog(err.message);
                });
            }
            else {
                this.mqttAsyncClient.subscribe(subscribeOption, (err, data) => {
                    if (!err) {
                        this.showLog(data.message);
                        LogUtil.info(TAG, "subscribe result:" + JSON.stringify(data));
                    }
                    else {
                        this.showLog("subscribe error");
                        this.showLog(JSON.stringify(err));
                        LogUtil.info(TAG, "subscribe error:" + JSON.stringify(err));
                    }
                });
            }
        }
    }
    messageArrived() {
        LogUtil.info(TAG, "messageArrived");
        this.showLog("messageArrived");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return false;
        }
        this.mqttAsyncClient.messageArrived((err, data) => {
            if (!err) {
                let msg = "messageArrived topic:" + data.topic + ", msg:" + data.payload;
                this.showLog(msg);
                LogUtil.info(TAG, "messageArrived message:" + JSON.stringify(data));
                return true;
            }
            else {
                this.showLog("messageArrived error");
                this.showLog(JSON.stringify(err));
                LogUtil.info(TAG, "messageArrived error:" + JSON.stringify(err));
            }
        });
    }
    async unsubscribe() {
        LogUtil.info(TAG, "unsubscribe");
        this.showLog("unsubscribe");
        let subscribeOption = {
            topic: this.topic,
            qos: 2
        };
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (await this.isConnected()) {
            if (this.isPromise) {
                this.mqttAsyncClient.unsubscribe(subscribeOption).then((data) => {
                    LogUtil.info(TAG, "unsubscribe success result:" + JSON.stringify(data));
                    this.showLog(data.message);
                }).catch((err) => {
                    LogUtil.info(TAG, "unsubscribe fail result:" + JSON.stringify(err));
                    this.showLog(err.message);
                });
            }
            else {
                this.mqttAsyncClient.unsubscribe(subscribeOption, (err, data) => {
                    if (!err) {
                        this.showLog(data.message);
                        LogUtil.info(TAG, "unsubscribe result:" + JSON.stringify(data));
                    }
                    else {
                        this.showLog("unsubscribe error");
                        this.showLog(JSON.stringify(err));
                        LogUtil.info(TAG, "unsubscribe error:" + JSON.stringify(err));
                    }
                });
            }
        }
    }
    async disconnect() {
        LogUtil.info(TAG, "disconnect");
        this.showLog("disconnect");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (await this.isConnected()) {
            if (this.isPromise) {
                this.mqttAsyncClient.disconnect().then((data) => {
                    LogUtil.info(TAG, "disconnect success result:" + JSON.stringify(data));
                    this.showLog(data.message);
                }).catch((err) => {
                    LogUtil.info(TAG, "disconnect fail result:" + JSON.stringify(err));
                    this.showLog(err.message);
                });
            }
            else {
                this.mqttAsyncClient.disconnect((err, data) => {
                    if (!err) {
                        this.showLog(data.message);
                        LogUtil.info(TAG, "disconnect result:" + JSON.stringify(data));
                    }
                    else {
                        this.showLog("disconnect error");
                        this.showLog(JSON.stringify(err));
                        LogUtil.info(TAG, "disconnect error:" + JSON.stringify(err));
                    }
                });
            }
        }
    }
    isConnected() {
        LogUtil.info(TAG, "isConnected");
        this.showLog("isConnected");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        return this.mqttAsyncClient.isConnected().then((data) => {
            this.showLog("isConnected " + data);
            LogUtil.info(TAG, "isConnected result:" + data);
            if (!data) {
                this.showLog("client not connect");
            }
            return data;
        });
    }
    async reconnect() {
        LogUtil.info(TAG, "reconnect");
        this.showLog("reconnect");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        if (!(await this.isConnected())) {
            if (this.connectedCount == 0) {
                this.showLog("reconnect: client previously not connected");
                LogUtil.info(TAG, "reconnect: client previously not connected");
                return;
            }
            this.mqttAsyncClient.reconnect().then((data) => {
                this.showLog("reConnected " + data);
                LogUtil.info(TAG, "reConnected result:" + data);
            });
        }
    }
    connectLost() {
        LogUtil.info(TAG, "connectLost");
        this.showLog("connectLost");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        this.mqttAsyncClient.connectLost((err, data) => {
            if (!err) {
                this.showLog(data.message);
                this.reconnect();
                LogUtil.info(TAG, "connect lost cause:" + JSON.stringify(data));
            }
            else {
                this.showLog("connect lost error");
                this.showLog(JSON.stringify(err));
                LogUtil.info(TAG, "connect lost error:" + JSON.stringify(err));
            }
        });
    }
    async destroy() {
        LogUtil.info(TAG, "destroy");
        this.showLog("destroy client");
        if (this.mqttAsyncClient == null) {
            this.showLog("client not created");
            return;
        }
        this.mqttAsyncClient.destroy().then((data) => {
            this.showLog("destroy " + data);
            LogUtil.info(TAG, "destroy result:" + data);
            this.mqttAsyncClient = null;
            this.connectedCount = 0;
        });
    }
    clear() {
        this.arr = [];
    }
    setIsPromise(isPromise) {
        this.isPromise = !isPromise;
        this.showLog("setIsPromise： " + this.isPromise);
        LogUtil.info(TAG, "setIsPromise result:" + this.isPromise);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new EmqxPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=Index.js.map