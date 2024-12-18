// 数据文件路径映射
const DATA_FILES = {
  production: 'production.json',
  inventory: 'inventory.json',
  equipment: 'equipment.json',
  personnel: 'personnel.json'
}

// Storage工具类
export const Storage = {
  // 保存数据
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error saving ${key} data:`, error)
      return false
    }
  },

  // 获取数据
  get(key) {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error(`Error loading ${key} data:`, error)
      return null
    }
  },

  // 删除数据
  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing ${key} data:`, error)
      return false
    }
  },

  // 清空所有数据
  clear() {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing all data:', error)
      return false
    }
  }
}

// 初始化默认数据
export const initializeDefaultData = () => {
  // 生产管理默认数据
  if (!Storage.get('production')) {
    Storage.set('production', {
      plans: [],
      tasks: [],
      quality: []
    })
  }

  // 库存管理默认数据
  if (!Storage.get('inventory')) {
    Storage.set('inventory', {
      materials: [],
      products: [],
      history: []
    })
  }

  // 设备管理默认数据
  if (!Storage.get('equipment')) {
    Storage.set('equipment', {
      devices: [],
      maintenance: [],
      faults: []
    })
  }

  // 人员管理默认数据
  if (!Storage.get('personnel')) {
    Storage.set('personnel', {
      employees: [],
      schedules: [],
      performance: []
    })
  }
}

// 导出数据到JSON文件
export const exportToJson = (module) => {
  const data = Storage.get(module)
  if (data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = DATA_FILES[module]
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    return true
  }
  return false
}

// 从JSON文件导入数据
export const importFromJson = (module, file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        Storage.set(module, data)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = (error) => reject(error)
    reader.readAsText(file)
  })
}

// 导出默认对象
export default {
  Storage,
  initializeDefaultData,
  exportToJson,
  importFromJson
} 