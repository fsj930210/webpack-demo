<template>
  <div class="table">
    <slot name="table-header" :searchForm="handleSearch" :resetForm="handleReset"></slot>
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
    params: Object,
    data: Array
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      tableData: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData (params) {
      params = { ...params, ...this.params }
      this.$emit('table-data', [{ name: 'aaaa' }, { name: 'bbb' }, { name: 'ccc' }])
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
      this.fetchData({ page: this.currentPage, pageSize: pageSize, ...this.params })
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.fetchData({ page: currentPage, pageSize: this.pageSize, ...this.params })
    },
    handleSearch (params) {
      console.log(params)
      this.fetchData({ page: 1, size: this.pageSize, ...params })
    },
    handleReset () {
      this.fetchData({ page: 1, pageSize: 10 })
    },
    refreshData () {
      this.tableDta = this.data
    },
    refreshDataAsync () {

    }
  }
}
</script>
<style>
  .table-box{
    margin-bottom: 20px;
  }
</style>
