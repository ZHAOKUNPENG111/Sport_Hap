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

#ifndef MQTT_MODULE_H
#define MQTT_MODULE_H

#include "napi/native_api.h"
#include <initializer_list>
#include "MQTTAsync.h"

#include "base_context.h"
#include "mqtt_log.h"
#include "mqtt_constant.h"
#include "mqtt_client_options.h"
#include "mqtt_napi_utils.h"
#include "publish_context.h"

#define MAX_PARAM_NUM 64

namespace OHOS {
namespace PahoMqtt {
typedef void (*Finalizer)(napi_env, void *data, void *);
class MqttModuleExports {
public:
    class MqttAsyncClient {
    public:
        static constexpr const char *FUNCTION_CONNECT = "connect";
        static constexpr const char *FUNCTION_DESTROY = "destroy";
        static constexpr const char *FUNCTION_ON = "on";
        static constexpr const char *FUNCTION_OFF = "off";
        static constexpr const char *FUNCTION_CONNECTLOST = "connectLost";
        static constexpr const char *FUNCTION_SUBCRIBE = "subscribe";
        static constexpr const char *FUNCTION_MESSAGARRIVED = "messageArrived";
        static constexpr const char *FUNCTION_UNSUBCRIBE = "unsubscribe";
        static constexpr const char *FUNCTION_PUBLISH = "publish";
        static constexpr const char *FUNCTION_DISCONNECT = "disconnect";
        static constexpr const char *FUNCTION_ISCONNECTED = "isConnected";
        static constexpr const char *FUNCTION_RECONNECT = "reconnect";
        static constexpr const char *FUNCTION_SETMQTTTRACE = "setMqttTrace";
        static constexpr const int PARAM_COUNT_ONE = 1;

        static napi_value Connect(napi_env env, napi_callback_info info);
        static napi_value Destroy(napi_env env, napi_callback_info info);
        static napi_value On(napi_env env, napi_callback_info info);
        static napi_value Off(napi_env env, napi_callback_info info);
        static napi_value Subscribe(napi_env env, napi_callback_info info);
        static napi_value MessageArrived(napi_env env, napi_callback_info info);
        static napi_value Unsubscribe(napi_env env, napi_callback_info info);
        static napi_value Publish(napi_env env, napi_callback_info info);
        static napi_value Disconnect(napi_env env, napi_callback_info info);
        static napi_value IsConnected(napi_env env, napi_callback_info info);
        static napi_value Reconnect(napi_env env, napi_callback_info info);
        static napi_value ConnectLost(napi_env env, napi_callback_info info);
        static napi_value SetMqttTrace(napi_env env, napi_callback_info info);
    };

    static constexpr const char *FUNCTION_CREATE_MQTT = "createMqttSync";
    static constexpr const char *INTERFACE_REQUEST_METHOD = "RequestMethod";
    static constexpr const char *INTERFACE_RESPONSE_CODE = "ResponseCode";
    static constexpr const char *INTERFACE_MQTT_CLIENT = "MqttAsyncClient";
    static constexpr const int EVENT_PARAM_NUM = 2;

    static napi_value InitMqttModule(napi_env env, napi_value exports);

private:
    static napi_value CreateMqtt(napi_env env, napi_callback_info info);

    static void DefineMqttAsyncClientClass(napi_env env, napi_value exports);

    static void InitMqttProperties(napi_env env, napi_value exports);

    static napi_value On(napi_env env, napi_callback_info info, const std::initializer_list<std::string> &events,
                         bool asyncCallback);

    static napi_value Off(napi_env env, napi_callback_info info, const std::initializer_list<std::string> &events);

    static void DefineClass(napi_env env, napi_value exports,
                            const std::initializer_list<napi_property_descriptor> &properties, 
                            const std::string &className);

    static napi_value NewInstance(napi_env env, napi_callback_info info, const std::string &className,
                                  Finalizer finalizer);
    static void ParseClientOptions(napi_env env, napi_value objValue, MqttClientOptions *options);
    static void RejectError(BaseContext *context, const std::string &type);
    static void ResponseCallBack(napi_env env, napi_value tsfn_cb, void *context, void *data);
    static void MessageCallBack(napi_env env, napi_value tsfn_cb, void *context, void *data);
    static void FinalizeCallBack(napi_env env, void *finalizeData, void *hint);
    static napi_value CreateMqttResponse(BaseContext *context, MqttResponse *asyncContext);
    static napi_value CreateMqttMessage(BaseContext *context, MqttMessage *mqttMessage);
};
}
} // namespace OHOS::PahoMqtt
#endif // MQTT_MODULE_H