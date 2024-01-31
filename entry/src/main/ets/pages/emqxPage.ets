/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the  Eclipse Public License -v 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.eclipse.org/legal/epl-2.0/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

const TAG = 'mqttasync';
let topic: string = 'Aisports';

let url: string = '192.168.137.1';
let clientId: string = '';
let userName: string = "";
let password: string = "";
let  connectedCount: number = 0;
let isConnect: boolean = false;
let isPromise: boolean = false;
let arr: string[] = [];
export  let  mqttAsyncClient: MqttClient | null = null;
let payload: string;
let  scroller: Scroller = new Scroller();

// @Entry
// @Component
export  class EmqxPage {
  //  Set Client Configuration

  public static showLog(info: string) {
    let time = TimeUtil.currentTimeStamp();
    arr.push(time + " | " + info);
    scroller.scrollEdge(Edge.Bottom);
  }

  public static connectLost() {
    LogUtil.info(TAG, "connectLost");
    this.showLog("connectLost");
    if (mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    mqttAsyncClient.connectLost((err: Error, data: MqttResponse) => {
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

  public static createClient() {
    this.showLog("create client");
    if (mqttAsyncClient) {
      this.showLog("client is created");
      return;
    }
    mqttAsyncClient = MqttAsync.createMqtt({
      url: url,
      clientId: clientId,
      persistenceType: 1,
    });
    if (!mqttAsyncClient) {
      this.showLog("create client failed");
      return;
    }
    this.messageArrived()
    this.connectLost()
    mqttAsyncClient.setMqttTrace(6);
    this.showLog("create client success");
  }

  public static async connect() {
    LogUtil.info(TAG, "connect");
    this.showLog("connect");
    let options: MqttConnectOptions = {
      userName: userName,
      password: password,
      connectTimeout: 300
    };
    if (mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    if (!(await this.isConnected())) {
      if (isPromise) {
        mqttAsyncClient.connect(options).then((data: MqttResponse) => {
          LogUtil.info(TAG, "connect result:" + JSON.stringify(data));
          this.showLog(JSON.stringify(data.message));
          connectedCount++;
        }).catch((data: MqttResponse) => {
          LogUtil.info(TAG, "connect fail result:" + JSON.stringify(data));
          this.showLog(JSON.stringify(data.message));
        })
      } else {
        mqttAsyncClient.connect(options, (err: Error, data: MqttResponse) => {
          if (!err) {
            LogUtil.info(TAG, "connect result:" + JSON.stringify(data));
            this.showLog(data.message);
            if (data.message == "Connect Success") {
              LogUtil.info(TAG, "connect result connectedCount:");
              connectedCount++;
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

  public static async publish(payload) {
    LogUtil.info(TAG, "publish");
    this.showLog("publish");
    let publishOption: MqttPublishOptions = {
      topic: topic,
      qos: 1,
      payload: payload
    }
    if (mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    if (await this.isConnected()) {
      if (isPromise) {
        mqttAsyncClient.publish(publishOption).then((data: MqttResponse) => {
          LogUtil.info(TAG, "publish success result:" + JSON.stringify(data));
          this.showLog(data.message);
        }).catch((err: MqttResponse) => {
          LogUtil.info(TAG, "publish fail result:" + JSON.stringify(err));
          this.showLog(err.message);
        })
      } else {
        mqttAsyncClient.publish(publishOption, (err: Error, data: MqttResponse) => {
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

  public static async subscribe() {
    LogUtil.info(TAG, "subscribe");
    this.showLog("subscribe");
    let subscribeOption: MqttSubscribeOptions = {
      topic: topic,
      qos: 2
    }
    if (mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    if (await this.isConnected()) {
      if (isPromise) {
        mqttAsyncClient.subscribe(subscribeOption).then((data: MqttResponse) => {
          LogUtil.info(TAG, "subscribe success result:" + JSON.stringify(data));
          this.showLog(data.message);
        }).catch((err: MqttResponse) => {
          LogUtil.info(TAG, "subscribe fail result:" + JSON.stringify(err));
          this.showLog(err.message);
        })
      } else {
        mqttAsyncClient.subscribe(subscribeOption, (err: Error, data: MqttResponse) => {
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

  public static messageArrived() {
    LogUtil.info(TAG, "messageArrived");
    this.showLog("messageArrived");
    if (mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    mqttAsyncClient.messageArrived((err: Error, data: MqttMessage) => {
      if (!err) {
        let msg = "messageArrived topic:" + data.topic + ", msg:" + data.payload;
        this.showLog(msg);
        LogUtil.info(TAG, "messageArrived message:" + JSON.stringify(data));
      } else {
        this.showLog("messageArrived error");
        this.showLog(JSON.stringify(err));
        LogUtil.info(TAG, "messageArrived error:" + JSON.stringify(err));
      }
    });
  }

  public static async unsubscribe() {
    LogUtil.info(TAG, "unsubscribe");
    this.showLog("unsubscribe");
    let subscribeOption: MqttSubscribeOptions = {
      topic: topic,
      qos: 2
    }
    if (mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    if (await this.isConnected()) {
      if (isPromise) {
        mqttAsyncClient.unsubscribe(subscribeOption).then((data: MqttResponse) => {
          LogUtil.info(TAG, "unsubscribe success result:" + JSON.stringify(data));
          this.showLog(data.message);
        }).catch((err: MqttResponse) => {
          LogUtil.info(TAG, "unsubscribe fail result:" + JSON.stringify(err));
          this.showLog(err.message);
        })
      } else {
        mqttAsyncClient.unsubscribe(subscribeOption, (err: Error, data: MqttResponse) => {
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

  public static async disconnect() {
    LogUtil.info(TAG, "disconnect");
    this.showLog("disconnect");
    if (mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    if (await this.isConnected()) {
      if (isPromise) {
        mqttAsyncClient.disconnect().then((data: MqttResponse) => {
          LogUtil.info(TAG, "disconnect success result:" + JSON.stringify(data));
          this.showLog(data.message);
        }).catch((err: MqttResponse) => {
          LogUtil.info(TAG, "disconnect fail result:" + JSON.stringify(err));
          this.showLog(err.message);
        })
      } else {
        mqttAsyncClient.disconnect((err: Error, data: MqttResponse) => {
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

  public static isConnected() {
    LogUtil.info(TAG, "isConnected");
    this.showLog("isConnected");
    if (mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    return mqttAsyncClient.isConnected().then((data: boolean) => {
      this.showLog("isConnected " + data);
      LogUtil.info(TAG, "isConnected result:" + data);
      if (!data) {
        this.showLog("client not connect");
      }
      return data;
    })
  }

  public static async reconnect() {
    LogUtil.info(TAG, "reconnect");
    this.showLog("reconnect");
    if (mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    if (!(await this.isConnected())) {
      if (connectedCount == 0) {
        this.showLog("reconnect: client previously not connected");
        LogUtil.info(TAG, "reconnect: client previously not connected");
        return;
      }
      mqttAsyncClient.reconnect().then((data: boolean) => {
        this.showLog("reConnected " + data);
        LogUtil.info(TAG, "reConnected result:" + data);
      });
    }
  }


  public static async destroy() {
    LogUtil.info(TAG, "destroy");
    this.showLog("destroy client");
    if (mqttAsyncClient == null) {
      this.showLog("client not created");
      return;
    }
    mqttAsyncClient.destroy().then((data: boolean) => {
      this.showLog("destroy " + data);
      LogUtil.info(TAG, "destroy result:" + data);
      mqttAsyncClient = null;
      connectedCount = 0;
    });
  }

  public static clear() {
    arr = [];
  }

  public static setIsPromise(isPromise: boolean) {
    isPromise = !isPromise
    this.showLog("setIsPromise： " + isPromise);
    LogUtil.info(TAG, "setIsPromise result:" + isPromise);
  }
  //
  // build(){
  //   Text($r('app.string.entry_MainAbility'))
  //     .fontSize(50)
  //     .fontWeight(FontWeight.Bold)
  //     .margin(10)
  //
  //   Flex({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceBetween }) {
  //     Button() {
  //       Text('使用promise接口')
  //         .fontSize($r("app.float.font_20"))
  //         .fontWeight(FontWeight.Bold)
  //         .fontColor($r("app.color.white"))
  //         .maxLines(1)
  //         .textAlign(TextAlign.Center)
  //     }
  //     .backgroundColor($r("app.color.blue_1677ff"))
  //     .width("100%")
  //     .margin({ right: 8 })
  //     .onClick(() => {
  //       setIsPromise(isPromise)
  //     })
  //
  //   }.margin(10)
  // }

}