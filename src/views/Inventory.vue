<script setup>
import { ref } from 'vue'
import * as echarts from 'echarts'
import { onMounted } from 'vue'

const materials = ref([
  {
    id: 1,
    name: '钢材',
    type: '原材料',
    quantity: 1000,
    unit: 'kg',
    status: '充足',
    lastUpdate: '2023-12-10'
  },
  {
    id: 2,
    name: '轮胎',
    type: '零件',
    quantity: 400,
    unit: '个',
    status: '警告',
    lastUpdate: '2023-12-09'
  },
  {
    id: 3,
    name: '电池组',
    type: '核心部件',
    quantity: 50,
    unit: '组',
    status: '紧缺',
    lastUpdate: '2023-12-08'
  }
])

const products = ref([
  {
    id: 1,
    model: 'Model S',
    quantity: 30,
    status: '在库',
    productionDate: '2023-12-01',
    location: 'A区-01'
  },
  {
    id: 2,
    model: 'Model 3',
    quantity: 25,
    status: '待检',
    productionDate: '2023-12-05',
    location: 'B区-02'
  }
])

const activeTab = ref('materials')

// 库存趋势数据
const inventoryTrend = {
  dates: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07'],
  materials: [1200, 1150, 1100, 1000, 950, 1000, 1000],
  products: [20, 25, 28, 30, 35, 32, 30]
}

onMounted(() => {
  // 初始化库存趋势图表
  const trendChart = echarts.init(document.getElementById('inventoryTrendChart'))
  trendChart.setOption({
    title: {
      text: '库存趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['原材料', '成品'],
      top: 30
    },
    xAxis: {
      type: 'category',
      data: inventoryTrend.dates
    },
    yAxis: [
      {
        type: 'value',
        name: '原材料 (kg)',
        position: 'left'
      },
      {
        type: 'value',
        name: '成品 (台)',
        position: 'right'
      }
    ],
    series: [
      {
        name: '原材料',
        type: 'line',
        data: inventoryTrend.materials,
        yAxisIndex: 0
      },
      {
        name: '成品',
        type: 'line',
        data: inventoryTrend.products,
        yAxisIndex: 1
      }
    ]
  })
})
</script>

<template>
  <div class="inventory">
    <!-- 库存概览图表 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <div id="inventoryTrendChart" style="height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 库存管理标签页 -->
    <el-tabs v-model="activeTab" type="border-card" class="inventory-tabs">
      <!-- 原材料库存 -->
      <el-tab-pane label="原材料库存" name="materials">
        <div class="table-header">
          <h3>原材料库存列表</h3>
          <el-button type="primary">入库登记</el-button>
        </div>
        <el-table :data="materials" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="quantity" label="数量">
            <template #default="scope">
              {{ scope.row.quantity }} {{ scope.row.unit }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag
                :type="
                  scope.row.status === '充足'
                    ? 'success'
                    : scope.row.status === '警告'
                    ? 'warning'
                    : 'danger'
                "
              >
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdate" label="最后更新" />
          <el-table-column label="操作">
            <template #default>
              <el-button type="text">出库</el-button>
              <el-button type="text">调整</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 成品库存 -->
      <el-tab-pane label="成品库存" name="products">
        <div class="table-header">
          <h3>成品库存列表</h3>
          <el-button type="primary">入库登记</el-button>
        </div>
        <el-table :data="products" style="width: 100%">
          <el-table-column prop="model" label="型号" />
          <el-table-column prop="quantity" label="数量" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '在库' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="productionDate" label="生产日期" />
          <el-table-column prop="location" label="库位" />
          <el-table-column label="操作">
            <template #default>
              <el-button type="text">出库</el-button>
              <el-button type="text">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.inventory {
  padding: 20px;
}

.chart-row {
  margin-bottom: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.inventory-tabs {
  margin-top: 20px;
}

.el-tag {
  margin-right: 8px;
}
</style> 