import {
  MqttAsync,
  MqttClientOptions,
  MqttConnectOptions,
  MqttSubscribeOptions,
  MqttPublishOptions,
  MqttResponse,
  MqttMessage,
  MqttClient,
  MqttQos,
  MqttPersistenceType
} from '@ohos/mqtt';

import LogUtil from './utils/LogUtil';
import TimeUtil from './utils/TimeUtil';
import router from '@ohos.router';


const TAG = 'mqttasync';
@CustomDialog
struct CustomDialogExample {
  cancel: () => void = () => {
    console.info('Callback when the first button is clicked')
  }
  confirm: () => void = () => {
    console.info('Callback when the second button is clicked')
  }
  controller: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample({
      cancel: this.cancel,
      confirm: this.confirm,
    }),
  })

  build() {
    Column() {
      Text('开始运动').fontSize(20).margin({ top: 10, bottom: 10 }).height(80)
      Flex({ justifyContent: FlexAlign.SpaceAround }) {
        Button('cancel')
          .onClick(() => {
            this.controller.close()
            this.cancel()
          }).backgroundColor(0xffffff).fontColor(Color.Black)
        Button('confirm')
          .onClick(() => {
            this.controller.close()
            this.confirm()
            // this.publish(this.sportsname() + this.info?.['targetValue'] + this.info?.['unit'])
            router.pushUrl({
              url: 'pages/page',////点击弹窗打卡转跳网页进行运动检测
            })
          }).backgroundColor(0xffffff).fontColor(Color.Red)
      }.margin({ bottom: 10 })
    }
  }
}

function start(a){//启动计时器函数
  if(interval!=null){//判断计时器是否为空
    clearInterval(interval);
    interval=null;
  }
  interval = setInterval(a,1000);//启动计时器，调用overs函数，
}

