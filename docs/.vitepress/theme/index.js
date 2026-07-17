import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Comments from './components/Comments.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h('div', {
        style: {
          maxWidth: 'var(--vp-doc-max-width)',
          margin: '0 auto',
          padding: '0 24px'
        }
      }, h(Comments))
    })
  }
}
