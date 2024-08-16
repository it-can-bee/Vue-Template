<template>
  <div class="app-container">
    <p class="app-title">启发式规则Ⅴ-基于TokenType的混币账户去匿名化界面</p>
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
      <el-button type="primary" slot="append" icon="el-icon-search" @click="search">搜索</el-button>
    </el-input>
    <!-- 显示错误信息 -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <!-- 显示错误消息 -->
    <div v-if="showError" class="error-message">错误：地址长度不正确</div>
    <!-- Conditional Alert -->
    <el-alert
      v-if="showAlert"
      title="警告"
      type="error"
      description="这是隶属于同一真实世界实体的账户地址，请格外注意"
      show-icon>
    </el-alert>
    <!-- 危险系数评分组件 -->
    <el-rate
      v-model="dangerRating"
      v-if="showDangerRating"
      disabled
      show-score
      text-color="#ff9900"
      score-template="{value}">
    </el-rate>
    <!-- 空状态组件 -->
    <el-empty :image-size="200"></el-empty>
    <!-- Loading the Results table -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="currentPageData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column prop="associated_account" label="关联账户" header-align="center">
        <template slot-scope="scope" >
          <div style="font-weight: bold; color: #000000; text-align: center;">{{ scope.row.associated_account }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="HeuristicAssociateRuleNum" label="关联规则号" header-align="center">
        <template slot-scope="scope">
          <div style="font-weight: bold; color: #909399; text-align: center;">{{ scope.row.HeuristicAssociateRuleNum }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="asset_pool" label="资产池" header-align="center">
        <template slot-scope="scope" >
          <div style="font-weight: bold; color: #000000; text-align: center;">{{ scope.row.asset_pool }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="link_list" label="相同资产" header-align="center">
        <template slot-scope="scope">
          <div style="font-weight: bold; color: #909399; text-align: center;">{{ scope.row.link_list }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="value"
      :page-size="per_page_size"
      :total="transactions.length"
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
  .app-container.highlight-row {
    background: #f0f9eb;
  }
  /* 全局样式 */
  .el-table th {
    font-weight: bold;
    color: #000000;
    background-color: #C0C4CC;
  }

</style>

<script>
import { getAccountList } from '@/api/GetHeuristicRulesⅤ_TokenTypeLink'

export default {
  data: function() {
    return {
      searchAddress: '',
      transactions: [],
      select: '1',
      per_page_size: 5,
      value: true,
      backcolor: true,
      page_total_size: 0,
      currentPage: 1, // 当前页码
      showAlert: false, // 控制警告提示的显示
      loading: false, // 控制加载状态的显示
      dangerRating: 0,
      showDangerRating: false,
      showError: false,
      errorMessage: '', // 添加用于存储错误信息的属性
      isEmpty: false // 用于跟踪是否有搜索结果
    }
  },
  computed: {
    currentPageData() {
      // 计算当前页的数据
      const start = (this.currentPage - 1) * this.per_page_size
      const end = start + this.per_page_size
      return this.transactions.slice(start, end)
    }
  },
  methods: {
    search() {
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
      this.currentPage = 1 // 重置当前页码
      getAccountList({ address: this.searchAddress }).then(response => {
        this.transactions = response.data.transactions
        // 根据返回的数据更新 isEmpty
        this.isEmpty = this.transactions.length === 0
        /* 更新总页数 */
        this.page_total_size = Math.ceil(this.transactions.length / this.per_page_size)
        /* 根据关联账户数量更新 showAlert */
        // 根据搜索结果的数量显示危险系数评分
        this.showAlert = this.transactions.length > 5
        setTimeout(() => {
          this.showAlert = false
        }, 3000)
        if (this.transactions.length > 5) {
          this.dangerRating = 5 // 高危
          this.showDangerRating = true
          setTimeout(() => {
            this.showDangerRating = false
          }, 3000)
        } else {
          this.showDangerRating = false
        }
      }).catch(error => {
        console.error('Error during search:', error)
        this.showAlert = false // 搜索出错时不显示警告
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
    }
  }
}
</script>

<style>
  .error-message {
    color: #ed0b30;
    margin-top: 20px;
  }
  /*.el-table .success-row {*/
  /*  background: #f0f9eb;*/
  /*}*/

</style>

