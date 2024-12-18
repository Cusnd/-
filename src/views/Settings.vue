<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import storage from '../utils/storage'

const { Storage } = storage

const settings = ref({
  systemName: '智能汽车生产管理系统',
  company: '示例公司',
  version: 'v1.0.0',
  theme: 'light',
  language: 'zh-CN',
  notifications: true
})

// 模块列表
const modules = [
  { key: 'production', name: '生产管理' },
  { key: 'inventory', name: '库存管理' },
  { key: 'equipment', name: '设备管理' },
  { key: 'personnel', name: '人员管理' }
]

// 导出数据
const handleExport = (module) => {
  try {
    const data = Storage.get(module)
    if (!data) {
      ElMessage.warning('没有可导出的数据')
      return
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${module}_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    ElMessage.success('数据导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('数据导出失败')
  }
}

// 导入数据
const handleImport = async (event, module) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        Storage.set(module, data)
        ElMessage.success('数据导入成功')
        // 重置文件输入
        event.target.value = ''
      } catch (error) {
        console.error('解析失败:', error)
        ElMessage.error('数据格式错误')
      }
    }
    reader.onerror = () => {
      ElMessage.error('文件读取失败')
    }
    reader.readAsText(file)
  } catch (error) {
    console.error('导入失败:', error)
    ElMessage.error('数据导入失败')
  }
}

// 导出所有数据
const handleExportAll = () => {
  try {
    const allData = {}
    modules.forEach(module => {
      allData[module.key] = Storage.get(module.key)
    })

    const blob = new Blob([JSON.stringify(allData, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `all_data_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    ElMessage.success('所有数据导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('数据导出失败')
  }
}

// 导入所有数据
const handleImportAll = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        Object.entries(data).forEach(([key, value]) => {
          Storage.set(key, value)
        })
        ElMessage.success('所有数据导入成功')
        // 重置文件输入
        event.target.value = ''
      } catch (error) {
        console.error('解析失败:', error)
        ElMessage.error('数据格式错误')
      }
    }
    reader.onerror = () => {
      ElMessage.error('文件读取失败')
    }
    reader.readAsText(file)
  } catch (error) {
    console.error('导入失败:', error)
    ElMessage.error('数据导入失败')
  }
}
</script>

<template>
  <div class="settings">
    <!-- 基本设置 -->
    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <h3>系统设置</h3>
        </div>
      </template>

      <el-form :model="settings" label-width="120px">
        <el-form-item label="系统名称">
          <el-input v-model="settings.systemName" />
        </el-form-item>

        <el-form-item label="公司名称">
          <el-input v-model="settings.company" />
        </el-form-item>

        <el-form-item label="系统版本">
          <el-input v-model="settings.version" disabled />
        </el-form-item>

        <el-form-item label="主题设置">
          <el-select v-model="settings.theme" style="width: 100%">
            <el-option label="浅色主题" value="light" />
            <el-option label="深色主题" value="dark" />
          </el-select>
        </el-form-item>

        <el-form-item label="系统语言">
          <el-select v-model="settings.language" style="width: 100%">
            <el-option label="简体中文" value="zh-CN" />
            <el-option label="English" value="en-US" />
          </el-select>
        </el-form-item>

        <el-form-item label="消息通知">
          <el-switch v-model="settings.notifications" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary">保存设置</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据管理 -->
    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <h3>数据管理</h3>
          <div class="header-actions">
            <el-button type="primary" @click="handleExportAll">
              导出所有数据
            </el-button>
            <el-button type="warning">
              <label class="upload-label">
                导入所有数据
                <input
                  type="file"
                  accept=".json"
                  style="display: none"
                  @change="handleImportAll"
                >
              </label>
            </el-button>
          </div>
        </div>
      </template>

      <el-table :data="modules" style="width: 100%">
        <el-table-column prop="name" label="模块名称" />
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-button type="primary" link @click="handleExport(scope.row.key)">
              导出
            </el-button>
            <el-button type="warning" link>
              <label class="upload-label">
                导入
                <input
                  type="file"
                  accept=".json"
                  style="display: none"
                  @change="(e) => handleImport(e, scope.row.key)"
                >
              </label>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 系统信息 -->
    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <h3>系统信息</h3>
        </div>
      </template>

      <el-descriptions :column="1" border>
        <el-descriptions-item label="操作系统">Windows 11</el-descriptions-item>
        <el-descriptions-item label="浏览器">Chrome 120.0.0</el-descriptions-item>
        <el-descriptions-item label="分辨率">1920 x 1080</el-descriptions-item>
        <el-descriptions-item label="服务器时间">
          {{ new Date().toLocaleString() }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<style scoped>
.settings {
  padding: 20px;
}

.settings-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.upload-label {
  cursor: pointer;
}

.el-button {
  margin-right: 10px;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .header-actions {
    flex-direction: column;
    gap: 5px;
  }
  
  .el-button {
    margin-right: 0;
    margin-bottom: 5px;
  }
}
</style> 