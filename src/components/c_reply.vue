<template>
  <div class="c_reply">
    <!-- 回复当前 -->
    <div class="othercomment_reply">
      <div class="othercomment_reply_user">
        <div class="othercomment_reply_avatar">
          <el-avatar
            size="small"
            :src="data.avatar"
          ></el-avatar>
        </div>
        <div class="othercomment_reply_username">{{ data.username }}</div>
      </div>
      <div class="othercomment_reply_content">{{ data.content }}</div>
      <div class="othercomment_reply_bottom">
        <div>{{ transdate(data.timing) }}</div>
        <div @click="replyInput.visibale = !replyInput.visibale">回复</div>
      </div>
      <div v-if="replyInput.visibale" class="othercomment_reply_bottom_input">
        <div><el-input v-model="replyInput.val" :placeholder="`回复:${data.username}`"></el-input></div>
        <div class="othercomment_reply_bottom_input_submit">
          <el-button @click="replyInput.submit" type="primary" size="small">回复</el-button>
        </div>
      </div>

      <!-- 回复的回复 -->
      <c_reply_reply v-for="i in data.re_commentList" :key="i._id" :obj="i"/>
    </div>
  </div>
</template>

<script>
import c_reply_reply from "@/components/c_reply_reply"
import { defineComponent, provide, reactive } from "vue"
import {transdate} from "@/util/index"
import { ElMessage } from 'element-plus'
import {getReply_api, replyComment_api} from "@/api/comment"
import store from "@/store/index"

export default defineComponent({
  props: ['obj'],
  components: {c_reply_reply},
  setup(props) {
    // re_commentList content authorId timing like likeList 
    const data = reactive(props.obj)
    const replyInput = reactive({val: '', async submit() {
      if(replyInput.val === '') {
        ElMessage.error('请输入内容')
        return 
      }
      const res = await replyComment_api(store.state._id, replyInput.val, new Date().getTime(), data._id)
      if(res.code === 200) {
        const res1 = await getRecomment()
        if(res1.code === 200) {
          replyInput.val = ''
          replyInput.visibale = false
        }
      }
    }, visibale: false})

    const getRecomment = async function() {
      const res = await getReply_api(data._id)
      data.re_commentList = res.data
      return res
    }
    // ;(async () => getRecomment())();
    provide('regetList', getRecomment)
    return {
      replyInput,
      data,
      transdate
    }
  }
})

</script>


<style scoped>
.c_reply {
  width: 100%;
  height: 100%;
}
.othercomment_reply {
  /* background: #fafbfc; */
  height: auto;
  margin-left: 45px;
  margin-top: 10px;
  font-size: 15px;
}
.othercomment_reply_user {
  display: flex;
  padding: 10px;
}
.othercomment_reply_username {
  padding-left: 10px;
}
.othercomment_reply_content {
  padding: 5px 45px;
  font-size: 15px;
  white-space: pre-wrap;
}
.othercomment_reply_bottom {
  color: #8a9aa9;
  font-size: 12px;
  padding-left: 45px;
  padding-right: 45px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.othercomment_reply_bottom_input {
  padding-left: 45px;
  padding-right: 45px;
  padding-bottom: 10px;
}
.othercomment_reply_bottom_input_submit {
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
}
</style>