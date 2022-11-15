/**
 * index
 * @author  Yee
 * @date    2021/5/8
 * @desc    插件入口
 */
import { installVant } from './vant'
import { installI18n } from '@/plugins/i18n'
import { installVuex } from '@/plugins/store'
import { installRouter } from '@/plugins/router'
import { installDirective } from '@/plugins/directive'
import { installFormatters } from '@/plugins/formatter'

const registerPlugins = app => {
  installFormatters(app)
  installI18n(app)
  installVant(app)
  installVuex(app)
  installRouter(app)
  installDirective(app)
}

export default registerPlugins
