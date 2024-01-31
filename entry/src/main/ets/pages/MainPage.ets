import router from '@ohos.router';
import common from '@ohos.app.ability.common';
import notificationManager from '@ohos.notificationManager';
import Logger from '../common/utils/Logger';
import { ITaskItem } from '../model/TaskInitList';
import * as commonConst from '../common/constants/CommonConstants';
import { NavList, TabId } from '../model/NavItemModel';
import HomeIndex from '../view/HomeComponent';
import { AchievementIndex } from '../view/AchievementComponent';
import { MineIndex } from './MinePage';
import { HomeStore } from '../viewmodel/HomeViewModel';
import GlobalInfoApi from '../common/database/tables/GlobalInfoApi';
import { THOUSANDTH_1000, EDIT_TASK_TITLE } from '../common/constants/CommonConstants';
import { BroadCast, BroadCastType } from '../common/utils/BroadCast';
import { TaskIndex } from './TaskListPage';
import { HealthDataSrcMgr } from '../common/utils/HealthDataSrcMgr';
import { createHeightRange, createWeightRange, createAgeRange,createPeriodRange} from '../viewmodel/TaskViewModel';


@Styles function allSize() {
  .width(commonConst.THOUSANDTH_1000)
  .height(commonConst.THOUSANDTH_1000)
}

@Styles function listItemStyle() {
  .backgroundColor($r('app.color.white'))
  .height(commonConst.DEFAULT_56)
  .borderRadius(commonConst.DEFAULT_10)
  .padding({ left: commonConst.DEFAULT_12, right: commonConst.DEFAULT_12 })
}
let clickcheck :string = ""
@Component
struct GetClientInfo {

  @State select: number = 2
  controller: CustomDialogController;
  heightRange: string[] = createHeightRange();
  weightRange: string[] = createWeightRange();
  ageRange: string[] = createAgeRange();
  periodRange: string[] = createPeriodRange();
  @State tempHeight: string = "身高"
  @State tempWeight: string = "体重"
  @State tempAge: string = "年龄"
  @State tempSex: string = ""
  @State tempPeriod: string = "运动周期"

  onCancel() {
    console.info('Callback when the first button is clicked')
  }

  onAccept() {
    console.info('Callback when the second button is clicked')
  }


  onPageShow() {

  }

  build() {
      Row() {
        Navigation() {
          Column() {
            Row() {
              Column() {
                List({ space: commonConst.LIST_ITEM_SPACE }) {
                  ListItem() {
                    Row() {
                      Blank().layoutWeight(1)
                      Radio({ value: 'Radio1', group: 'radioGroup' })
                        .onChange((isChecked: boolean) => {
                          if (isChecked) {
                            //需要执行的操作
                          }
                        })
                      Text("男").layoutWeight(1)
                      Radio({ value: 'Radio2', group: 'radioGroup' })
                        .onChange((isChecked: boolean) => {
                          if (isChecked) {
                            //需要执行的操作
                          }
                        })
                      Text('女').layoutWeight(1)}
                  }.listItemStyle()

                  ListItem() {
                    Text(`${this.tempAge}`).textAlign(TextAlign.Center).width("100%")
                      .height(commonConst.DEFAULT_48)
                      .onClick(() => {
                        TextPickerDialog.show({
                          range: this.ageRange,
                          selected: this.select,
                          onAccept: (value: TextPickerResult) => {
                            // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                            this.select = value.index
                            this.tempAge = "年龄： "+value.value
                          },
                          onCancel: () => {
                            this.tempAge = "年龄"
                          },
                          onChange: (value: TextPickerResult) => {
                          }
                        })
                      })
                  }.listItemStyle()

                  ListItem() {
                      Text(`${this.tempHeight}`).textAlign(TextAlign.Center).width("100%")
                        .height(commonConst.DEFAULT_48)
                        .onClick(() => {
                          TextPickerDialog.show({
                            range: this.heightRange,
                            selected: this.select,
                            onAccept: (value: TextPickerResult) => {
                              // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                              this.select = value.index
                              this.tempHeight = "身高： "+value.value
                            },
                            onCancel: () => {
                              this.tempHeight = "身高"
                            },
                            onChange: (value: TextPickerResult) => {
                            }
                          })
                        })
                  }
                  .listItemStyle()

                  ListItem() {
                    Text(`${this.tempWeight}`).textAlign(TextAlign.Center).width("100%")
                      .height(commonConst.DEFAULT_48)
                      .onClick(() => {
                        TextPickerDialog.show({
                          range: this.weightRange,
                          selected: this.select,
                          onAccept: (value: TextPickerResult) => {
                            // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                            this.select = value.index
                            this.tempWeight = "体重： "+value.value
                          },
                          onCancel: () => {
                            this.tempWeight = "体重"
                          },
                          onChange: (value: TextPickerResult) => {
                          }
                        })
                      })
                  }.listItemStyle()
                  ListItem() {
                    Text(`${this.tempPeriod}`).textAlign(TextAlign.Center).width("100%")
                      .height(commonConst.DEFAULT_48)
                      .onClick(() => {
                        TextPickerDialog.show({
                          range: this.periodRange,
                          selected: this.select,
                          onAccept: (value: TextPickerResult) => {
                            // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
                            this.select = value.index
                            this.tempPeriod = "运动周期： "+value.value
                          },
                          onCancel: () => {
                            this.tempPeriod = "运动周期"
                          },
                          onChange: (value: TextPickerResult) => {
                          }
                        })
                      })
                  }.listItemStyle()

                }
                // .width(commonConst.THOUSANDTH_940)

                Button() {
                  Text($r('app.string.complete')).fontSize($r('app.float.default_20')).fontColor($r('app.color.blueColor'))
                }
                .width(commonConst.THOUSANDTH_800)
                .height(commonConst.DEFAULT_48)
                .backgroundColor($r('app.color.borderColor'))
                .onClick(() => {
                  router.pushUrl({
                    url: 'pages/UserInfoPage',
                    params:{
                      age:this.tempAge,
                      sex:this.tempSex,
                      weight:this.tempWeight,
                      height:this.tempHeight,
                      period:this.tempPeriod
                    }
                  });
                })
                .position({
                  x: commonConst.THOUSANDTH_100,
                  y: commonConst.THOUSANDTH_800
                })

              }
              .width(commonConst.THOUSANDTH_1000)
            }
          }
          .width(THOUSANDTH_1000)
          .height(THOUSANDTH_1000)
        }
        .size({ width: THOUSANDTH_1000, height: THOUSANDTH_1000 })

      }
      .height(THOUSANDTH_1000)
      .backgroundColor($r('app.color.primaryBgColor'))
    }
}

