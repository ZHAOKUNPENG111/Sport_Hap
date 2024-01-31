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

#ifndef MQTT_MESSAGE_H
#define MQTT_MESSAGE_H

#include <vector>
#include <string>

namespace OHOS {
namespace PahoMqtt {
class MqttMessage final {
public:
    MqttMessage();

    void SetTopic(const std::string &topic);

    [[nodiscard]] const std::string &GetTopic() const;

    void SetPayload(const std::string &payload);

    [[nodiscard]] const std::string &GetPayload() const;

    void SetQos(uint32_t qos);

    [[nodiscard]] uint32_t GetQos() const;

    void SetRetained(int32_t retained);

    [[nodiscard]] int32_t GetRetained() const;

    void SetDup(int32_t dup);

    [[nodiscard]] int32_t GetDup() const;

    void SetMsgid(int32_t msgid);

    [[nodiscard]] int32_t GetMsgid() const;

private:
    std::string topic_ = "";

    std::string payload_ = "";

    uint32_t qos_ = 0;

    int32_t retained_ = 0;

    int32_t dup_ = 0;

    int32_t msgid_ = 0;
};
}
} // namespace OHOS::PahoMqtt
#endif // MQTT_MESSAGE_H