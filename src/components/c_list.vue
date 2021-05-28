<template>
  <div class="list">
    <div class="card">
      <div class="card_main">
        <div class="left">
          <div class="author">{{`${data.username} · ${transdate(data.timing)}`}}</div>
          <div style="cursor: pointer" @click="router.push(`/article?id=${data._id}`)" class="item">{{ data.title }}</div>
          <div class="tag">
            <el-tag @click="data.addlike" size="medium" effect="plain"  type="info"> 点赞  {{data.like}} </el-tag>
            <el-tag size="medium" effect="plain"  type="info"> <i class="el-icon-chat-square"></i> {{data.commentList ? data.commentList.length : ""}} </el-tag>
          </div>
        </div>

        <div class="right">
          <el-image
            style="width: 60px; height: 60px"
            :src="data.titleImg"
            fit="fill"
          ></el-image>
        </div>
      </div>
      <div class="card_line"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import {transdate} from "@/util/index"
import {articleAddlike_api} from "@/api/user"
import { useRouter } from 'vue-router'
import store from "@/store/index"
export default defineComponent({
  props: ['articleInfo'],
  setup(props) {
    let {_id, like, timing, title, titleImg, username, authorId, commentList} = props.articleInfo
    const addlike = async function() {
      const res = await articleAddlike_api(_id, store.state._id)
      if(res.code === 200) data.like += 1
    }

    const router = useRouter()
    const data = reactive({
      _id,
      like,
      timing,
      title,
      titleImg,
      username,
      authorId,
      commentList,
      addlike,
    })
    return {
      data,
      transdate,
      router
    }
  },
})
</script>



<style scoped>
.card {
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.card_main {
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
}
.card_line {
    width: 100%;
    height: 0;
    border-top: 1px solid #eee;
}
.left {
  display: flex;
  flex-direction: column;
}
.author {
    color: #b2bac2;
    font-size: 12px;
}
.item {
    color: #2e3135;
    margin: 11px 0 15px;
    font-size: 20px;
    line-height: 20px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.right {
    display: flex;
    align-items: center;
}
.el-tag {
    border-radius: 0;
    cursor: pointer;
}
.el-tag:hover {
    background-color: rgba(238, 238, 238, 0.5);
}
@media (max-width:980px) {
.right {
  display: none;
}
}
</style>