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

#include "mqtt_impl.h"
#include <algorithm>
#include <cstring>
#include <memory>
#include "mqtt_constant.h"
#include "event_list.h"
#include "mqtt_log.h"
#include "mqtt_napi_utils.h"

namespace OHOS {
namespace PahoMqtt {
std::mutex MqttImpl::mutex_;

bool MqttImpl::initialized_ = false;

MQTTAsync MqttImpl::mqttAsync_;

int MqttImpl::connect_finished = 0;

int MqttImpl::subscribe_finished = 0;

int MqttImpl::publish_finished = 0;

int MqttImpl::unSubscribe_finished = 0;

int MqttImpl::disConnect_finished = 0;

int MqttImpl::sleep_time = 10000;

int MqttImpl::SslErrorCallback(const char *str, size_t len, void *u)
{
    LOG("AsyncMqtt MqttSslErr: str:%{public}s, len:%{public}d, u:%{public}s", str, len, u);
    return 0;
}

void MqttImpl::MqttTraceCallback(enum MQTTASYNC_TRACE_LEVELS level, char *message)
{
    LOG("AsyncMqtt MqttTrace: level:%{public}d, msg:%{public}s", level, message);
}

bool MqttImpl::Initialize(MqttClientOptions options)
{
    std::lock_guard<std::mutex> lock(mutex_);
    if (initialized_) {
        return true;
    }
    std::string clientId = options.GetClientId();
    std::string url = options.GetUrl();
    int persistenceType = options.GetPersistenceType();
    int rc = MQTTAsync_create(&mqttAsync_, url.c_str(), clientId.c_str(), persistenceType, NULL);
    LOG("AsyncMqtt MQTTAsync_create url:%{public}s, rc = %{public}d", url.c_str(), rc);
    if (rc != MQTTASYNC_SUCCESS) {
        return false;
    }
    initialized_ = true;
    return initialized_;
}

void MqttImpl::OnConnectSuccess(void *context, MQTTAsync_successData *response)
{
    LOG("AsyncMqtt Connect Success MQTTVersion: %{public}d, sessionPresent:%{public}d", response->alt.connect.MQTTVersion, 
        response->alt.connect.sessionPresent);
    auto connectContext = reinterpret_cast<ConnectContext *>(context);
    int32_t responseCode = 0;
    std::string result = "Connect Success";
    MqttImpl::connect_finished = 1;
    if (!connectContext->GetIsPromise()) {
        LOG("AsyncMqtt Connect CallTsFunction Success");
        MqttResponse *mqttResponse = new MqttResponse();
        mqttResponse->SetCode(responseCode);
        mqttResponse->SetMessage(result);
        connectContext->CallTsFunction(MQTT_CONNECT_EVENT, mqttResponse);
        connectContext->ReleaseTsFunction();
    } else {
        LOG("AsyncMqtt OnConnectSuccess promise Success");
        connectContext->SetCode(responseCode);
        connectContext->SetMessage(result);
        connectContext->SetIsPromise(false);
    }
}

void MqttImpl::OnConnectFail(void *context, MQTTAsync_failureData *response)
{
    LOG("AsyncMqtt Connect Fail code: %{public}d, message:%{public}s", response->code, response->message);
    auto connectContext = reinterpret_cast<ConnectContext *>(context);
    int32_t responseCode = response->code;
    std::string result = response->message == nullptr ? "failed" : response->message;
    MqttImpl::connect_finished = 1;
    if (!connectContext->GetIsPromise()) {
        LOG("AsyncMqtt Connect CallTsFunction Success");
        MqttResponse *mqttResponse = new MqttResponse();
        mqttResponse->SetCode(responseCode);
        mqttResponse->SetMessage(result);
        connectContext->CallTsFunction(MQTT_CONNECT_EVENT, mqttResponse);
        connectContext->ReleaseTsFunction();
    } else {
        LOG("AsyncMqtt OnConnectFail promise Success");
        connectContext->SetCode(responseCode);
        connectContext->SetMessage(result);
        connectContext->SetIsPromise(false);
    }
}

int MqttImpl::MessageArrived(void *context, char *topicName, int topicLen, MQTTAsync_message *message)
{
    LOG("AsyncMqtt MessageArrived topicName:%{public}s msgid:%{public}d", topicName, message->msgid);
    if (message == nullptr) {
        return 0;
    }
    auto publishContext = reinterpret_cast<PublishContext *>(context);
    MqttMessage *mqttMessage = new MqttMessage();
    mqttMessage->SetTopic(std::string(topicName));
    mqttMessage->SetPayload(std::string((char *)message->payload));
    mqttMessage->SetQos(message->qos);
    mqttMessage->SetRetained(message->retained);
    mqttMessage->SetDup(message->dup);
    mqttMessage->SetMsgid(message->msgid);
    publishContext->CallTsFunction(MQTT_MESSAGE_ARRIVED_EVENT, mqttMessage);
    MQTTAsync_freeMessage(&message);
    MQTTAsync_free(topicName);
    return 1;
}

void MqttImpl::ConnectionLost(void *context, char *cause)
{
    LOG("AsyncMqtt MqttImpl::connectionLost");
    auto baseContext = reinterpret_cast<BaseContext *>(context);
    MqttResponse *mqttResponse = new MqttResponse();
    mqttResponse->SetMessage(cause == nullptr ? "null" : cause);
    mqttResponse->SetCode(MQTTASYNC_SUCCESS);
    baseContext->CallTsFunction(MQTT_CONNECT_LOST_EVENT, mqttResponse);
}

void MqttImpl::OnSubscribeSuccess(void *context, MQTTAsync_successData *response)
{
    LOG("AsyncMqtt OnSubscribe Success");
    auto subscribeContext = reinterpret_cast<SubscribeContext *>(context);
    int32_t responseCode = 0;
    std::string result = "Subscribe Success";
    MqttImpl::subscribe_finished = 1;
    if (!subscribeContext->GetIsPromise()) {
        MqttResponse *mqttResponse = new MqttResponse();
        mqttResponse->SetCode(responseCode);
        mqttResponse->SetMessage(result);
        subscribeContext->CallTsFunction(MQTT_SUBSCRIBE_EVENT, mqttResponse);
        subscribeContext->ReleaseTsFunction();
    } else {
        LOG("AsyncMqtt OnSubscribeSuccess promise Success");
        subscribeContext->SetCode(responseCode);
        subscribeContext->SetMessage(result);
        subscribeContext->SetIsPromise(false);
    }
}

void MqttImpl::OnSubscribeFail(void *context, MQTTAsync_failureData *response)
{
    LOG("AsyncMqtt OnSubscribeFail code:%{public}d, message:%{public}s", response->code, response->message);
    auto subscribeContext = reinterpret_cast<SubscribeContext *>(context);
    int32_t responseCode = response->code;
    std::string result = response->message == nullptr ? "failed" : response->message;
    MqttImpl::subscribe_finished = 1;
    if (!subscribeContext->GetIsPromise()) {
        MqttResponse *mqttResponse = new MqttResponse();
        mqttResponse->SetCode(responseCode);
        mqttResponse->SetMessage(result);
        subscribeContext->CallTsFunction(MQTT_SUBSCRIBE_EVENT, mqttResponse);
        subscribeContext->ReleaseTsFunction();
    } else {
        LOG("AsyncMqtt OnSubscribeFail promise Success");
        subscribeContext->SetCode(responseCode);
        subscribeContext->SetMessage(result);   
        subscribeContext->SetIsPromise(false);
    }
}

void MqttImpl::OnUnSubscribe(void *context, MQTTAsync_successData *response)
{
    LOG("AsyncMqtt OnUnSubscribe Success");
    auto subscribeContext = reinterpret_cast<SubscribeContext *>(context);
    int32_t responseCode = 0;
    std::string result = "UnSubscribe Success";
    MqttImpl::unSubscribe_finished = 1;
    if (!subscribeContext->GetIsPromise()) {
        MqttResponse *mqttResponse = new MqttResponse();
        mqttResponse->SetCode(responseCode);
        mqttResponse->SetMessage(result);
        subscribeContext->CallTsFunction(MQTT_UNSUBSCRIBE_EVENT, mqttResponse);
        subscribeContext->ReleaseTsFunction();
    } else {
        LOG("AsyncMqtt OnUnSubscribe promise Success");
        subscribeContext->SetCode(responseCode);
        subscribeContext->SetMessage(result);
        subscribeContext->SetIsPromise(false);
    }
}

void MqttImpl::OnUnSubscribeFail(void *context, MQTTAsync_failureData *response)
{
    LOG("AsyncMqtt OnUnSubscribeFail code:%{public}d, message:%{public}s", response->code, response->message);
    auto subscribeContext = reinterpret_cast<SubscribeContext *>(context);
    int32_t responseCode = response->code;
    std::string result = response->message == nullptr ? "failed" : response->message;
    MqttImpl::unSubscribe_finished = 1;
    if (!subscribeContext->GetIsPromise()) {
        MqttResponse *mqttResponse = new MqttResponse();
        mqttResponse->SetCode(responseCode);
        mqttResponse->SetMessage(result);
        subscribeContext->CallTsFunction(MQTT_UNSUBSCRIBE_EVENT, mqttResponse);
        subscribeContext->ReleaseTsFunction();
    } else {
        LOG("AsyncMqtt OnUnSubscribeFail promise Success");
        subscribeContext->SetCode(responseCode);
        subscribeContext->SetMessage(result); 
        subscribeContext->SetIsPromise(false);
    }
}

void MqttImpl::OnDisconnect(void *context, MQTTAsync_successData *response)
{
    LOG("AsyncMqtt OnDisconnect Success");
    auto baseContext = reinterpret_cast<BaseContext *>(context);
    int32_t responseCode = 0;
    std::string result = "Disconnect Success";
    MqttImpl::disConnect_finished = 1;
    if (!baseContext->GetIsPromise()) {
        MqttResponse *mqttResponse = new MqttResponse();
        mqttResponse->SetCode(responseCode);
        mqttResponse->SetMessage(result);
        baseContext->CallTsFunction(MQTT_DISCONNECT_EVENT, mqttResponse);
        baseContext->ReleaseTsFunction();
    } else {
        LOG("AsyncMqtt OnDisconnect promise Success");
        baseContext->SetCode(responseCode);
        baseContext->SetMessage(result);
        baseContext->SetIsPromise(false);
    }
}

void MqttImpl::OnPublishSuccess(void *context, MQTTAsync_successData *response)
{
    LOG("AsyncMqtt OnPublish Success");
    auto publishContext = reinterpret_cast<PublishContext *>(context);
    int32_t responseCode = 0;
    std::string result = "Publish Success";
    MqttImpl::publish_finished = 1;
    if (!publishContext->GetIsPromise()) {
        MqttResponse *mqttResponse = new MqttResponse();
        mqttResponse->SetCode(responseCode);
        mqttResponse->SetMessage(result);
        publishContext->CallTsFunction(MQTT_PUBLISH_EVENT, mqttResponse);
        publishContext->ReleaseTsFunction();
    } else {
        LOG("AsyncMqtt OnPublishSuccess promise Success");
        publishContext->SetCode(responseCode);
        publishContext->SetMessage(result);
        publishContext->SetIsPromise(false);
    }
}

void MqttImpl::OnPublishFail(void *context, MQTTAsync_failureData *response)
{
    LOG("AsyncMqtt OnPublishFail code:%{public}d, message:%{public}s", response->code, response->message);
    auto publishContext = reinterpret_cast<PublishContext *>(context);
    int32_t responseCode = response->code;
    std::string result = response->message == nullptr ? "failed" : response->message;
    MqttImpl::publish_finished = 1;
    if (!publishContext->GetIsPromise()) {
        MqttResponse *mqttResponse = new MqttResponse();
        mqttResponse->SetCode(responseCode);
        mqttResponse->SetMessage(result);
        publishContext->CallTsFunction(MQTT_PUBLISH_EVENT, mqttResponse);
        publishContext->ReleaseTsFunction();
    } else {
        LOG("AsyncMqtt OnPublishFail promise Success");
        publishContext->SetCode(responseCode);
        publishContext->SetMessage(result);
        publishContext->SetIsPromise(false);
    }
}

bool MqttImpl::MqttConnect(ConnectContext *context)
{
    if (context == nullptr) {
        return false;
    }
    LOG("AsyncMqtt MqttConnect start");
    MQTTAsync_connectOptions opts = context->options.GetConnectOptions();
    opts.onSuccess = OnConnectSuccess;
    opts.onFailure = OnConnectFail;
    opts.context = context;
    if (context->options.GetHasSslOptions()) {
        LOG("AsyncMqtt ssl connect");
        MQTTAsync_SSLOptions sslOptions = context->options.GetSslOptions();
        opts.ssl = &sslOptions;
        opts.ssl->ssl_error_cb = SslErrorCallback;
    }
    if (context->options.GetHasWillOptions()) {
        MQTTAsync_willOptions willOptions = context->options.GetWillOptions();
        opts.will = &willOptions;
    }
    LOG("AsyncMqtt Connecting");
    int rc = MQTTAsync_connect(mqttAsync_, &opts);
    freeConnectcontext(context);
    LOG("AsyncMqtt MQTTAsync_connect rc = %{public}d", rc);
    if (rc != MQTTASYNC_SUCCESS) {
        LOG("AsyncMqtt MQTTAsync_connect failed:");
        return false;
    }
    while (!MqttImpl::connect_finished) {
        usleep(MqttImpl::sleep_time);
    }
    MqttImpl::connect_finished = 0;
    return true;
}

bool MqttImpl::MqttDisconnect(BaseContext *context)
{
    if (context == nullptr) {
        return false;
    }

    MQTTAsync_disconnectOptions opts = MQTTAsync_disconnectOptions_initializer;
    opts.onSuccess = MqttImpl::OnDisconnect;
    opts.context = context;
    LOG("AsyncMqtt MqttDisconnect");
    int rc = MQTTAsync_disconnect(mqttAsync_, &opts);
    if (rc != MQTTASYNC_SUCCESS) {
        LOG("AsyncMqtt MqttDisconnect res: %{public}d", rc);
        return false;
    }
    while (!MqttImpl::disConnect_finished) {
        usleep(MqttImpl::sleep_time);
    }
    MqttImpl::disConnect_finished = 0;
    return true;
}

bool MqttImpl::MqttReConnect()
{
    LOG("AsyncMqtt MqttReConnect");
    int rc = MQTTAsync_reconnect(mqttAsync_);
    if (rc != MQTTASYNC_SUCCESS) {
        LOG("AsyncMqtt MqttReConnect res: %{public}d", rc);
        return false;
    }
    return true;
}

bool MqttImpl::IsConnected()
{
    if (mqttAsync_ == NULL) {
        return false;
    }
    return MQTTAsync_isConnected(mqttAsync_);
}

bool MqttImpl::MqttSubscribe(SubscribeContext *context)
{
    if (context == nullptr) {
        return false;
    }
    LOG("AsyncMqtt Starting - MqttSubscribe");
    MQTTAsync_responseOptions opts = MQTTAsync_responseOptions_initializer;
    opts.onSuccess = OnSubscribeSuccess;
    opts.onFailure = OnSubscribeFail;
    opts.context = context;
    std::string topic = context->options.GetTopic();
    uint32_t qos = context->options.GetQos();
    int rc = MQTTAsync_subscribe(mqttAsync_, topic.c_str(), qos, &opts);
    LOG("AsyncMqtt MQTTAsync_subscribe rc = %{public}d", rc);
    if (rc != MQTTASYNC_SUCCESS) {
        LOG("AsyncMqtt MqttSubscribe failed:");
        return false;
    }
    while (!MqttImpl::subscribe_finished) {
        usleep(MqttImpl::sleep_time);
    }
    MqttImpl::subscribe_finished = 0;
    return true;
}

bool MqttImpl::MqttUnsubscribe(SubscribeContext *context)
{
    if (context == nullptr) {
        return false;
    }
    LOG("AsyncMqtt Starting MqttUnsubscribe");
    MQTTAsync_responseOptions opts = MQTTAsync_responseOptions_initializer;
    std::string topic = context->options.GetTopic();
    opts.onSuccess = OnUnSubscribe;
    opts.onFailure = OnUnSubscribeFail;
    opts.context = context;
    int rc = MQTTAsync_unsubscribe(mqttAsync_, topic.c_str(), &opts);
    LOG("AsyncMqtt MQTTAsync_unsubscribe rc = %{public}d", rc);
    if (rc != MQTTASYNC_SUCCESS) {
        LOG("AsyncMqtt MqttUnsubscribe failed: ");
        return false;
    }
    while (!MqttImpl::unSubscribe_finished) {
        usleep(MqttImpl::sleep_time);
    }
    MqttImpl::unSubscribe_finished = 0;
    return true;
}

bool MqttImpl::MqttPublish(PublishContext *context)
{
    std::lock_guard<std::mutex> lock(mutex_);
    if (context == nullptr) {
        return false;
    }

    MQTTAsync_message pubmsg = MQTTAsync_message_initializer;
    MQTTAsync_responseOptions opts = MQTTAsync_responseOptions_initializer;

    LOG("AsyncMqtt Starting - MqttPublish");
    std::string payload = context->mqttMessage.GetPayload();
    std::string topic = context->mqttMessage.GetTopic();
    pubmsg.payload = (char *)payload.c_str();
    pubmsg.payloadlen = context->mqttMessage.GetPayload().length();
    pubmsg.qos = context->mqttMessage.GetQos();
    pubmsg.retained = context->mqttMessage.GetRetained();
    opts.onSuccess = OnPublishSuccess;
    opts.onFailure = OnPublishFail;
    opts.context = context;
    int rc1 = MQTTAsync_sendMessage(mqttAsync_, topic.c_str(), &pubmsg, &opts);
    int rc2 = MQTTAsync_waitForCompletion(mqttAsync_, opts.token, WAIT_COMPLETION_TIME);
    if (rc1 != MQTTASYNC_SUCCESS && rc2 != MQTTASYNC_SUCCESS) {
        LOG("AsyncMqtt MqttPublish failed: ");
        return false;
    }
    MqttImpl::publish_finished = 0;
    return true;
}

void MqttImpl::SetMqttTrace(enum MQTTASYNC_TRACE_LEVELS level)
{
    MQTTAsync_setTraceCallback(MqttTraceCallback);
    MQTTAsync_setTraceLevel(level);
}

int MqttImpl::SetMessageArrivedCallback(PublishContext *context)
{
    if (context == nullptr) {
        return MQTTASYNC_FAILURE;
    }
    return MQTTAsync_setMessageArrivedCallback(mqttAsync_, context, MqttImpl::MessageArrived);
}

int MqttImpl::SetConnectionLostCallback(BaseContext *context)
{
    if (context == nullptr) {
        return MQTTASYNC_FAILURE;
    }
    return MQTTAsync_setConnectionLostCallback(mqttAsync_, context, MqttImpl::ConnectionLost);
}

void MqttImpl::freeConnectcontext(ConnectContext *context)
{
    if (context == nullptr) {
        return;
    }
    if (context->options.GetConnectOptions().username) {
        delete[] context->options.GetConnectOptions().username;
    }
    if (context->options.GetConnectOptions().password) {
        delete[] context->options.GetConnectOptions().password;
    }
    if (context->options.GetConnectOptions().serverURIs) {
        for (int i = 0; i < context->options.GetConnectOptions().serverURIcount; i++) {
            delete[] context->options.GetConnectOptions().serverURIs[i];
        }
        delete[] context->options.GetConnectOptions().serverURIs;
    }
    if (context->options.GetWillOptions().topicName) {
        delete[] context->options.GetWillOptions().topicName;
    }
    if (context->options.GetWillOptions().message) {
        delete[] context->options.GetWillOptions().message;
    }
}

bool MqttImpl::Destroy()
{
    LOG("AsyncMqtt MQTTAsync_destroy");
    std::lock_guard<std::mutex> lock(mutex_);
    if (initialized_) {
        initialized_ = false;
        MQTTAsync_destroy(&mqttAsync_);
        if (mqttAsync_ == nullptr) {
            return true;
        }
    } else {
        LOG("AsyncMqtt not initialized");
        return false;
    }
    return true;
}
} // namespace PahoMqtt
} // namespace OHOS
