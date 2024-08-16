<!--<template>-->
<!--  <div class="app-container">-->
<!--    混币交易查询界面-->
<!--    <p></p>-->

<!--    <el-input placeholder="请输入地址" v-model="addr_input" class="input-with-select">-->
<!--      <el-select v-model="select" slot="prepend" placeholder="请选择">-->
<!--        <el-option label="以太坊" value="1"></el-option>-->
<!--        <el-option label="以太坊2" value="2"></el-option>-->
<!--      </el-select>-->
<!--      <el-button slot="append" icon="el-icon-search" @click="search_btn_clk"></el-button>-->
<!--    </el-input>-->


<!--    <el-table-->
<!--      :data="tableData"-->
<!--      style="width: 100%">-->

<!--      <el-table-column-->
<!--        prop="hash"-->
<!--        label="交易哈希"-->
<!--        width="180">-->
<!--      </el-table-column>-->

<!--      <el-table-column-->
<!--        prop="date"-->
<!--        label="交易时间"-->
<!--        width="180">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="value"-->
<!--        label="资金额"-->
<!--        width="180">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="action"-->
<!--        label="交易行为">-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--    <el-pagination-->
<!--      @current-change="handleCurrentChange"-->
<!--      background-->
<!--      layout="prev, pager, next"-->
<!--      :page-size="per_page_size"-->
<!--      :total="page_total_size">-->
<!--    </el-pagination>-->
<template>
  <div class="app-container">
    <p class="app-title">混币交易查询界面</p>
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
    <!-- Loading the Results table -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="transactions"
      :border="borderOptions"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column prop="hash" label="交易哈希" header-align="center">
        <template slot-scope="scope" >
          <div style="white-space: pre-wrap; font-weight: bold; color: #909399; text-align: center;">{{ scope.row.hash }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="timeStamp" label="交易时间" header-align="center">
        <template slot-scope="scope">
          <div style="font-weight: bold; color: #909399; text-align: center;">{{ scope.row.timeStamp }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="资金额" header-align="center">
        <template slot-scope="scope">
          <div style="font-weight: bold; color: #000000; text-align: center;">{{ scope.row.value }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="flag" label="交易行为" header-align="center">
        <template slot-scope="scope">
          <div style="font-weight: bold; color: #000000; text-align: center;">{{ scope.row.flag }}</div>
        </template>
      </el-table-column>
    </el-table>
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
</template>

<style>
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
    /* Adjust the styles based on your layout needs */
  }
  .error-message {
    /*ff0000*/
    color: #ed0b30;
    margin-top: 20px;
  }
  .app-container.highlight-row {
    background: #f0f9eb;
  }
</style>
<script>
import { fetchTransactions } from '@/api/query'

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
      fetchTransactions({
        address: this.searchAddress,
        page: this.currentPage,
        per_page: this.perPage
      }).then(response => {
        this.transactions = response.data.transactions
        this.isEmpty = this.transactions.length === 0
        /* 更新总页数 */
        this.totalRecords = response.data.total // Updated to match your backend response
        this.page_total_size = Math.ceil(this.totalRecords / this.perPage)
      }).catch(error => {
        console.error('Error fetching transactions:', error)
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
