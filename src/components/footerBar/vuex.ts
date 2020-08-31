import {GetBarBO} from '@/models/bo/BarBO';
const initState :GetBarBO= {
  appBar:[
    {
      name:'首页',
      id:'1',
      icon:'icon-icon_home'
    },
    {
      name:'菜单',
      id:'2',
      icon:'icon-caidan'
    },
    {
      name:'购物车',
      id:'3',
      icon:'icon-gouwuche'
    },
    {
      name:'我的',
      id:'4',
      icon:'icon-ren'
    },
  ],
  bottomActive: '1'
};
export default {
  state: initState,
  mutations: {
    // 获取菜单选择
    ['GET_MENU_BAR'](state: any, payload: { active: any }) {
      state.bottomActive = payload.active
    },
  },
};
