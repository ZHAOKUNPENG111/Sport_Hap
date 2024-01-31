import { TargetSettingDialog, RemindTimeDialog, FrequencyDialog } from './TaskSettingDialog';
import { BroadCast, BroadCastType } from '../../common/utils/BroadCast';
import Logger from '../../common/utils/Logger';
import { ZERO, MINUS_20 } from '../../common/constants/CommonConstants';

export interface CustomDialogCallback {
  confirmCallback: Function;
  cancelCallback: Function;
}

@Component
export struct TaskDialogView {
  @State isShow: boolean = false;
  @Consume broadCast: BroadCast;

  // target setting dialog
  targetSettingDialog = new CustomDialogController({
    builder: TargetSettingDialog(),
    autoCancel: true,
    alignment: DialogAlignment.Bottom,
    offset: { dx: ZERO, dy: MINUS_20 }
  });
  // remind time dialog
  RemindTimeDialogController: CustomDialogController = new CustomDialogController({
    builder: RemindTimeDialog(),
    autoCancel: true,
    alignment: DialogAlignment.Bottom,
    offset: { dx: ZERO, dy: MINUS_20 }
  });
  // frequency dialog
  FrequencyDialogController: CustomDialogController = new CustomDialogController({
    builder: FrequencyDialog(),
    autoCancel: true,
    alignment: DialogAlignment.Bottom,
    offset: { dx: ZERO, dy: MINUS_20 }
  });

  aboutToAppear() {
    Logger.debug('CustomDialogView', 'aboutToAppear');

    // target setting dialog
    this.broadCast.on(BroadCastType.SHOW_TARGET_SETTING_DIALOG, () => {
      this.targetSettingDialog.open();
    })
    // remind time dialog
    this.broadCast.on(BroadCastType.SHOW_REMIND_TIME_DIALOG, () => {
      this.RemindTimeDialogController.open();
    })
    // frequency dialog
    this.broadCast.on(BroadCastType.SHOW_FREQUENCY_DIALOG, () => {
      this.FrequencyDialogController.open();
    })
  }

  aboutToDisappear() {
    Logger.debug('CustomDialogView', 'aboutToDisappear');
  }

  build() {
  }
}