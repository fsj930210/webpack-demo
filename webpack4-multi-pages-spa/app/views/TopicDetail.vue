<template>
  <div class="topic-detail">
    <h1 class="title">{{data.title}}</h1>
    <main class="main" v-html="data.content"></main>
  </div>
</template>
<script>
import { getTopicById } from "api";
export default {
  name: "topicDetail",
  data () {
    return {
      data: {}
    };
  },
  async created () {
    try {
      this.data = await getTopicById(this.$route.params.topicId);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }
};
</script>
<style>
.main{
  padding: 0;
  max-width: 750px;
  margin: 0 auto;
}
</style>
