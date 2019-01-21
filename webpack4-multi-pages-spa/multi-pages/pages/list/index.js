import { getTopics, getLocalUser } from "@/assets/js/api";
import "@/assets/styles/reset.scss";
import "@/assets/styles/common.scss";
import "./index.scss";
async function render () {
  try {
    const data = await getTopics({ page: 1, limit: 20 });
    let li = "";
    data.forEach(item => {
      li += `<li class="item"><h1 class="title"><a href=/pages/detail.html?topcId=${item.id} class="item-link">${item.title}</a></h1><p class="sub-title">作者：${item.author.loginname}</p></li>`;
    });
    document.getElementById("ul").innerHTML = li;
  } catch (e) {
    console.log(e);
  }
}
render();
async function testLocalApi () {
  const user = await getLocalUser(1);
  console.log(user);
}
testLocalApi();
console.log("支付页面");
