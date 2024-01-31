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

#include "mqtt_module_exports.h"

#include "connect_context.h"
#include "event_list.h"
#include "mqtt_impl.h"
#include "mqtt_log.h"
#include "publish_context.h"
#include "subscribe_context.h"
#include <string>

static constexpr const char *MQTT_MODULE_NAME = "mqttasync";


namespace OHOS {
namespace PahoMqtt {
napi_value MqttModuleExports::InitMqttModule(napi_env env, napi_value exports)
{
    DefineMqttAsyncClientClass(env, exports);
    InitMqttProperties(env, exports);

    return exports;
}

napi_value MqttModuleExports::CreateMqtt(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt CreateMqtt Start");
    return NewInstance(env, info, INTERFACE_MQTT_CLIENT, [](napi_env, void *data, void *) {
        LOG("AsyncMqtt is finalized_cb");
        (void)data;
    });
}

void MqttModuleExports::DefineMqttAsyncClientClass(napi_env env, napi_value exports)
{
    std::initializer_list<napi_property_descriptor> properties = {
        { "connect", nullptr, MqttAsyncClient::Connect, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "destroy", nullptr, MqttAsyncClient::Destroy, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "connectLost", nullptr, MqttAsyncClient::ConnectLost, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "subscribe", nullptr, MqttAsyncClient::Subscribe, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "unsubscribe", nullptr, MqttAsyncClient::Unsubscribe, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "publish", nullptr, MqttAsyncClient::Publish, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "messageArrived", nullptr, MqttAsyncClient::MessageArrived, nullptr, nullptr, nullptr, napi_default, nullptr},
        { "disconnect", nullptr, MqttAsyncClient::Disconnect, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "isConnected", nullptr, MqttAsyncClient::IsConnected, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "reconnect", nullptr, MqttAsyncClient::Reconnect, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "setMqttTrace", nullptr, MqttAsyncClient::SetMqttTrace, nullptr, nullptr, nullptr, napi_default, nullptr },
    };
    DefineClass(env, exports, properties, INTERFACE_MQTT_CLIENT);
}

void MqttModuleExports::InitMqttProperties(napi_env env, napi_value exports)
{
    std::initializer_list<napi_property_descriptor> properties = {
        { "createMqttSync", nullptr, CreateMqtt, nullptr, nullptr, nullptr, napi_default, nullptr },
    };
    NapiUtils::DefineProperties(env, exports, properties);
}

void MqttModuleExports::ResponseCallBack(napi_env env, napi_value tsfn_cb, void *context, void *data)
{
    LOG("AsyncMqtt ResponseCallBack1 context= %{public}x", context);
    auto baseContext = reinterpret_cast<BaseContext *>(context);
    auto mqttResponsePt = reinterpret_cast<MqttResponse *>(data);
    napi_value message = CreateMqttResponse(baseContext, mqttResponsePt);
    napi_value undefined = NapiUtils::GetUndefined(baseContext->GetEnv());
    baseContext->Emit(baseContext->EventType(), std::make_pair(undefined, message));
    delete mqttResponsePt;
}

void MqttModuleExports::MessageCallBack(napi_env env, napi_value tsfn_cb, void *context, void *data)
{
    LOG("AsyncMqtt MessageCallBack");
    auto publishContext = reinterpret_cast<PublishContext *>(context);
    auto mqttMessagePt = reinterpret_cast<MqttMessage *>(data);
    napi_value mqttMessage = CreateMqttMessage(publishContext, mqttMessagePt);
    napi_value undefined = NapiUtils::GetUndefined(publishContext->GetEnv());
    publishContext->Emit(publishContext->EventType(), std::make_pair(undefined, mqttMessage));
    LOG("mqtt mqttMessagePt=%{public}d", mqttMessagePt);
    delete mqttMessagePt;
}

void MqttModuleExports::FinalizeCallBack(napi_env env, void *finalizeData, void *hint)
{
    LOG("AsyncMqtt FinalizeCallBack");
    delete finalizeData;
}

napi_value MqttModuleExports::MqttAsyncClient::Connect(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt Connect Start");
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    EventManager *manager = nullptr;
    napi_unwrap(env, thisVal, reinterpret_cast<void **>(&manager));
    auto context = new ConnectContext(env, manager);
    context->ParseParams(params, paramsCount);
    LOG("AsyncMqtt connect params parse OK : %{public}d", context->IsParseOK());
    if (NapiUtils::GetValueType(env, context->GetCallback()) != napi_function && context->IsNeedPromise()) {
        LOG("AsyncMqtt create promise");
        napi_value ret = context->CreatePromise();
        context->SetIsPromise(true);
        context->CreateAsyncWork("connect", [](napi_env env, void *data) {
                auto connectContext = reinterpret_cast<ConnectContext *>(data);
                MqttImpl::MqttConnect(connectContext);
            },
            [](napi_env env, napi_status nousb, void *data) {
                auto connectContext = reinterpret_cast<ConnectContext *>(data);
                napi_value code;
                napi_create_int32(env, connectContext->GetCode(), &code);
                napi_value message;
                napi_create_string_utf8(env, connectContext->GetMessage().c_str(),
                    strlen(connectContext->GetMessage().c_str()), &message);
                napi_value response;
                napi_status status = napi_create_object(env, &response);
                napi_set_named_property(env, response, "code", code);
                napi_set_named_property(env, response, "message", message);
                if (connectContext->GetCode() != 0) {
                    napi_reject_deferred(env, connectContext->GetDeferred(), response);
                } else {
                    napi_resolve_deferred(env, connectContext->GetDeferred(), response);
                }
                connectContext->DeleteAsyncWork();
            });
        return ret;
    }
    if (manager != nullptr) {
        LOG("AsyncMqtt connect manager");
        manager->AddListener(env, MQTT_CONNECT_EVENT, params[1], true, true);
        context->CreateTsFunction(MQTT_CONNECT_EVENT, context, MqttModuleExports::FinalizeCallBack,
                MqttModuleExports::ResponseCallBack);
        if (!MqttImpl::MqttConnect(context)) {
            MqttModuleExports::RejectError(context, MQTT_CONNECT_EVENT);
        }
    }
    return NapiUtils::GetUndefined(env);
}
napi_value MqttModuleExports::MqttAsyncClient::Subscribe(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt Subscribe Start");
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    EventManager *manager = nullptr;
    napi_unwrap(env, thisVal, reinterpret_cast<void **>(&manager));
    auto context = new SubscribeContext(env, manager);
    context->ParseParams(params, paramsCount);
    LOG("AsyncMqtt subscribe params parse OK : %{public}d", context->IsParseOK());
    if (NapiUtils::GetValueType(env, context->GetCallback()) != napi_function && context->IsNeedPromise()) {
        LOG("AsyncMqtt create promise");
        napi_value ret = context->CreatePromise();
        context->SetIsPromise(true);
        context->CreateAsyncWork("connect", [](napi_env env, void *data) {
                auto subscribeContext = reinterpret_cast<SubscribeContext *>(data);
                MqttImpl::MqttSubscribe(subscribeContext);
            },
            [](napi_env env, napi_status nousb, void *data) {
                auto subscribeContext = reinterpret_cast<SubscribeContext *>(data);
                napi_value code;
                napi_create_int32(env, subscribeContext->GetCode(), &code);
                napi_value message;
                napi_create_string_utf8(env, subscribeContext->GetMessage().c_str(),
                    strlen(subscribeContext->GetMessage().c_str()), &message);
                napi_value response;
                napi_status status = napi_create_object(env, &response);
                napi_set_named_property(env, response, "code", code);
                napi_set_named_property(env, response, "message", message);
                if (subscribeContext->GetCode() != 0) {
                    napi_reject_deferred(env, subscribeContext->GetDeferred(), response);
                } else {
                    napi_resolve_deferred(env, subscribeContext->GetDeferred(), response);
                }
                subscribeContext->DeleteAsyncWork();
            });
        return ret;
    }
    if (manager != nullptr) {
        manager->AddListener(env, MQTT_SUBSCRIBE_EVENT, params[1], true, true);
        context->CreateTsFunction(MQTT_SUBSCRIBE_EVENT, context, MqttModuleExports::FinalizeCallBack,
                MqttModuleExports::ResponseCallBack);
        if (!MqttImpl::MqttSubscribe(context)) {
            MqttModuleExports::RejectError(context, MQTT_SUBSCRIBE_EVENT);
        }
    }
    return NapiUtils::GetUndefined(env);
}
napi_value MqttModuleExports::MqttAsyncClient::Unsubscribe(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt Unsubscribe Start");
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    EventManager *manager = nullptr;
    napi_unwrap(env, thisVal, reinterpret_cast<void **>(&manager));
    auto context = new SubscribeContext(env, manager);
    context->ParseParams(params, paramsCount);
    LOG("AsyncMqtt unsubscribe params parse OK :%{public}d", context->IsParseOK());
    if (NapiUtils::GetValueType(env, context->GetCallback()) != napi_function && context->IsNeedPromise()) {
        LOG("AsyncMqtt create promise");
        napi_value ret = context->CreatePromise();
        context->SetIsPromise(true);
        context->CreateAsyncWork("connect", [](napi_env env, void *data) {
                auto subscribeContext = reinterpret_cast<SubscribeContext *>(data);
                MqttImpl::MqttUnsubscribe(subscribeContext);
            },
            [](napi_env env, napi_status nousb, void *data) {
                auto subscribeContext = reinterpret_cast<SubscribeContext *>(data);
                napi_value code;
                napi_create_int32(env, subscribeContext->GetCode(), &code);
                napi_value message;
                napi_create_string_utf8(env, subscribeContext->GetMessage().c_str(),
                    strlen(subscribeContext->GetMessage().c_str()), &message);
                napi_value response;
                napi_status status = napi_create_object(env, &response);
                napi_set_named_property(env, response, "code", code);
                napi_set_named_property(env, response, "message", message);
                if (subscribeContext->GetCode() != 0) {
                    napi_reject_deferred(env, subscribeContext->GetDeferred(), response);
                } else {
                    napi_resolve_deferred(env, subscribeContext->GetDeferred(), response);
                }
                subscribeContext->DeleteAsyncWork();
            });
        return ret;
    }
    if (manager != nullptr) {
        manager->AddListener(env, MQTT_UNSUBSCRIBE_EVENT, params[1], true, true);
        context->CreateTsFunction(MQTT_UNSUBSCRIBE_EVENT, context, MqttModuleExports::FinalizeCallBack,
                MqttModuleExports::ResponseCallBack);
        if (!MqttImpl::MqttUnsubscribe(context)) {
            MqttModuleExports::RejectError(context, MQTT_UNSUBSCRIBE_EVENT);
        }
    }
    return NapiUtils::GetUndefined(env);
}
napi_value MqttModuleExports::MqttAsyncClient::Publish(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt Publish Start");
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    EventManager *manager = nullptr;
    napi_unwrap(env, thisVal, reinterpret_cast<void **>(&manager));
    auto context = new PublishContext(env, manager);
    context->ParseParams(params, paramsCount);
    LOG("AsyncMqtt publish params parse OK :");
    if (NapiUtils::GetValueType(env, context->GetCallback()) != napi_function && context->IsNeedPromise()) {
        LOG("AsyncMqtt create promise");
        napi_value ret = context->CreatePromise();
        context->SetIsPromise(true);
        context->CreateAsyncWork("connect", [](napi_env env, void *data) {
                auto publishContext = reinterpret_cast<PublishContext *>(data);
                MqttImpl::MqttPublish(publishContext);
            },
            [](napi_env env, napi_status nousb, void *data) {
                auto publishContext = reinterpret_cast<PublishContext *>(data);
                napi_value code;
                napi_create_int32(env, publishContext->GetCode(), &code);
                napi_value message;
                napi_create_string_utf8(env, publishContext->GetMessage().c_str(),
                    strlen(publishContext->GetMessage().c_str()), &message);
                napi_value response;
                napi_status status = napi_create_object(env, &response);
                napi_set_named_property(env, response, "code", code);
                napi_set_named_property(env, response, "message", message);
                if (publishContext->GetCode() != 0) {
                    napi_reject_deferred(env, publishContext->GetDeferred(), response);
                } else {
                    napi_resolve_deferred(env, publishContext->GetDeferred(), response);
                }
                publishContext->DeleteAsyncWork();
            });
        return ret;
    }
    if (manager != nullptr) {
        manager->AddListener(env, MQTT_PUBLISH_EVENT, params[1], true, true);
        context->CreateTsFunction(MQTT_PUBLISH_EVENT, context, MqttModuleExports::FinalizeCallBack,
                MqttModuleExports::ResponseCallBack);
        if (!MqttImpl::MqttPublish(context)) {
            MqttModuleExports::RejectError(context, MQTT_PUBLISH_EVENT);
        }
    }
    return NapiUtils::GetUndefined(env);
}
napi_value MqttModuleExports::MqttAsyncClient::MessageArrived(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt MessageArrived Start");
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    if (paramsCount != PARAM_COUNT_ONE || NapiUtils::GetValueType(env, params[0]) != napi_function) {
        LOG("AsyncMqtt messagearrived interface param error");
        return NapiUtils::GetUndefined(env);
    }

    EventManager *manager = nullptr;
    napi_unwrap(env, thisVal, reinterpret_cast<void **>(&manager));
    auto context = new PublishContext(env, manager); // 待释放
    if (manager != nullptr) {
        manager->AddListener(env, MQTT_MESSAGE_ARRIVED_EVENT, params[0], false, true);
        context->CreateTsFunction(MQTT_MESSAGE_ARRIVED_EVENT, context, nullptr, MqttModuleExports::MessageCallBack);
        if (MqttImpl::SetMessageArrivedCallback(context) != MQTTASYNC_SUCCESS) {
            manager->DeleteListener(MQTT_MESSAGE_ARRIVED_EVENT, params[0]);
            delete context;
        }
    }
    return NapiUtils::GetUndefined(env);
}
napi_value MqttModuleExports::MqttAsyncClient::ConnectLost(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt ConnectLost Start");
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    if (paramsCount != PARAM_COUNT_ONE || NapiUtils::GetValueType(env, params[0]) != napi_function) {
        LOG("AsyncMqtt connectlost interface param error");
        return NapiUtils::GetUndefined(env);
    }

    EventManager *manager = nullptr;
    napi_unwrap(env, thisVal, reinterpret_cast<void **>(&manager));
    auto context = new BaseContext(env, manager); // 待释放
    if (manager != nullptr) {
        manager->AddListener(env, MQTT_CONNECT_LOST_EVENT, params[0], false, true);
        context->CreateTsFunction(MQTT_CONNECT_LOST_EVENT, context, nullptr, MqttModuleExports::MessageCallBack);
        if (MqttImpl::SetConnectionLostCallback(context) != MQTTASYNC_SUCCESS) {
            manager->DeleteListener(MQTT_CONNECT_LOST_EVENT, params[0]);
            delete context;
        }
    }
    return NapiUtils::GetUndefined(env);
}
napi_value MqttModuleExports::MqttAsyncClient::Disconnect(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt Disconnect Start");
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    EventManager *manager = nullptr;
    napi_unwrap(env, thisVal, reinterpret_cast<void **>(&manager));
    auto context = new BaseContext(env, manager);
    if (paramsCount != PARAM_COUNT_ONE || NapiUtils::GetValueType(env, params[0]) != napi_function) {
        LOG("AsyncMqtt create promise");
        napi_value ret = context->CreatePromise();
        context->SetIsPromise(true);
        context->CreateAsyncWork("Disconnect", [](napi_env env, void *data) {
                auto baseContext = reinterpret_cast<BaseContext *>(data);
                MqttImpl::MqttDisconnect(baseContext);
            },
            [](napi_env env, napi_status nousb, void *data) {
                auto baseContext = reinterpret_cast<BaseContext *>(data);
                napi_value code;
                napi_create_int32(env, baseContext->GetCode(), &code);
                napi_value message;
                napi_create_string_utf8(env, baseContext->GetMessage().c_str(),
                    strlen(baseContext->GetMessage().c_str()), &message);
                napi_value response;
                napi_status status = napi_create_object(env, &response);
                napi_set_named_property(env, response, "code", code);
                napi_set_named_property(env, response, "message", message);
                if (baseContext->GetCode() != 0) {
                    napi_reject_deferred(env, baseContext->GetDeferred(), response);
                } else {
                    napi_resolve_deferred(env, baseContext->GetDeferred(), response);
                }
                baseContext->DeleteAsyncWork();
            });
        return ret;
    }
    if (manager != nullptr) {
        manager->AddListener(env, MQTT_DISCONNECT_EVENT, params[0], true, true);
        context->CreateTsFunction(MQTT_DISCONNECT_EVENT, context, MqttModuleExports::FinalizeCallBack,
                MqttModuleExports::ResponseCallBack);
        if (!MqttImpl::MqttDisconnect(context)) {
            MqttModuleExports::RejectError(context, MQTT_DISCONNECT_EVENT);
        }
    }
    return NapiUtils::GetUndefined(env);
}

struct AsyncCallbackInfo {
    bool Param;
    napi_async_work async_work;
    napi_deferred deferred;
};

void IsConnectedExecute(napi_env env, void *data)
{
    auto asyncCallbackInfo = reinterpret_cast<AsyncCallbackInfo *>(data);
    asyncCallbackInfo->Param = MqttImpl::IsConnected();
}

void Complete(napi_env env, napi_status nousb, void *data)
{
    LOG("AsyncMqtt Complete start");
    auto asyncCallbackInfo = reinterpret_cast<AsyncCallbackInfo *>(data);
    napi_value result;
    napi_status status = napi_get_boolean(env, asyncCallbackInfo->Param, &result);
    if (status != napi_ok) {
        LOG("AsyncMqtt Complete napi_create_int32 fail");
        return;
    }
    // Resolve or reject the promise associated with the deferred depending on
    // whether the asynchronous action succeeded.
    LOG("AsyncMqtt Complete napi_resolve_deferred");
    napi_resolve_deferred(env, asyncCallbackInfo->deferred, result);

    // At this point the deferred has been freed, so we should assign NULL to it.
    asyncCallbackInfo->deferred = nullptr;
    napi_delete_async_work(env, asyncCallbackInfo->async_work);
}

napi_value MqttModuleExports::MqttAsyncClient::IsConnected(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt IsConnected Start");
    (void)env;
    (void)info;
    auto asyncCallbackInfo = new AsyncCallbackInfo();
    napi_value promise;
    napi_status status = napi_create_promise(env, &asyncCallbackInfo->deferred, &promise);
    if (status != napi_ok) {
        return NULL;
    }
    napi_value resource = nullptr;
    status = napi_create_string_utf8(env, "IsConnected", NAPI_AUTO_LENGTH, &resource);
    if (status != napi_ok) {
        return nullptr;
    }
    // Create async work.
    status = napi_create_async_work(env, nullptr, resource, IsConnectedExecute, Complete,
        reinterpret_cast<void *>(asyncCallbackInfo), &asyncCallbackInfo->async_work);
    if (status != napi_ok) {
        LOG("AsyncMqtt IsConnected napi_create_async_work fail");
        return nullptr;
    }
    status = napi_queue_async_work(env, asyncCallbackInfo->async_work);
    if (status != napi_ok) {
        LOG("AsyncMqtt IsConnected napi_queue_async_work fail");
        return nullptr;
    }
    // Return the promise to JS
    return promise;
}

void ReconnectExecute(napi_env env, void *data)
{
    auto asyncCallbackInfo = reinterpret_cast<AsyncCallbackInfo *>(data);
    asyncCallbackInfo->Param = MqttImpl::MqttReConnect();
}

napi_value MqttModuleExports::MqttAsyncClient::Reconnect(napi_env env, napi_callback_info info) 
{
    LOG("AsyncMqtt Reconnect Start");
    (void)env;
    (void)info;
    auto asyncCallbackInfo = new AsyncCallbackInfo();
    napi_deferred deferred;
    napi_value promise;
    napi_status status = napi_create_promise(env, &asyncCallbackInfo->deferred, &promise);
    if (status != napi_ok) {
        return NULL;
    }
    napi_value resource = nullptr;
    status = napi_create_string_utf8(env, "Destroy", NAPI_AUTO_LENGTH, &resource);
    if (status != napi_ok) {
        return nullptr;
    }
    // Create async work.
    status = napi_create_async_work(env, nullptr, resource, ReconnectExecute, Complete,
        reinterpret_cast<void *>(asyncCallbackInfo), &asyncCallbackInfo->async_work);
    if (status != napi_ok) {
        LOG("AsyncMqtt Reconnect napi_create_async_work fail");
        return nullptr;
    }
    status = napi_queue_async_work(env, asyncCallbackInfo->async_work);
    if (status != napi_ok) {
        LOG("AsyncMqtt Reconnect napi_queue_async_work fail");
        return nullptr;
    }
    // Return the promise to JS
    return promise;
}
napi_value MqttModuleExports::MqttAsyncClient::SetMqttTrace(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt SetMqttTrace");
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    EventManager *manager = nullptr;
    napi_unwrap(env, thisVal, reinterpret_cast<void **>(&manager));
    uint32_t level = NapiUtils::GetUint32FromValue(env, params[0]);
    if (level == 0) {
        level = MQTTASYNC_TRACE_MINIMUM;
    }
    MqttImpl::SetMqttTrace((enum MQTTASYNC_TRACE_LEVELS)level);
    return NapiUtils::GetUndefined(env);
}

void DestroyExecute(napi_env env, void *data)
{
    auto asyncCallbackInfo = reinterpret_cast<AsyncCallbackInfo *>(data);
    asyncCallbackInfo->Param = MqttImpl::Destroy();
}

napi_value MqttModuleExports::MqttAsyncClient::Destroy(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt Destroy Start");
    auto asyncCallbackInfo = new AsyncCallbackInfo();
    napi_deferred deferred;
    napi_value promise;
    napi_status status = napi_create_promise(env, &asyncCallbackInfo->deferred, &promise);
    if (status != napi_ok) {
        return NULL;
    }
    napi_value resource = nullptr;
    status = napi_create_string_utf8(env, "Destroy", NAPI_AUTO_LENGTH, &resource);
    if (status != napi_ok) {
        return nullptr;
    }
    // Create async work.
    status = napi_create_async_work(env, nullptr, resource, DestroyExecute, Complete,
        reinterpret_cast<void *>(asyncCallbackInfo), &asyncCallbackInfo->async_work);
    if (status != napi_ok) {
        return nullptr;
    }
    status = napi_queue_async_work(env, asyncCallbackInfo->async_work);
    if (status != napi_ok) {
        LOG("AsyncMqtt IsConnected napi_queue_async_work fail");
        return nullptr;
    }
    // Return the promise to JS
    return promise;
}

napi_value MqttModuleExports::MqttAsyncClient::On(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt On Start");
    return MqttModuleExports::On(env, info,
            { MQTT_CONNECT_EVENT, MQTT_SUBSCRIBE_EVENT, MQTT_UNSUBSCRIBE_EVENT, MQTT_DISCONNECT_EVENT,
              MQTT_PUBLISH_EVENT, MQTT_RECONNECT_EVENT }, true);
}

napi_value MqttModuleExports::MqttAsyncClient::Off(napi_env env, napi_callback_info info)
{
    LOG("AsyncMqtt Off Start");
    return MqttModuleExports::Off(env, info,
            { MQTT_CONNECT_EVENT, MQTT_SUBSCRIBE_EVENT, MQTT_UNSUBSCRIBE_EVENT, MQTT_DISCONNECT_EVENT,
              MQTT_PUBLISH_EVENT, MQTT_RECONNECT_EVENT });
}

napi_value MqttModuleExports::On(napi_env env, napi_callback_info info,
                                 const std::initializer_list<std::string> &events, bool asyncCallback)
{
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    if (paramsCount != EVENT_PARAM_NUM || NapiUtils::GetValueType(env, params[0]) != napi_string ||
            NapiUtils::GetValueType(env, params[1]) != napi_function) {
        LOG("AsyncMqtt on off once interface para:");
        return NapiUtils::GetUndefined(env);
    }

    std::string event = NapiUtils::GetStringFromValueUtf8(env, params[0]);
    if (std::find(events.begin(), events.end(), event) == events.end()) {
        return NapiUtils::GetUndefined(env);
    }

    EventManager *manager = nullptr;
    napi_unwrap(env, thisVal, reinterpret_cast<void **>(&manager));
    if (manager != nullptr) {
        manager->AddListener(env, event, params[1], false, asyncCallback);
    }

    return NapiUtils::GetUndefined(env);
}

napi_value MqttModuleExports::Off(napi_env env, napi_callback_info info,
                                  const std::initializer_list<std::string> &events)
{
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    if (paramsCount != EVENT_PARAM_NUM || NapiUtils::GetValueType(env, params[0]) != napi_string ||
            NapiUtils::GetValueType(env, params[1]) != napi_function) {
        LOG("AsyncMqtt on off once interface para: ");
        return NapiUtils::GetUndefined(env);
    }

    std::string event = NapiUtils::GetStringFromValueUtf8(env, params[0]);
    if (std::find(events.begin(), events.end(), event) == events.end()) {
        return NapiUtils::GetUndefined(env);
    }

    EventManager *manager = nullptr;
    napi_unwrap(env, thisVal, reinterpret_cast<void **>(&manager));
    if (manager != nullptr) {
        manager->DeleteListener(event, params[1]);
    }

    return NapiUtils::GetUndefined(env);
}

void MqttModuleExports::RejectError(BaseContext *context, const std::string &type)
{
    napi_value object = NapiUtils::CreateObject(context->GetEnv());
    if (NapiUtils::GetValueType(context->GetEnv(), object) != napi_object) {
        return;
    }
    NapiUtils::SetStringPropertyUtf8(context->GetEnv(), object, MqttConstant::RESPONSE_KEY_MESSAGE,
            MqttConstant::RESPONSE_ERROR_MSG);
    NapiUtils::SetInt32Property(context->GetEnv(), object, MqttConstant::RESPONSE_KEY_CODE,
            MqttConstant::RESPONSE_ERROR_CODE);
    napi_value undefined = NapiUtils::GetUndefined(context->GetEnv());
    context->Emit(type, std::make_pair(undefined, object));
    delete context;
}


napi_value MqttModuleExports::CreateMqttResponse(BaseContext *context, MqttResponse *mqttResponse)
{
    napi_value object = NapiUtils::CreateObject(context->GetEnv());
    if (NapiUtils::GetValueType(context->GetEnv(), object) != napi_object) {
        return nullptr;
    }
    NapiUtils::SetStringPropertyUtf8(context->GetEnv(), object, MqttConstant::RESPONSE_KEY_MESSAGE,
            mqttResponse->GetMessage());
    NapiUtils::SetInt32Property(context->GetEnv(), object, MqttConstant::RESPONSE_KEY_CODE, mqttResponse->GetCode());
    return object;
}

napi_value MqttModuleExports::CreateMqttMessage(BaseContext *context, MqttMessage *mqttMessage)
{
    napi_value object = NapiUtils::CreateObject(context->GetEnv());
    if (NapiUtils::GetValueType(context->GetEnv(), object) != napi_object) {
        return nullptr;
    }
    NapiUtils::SetStringPropertyUtf8(context->GetEnv(), object, MqttConstant::PARAM_TOPIC, mqttMessage->GetTopic());
    NapiUtils::SetStringPropertyUtf8(context->GetEnv(), object, MqttConstant::PARAM_PAYLOAD, mqttMessage->GetPayload());
    NapiUtils::SetUint32Property(context->GetEnv(), object, MqttConstant::PARAM_QOS, mqttMessage->GetQos());
    NapiUtils::SetInt32Property(context->GetEnv(), object, MqttConstant::PARAM_RETAINED, mqttMessage->GetRetained());
    NapiUtils::SetInt32Property(context->GetEnv(), object, MqttConstant::PARAM_DUP, mqttMessage->GetDup());
    NapiUtils::SetInt32Property(context->GetEnv(), object, MqttConstant::PARAM_MSGID, mqttMessage->GetMsgid());
    return object;
}

void MqttModuleExports::ParseClientOptions(napi_env env, napi_value objValue, MqttClientOptions *options)
{
    LOG("AsyncMqtt ParseClientOptions Start");
    if (NapiUtils::GetValueType(env, objValue) != napi_object) {
        LOG("AsyncMqtt clientOptions error");
        return;
    }
    options->SetUrl(NapiUtils::GetStringPropertyUtf8(env, objValue, MqttConstant::PARAM_URL));
    options->SetClientId(NapiUtils::GetStringPropertyUtf8(env, objValue, MqttConstant::PARAM_CLIENT_ID));
    options->SetPersistenceType(NapiUtils::GetUint32Property(env, objValue, MqttConstant::PARAM_PERSISTENCE_TYPE));
}

void MqttModuleExports::DefineClass(napi_env env, napi_value exports,
                                    const std::initializer_list<napi_property_descriptor> &properties,
                                    const std::string &className)
{
    auto constructor = [](napi_env env, napi_callback_info info) -> napi_value {
        napi_value thisVal = nullptr;
        napi_get_cb_info(env, info, nullptr, nullptr, &thisVal, nullptr);

        return thisVal;
    };

    napi_value jsConstructor = nullptr;

    napi_property_descriptor descriptors[properties.size()];
    std::copy(properties.begin(), properties.end(), descriptors);

    napi_define_class(env, className.c_str(), NAPI_AUTO_LENGTH, constructor, nullptr,
            properties.size(), descriptors, &jsConstructor);

    NapiUtils::SetNamedProperty(env, exports, className, jsConstructor);
}

napi_value MqttModuleExports::NewInstance(napi_env env, napi_callback_info info, const std::string &className,
                                          Finalizer finalizer)
{
    napi_value thisVal = nullptr;
    size_t paramsCount = MAX_PARAM_NUM;
    napi_value params[MAX_PARAM_NUM] = {nullptr};
    napi_get_cb_info(env, info, &paramsCount, params, &thisVal, nullptr);

    napi_value jsConstructor = NapiUtils::GetNamedProperty(env, thisVal, className);
    if (NapiUtils::GetValueType(env, jsConstructor) == napi_undefined) {
        return nullptr;
    }
    napi_value result = nullptr;
    napi_new_instance(env, jsConstructor, 0, nullptr, &result);

    auto manager = new EventManager();
    ParseClientOptions(env, params[0], &(manager->options));
    if (!MqttImpl::Initialize(manager->options)) {
        return nullptr;
    }
    napi_wrap(env, result, reinterpret_cast<void *>(manager), finalizer, nullptr, nullptr);
    LOG("AsyncMqtt created end");
    return result;
}

static napi_module g_mqttModule = {
.nm_version = 1,
.nm_flags = 0,
.nm_filename = nullptr,
.nm_register_func = MqttModuleExports::InitMqttModule,
.nm_modname = MQTT_MODULE_NAME,
.nm_priv = nullptr,
.reserved = { nullptr },
};

extern "C" __attribute__((constructor)) void RegisterMqttModule(void)
{
napi_module_register(&g_mqttModule);
}
}
} // namespace OHOS::PahoMqtt
