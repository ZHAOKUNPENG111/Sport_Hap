import { ListInfo } from '../view/ListInfo';
import { UserBaseInfo } from '../view/UserBaseInfo';
import { NICK_NAME, SIGNATURE, FULL_HEIGHT } from '../common/constants/CommonConstants';
@Entry
@Component
export struct MineIndex {
  // @State nickname: string = NICK_NAME;
  @State nickname: string = "Hello World";
  @State signature: string = SIGNATURE;

  build() {
    Column() {
      UserBaseInfo({
        nickname: this.nickname,
        signature: this.signature
      });

      ListInfo();
    }
    .height(FULL_HEIGHT)
    .backgroundColor($r('app.color.mineBgColor'))
  }
}