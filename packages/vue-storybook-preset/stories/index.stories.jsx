/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import MyButton from '../src/components/MyButton.vue'

export default {
  component: MyButton,
  title: 'Base|Button'
}

export const withText = () => ({
  components: { MyButton },
  template: '<my-button @click="action">Hello Button</my-button>',
  methods: { action: action('clicked') }
})

export const withJSX = () => ({
  render () {
    return <MyButton onClick={linkTo('Button', 'With Some Emoji')}>With JSX</MyButton>
  }
})

export const withSomeEmoji = () => ({
  components: { MyButton },
  template: '<my-button>😀 😎 👍 💯</my-button>'
})
