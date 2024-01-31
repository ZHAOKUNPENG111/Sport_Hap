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

#ifndef MQTT_RESPONSE_H
#define MQTT_RESPONSE_H

#include <vector>
#include <string>

namespace OHOS {
namespace PahoMqtt {
class MqttResponse final {
public:
    MqttResponse();

    void SetMessage(const std::string &message);

    void SetCode(int32_t code);

    [[nodiscard]] const std::string &GetMessage() const;

    [[nodiscard]] int32_t GetCode() const;

private:
    std::string message_ = "";

    int32_t code_;
};
}
} // namespace OHOS::PahoMqtt
#endif // MQTT_RESPONSE_H