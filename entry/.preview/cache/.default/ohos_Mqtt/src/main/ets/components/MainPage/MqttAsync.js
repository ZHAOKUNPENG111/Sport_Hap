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
import mqttAsync from '@app:com.example.healthy_life/entry/mqttasync';
class MqttAsync {
    static createMqtt(options) {
        console.log('AsyncMqtt createMqtt_napi');
        return mqttAsync.createMqttSync(options);
    }
    ;
}
export default MqttAsync;
//# sourceMappingURL=MqttAsync.js.map