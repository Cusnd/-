<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const employees = ref([
  {
    id: 1,
    name: '张三',
    department: '生产部',
    position: '生产主管',
    phone: '13800138000',
    email: 'zhangsan@example.com',
    status: '在职',
    entryDate: '2022-01-01'
  },
  {
    id: 2,
    name: '李四',
    department: '质检部',
    position: '质检员',
    phone: '13800138001',
    email: 'lisi@example.com',
    status: '在职',
    entryDate: '2022-03-15'
  },
  {
    id: 3,
    name: '王五',
    department: '维修部',
    position: '设备维修工程师',
    phone: '13800138002',
    email: 'wangwu@example.com',
    status: '休假',
    entryDate: '2022-06-01'
  }
])

const schedules = ref([
  {
    id: 1,
    employeeName: '张三',
    department: '生产部',
    shift: '早班',
    startTime: '08:00',
    endTime: '16:00',
    date: '2023-12-11',
    status: '已排班'
  },
  {
    id: 2,
    employeeName: '李四',
    department: '质检部',
    shift: '中班',
    startTime: '16:00',
    endTime: '24:00',
    date: '2023-12-11',
    status: '已排班'
  }
])

const performances = ref([
  {
    id: 1,
    employeeName: '张三',
    department: '生产部',
    month: '2023-11',
    attendance: 22,
    completion: 95,
    quality: 98,
    score: 94,
    rank: 'A'
  },
  {
    id: 2,
    employeeName: '李四',
    department: '质检部',
    month: '2023-11',
    attendance: 21,
    completion: 90,
    quality: 96,
    score: 92,
    rank: 'A'
  }
])

const activeTab = ref('employees')

// 部门人员分布数据
const departmentData = [
  { value: 40, name: '生产部' },
  { value: 20, name: '质检部' },
  { value: 15, name: '维修部' },
  { value: 10, name: '仓储部' },
  { value: 15, name: '管理部' }
]

onMounted(() => {
  // 初始化部门分布图表
  const departmentChart = echarts.init(document.getElementById('departmentChart'))
  departmentChart.setOption({
    title: {
      text: '部门人员分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}人 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '部门分布',
        type: 'pie',
        radius: '50%',
        data: departmentData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
})

// 对话框控制
const dialogVisible = ref(false)
const dialogType = ref('')
</script>

<template>
  <div class="personnel">
    <!-- 部门分布图表 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <div id="departmentChart" style="height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 人员管理标签页 -->
    <el-tabs v-model="activeTab" type="border-card" class="personnel-tabs">
      <!-- 员工信息 -->
      <el-tab-pane label="员工信息" name="employees">
        <div class="table-header">
          <h3>员工列表</h3>
          <el-button type="primary" @click="dialogVisible = true; dialogType = 'employee'">
            添加员工
          </el-button>
        </div>
        <el-table :data="employees" style="width: 100%">
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="department" label="部门" />
          <el-table-column prop="position" label="职位" />
          <el-table-column prop="phone" label="电话" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '在职' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="entryDate" label="入职日期" />
          <el-table-column label="操作">
            <template #default>
              <el-button type="text">编辑</el-button>
              <el-button type="text">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 排班管理 -->
      <el-tab-pane label="排班管理" name="schedules">
        <div class="table-header">
          <h3>排班列表</h3>
          <el-button type="primary" @click="dialogVisible = true; dialogType = 'schedule'">
            新建排班
          </el-button>
        </div>
        <el-table :data="schedules" style="width: 100%">
          <el-table-column prop="employeeName" label="员工姓名" />
          <el-table-column prop="department" label="部门" />
          <el-table-column prop="shift" label="班次" />
          <el-table-column prop="startTime" label="开始时间" />
          <el-table-column prop="endTime" label="结束时间" />
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default>
              <el-button type="text">调整</el-button>
              <el-button type="text">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 绩效考核 -->
      <el-tab-pane label="绩效考核" name="performances">
        <div class="table-header">
          <h3>绩效列表</h3>
          <el-button type="primary" @click="dialogVisible = true; dialogType = 'performance'">
            添加考核
          </el-button>
        </div>
        <el-table :data="performances" style="width: 100%">
          <el-table-column prop="employeeName" label="员工姓名" />
          <el-table-column prop="department" label="部门" />
          <el-table-column prop="month" label="考核月份" />
          <el-table-column prop="attendance" label="出勤天数" />
          <el-table-column prop="completion" label="任务完成率">
            <template #default="scope">
              {{ scope.row.completion }}%
            </template>
          </el-table-column>
          <el-table-column prop="quality" label="质量达标率">
            <template #default="scope">
              {{ scope.row.quality }}%
            </template>
          </el-table-column>
          <el-table-column prop="score" label="总分" />
          <el-table-column prop="rank" label="等级">
            <template #default="scope">
              <el-tag :type="scope.row.rank === 'A' ? 'success' : 'warning'">
                {{ scope.row.rank }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default>
              <el-button type="text">详情</el-button>
              <el-button type="text">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 通用对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'employee' ? '添加员工' : dialogType === 'schedule' ? '新建排班' : '添加考核'"
      width="50%"
    >
      <el-form label-width="100px">
        <!-- 根据不同类型显示不同的表单内容 -->
        <template v-if="dialogType === 'employee'">
          <el-form-item label="姓名">
            <el-input />
          </el-form-item>
          <el-form-item label="部门">
            <el-select style="width: 100%">
              <el-option label="生产部" value="生产部" />
              <el-option label="质检部" value="质检部" />
              <el-option label="维修部" value="维修部" />
            </el-select>
          </el-form-item>
          <el-form-item label="职位">
            <el-input />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input />
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input />
          </el-form-item>
        </template>

        <template v-if="dialogType === 'schedule'">
          <el-form-item label="员工">
            <el-select style="width: 100%">
              <el-option
                v-for="emp in employees"
                :key="emp.id"
                :label="emp.name"
                :value="emp.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="班次">
            <el-select style="width: 100%">
              <el-option label="早班" value="早班" />
              <el-option label="中班" value="中班" />
              <el-option label="晚班" value="晚班" />
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker style="width: 100%" />
          </el-form-item>
        </template>

        <template v-if="dialogType === 'performance'">
          <el-form-item label="员工">
            <el-select style="width: 100%">
              <el-option
                v-for="emp in employees"
                :key="emp.id"
                :label="emp.name"
                :value="emp.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="考核月份">
            <el-date-picker type="month" style="width: 100%" />
          </el-form-item>
          <el-form-item label="出勤天数">
            <el-input-number :min="0" :max="31" />
          </el-form-item>
          <el-form-item label="任务完成率">
            <el-input-number :min="0" :max="100" />
          </el-form-item>
          <el-form-item label="质量达标率">
            <el-input-number :min="0" :max="100" />
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.personnel {
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

.personnel-tabs {
  margin-top: 20px;
}

.el-tag {
  margin-right: 8px;
}

.dialog-footer {
  text-align: right;
}
</style> 