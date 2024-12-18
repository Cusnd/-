import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ElMessage, ElLoading, ElNotification } from 'element-plus'

import App from './App.vue'
import router from './router'
import { initializeDefaultData } from './utils/storage'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 配置Element Plus
app.use(ElementPlus, {
  locale: zhCn,
})

// 全局挂载 Element Plus 组件
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$loading = ElLoading.service
app.config.globalProperties.$notify = ElNotification

// 使其在组件外也可用
window.$message = ElMessage
window.$loading = ElLoading.service
window.$notify = ElNotification

// 使用路由
app.use(router)

// 初始化默认数据
initializeDefaultData()

// 等待路由准备就绪后再挂载应用
router.isReady().then(() => {
  app.mount('#app')
})

// 处理路由错误
router.onError((error) => {
  console.error('路由错误:', error)
  ElMessage.error('页面加载失败，请刷新重试')
})
