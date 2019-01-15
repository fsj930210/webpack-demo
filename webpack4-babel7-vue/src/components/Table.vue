<template>
  <div class="table">
    <div class="table-header">
      <slot name="table-header" :searchForm="handleSearch"></slot>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <slot></slot>
       </el-table>
    </div>
  <div class="pagination-box" v-if="showPagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 25, 50, 75, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</div>
</template>
<script>
export default {
  props: {
    showPagination: {
      default: true
    },
    api: Function,
    initParams: Object,
    prefix: {
      required: true,
      default: ''
    }
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      params: {}
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    this.$on(`${this.prefix}-reload-table-data`, () => {
      this.fetchData({ page: 1, limit: 10 })
    })
    this.$on(`${this.prefix}-refresh-table-data`, () => {
      this.fetchData({ page: this.currentPage, limit: this.pageSize, ...this.params })
    })
  },
  destroyed () {
    this.$off(`${this.prefix}-reload-table-data`)
    this.$off(`${this.prefix}-refresh-table-data`)
  },
  methods: {
    async fetchData (params = { page: this.currentPage, limit: this.pageSize }) {
      params = { ...params, ...this.initParams }
      try {
        const data = await this.api(params)
        this.tableData = data
      } catch (e) {
        console.log(e)
      } finally {
        console.log('complete')
      }
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.fetchData({ page: this.currentPage, limit: pageSize, ...this.params })
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.fetchData({ page: currentPage, limit: this.pageSize, ...this.params })
    },
    handleSearch (params) {
      this.params = params
      this.currentPage = 1
      this.fetchData({ page: 1, limit: this.pageSize, ...params })
    }
  }
}
</script>
<style>
  .table-header{
    margin: 20px auto;
  }
  .table-box{
    margin: 20px auto;
  }
</style>
