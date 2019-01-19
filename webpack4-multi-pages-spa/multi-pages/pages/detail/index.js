import { getTopicById } from "@/assets/js/api";
import { getQuery } from "@/assets/js/utils";
import "@/assets/styles/reset.scss";
import "@/assets/styles/common.scss";
import "./index.scss";

async function render () {
  try {
    const data = await getTopicById(getQuery("topcId"));
    document.getElementById("title").innerHTML = data.title;
    document.getElementById("sub-title").innerHTML = `作者：${data.author.loginname}`;
    document.getElementById("content").innerHTML = data.content;
  } catch (e) {
    console.log(e);
  }
}
render();

console.log("详情页面");
