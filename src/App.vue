<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Menu as IconMenu,
  Location,
  Document,
  Setting,
  HomeFilled,
  Box,
  User,
  Tools
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const isCollapse = ref(false)
const activeIndex = computed(() => route.path)
const username = ref('')

// 更新用户名
const updateUsername = () => {
  const userInfo = localStorage.getItem('user')
  username.value = userInfo ? JSON.parse(userInfo).username : '管理员'
}

// 初始化时更新用户名
updateUsername()

const handleSelect = (index) => {
  router.push(index)
}

// 检查是否是登录页面
const isLoginPage = computed(() => route.path === '/login')

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<template>
  <div class="app-container">
    <!-- 如果是登录页面，直接显示路由内容 -->
    <router-view v-if="isLoginPage" />

    <!-- 如果不是登录页面，显示带导航的布局 -->
    <el-container v-else class="layout-container">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
        <div class="logo-container">
          <img src="@/assets/logo.svg" alt="Logo" class="logo" v-if="!isCollapse">
          <span v-if="!isCollapse">智能汽车管理</span>
        </div>
        
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical"
          :collapse="isCollapse"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/dashboard">
            <el-icon><HomeFilled /></el-icon>
            <template #title>仪表盘</template>
          </el-menu-item>

          <el-menu-item index="/production">
            <el-icon><Document /></el-icon>
            <template #title>生产管理</template>
          </el-menu-item>

          <el-menu-item index="/inventory">
            <el-icon><Box /></el-icon>
            <template #title>库存管理</template>
          </el-menu-item>

          <el-menu-item index="/equipment">
            <el-icon><Tools /></el-icon>
            <template #title>设备管理</template>
          </el-menu-item>

          <el-menu-item index="/personnel">
            <el-icon><User /></el-icon>
            <template #title>人员管理</template>
          </el-menu-item>

          <el-menu-item index="/settings">
            <el-icon><Setting /></el-icon>
            <template #title>系统设置</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主要内容区 -->
      <el-container class="main-container">
        <el-header class="header">
          <div class="header-left">
            <el-button
              link
              @click="isCollapse = !isCollapse"
              class="toggle-button"
            >
              <el-icon><IconMenu /></el-icon>
            </el-button>
          </div>
          <div class="header-right">
            <el-dropdown @command="handleLogout">
              <span class="user-info">
                {{ username }}
                <el-icon class="el-icon--right"><Setting /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="main-content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
}

.layout-container {
  height: 100%;
}

.aside {
  background-color: #001529;
  transition: width 0.3s;
  overflow: hidden;
}

.logo-container {
  height: 60px;
  line-height: 60px;
  background-color: #002140;
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.logo {
  height: 32px;
  margin-right: 10px;
  vertical-align: middle;
}

.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}

.toggle-button {
  font-size: 20px;
  color: #333;
  padding: 0;
}

.user-info {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: calc(100vh - 60px);
}

.main-content {
  background-color: #f0f2f5;
  padding: 20px;
  height: calc(100vh - 60px);
  overflow-y: auto;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .aside {
    position: fixed;
    height: 100vh;
    z-index: 1000;
  }
  
  .header {
    padding-left: 84px;
  }

  .main-content {
    padding: 10px;
  }
}
</style>
