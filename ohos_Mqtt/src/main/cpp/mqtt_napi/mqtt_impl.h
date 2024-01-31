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

#ifndef PAHOMQTT_EXEC_H
#define PAHOMQTT_EXEC_H

#include <mutex>
#include <vector>

#include "napi/native_api.h"
#include <unistd.h>
#include "MQTTAsync.h"
#include "mqtt_client_options.h"
#include "connect_context.h"
#include "subscribe_context.h"
#include "publish_context.h"

namespace OHOS {
namespace PahoMqtt {
class MqttImpl final {
public:

    MqttImpl() = default;

    ~MqttImpl() = default;

    static bool Initialize(MqttClientOptions options);

    static bool MqttConnect(ConnectContext *context);

    static bool MqttSubscribe(SubscribeContext *context);

    static bool MqttDisconnect(BaseContext *context);

    static bool MqttPublish(PublishContext *context);

    static bool MqttUnsubscribe(SubscribeContext *context);

    static bool IsConnected();

    static bool MqttReConnect();

    static void SetMqttTrace(enum MQTTASYNC_TRACE_LEVELS level);

    static int SetMessageArrivedCallback(PublishContext *context);

    static int SetConnectionLostCallback(BaseContext *context);

    static bool Destroy();

private:
    static const uint32_t WAIT_COMPLETION_TIME = 3000;

    static MQTTAsync mqttAsync_;

    static std::mutex mutex_;

    static bool initialized_;
    
    static int connect_finished;
    
    static int subscribe_finished;
    
    static int publish_finished;
    
    static int unSubscribe_finished;
    
    static int disConnect_finished;
    
    static int sleep_time;

    static bool IsSSLConnect(const std::string &url);

    static void MqttTraceCallback(enum MQTTASYNC_TRACE_LEVELS level, char *message);

    static int SslErrorCallback(const char *str, size_t len, void *u);

    static void OnConnectSuccess(void *context, MQTTAsync_successData *response);

    static void OnConnectFail(void *context, MQTTAsync_failureData *response);

    static void OnSubscribeFail(void *context, MQTTAsync_failureData *response);

    static void OnSubscribeSuccess(void *context, MQTTAsync_successData *response);

    static int MessageArrived(void *context, char *topicName, int topicLen, MQTTAsync_message *message);

    static void ConnectionLost(void *context, char *cause);

    static void OnUnSubscribe(void *context, MQTTAsync_successData *response);

    static void OnUnSubscribeFail(void *context, MQTTAsync_failureData *response);

    static void OnDisconnect(void *context, MQTTAsync_successData *response);

    static void OnPublishSuccess(void *context, MQTTAsync_successData *response);

    static void OnPublishFail(void *context, MQTTAsync_failureData *response);

    static void freeConnectcontext(ConnectContext *context);
};
}
} // namespace OHOS::PahoMqtt

#endif /* PAHOMQTT_EXEC_H */
