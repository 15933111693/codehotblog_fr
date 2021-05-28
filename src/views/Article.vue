<template>
    <div class="article">
        <!-- 文章作者 -->
        <div class="author">
            <div class="left">
                <div class="avatar"><el-avatar :src="data.avatar"></el-avatar></div>
                <div class="author_introduce">
                    <div class="author_name">{{ data.username }}</div>
                    <div class="publish_time">{{`${new Date(data.timing).getFullYear()}年${new Date(data.timing).getMonth() + 1}月${new Date(data.timing).getDate()}日`}}</div>
                </div>
            </div>
            <!-- <div class="attention"><el-tag type="success" size="medium" effect="plain">关注</el-tag></div> -->
        </div>

        <!-- 文章视图 -->
        <div class="viewer">
          <c_viewer/>
        </div>
        

        <!-- 评论 -->
        <div class="comment">
          <!-- 我的评论 -->
          <div class="mycomment">
            <div class="mycomment_avatar"><el-avatar size="small"  :src="store.state.avatar"></el-avatar></div>
            <div class="mycomment_right">
              <div><el-input v-model="comment.val" placeholder="请输入内容" size="small"></el-input></div>
              <div class="mycomment_submit"><el-button @click="comment.submit" type="primary" size="small">评论</el-button></div>
            </div>
          </div>
          
          <!-- 其他人评论 -->
          <div class="othercomment">
            <c_reply v-for="i in data.commentList" :key="i._id" :obj="i"/>
          </div>
        </div>
    </div>
</template>

<script setup>
import c_viewer from '@/components/c_viewer.vue'
import c_reply from '@/components/c_reply'
import {getArticle_api} from "@/api/article"
import { useRoute } from 'vue-router'
import { provide, reactive, watch, ref } from 'vue'
import store from "@/store/index"
import {addComment_api} from "@/api/comment"
import {ElMessage} from "element-plus"

const data = reactive({title: '', titleImg: '', content: '', authorId: '', timing: 0, like: 0, likeList: [], commentList: []})
data.content = ref('')
provide("c-viewer", data)

const route = useRoute()
const getArticleInfo =  async (id) => {
  if(route.path === '/article') {
    const res = await getArticle_api(id)
    for(let i in res.data) {
      data[i] = res.data[i]
    }
  }
}
watch(() => route.query.id, getArticleInfo, {immediate: true})

// 评论
const comment = reactive({val: '', async submit() {
  if(comment.val === '') {
    ElMessage.error('请输入内容')
    return 
  }
  const res = await addComment_api(data._id, store.state._id, comment.val, new Date().getTime())
  if(res.code === 200) {
    const res1 = await getArticleInfo(route.query.id)
    comment.val = ''
  }
}})
</script>

<style scoped>
.article {
  width: 100%;
  min-height: 100%;
  height: auto;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.author {
  display: flex;
  justify-content: space-between;    
  padding: 20px;
}
.left {
  display: flex;
}
.author_introduce {
  padding-left: 10px;
}
.author_name {
  font-weight: 700;
  color: #333;
  font-size: 16px;
}
.publish_time {
  padding-top: 5px;
  color: #909090;
  font-size: 10px;
}
.attention {
  display: flex;
  align-items: center;
}
.comment {
  display: flex;
  flex-direction: column;
  width: auto;
  padding: 20px;
}
.mycomment {
  background: #fafbfc;
  display: flex;
  width: auto;
  padding: 20px;
}
.mycomment_avatar {
  padding: 0 10px;
}
.mycomment_right {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.mycomment_submit {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}

.othercomment {
  display: flex;
  flex-direction: column;
  padding: 10px 60px;
}

.viewer {
  padding: 20px;
}

@media (max-width:980px) {
  .othercomment {
    padding: 0;
  }
}
</style>
