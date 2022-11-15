/**
 * HelloWorld.stories.js
 * @author  Yee
 * @date    2020/7/21
 * @desc
 */
import HelloWorld from '../src/components/HelloWorld.vue'
import { withKnobs, text } from '@storybook/addon-knobs'

export default {
  title: 'Base|HelloWorld',
  decorators: [withKnobs],
  component: HelloWorld
}

export const PropMsg = () => ({
  components: { HelloWorld },
  props: {
    msg: {
      default: text('msg', 'Hello World')
    }
  },
  template: `
    <HelloWorld :msg="msg"></HelloWorld>`
})
