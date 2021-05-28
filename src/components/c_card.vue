<template>
  <div class="c_card">
    <div class="card">
      <div class="card_item">
        <div class="card_avatar">
          <el-avatar
            :src="recommend.avatar"
          ></el-avatar>
          <div class="card_author">
            <div class="card_name">{{ recommend.username }}</div>
            <div class="card_time">{{ transdate(recommend.timing) }}</div>
          </div>
        </div>
        <div class="card_tag">
          <!-- <el-tag type="success" effect="plain">关注</el-tag> -->
        </div>
      </div>
      <div class="card_content">
        {{recommend.content}}
      </div>
      <div class="card_foot">
        <div style="cursor: pointer" @click="likeComment">{{ '赞' + ' ' + recommend.like }}</div>
        <div style="cursor: pointer" @click="comment.replyBtn">{{ `评论  ${recommend.re_commentList.length}` }}</div>
      </div>

      <!-- 其他人回复 -->
      <div class="c_reply" v-if="comment.visibale">
        <!-- 回复当前 -->
        <div class="othercomment_reply_myreply">
          <div><el-input v-model="comment.val" placeholder="输入评论"></el-input></div>
          <div class="othercomment_reply_myreply_btn">
            <el-button @click="comment.submit" type="primary" size="small">评论</el-button>
          </div>
        </div>

        <!-- 回复 -->
        <c_reply v-for="i in recomment.val" :key="i._id" :obj="i"/>
      </div>
    </div>
  </div>
</template>

<script>
import c_reply from "@/components/c_reply"
import { defineComponent, provide, reactive, watch } from "vue";
import { ElMessage } from 'element-plus'
import {transdate} from "@/util/index"
import store from "@/store/index"
import {addCommentLike_api, searchRecomment_api, replyComment_api} from "@/api/comment"

export default defineComponent({
  props: ['recommend'],
  components: {c_reply},
  setup(props) {
    // comment
    const comment = reactive({val: '', visibale: false, async submit(){
      if(comment.val === '') {
        ElMessage.error('请输入内容')
        return 
      }
      const res = await replyComment_api(store.state._id, comment.val, new Date().getTime(), recommend._id)
      if(res.code === 200) {
        await getAllRecomment()
        comment.val = ''
      }
    }, async replyBtn() {
      if(!comment.visibale) await getAllRecomment()
      comment.visibale = !comment.visibale
    }})
    // 点赞
    const likeComment = async function() {
      const res = await addCommentLike_api(recommend._id, store.state._id)
      if(res.code === 200) recommend.like++
    }

    // recommend
    const recommend = reactive(props.recommend)

    // recomment
    const recomment = reactive({val: []})
    const getAllRecomment = async function() {
      const res = await searchRecomment_api(recommend._id)
      if(res.code === 200) recomment.val = res.data
    }
    return {
      comment,
      recommend,
      transdate,
      likeComment,
      recomment
    }
  }
})

</script>


<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: white;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-bottom: 10px;
}
.card_item {
  display: flex;
  justify-content: space-between;
}
.card_item,
.card_content {
  padding: 10px 10px;
}
.card_avatar {
  display: flex;
}
.card_author {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}
.card_name {
  color: #2e3135;
  font-weight: 600;
}
.card_time {
  color: #8a9aa9;
}
.card_content {
  padding-left: 40px;
}
.card_foot {
  display: flex;
  margin-top: 10px;
}
.card_foot > div {
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 10px 10px;
}
.othercomment_reply_myreply {
  padding: 10px 45px 0;
  background: #fafbfc;
}
.othercomment_reply_myreply_btn {
  padding: 5px 0;
  display: flex;
  justify-content: flex-end;
}
</style>