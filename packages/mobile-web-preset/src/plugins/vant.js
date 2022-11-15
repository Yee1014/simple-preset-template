/**
 * vant
 * @author  Yee
 * @date    2021/5/8
 * @desc    vant组件引入
 */
import '@/assets/css/vant/vant-element.scss'
import 'vant/lib/index.css'
// 引入语言包
import zhCN from 'vant/es/locale/lang/zh-CN'
import {
  Area,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Empty,
  Field,
  Form,
  Icon,
  IndexAnchor,
  IndexBar,
  Lazyload,
  List,
  Locale,
  NoticeBar,
  Notify,
  Overlay,
  Picker,
  Popup,
  PullRefresh,
  Radio,
  RadioGroup,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Toast,
  Dialog,
  TreeSelect,
  Uploader,
  Loading,
  Skeleton,
  Switch,
  NumberKeyboard,
  ActionSheet,
  Collapse,
  CollapseItem,
  Popover,
  Row,
  Col,
  NavBar,
} from 'vant'
import { getCurrentLocale } from '@/plugins/i18n'

/**
 * 安装vant
 * @param app
 */
export function installVant(app) {
  app.use(ActionSheet)
  app.use(Tabbar)
  app.use(TabbarItem)
  app.use(Checkbox)
  app.use(CheckboxGroup)
  app.use(Area)
  app.use(Uploader)
  app.use(Form)
  app.use(IndexBar)
  app.use(IndexAnchor)
  app.use(PullRefresh)
  app.use(List)
  app.use(Empty)
  app.use(Picker)
  app.use(Radio)
  app.use(RadioGroup)
  app.use(NoticeBar)
  app.use(Swipe)
  app.use(SwipeItem)
  app.use(Icon)
  app.use(Overlay)
  app.use(Popup)
  app.use(Popover)
  app.use(Toast)
  app.use(Dialog)
  app.use(Cell)
  app.use(CellGroup)
  app.use(Field)
  app.use(Button)
  app.use(Collapse)
  app.use(CollapseItem)
  app.use(TreeSelect)
  app.use(Lazyload)
  app.use(Loading)
  app.use(Skeleton)
  app.use(Switch)
  app.use(NumberKeyboard)
  app.use(Row)
  app.use(Col)
  app.use(NavBar)

  // 注册时可以配置额外的选项
  app.use(Lazyload, {
    lazyComponent: true,
  })

  Notify.setDefaultOptions({
    background: 'rgba(0, 0, 0, .6)',
  })
  app.use(Notify)

  setVantI18n()

  // Locale.use('zh-CN', zhCN)
}

/**
 * 设置语言资源
 * @param lang
 * @return {string}
 */
export function setVantI18n(lang = null) {
  if (!lang) {
    lang = getCurrentLocale()
  }
  import(
    /* webpackChunkName: "lang-vant-[request]" */ `vant/es/locale/lang/${lang}.mjs`
  )
    .then(res => {
      Locale.use(lang, res.default)
    })
    .catch(e => {
      console.log('vant i18n error:', e)
      Locale.use('zh-CN', zhCN)
    })
}
