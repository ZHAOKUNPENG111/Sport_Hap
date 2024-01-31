import { BadgeCard } from '@bundle:com.example.healthy_life/entry/ets/view/BadgeCardComponent';
import { getAchievementLevel } from '@bundle:com.example.healthy_life/entry/ets/model/AchieveModel';
import { getBadgeCardItems } from '@bundle:com.example.healthy_life/entry/ets/viewmodel/AchievementViewModel';
import Logger from '@bundle:com.example.healthy_life/entry/ets/common/utils/Logger';
import { ACHIEVEMENT_LEVEL_KEY } from '@bundle:com.example.healthy_life/entry/ets/model/AchieveModel';
import * as commonConst from '@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants';
export class BadgePanel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__successiveDays = this.createStorageProp(ACHIEVEMENT_LEVEL_KEY, 0, "successiveDays");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        this.__successiveDays.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get successiveDays() {
        return this.__successiveDays.get();
    }
    set successiveDays(newValue) {
        this.__successiveDays.set(newValue);
    }
    aboutToAppear() {
        Logger.debug('BadgePanel', 'aboutToAppear');
        getAchievementLevel();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap });
            Flex.debugLine("view/BadgePanelComponent.ets(18:5)");
            Flex.width(commonConst.FULL_WIDTH);
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new BadgeCard(this, { content: item[0], imgSrc: item[1] }, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                content: item[0]
                            });
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
            };
            this.forEachUpdateFunction(elmtId, getBadgeCardItems(this.successiveDays), forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=BadgePanelComponent.js.map