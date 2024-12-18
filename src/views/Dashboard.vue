<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <!-- 概览卡片 -->
      <el-col :span="6" v-for="(item, index) in 4" :key="index">
        <el-card shadow="hover" class="overview-card">
          <template #header>
            <div class="card-header">
              <span>{{ ['今日产量', '设备运行', '原料库存', '待处理任务'][index] }}</span>
            </div>
          </template>
          <div class="card-content">
            <span class="number">{{ [156, '95%', '78%', 12][index] }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="productionChart" style="width: 100%; height: 400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="qualityChart" style="width: 100%; height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const productionData = ref([
  { value: 85, name: '生产完成率' },
  { value: 15, name: '剩余任务' }
])

const qualityData = ref([
  { value: 95, name: '合格率' },
  { value: 5, name: '不合格率' }
])

let productionChart = null
let qualityChart = null
let initAttempts = 0
const MAX_INIT_ATTEMPTS = 3

const initChart = (element, options) => {
  if (!element) return null
  
  try {
    const chart = echarts.init(element)
    chart.setOption(options)
    return chart
  } catch (error) {
    console.error('图表初始化失败:', error)
    return null
  }
}

const initCharts = () => {
  if (initAttempts >= MAX_INIT_ATTEMPTS) {
    console.error('图表初始化失败，已达到最大重试次数')
    return
  }

  const productionChartEl = document.getElementById('productionChart')
  const qualityChartEl = document.getElementById('qualityChart')

  if (!productionChartEl || !qualityChartEl) {
    initAttempts++
    setTimeout(initCharts, 100)
    return
  }

  if (!productionChart) {
    productionChart = initChart(productionChartEl, {
      title: {
        text: '生产进度',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}%'
      },
      series: [
        {
          name: '生产进度',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: productionData.value
        }
      ]
    })
  }

  if (!qualityChart) {
    qualityChart = initChart(qualityChartEl, {
      title: {
        text: '质量统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}%'
      },
      series: [
        {
          name: '质量统计',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: qualityData.value
        }
      ]
    })
  }

  // 如果两个图表都初始化成功，重置尝试次数
  if (productionChart && qualityChart) {
    initAttempts = 0
  } else {
    // 如果有任何一个图表初始化失败，继续尝试
    initAttempts++
    setTimeout(initCharts, 100)
  }
}

// 处理窗口大小变化
const handleResize = () => {
  if (productionChart) {
    try {
      productionChart.resize()
    } catch (error) {
      console.error('生产图表调整大小失败:', error)
    }
  }
  if (qualityChart) {
    try {
      qualityChart.resize()
    } catch (error) {
      console.error('质量图表调整大小失败:', error)
    }
  }
}

onMounted(() => {
  // 延迟初始化图表，确保DOM已经渲染
  setTimeout(initCharts, 100)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (productionChart) {
    try {
      productionChart.dispose()
    } catch (error) {
      console.error('生产图表销毁失败:', error)
    }
    productionChart = null
  }
  if (qualityChart) {
    try {
      qualityChart.dispose()
    } catch (error) {
      console.error('质量图表销毁失败:', error)
    }
    qualityChart = null
  }
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.overview-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  text-align: center;
  padding: 20px 0;
}

.number {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}

.chart-row {
  margin-top: 20px;
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .el-col {
    width: 100% !important;
  }
}
</style> 