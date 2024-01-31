export interface InfoItem {
  id: string;
  title: Resource;
  icon?: Resource;

}

export const MineInfoList: InfoItem[] = [
  {
    id: '1',
    title: $r('app.string.mine_personal_data')
  },
  {
    id: '2',
    title: $r('app.string.mine_check_updates')
  },
  {
    id: '3',
    title: $r('app.string.mine_about')
  }
];

export interface InfoUser {
  id: string;
  title: string;
  icon?: Resource;

}

export const MineInfoUserList: InfoUser[] = [
  {
    id: '1',
    title: ('性别')
  },
  {
    id: '2',
    title: ('年龄')
  },
  {
    id: '3',
    title: ('身高')
  },
  {
    id: '4',
    title: ('体重')
  },
  {
    id: '5',
    title: ('运动周期')
  }
];
