<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const loginFormRef = ref(null)

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const loading = ref(false)
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// 检查是否记住密码
const checkRemembered = () => {
  const remembered = localStorage.getItem('remembered')
  if (remembered) {
    const { username, password } = JSON.parse(remembered)
    loginForm.username = username
    loginForm.password = password
    loginForm.remember = true
  }
}

// 记住密码
const rememberPassword = () => {
  if (loginForm.remember) {
    localStorage.setItem('remembered', JSON.stringify({
      username: loginForm.username,
      password: loginForm.password
    }))
  } else {
    localStorage.removeItem('remembered')
  }
}

const handleLogin = () => {
  if (!loginFormRef.value) return
  
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      // 模拟登录请求
      setTimeout(() => {
        // 保存用户信息
        localStorage.setItem('user', JSON.stringify({
          username: loginForm.username,
          role: 'admin'
        }))

        // 处理记住密码
        rememberPassword()

        // 登录成功提示
        ElMessage.success('登录成功')

        // 获取重定向地址或默认跳转到仪表盘
        const redirect = route.query.redirect || '/dashboard'
        router.push(redirect)

        loading.value = false
      }, 1000)
    } else {
      return false
    }
  })
}

// 初始化时检查是否记住密码
checkRemembered()
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="login-header">
        <img src="../assets/logo.svg" alt="Logo" class="logo">
        <h2>智能汽车生产管理系统</h2>
      </div>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-position="top"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-footer">
        <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
        <el-link type="primary">忘记密码？</el-link>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1890ff 0%, #001529 100%);
}

.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.login-header h2 {
  color: #1890ff;
  font-size: 24px;
  margin: 0;
}

.login-form {
  margin-top: 20px;
}

.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
}

.login-footer {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .login-card {
    width: 90%;
    margin: 0 20px;
  }
}
</style> 