<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const equipments = ref([
  {
    id: 1,
    name: '焊接机器人',
    type: '机械臂',
    status: '运行中',
    runtime: '1200',
    lastMaintenance: '2023-12-01',
    nextMaintenance: '2023-12-31',
    location: 'A区-01'
  },
  {
    id: 2,
    name: '喷漆设备',
    type: '喷涂设备',
    status: '维护中',
    runtime: '800',
    lastMaintenance: '2023-12-05',
    nextMaintenance: '2023-12-20',
    location: 'B区-02'
  },
  {
    id: 3,
    name: '装配线',
    type: '生产线',
    status: '故障',
    runtime: '2000',
    lastMaintenance: '2023-11-15',
    nextMaintenance: '2023-12-15',
    location: 'C区-01'
  }
])

const maintenancePlans = ref([
  {
    id: 1,
    equipmentName: '焊接机器人',
    type: '定期保养',
    planDate: '2023-12-31',
    duration: '4小时',
    status: '待执行',
    maintainer: '张工'
  },
  {
    id: 2,
    equipmentName: '喷漆设备',
    type: '维修',
    planDate: '2023-12-20',
    duration: '2小时',
    status: '进行中',
    maintainer: '李工'
  }
])

const faults = ref([
  {
    id: 1,
    equipmentName: '装配线',
    type: '电路故障',
    reportTime: '2023-12-10 09:30',
    severity: '严重',
    status: '待处理',
    handler: '王工'
  },
  {
    id: 2,
    equipmentName: '焊接机器人',
    type: '传感器异常',
    reportTime: '2023-12-09 14:20',
    severity: '一般',
    status: '已解决',
    handler: '张工'
  }
])

const activeTab = ref('equipment')

// 设备状态统计数据
const statusData = [
  { value: 60, name: '运行中' },
  { value: 20, name: '维护中' },
  { value: 15, name: '待机' },
  { value: 5, name: '故障' }
]

onMounted(() => {
  // 初始化设备状态图表
  const statusChart = echarts.init(document.getElementById('equipmentStatusChart'))
  statusChart.setOption({
    title: {
      text: '设备状态分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}%'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: '设备状态',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
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
        data: statusData
      }
    ]
  })
})
</script>

<template>
  <div class="equipment">
    <!-- 状态概览 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <div id="equipmentStatusChart" style="height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 设备管理标签页 -->
    <el-tabs v-model="activeTab" type="border-card" class="equipment-tabs">
      <!-- 设备列表 -->
      <el-tab-pane label="设备列表" name="equipment">
        <div class="table-header">
          <h3>设备列表</h3>
          <el-button type="primary">添加设备</el-button>
        </div>
        <el-table :data="equipments" style="width: 100%">
          <el-table-column prop="name" label="设备名称" />
          <el-table-column prop="type" label="设备类型" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag
                :type="
                  scope.row.status === '运行中'
                    ? 'success'
                    : scope.row.status === '维护中'
                    ? 'warning'
                    : 'danger'
                "
              >
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="runtime" label="运行时间(h)" />
          <el-table-column prop="lastMaintenance" label="上次维护" />
          <el-table-column prop="nextMaintenance" label="下次维护" />
          <el-table-column prop="location" label="位置" />
          <el-table-column label="操作">
            <template #default>
              <el-button type="text">详情</el-button>
              <el-button type="text">维护记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 维护计划 -->
      <el-tab-pane label="维护计划" name="maintenance">
        <div class="table-header">
          <h3>维护计划列表</h3>
          <el-button type="primary">新建计划</el-button>
        </div>
        <el-table :data="maintenancePlans" style="width: 100%">
          <el-table-column prop="equipmentName" label="设备名称" />
          <el-table-column prop="type" label="维护类型" />
          <el-table-column prop="planDate" label="计划日期" />
          <el-table-column prop="duration" label="预计时长" />
          <el-table-column prop="maintainer" label="维护人员" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '待执行' ? 'info' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 故障处理 -->
      <el-tab-pane label="故障处理" name="faults">
        <div class="table-header">
          <h3>故障记录列表</h3>
          <el-button type="primary">报告故障</el-button>
        </div>
        <el-table :data="faults" style="width: 100%">
          <el-table-column prop="equipmentName" label="设备名称" />
          <el-table-column prop="type" label="故障类型" />
          <el-table-column prop="reportTime" label="报告时间" />
          <el-table-column prop="severity" label="严重程度">
            <template #default="scope">
              <el-tag :type="scope.row.severity === '严重' ? 'danger' : 'warning'">
                {{ scope.row.severity }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="handler" label="处理人" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已解决' ? 'success' : 'danger'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="text" v-if="scope.row.status !== '已解决'">
                处理
              </el-button>
              <el-button type="text">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.equipment {
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

.equipment-tabs {
  margin-top: 20px;
}

.el-tag {
  margin-right: 8px;
}
</style> 