function stop(){

  clearInterval(interval);
  interval = null;
}
let i:number = 0
var interval = null;//计时器
@Entry
@Component
struct EmqxPage {
  @State bud: Record<string, Function | void> = { 'cancel': this.onCancel(), 'confirm': this.onAccept() }
  dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample(this.bud),
  })

  onCancel() {
    console.info('Callback when the first button is clicked')
  }

  onAccept() {
    console.info('Callback when the second button is clicked')
  }
  @State info: object = router.getParams()// 获取传递过来的参数对象

  @State arr: string[] = [];
  private mqttAsyncClient: MqttClient | null = null;
  scroller: Scroller = new Scroller();
  //  Set Client Configuration
  @State topic: string = 'Aisports';
  @State payload: string = '你好呀';
  @State url: string = ' 192.168.105.39';
  @State clientId: string = '';
  @State userName: string = "";
  @State password: string = "";
  @State connectedCount: number = 0;
  @State isConnect: boolean = false;
  @State isPromise: boolean = false;


  overs(){
  // this.i++;
  this.showLog(i.toString());
}

  sportsname(){
    if(this.info?.['taskID']=="1") return "引体向上"
    else if(this.info?.['taskID']=='2') return "平板支撑"
    else if(this.info?.['taskID']=='3') return "俯卧撑"
    else if(this.info?.['taskID']=='4') return "跳绳"
    else if(this.info?.['taskID']=='5') return "深蹲"
    else if(this.info?.['taskID']=='6') return "静态深蹲"
    else return "erro"
  }

  aboutToAppear() {
    this.showLog("开始")
    while (1) {
      if (this.createClient()) {
        break
      }
    }
  }
  onPageShow(){
    while (1){
      this.connect()
      if(this.isConnected()){break}
    }
  }
  onPageHide(){
    this.publish(this.sportsname() + this.info?.['targetValue'] + this.info?.['unit'])
  }

  build() {
    Column() {
      Text("服务器连接")
        .textAlign(TextAlign.Center)
        .fontSize(40)
        .fontWeight(FontWeight.Bold)
        .margin(30)
        .backgroundColor('rgba(200,200,200,0.40)').width("100%")
      Text(this.sportsname() + this.info?.['targetValue'] + this.info?.['unit'])
      Button(){
        Text("开始运动")
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor($r("app.color.white"))
          .maxLines(1)
          .textAlign(TextAlign.Center)
      }.width("40%").height("10%").margin(40)
      .onClick(() => {
        this.publish(this.sportsname() + this.info?.['targetValue'] + this.info?.['unit'])
        this.dialogController.open()
      })
        .fontColor(12)

      Scroll(this.scroller) {
        Column({ space: 8 }) {
          ForEach(this.arr, (item: string) => {
            Text(item).fontSize(15)
          }, (item: string) => item)
        }
        .alignItems(HorizontalAlign.Start)
        .width("100%")
        .padding(10)
      }
      .width("95%")
      .height("45%")
      .scrollable(ScrollDirection.Vertical)
      .scrollBar(BarState.On)
      .padding(16)
      .align(Alignment.TopStart)
      .border({ width: 3 })
      .backgroundColor('rgba(200,200,200,0.40)')
    }.width("100%").height("100%")
    .backgroundImage($r('app.media.ic_ad_bg')).backgroundImageSize(ImageSize.Cover)
  }

  showLog(info: string) {
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
    this.messageArrived()
    this.connectLost()
    this.mqttAsyncClient.setMqttTrace(6);
    this.showLog("create client success");
    return true;
  }

  async connect() {
    LogUtil.info(TAG, "connect");
    this.showLog("connect");
    let options: MqttConnectOptions = {
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
        this.mqttAsyncClient.connect(options).then((data: MqttResponse) => {
          LogUtil.info(TAG, "connect result:" + JSON.stringify(data));
          this.showLog(JSON.stringify(data.message));
          this.connectedCount++;
        }).catch((data: MqttResponse) => {
          LogUtil.info(TAG, "connect fail result:" + JSON.stringify(data));
          this.showLog(JSON.stringify(data.message));
        })
      } else {
        this.mqttAsyncClient.connect(options, (err: Error, data: MqttResponse) => {
          if (!err) {
            LogUtil.info(TAG, "connect result:" + JSON.stringify(data));
            this.showLog(data.message);
            if (data.message == "Connect Success") {
              LogUtil.info(TAG, "connect result connectedCount:");
              this.connectedCount++;
              return true;
            }
          } else {
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
    let publishOption: MqttPublishOptions = {
      topic: this.topic,
      qos: 1,
      payload: massage
    }
    if (this.mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    if (await this.isConnected()) {
      if (this.isPromise) {
        this.mqttAsyncClient.publish(publishOption).then((data: MqttResponse) => {
          LogUtil.info(TAG, "publish success result:" + JSON.stringify(data));
          this.showLog(data.message);
        }).catch((err: MqttResponse) => {
          LogUtil.info(TAG, "publish fail result:" + JSON.stringify(err));
          this.showLog(err.message);
        })
      } else {
        this.mqttAsyncClient.publish(publishOption, (err: Error, data: MqttResponse) => {
          LogUtil.info(TAG, "publish response:");
          if (!err) {
            this.showLog(data.message);
            LogUtil.info(TAG, "publish result:" + JSON.stringify(data));
          } else {
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
    let subscribeOption: MqttSubscribeOptions = {
      topic: this.topic,
      qos: 2
    }
    if (this.mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    if (await this.isConnected()) {
      if (this.isPromise) {
        this.mqttAsyncClient.subscribe(subscribeOption).then((data: MqttResponse) => {
          LogUtil.info(TAG, "subscribe success result:" + JSON.stringify(data));
          this.showLog(data.message);
        }).catch((err: MqttResponse) => {
          LogUtil.info(TAG, "subscribe fail result:" + JSON.stringify(err));
          this.showLog(err.message);
        })
      } else {
        this.mqttAsyncClient.subscribe(subscribeOption, (err: Error, data: MqttResponse) => {
          if (!err) {
            this.showLog(data.message);
            LogUtil.info(TAG, "subscribe result:" + JSON.stringify(data));
          } else {
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
    this.mqttAsyncClient.messageArrived((err: Error, data: MqttMessage) => {
      if (!err) {
        let msg = "messageArrived topic:" + data.topic + ", msg:" + data.payload;
        this.showLog(msg);
        LogUtil.info(TAG, "messageArrived message:" + JSON.stringify(data));
        return true;
      } else {
        this.showLog("messageArrived error");
        this.showLog(JSON.stringify(err));
        LogUtil.info(TAG, "messageArrived error:" + JSON.stringify(err));
      }
    });
  }

  async unsubscribe() {
    LogUtil.info(TAG, "unsubscribe");
    this.showLog("unsubscribe");
    let subscribeOption: MqttSubscribeOptions = {
      topic: this.topic,
      qos: 2
    }
    if (this.mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    if (await this.isConnected()) {
      if (this.isPromise) {
        this.mqttAsyncClient.unsubscribe(subscribeOption).then((data: MqttResponse) => {
          LogUtil.info(TAG, "unsubscribe success result:" + JSON.stringify(data));
          this.showLog(data.message);
        }).catch((err: MqttResponse) => {
          LogUtil.info(TAG, "unsubscribe fail result:" + JSON.stringify(err));
          this.showLog(err.message);
        })
      } else {
        this.mqttAsyncClient.unsubscribe(subscribeOption, (err: Error, data: MqttResponse) => {
          if (!err) {
            this.showLog(data.message);
            LogUtil.info(TAG, "unsubscribe result:" + JSON.stringify(data));
          } else {
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
        this.mqttAsyncClient.disconnect().then((data: MqttResponse) => {
          LogUtil.info(TAG, "disconnect success result:" + JSON.stringify(data));
          this.showLog(data.message);
        }).catch((err: MqttResponse) => {
          LogUtil.info(TAG, "disconnect fail result:" + JSON.stringify(err));
          this.showLog(err.message);
        })
      } else {
        this.mqttAsyncClient.disconnect((err: Error, data: MqttResponse) => {
          if (!err) {
            this.showLog(data.message);
            LogUtil.info(TAG, "disconnect result:" + JSON.stringify(data));
          } else {
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
    return this.mqttAsyncClient.isConnected().then((data: boolean) => {
      this.showLog("isConnected " + data);
      LogUtil.info(TAG, "isConnected result:" + data);
      if (!data) {
        this.showLog("client not connect");
      }
      return data;
    })
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
      this.mqttAsyncClient.reconnect().then((data: boolean) => {
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
    this.mqttAsyncClient.connectLost((err: Error, data: MqttResponse) => {
      if (!err) {
        this.showLog(data.message);
        this.reconnect();
        LogUtil.info(TAG, "connect lost cause:" + JSON.stringify(data));
      } else {
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
    this.mqttAsyncClient.destroy().then((data: boolean) => {
      this.showLog("destroy " + data);
      LogUtil.info(TAG, "destroy result:" + data);
      this.mqttAsyncClient = null;
      this.connectedCount = 0;
    });
  }

  clear() {
    this.arr = [];
  }

  setIsPromise(isPromise: boolean) {
    this.isPromise = !isPromise
    this.showLog("setIsPromise： " + this.isPromise);
    LogUtil.info(TAG, "setIsPromise result:" + this.isPromise);
  }
}
