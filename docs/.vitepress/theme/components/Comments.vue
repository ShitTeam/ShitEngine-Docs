<template>
  <div v-if="showComments" class="giscus-wrapper" :key="route.path">
    <h2 id="comments" class="comments-title">💬 评论</h2>
    <component :is="'script'"
      src="https://giscus.app/client.js"
      :data-repo="repo"
      :data-repo-id="repoId"
      :data-category="category"
      :data-category-id="categoryId"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="preferred_color_scheme"
      data-lang="zh-CN"
      crossorigin="anonymous"
      async
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const repo = 'ShitTeam/ShitEngine-Docs'
const repoId = 'R_kgDOR6Brbw'
const category = 'General'
const categoryId = 'DIC_kwDOR6Brb84DBYEE'

const showComments = ref(true)

watch(() => route.path, () => {
  showComments.value = frontmatter.value.comments !== false
})
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
