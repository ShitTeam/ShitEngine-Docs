<template>
  <div class="giscus-wrapper" v-if="showComments">
    <h2 id="comments" class="comments-title">💬 评论</h2>
    <component :is="'script'"
      :src="giscusSrc"
      :data-repo="repo"
      :data-repo-id="repoId"
      :data-category="category"
      :data-category-id="categoryId"
      :data-mapping="mapping"
      :data-strict="strict"
      :data-reactions-enabled="reactionsEnabled"
      :data-emit-metadata="emitMetadata"
      :data-input-position="inputPosition"
      :data-theme="theme"
      :data-lang="lang"
      :data-loading="loading"
      async
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'

const { isDark, frontmatter } = useData()
const route = useRoute()

// ===== 配置区 =====
// 访问 https://giscus.app/ 获取以下参数
const repo = 'ShitTeam/ShitEngine-Docs'
const repoId = ''      // ← 你的 repo ID
const category = 'General'
const categoryId = ''  // ← 你的 category ID
// =================

const mapping = 'pathname'
const strict = '0'
const reactionsEnabled = '1'
const emitMetadata = '0'
const inputPosition = 'bottom'
const loading = 'lazy'

const lang = 'zh-CN'

const showComments = ref(true)
const theme = ref('light')

// 跟随 VitePress 暗色模式切换
watch(isDark, (val) => {
  theme.value = val ? 'dark' : 'light'
  updateGiscusTheme(val ? 'dark' : 'light')
})

// 隐藏评论页（如首页）
watch(() => route.path, () => {
  showComments.value = !frontmatter.value.comments === false
})

function updateGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame')
  if (iframe) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    )
  }
}

// Reload giscus on route change
watch(() => route.path, () => {
  const wrapper = document.querySelector('.giscus-wrapper')
  if (wrapper) {
    const script = wrapper.querySelector('script')
    if (script) {
      const newScript = document.createElement('script')
      for (const attr of script.attributes) {
        newScript.setAttribute(attr.name, attr.value)
      }
      script.remove()
      wrapper.appendChild(newScript)
    }
  }
})

const giscusSrc = 'https://giscus.app/client.js'
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}

.comments-title {
  margin-bottom: 24px;
  font-size: 1.25rem;
}
</style>
