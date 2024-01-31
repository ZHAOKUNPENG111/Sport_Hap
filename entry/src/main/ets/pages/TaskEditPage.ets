import TaskDetail from '../view/task/TaskDetailComponent';
import { THOUSANDTH_1000, EDIT_TASK_TITLE } from '../common/constants/CommonConstants';

@Entry
@Component
struct TaskEdit {
  build() {
    Row() {
      Navigation() {
        Column() {
          TaskDetail()
        }
        .width(THOUSANDTH_1000)
        .height(THOUSANDTH_1000)
      }
      .size({ width: THOUSANDTH_1000, height: THOUSANDTH_1000 })
      .title(EDIT_TASK_TITLE)
      .titleMode(NavigationTitleMode.Mini)
    }
    .height(THOUSANDTH_1000)
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}