@Entry
@Component
struct Index {
  @State currentPage: number = 0;
  @State editedTaskInfo: ITaskItem = JSON.parse(router.getParams() ? router.getParams()['editTask'] : '{}');
  @State editedTaskID: string = '0';
  @State homeStore: HomeStore = new HomeStore(new Date());
  private tabController: TabsController = new TabsController();

  aboutToAppear() {
    notificationManager.requestEnableNotification().then(() => {
      Logger.info('onPageShow', `requestEnableNotification success`);
    }).catch((err) => {
      Logger.error('onPageShow', `requestEnableNotification failed, code is ${err.code}, message is ${err.message}`);
    });
  }

  onPageShow() {
    Logger.info('onPageShow', JSON.stringify(router.getParams()));
    this.editedTaskInfo = JSON.parse(router.getParams() ? router.getParams()['editTask'] : '{}');
    this.editedTaskID = JSON.stringify(this.editedTaskInfo);
    if (globalThis.isForeground) {
      globalThis.isForeground = false;
      if (this.homeStore.currentDate.getDate() !== (new Date()).getDate()) {
        globalThis.taskListChange = true;
        this.homeStore = new HomeStore(new Date());
      }
      this.checkCurrentTime();
    }
  }

  checkCurrentTime() {
    GlobalInfoApi.query((result) => {
      let predate = new Date(result.lastDate);
      let date = new Date();
      if (result.length !== 0 && date.getTime() < predate.getTime()) {
        AlertDialog.show(
          {
            title: $r('app.string.alert'),
            message: $r('app.string.alert_message'),
            autoCancel: false,
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: -20 },
            gridCount: 3,
            confirm: {
              value: $r('app.string.alert_button'),
              action: () => {
                (getContext(this) as common.UIAbilityContext).terminateSelf();
                console.info('Button-clicking callback');
              }
            },
            cancel: () => {
              console.info('Closed callbacks');
            }
          });
      } else {
        this.homeStore.initData();
      }
    });
  }

  @Builder TabBuilder(index: number) {
    Column() {
      Image(index === this.currentPage ? NavList[index].icon_selected : NavList[index].icon)
        .width($r('app.float.default_24'))
        .height($r('app.float.default_24'))
        .objectFit(ImageFit.Contain);

      Text(NavList[index].text)
        .fontSize($r('app.float.default_10'))
        .fontWeight(commonConst.FONT_WEIGHT_500)
        .fontColor(this.currentPage === index ? $r('app.color.blueColor') : $r('app.color.tabTitleColor'))
        .margin({ top: $r('app.float.default_4') })
    }.justifyContent(FlexAlign.Center).allSize()
  }

  build() {
    Tabs({ barPosition: BarPosition.End, controller: this.tabController }) {

      TabContent() {
        HomeIndex({ homeStore: $homeStore, editedTaskInfo: $editedTaskInfo, editedTaskID: $editedTaskID })
          .borderWidth({ bottom: 1 })
          .borderColor($r('app.color.primaryBgColor'))
      }
      .tabBar(this.TabBuilder(TabId.HOME))
      .align(Alignment.Start)

      TabContent() {
        AchievementIndex()
      }
      .tabBar(this.TabBuilder(TabId.ACHIEVEMENT))
      TabContent() {
        GetClientInfo()
      }
      .tabBar(this.TabBuilder(TabId.PLAN))

      TabContent() {
        MineIndex()
          .borderWidth({ bottom: 1 })
          .borderColor($r('app.color.primaryBgColor'))
      }
      .tabBar(this.TabBuilder(TabId.MINE))
    }
    .scrollable(false)
    .allSize()
    .barWidth(commonConst.THOUSANDTH_940)
    .barMode(BarMode.Fixed)
    .vertical(false)
    .onChange((index) => {
      this.currentPage = index;
    })
  }
}