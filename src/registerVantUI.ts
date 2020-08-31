// @ts-ignore
import Vue from 'vue'
import { Button, ActionSheet,Tabbar, TabbarItem, Locale , Icon, Search, Tabs, Tab, Toast, PullRefresh,List, Loading, Skeleton, Popup, Swipe, SwipeItem, Image } from 'vant'

// @ts-ignore
export default function registerVantUI() {
  Vue.use(Button)
  Vue.use(ActionSheet)
  Vue.use(Tabbar)
  Vue.use(TabbarItem)
  Vue.use(Locale)
  Vue.use(Icon)
  Vue.use(Search)
  Vue.use(Tabs)
  Vue.use(Tab)
  Vue.use(Toast)
  Vue.use(PullRefresh)
  Vue.use(List)
  Vue.use(Loading)
  Vue.use(Skeleton)
  Vue.use(Popup)
  Vue.use(Swipe)
  Vue.use(SwipeItem)
  Vue.use(Image)

  Vue.prototype.$toast = Toast
};
