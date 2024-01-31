import common from '@ohos.app.ability.common';
import router from '@ohos.router';
import data_preferences from '@ohos.data.preferences';
import Logger from '../common/utils/Logger';
import * as commonConst from '../common/constants/CommonConstants';
import UserPrivacyDialog from '../view/dialog/UserPrivacyDialog';

// app preferences name
const H_STORE: string = 'healthAppStore';
const IS_PRIVACY: string = 'isPrivacy';
import AbilityStage from '@ohos.app.ability.AbilityStage'
// import Logger1 from '../model/Logger'

@Entry
@Component
struct SplashIndex {
  context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
  dialogController: CustomDialogController = new CustomDialogController({
    builder: UserPrivacyDialog(
      {
        cancel: this.exitApp.bind(this),
        confirm: this.onConfirm.bind(this)
      }),
    cancel: this.exitApp.bind(this),
    autoCancel: false,
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: commonConst.OFFSET_24 }
  });

  onConfirm() {
    let preferences = data_preferences.getPreferences(this.context, H_STORE);
    preferences.then((res) => {
      res.put(IS_PRIVACY, true).then(() => {
        res.flush();
        Logger.info('SplashPage','isPrivacy is put success');
        // Logger1.info("[MyAbilityStage] MyAbilityStage onCreate")

      }).catch((err) => {
        Logger.info('SplashPage','isPrivacy put failed. Cause:' + err);
      });
    })
    this.jumpAdPage();
  }

  exitApp() {
    this.context.terminateSelf();
  }

  jumpAdPage() {
    setTimeout(() => {
      // router.replaceUrl({ url: 'pages/AdvertisingPage' });
      router.replaceUrl({ url: 'pages/MainPage' });

    }, commonConst.LAUNCHER_DELAY_TIME);
  }

  aboutToAppear() {
    // let preferences = data_preferences.getPreferences(this.context, H_STORE);
    // preferences.then((res) => {
    //   res.get(IS_PRIVACY, false).then((isPrivate) => {
    //     if (isPrivate === true) {
    //       this.jumpAdPage();
    //     } else {
    //       this.dialogController.open();
    //     }
    //   });
    // });
    this.jumpAdPage();
  }

  aboutToDisappear() {
    clearTimeout();
  }

  build() {
    Column() {
      Image($r('app.media.logo'))
        .width($r('app.float.default_120'))
        .aspectRatio(1)
        .margin({ top: $r('app.float.default_120') });
      Text($r('app.string.EntryAbility_label'))
        .fontFamily($r('app.string.HarmonyHeiTi_Bold'))
        .fontSize($r('app.float.default_24'))
        .fontColor($r('app.color.white'))
        .fontWeight(commonConst.FONT_WEIGHT_700)
        .letterSpacing(commonConst.LETTER_1)
        .margin({
          top: $r('app.float.default_20'),
          bottom: $r('app.float.default_8') })
      Text($r('app.string.EntryAbility_desc'))
        .fontFamily($r('app.string.HarmonyHeiTi'))
        .fontColor($r('app.color.white'))
        .fontWeight(commonConst.FONT_WEIGHT_400)
        .letterSpacing(commonConst.LETTER_34)
        .opacity(commonConst.OPACITY_6)
        .fontSize($r('app.float.default_16'))
    }
    .width('100%')
    .height('100%')
    .backgroundImagePosition({x: 0, y: 0})
    .backgroundImage($r('app.media.ic_splash_bg'))
    .backgroundImageSize({ width: '100%', height: '100%' }).backgroundImageSize(ImageSize.Cover)
  }
}