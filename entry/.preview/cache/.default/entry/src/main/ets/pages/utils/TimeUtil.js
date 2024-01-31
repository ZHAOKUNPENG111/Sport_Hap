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
/**
 * 时间工具类
 */
export default class TimeUtil {
    static currentTimeStamp() {
        let date = new Date();
        return TimeUtil.timeFormat(date, "{h}:{i}:{s}");
    }
    static timeFormat(time, format) {
        const format_ = format || "{y}-{m}-{d} {h}:{i}:{s}";
        const timeObj = {
            y: time.getFullYear(),
            m: time.getMonth() + 1,
            d: time.getDate(),
            h: time.getHours(),
            i: time.getMinutes(),
            s: time.getSeconds()
        };
        let regex = new RegExp("{(y|m|d|h|i|s)+}", "g");
        const timeString = format_.replace(regex, (result, key) => {
            let value = 0;
            if (key === "h") {
                value = timeObj.h;
            }
            else if (key === "i") {
                value = timeObj.i;
            }
            else {
                value = timeObj.s;
            }
            if (result.length > 0 && value < 10) {
                return "0" + value;
            }
            return value.toString() || '0';
        });
        return timeString;
    }
}
class Time {
    constructor() {
        this.y = 0;
        this.m = 0;
        this.d = 0;
        this.h = 0;
        this.i = 0;
        this.s = 0;
    }
}
//# sourceMappingURL=TimeUtil.js.map