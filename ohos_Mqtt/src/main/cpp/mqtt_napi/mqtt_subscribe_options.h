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
#ifndef MQTT_SUBSCRIBE_OPTIONS_CONTEXT_H
#define MQTT_SUBSCRIBE_OPTIONS_CONTEXT_H

#include <string>
#include <cstdint>

namespace OHOS {
namespace PahoMqtt {
class MqttSubscribeOptions final {
public:
    MqttSubscribeOptions();

    void SetTopic(const std::string &topic);

    void SetQos(uint32_t qos);

    [[nodiscard]] const std::string &GetTopic() const;

    [[nodiscard]] uint32_t GetQos() const;

private:
    std::string topic_;

    uint32_t qos_;
};
}
} // namespace OHOS::PahoMqtt
#endif // MQTT_SUBSCRIBE_OPTIONS_CONTEXT_H