<template>
  <div class="app-container">
    <p class="app-title">Tornado.Cash混币交易信息统计界面</p>
    <p></p>
    <!-- Search input -->
    <el-input v-model="searchAddress" placeholder="请输入地址" :maxlength="42" show-word-limit class="input-with-select" @keyup.enter.native="search">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="Ethereum" value="1" style="font-weight: bold; color: #909399;"></el-option>
        <el-option label="BNB" value="2" style="font-weight: bold; color: #909399;"></el-option>
        <el-option label="Matic" value="3" style="font-weight: bold; color: #909399;"></el-option>
        <el-option label="Optimism" value="4" style="font-weight: bold; color: #909399;"></el-option>
      </el-select>
      <!-- 输入长度限制组件 -->
      <el-button type="primary" slot="append" icon="el-icon-search" @click="fetchTransactionsData">搜索</el-button>
    </el-input>
    <!-- 显示错误信息 -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <!-- 显示错误消息 -->
    <div v-if="showError" class="error-message">错误：地址长度不正确</div>
    <!-- 空状态组件 -->
    <el-empty :image-size="200"></el-empty>
    <el-row :gutter="25">
      <!-- Left Column: Tornado.Cash Statistics Table span="12":body-style="{ padding: '0' }"-->
      <el-col :span="24">
        <el-card class="stats-card" :body-style="{ padding: '0' }">
          <el-table :data="tornadoStatsData" border style="width: 100%">
            <el-table-column
              prop="label"
              label="Tornado.Cash 统计"
              header-align="center"
              align="center">
            </el-table-column>
            <el-table-column
              prop="count"
              label="交易数量"
              header-align="center"
              align="center">
              <template slot-scope="scope">
                <div style="font-weight: bold; color: #000000; text-align: center;">{{ scope.row.count }}</div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- Loading the Results table -->
      <!-- Right Column: Time and ETH Amount Table -->
      <el-col :span="24">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="transactions"
          :border="borderOptions"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column prop="timeStamp" label="统计时间" header-align="center">
            <template slot-scope="scope">
              <div style="font-weight: bold; color: #909399; text-align: center;">{{ scope.row.timeStamp }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="加密资产(ETH)" header-align="center">
            <template slot-scope="scope">
              <div style="font-weight: bold; color: #000000; text-align: center;">{{ scope.row.value }}</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            :hide-on-single-page="value"
            :page-size="perPage"
            :current-page="currentPage"
            :total="totalRecords"
            @current-change="handleCurrentChange"
            background="backcolor"
            layout="prev, pager, next"
            v-show="page_total_size > 1">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .app-title {
    font-weight: bold;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #000000;
  }
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .error-message {
    /*ff0000*/
    color: #ed0b30;
    margin-top: 20px;
  }
  /* 全局样式 */
  .el-table th {
    font-weight: bold;
    color: #000000;
    background-color: #C0C4CC;
  }
  .app-container.highlight-row {
    background: #f0f9eb;
  }
</style>
<script>
import { GetTransCompute } from '@/api/user_transactions'

export default {
  data() {
    return {
      searchAddress: '',
      transactions: [],
      select: '1',
      perPage: 10,
      value: true,
      backcolor: true,
      page_total_size: 0,
      currentPage: 1, // 当前页码
      loading: false, // 控制加载状态的显示
      showError: false,
      borderColor: '#000', // 控制表格边框的颜色
      errorMessage: '', // 添加用于存储错误信息的属性
      tornadoStatsData: [],
      totalRecords: 0,
      isEmpty: false // 用于跟踪是否有搜索结果
    }
  },
  computed: {
    currentPageData() {
      // 计算当前页的数据
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.transactions.slice(start, end)
    },
    borderOptions() {
      return { h: `1px solid ${this.borderColor}`, v: `1px solid ${this.borderColor}` }
    }
  },
  // created() {
  //   this.fetchTransactionsData() // 静态组件自行触发
  // },
  methods: {
    fetchTransactionsData() {
      if (!this.searchAddress) {
        this.errorMessage = 'Warning：请输入账户地址' // 设置错误信息
        setTimeout(() => {
          this.errorMessage = ''
        }, 2000)
        return
      }
      this.errorMessage = '' // 清除错误信息
      // 检查地址长度
      if (this.searchAddress.length !== 42) {
        this.showError = true // 显示错误消息
        setTimeout(() => {
          this.showError = false
        }, 2000)
        return
      } else {
        this.showError = false // 隐藏错误消息
      }
      this.loading = true // 开始加载
      // this.currentPage = 1 // 重置当前页码
      GetTransCompute({
        address: this.searchAddress,
        page: this.currentPage,
        per_page: this.perPage
      }).then(response => {
        this.transactions = response.data.transactions
        this.tornadoStatsData = [
          { label: '存款交易数', count: response.data.deposit_count },
          { label: '提款交易数', count: response.data.withdrawal_count },
          { label: '存款账户数', count: '' },
          { label: '提款账户数', count: '' }
        ]
        this.isEmpty = this.transactions.length === 0
        /* 更新总页数 */
        this.totalRecords = response.data.total // Updated to match your backend response
        this.page_total_size = Math.ceil(this.totalRecords / this.perPage)


        // console.log("after change  data1 = ", this.transactions)
        // console.log("after change  data2 = ", this.currentPageData())
        // this.currentPageData = this.transactions


      }).catch(error => {
        console.error('Error fetching TornadoCash_Info status:', error)
      }).finally(() => {
        this.loading = false // 结束加载
      })
    },
    /* 表头数据高亮 */
    tableRowClassName({ rowIndex }) {
      // 如果是第一行（表头行），则添加高亮类
      if (rowIndex === 0) {
        return 'highlight-row' // 返回高亮类名
      }
      return '' // 其他行不添加特殊类名
    },
    /* 处理页面变化 */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.fetchTransactionsData()
    }
  }
}
</script>

