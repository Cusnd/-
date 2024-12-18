<script setup>
import { ref } from 'vue'

const productionPlans = ref([
  {
    id: 1,
    model: 'Model S',
    target: 100,
    completed: 85,
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    status: '进行中'
  },
  {
    id: 2,
    model: 'Model 3',
    target: 150,
    completed: 150,
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    status: '已完成'
  }
])

const productionTasks = ref([
  {
    id: 1,
    name: '车身组装',
    model: 'Model S',
    worker: '张三',
    startTime: '09:00',
    endTime: '17:00',
    status: '进行中'
  },
  {
    id: 2,
    name: '内饰安装',
    model: 'Model 3',
    worker: '李四',
    startTime: '08:00',
    endTime: '16:00',
    status: '待开始'
  }
])

const qualityIssues = ref([
  {
    id: 1,
    type: '漆面瑕疵',
    model: 'Model S',
    severity: '中等',
    reportTime: '2023-12-10 10:30',
    status: '待处理'
  },
  {
    id: 2,
    type: '零件缺陷',
    model: 'Model 3',
    severity: '严重',
    reportTime: '2023-12-09 15:45',
    status: '已解决'
  }
])

const dialogVisible = ref(false)
const activeTab = ref('plans')
</script>

<template>
  <div class="production">
    <el-tabs v-model="activeTab" type="border-card">
      <!-- 生产计划 -->
      <el-tab-pane label="生产计划" name="plans">
        <div class="table-header">
          <h3>生产计划列表</h3>
          <el-button type="primary" @click="dialogVisible = true">
            新建计划
          </el-button>
        </div>
        <el-table :data="productionPlans" style="width: 100%">
          <el-table-column prop="model" label="车型" />
          <el-table-column prop="target" label="目标数量" />
          <el-table-column prop="completed" label="已完成" />
          <el-table-column prop="startDate" label="开始日期" />
          <el-table-column prop="endDate" label="结束日期" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default>
              <el-button type="text">编辑</el-button>
              <el-button type="text" class="delete-button">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 生产任务 -->
      <el-tab-pane label="生产任务" name="tasks">
        <el-table :data="productionTasks" style="width: 100%">
          <el-table-column prop="name" label="任务名称" />
          <el-table-column prop="model" label="车型" />
          <el-table-column prop="worker" label="负责人" />
          <el-table-column prop="startTime" label="开始时间" />
          <el-table-column prop="endTime" label="结束时间" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '进行中' ? 'primary' : 'info'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default>
              <el-button type="text">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 质量控制 -->
      <el-tab-pane label="质量控制" name="quality">
        <el-table :data="qualityIssues" style="width: 100%">
          <el-table-column prop="type" label="问题类型" />
          <el-table-column prop="model" label="车型" />
          <el-table-column prop="severity" label="严重程度">
            <template #default="scope">
              <el-tag :type="scope.row.severity === '严重' ? 'danger' : 'warning'">
                {{ scope.row.severity }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="reportTime" label="报告时间" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已解决' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default>
              <el-button type="text">处理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 新建计划对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="新建生产计划"
      width="50%"
    >
      <el-form label-width="100px">
        <el-form-item label="车型">
          <el-input />
        </el-form-item>
        <el-form-item label="目标数量">
          <el-input-number />
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.production {
  padding: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.delete-button {
  color: #F56C6C;
}

.el-tag {
  margin-right: 8px;
}

.dialog-footer {
  text-align: right;
}
</style> 