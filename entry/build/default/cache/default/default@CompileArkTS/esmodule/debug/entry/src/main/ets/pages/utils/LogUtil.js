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
const TAG = 'AsyncMqtt#';
/**
  * 通用的日志打印类
  */
export default class Log {
    static debug(tag, msg = '') {
        console.debug(`${TAG}[${tag}] ${msg}`);
    }
    static log(tag, msg = '') {
        console.log(`${TAG}[${tag}] ${msg}`);
    }
    static info(tag, msg = '') {
        console.info(`${TAG}[${tag}] ${msg}`);
    }
    static warn(tag, msg = '') {
        console.warn(`${TAG}[${tag}] ${msg}`);
    }
    static error(tag, msg = '') {
        console.error(`${TAG}[${tag}] ${msg}`);
    }
}
//# sourceMappingURL=LogUtil.js.map