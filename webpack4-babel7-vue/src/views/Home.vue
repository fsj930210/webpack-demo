<template>
  <div>首页
  <r-table :api="api" @refreshData="refreshData" @table-data="getTableData">
    <template slot="table-header" slot-scope="props">
      <el-button type="primary" @click="props.searchForm({name: 'aaa'})">查询</el-button>
      <el-button type="primary" @click="props.resetForm()">重置</el-button>
    </template>
    <template>
      table
    </template>
  </r-table>
  </div>
</template>
<script>
import Table from '@/components/Table'
const api = function () {
  return Promise.resolve([{ name: 'aaaa' }, { name: 'bbb' }, { name: 'ccc' }])
}
export default {
  data () {
    return {
      api,
      ruleForm: {},
      tableData: []
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
    refreshData (data) {

    },
    getTableData (data) {
      this.tableData = data
    }
  },
  components: {
    'r-table': Table
  }
}
</script>
