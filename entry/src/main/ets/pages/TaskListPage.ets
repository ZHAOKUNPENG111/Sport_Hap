import { ITaskItem } from '../model/TaskInitList';
import TaskList from '../view/task/TaskListComponent';
import { THOUSANDTH_1000, ADD_TASK_TITLE } from '../common/constants/CommonConstants';
import { getAllTask, taskIndexDataInit, taskOriginData } from '../viewmodel/TaskViewModel';

@Entry
@Component
@Preview
export struct TaskIndex {
  @Provide taskList: ITaskItem[] = taskOriginData;

  onPageShow() {
    getAllTask().then(res => {
      let deepCopyData = JSON.stringify(this.taskList);
      deepCopyData = JSON.parse(deepCopyData);
      this.taskList = taskIndexDataInit(deepCopyData, res);
    })
  }

  build() {
    Row() {
      Navigation() {
        Column() {
          TaskList()
        }
        .width(THOUSANDTH_1000)
        .justifyContent(FlexAlign.Center)
      }
      .size({ width: THOUSANDTH_1000, height: THOUSANDTH_1000 })
      .title(ADD_TASK_TITLE)
      .titleMode(NavigationTitleMode.Mini)
    }
    .backgroundColor($r('app.color.primaryBgColor'))
    .height(THOUSANDTH_1000)
  }
}