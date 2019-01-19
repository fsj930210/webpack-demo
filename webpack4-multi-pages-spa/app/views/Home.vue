<template>
  <div>首页
    <r-table :api="api" prefix="topicList">
      <template slot="table-header" slot-scope="props">
        <el-form :inline="true" :model="tableForm" class="demo-form-inline" ref="tableForm">
          <el-form-item label="是否渲染所有的markdown" prop="mdrender">
            <el-select v-model="tableForm.mdrender" placeholder="是否渲染所有的markdown">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属标签" prop="tab">
            <el-select v-model="tableForm.tab" placeholder="请选择所属标签">
              <el-option label="问答" value="ask"></el-option>
              <el-option label="分享" value="share"></el-option>
              <el-option label="招聘" value="jod"></el-option>
              <el-option label="精华" value="good"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="props.searchForm(tableForm)">查询</el-button>
            <el-button type="primary" @click="resetForm("tableForm")">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template>
        <el-table-column label="作者" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.author.loginname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="top" label="是否置顶" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.top ? "是" : "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reply_count" label="回复数" width="180"></el-table-column>
        <el-table-column prop="visit_count" label="访问次数" width="180"></el-table-column>
        <el-table-column prop="create_at" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="last_reply_at" label="最后回复时间" width="180"></el-table-column>
        <el-table-column prop="tab" label="所属标签" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <router-link :to="`/topic/${scope.row.id}`">详情</router-link>
          </template>
        </el-table-column>
      </template>
    </r-table>
  </div>
</template>
<script>
import Table from "@/components/Table";
import { getTopics } from "api";
export default {
  name: "Home",
  data () {
    return {
      api: getTopics,
      tableForm: {
        tab: "",
        mdrender: ""
      }
    };
  },
  mounted () {},
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.$emit("topicList-reload-table-data");
    }
  },
  components: {
    "r-table": Table
  }
};

</script>
