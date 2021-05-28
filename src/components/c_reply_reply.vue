<template>
    <div class="othercomment_reply_reply">
        <div class="othercomment_reply_reply_user">
          <div class="othercomment_reply_reply_avatar">
            <el-avatar
              size="small"
              :src="data.avatar"
            ></el-avatar>
          </div>
          <div class="othercomment_reply_reply_username">{{data.username}}</div>
        </div>
        <div class="othercomment_reply_reply_content">{{`回复 ${data.recommentAuthor} : ${data.content}`}}</div>
        <div class="othercomment_reply_reply_bottom">
          <div>{{ transdate(data.timing) }}</div>
          <div @click="replyInput.visibale = !replyInput.visibale">回复</div>
        </div>
        <div v-if="replyInput.visibale" class="othercomment_reply_reply_bottom_input">
          <div><el-input v-model="replyInput.val" :placeholder="`回复:${data.username}`"></el-input></div>
          <div class="othercomment_reply_reply_bottom_input_submit">
            <el-button @click="replyInput.submit" type="primary" size="small">回复</el-button>
          </div>
        </div>
      </div>
</template>

<script>
import {defineComponent, inject, reactive, ref} from 'vue'
import {transdate} from "@/util/index"
import { ElMessage } from 'element-plus'
import store from "@/store/index"
import {getReply_api, replyComment_api} from "@/api/comment"

export default defineComponent({
  props: ["obj"],
  setup(props) {
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

    const getRecomment = inject('regetList')
    getRecomment()
    return {
      replyInput,
      data,
      transdate
    }
  }
})

</script>

<style scoped>
.othercomment_reply_reply {
  margin-left: 45px;
  margin-right: 45px;
  padding: 10px;
  background: #fafbfc;
}
.othercomment_reply_reply_user {
  display: flex;
}
.othercomment_reply_reply_username {
  padding-left: 10px;
}
.othercomment_reply_reply_content {
  padding: 5px 40px;
}
.othercomment_reply_reply_bottom {
  color: #8a9aa9;
  font-size: 12px;
  padding-left: 40px;
  display: flex;
  justify-content: space-between;
}
.othercomment_reply_reply_bottom_input {
  padding-top: 10px;
  padding-left: 40px;
}
.othercomment_reply_reply_bottom_input_submit {
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
}
</style>