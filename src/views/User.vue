<template>
    <div class="user">
        <div class="user_info">
            <div class="user_info_avatar"><el-avatar :size="90" :src="store.state.avatar"></el-avatar></div>
            <div class="user_info_name"><h1>{{ store.state.username }}</h1></div>
            <div v-if="isMine.val" class="user_info_edit"><el-button @click="router.push('./userEdit')" type="primary" plain>编辑个人资料</el-button></div>
        </div>
        <div class="user_msg">
          <div class="user_mag_nav">
            <el-menu :default-active="list.state" active-text-color="#3780f7" mode="horizontal" @select="handleSelect">
              <el-menu-item :index="list.navlist[0]">文章</el-menu-item>
              <el-menu-item :index="list.navlist[1]">吐槽</el-menu-item>
            </el-menu>
          </div>

          <div class="user_msg_list">
            <c_list v-for="i in list.article" :articleInfo="i" :key="i._id" v-if="list.state === 'article'"/>
            <c_card v-for="i in list.comment" :key="i._id" :recommend="i" v-if="list.state === 'comment'"/>
          </div>
        </div>
    </div>
</template>

<script setup>
import c_list from "@/components/c_list"
import c_card from "@/components/c_card"
import { useRoute, useRouter } from "vue-router"
import store from "@/store/index"
import { reactive, watch } from "vue"
import {getArticleList_api, getMyComment} from "@/api/user"

const router = useRouter()
const route = useRoute()

// ismine
const isMine = reactive({val: (store.state.isLogin) && (store.state._id === route.query.id)})
watch(store.state, (val) => {
  if(store.state.isLogin === false) {
    isMine.val = false
  }
  else {
    if(store.state._id === route.query.id) isMine.val = true
    else isMine.val = false
  }
})

// list
const list = reactive({state: 'article', article: [], comment: [], navlist: ['article', 'comment'], hash: {
    async article() {
      const res = await getArticleList_api(store.state._id)
      list.article = res
    },
    async comment() {
      const res = await getMyComment(store.state._id)
      if(res.code === 200) list.comment = res.data
    } 
}});
watch(() => list.state, async () => await list.hash[list.state](), {immediate: true});
const handleSelect = async function(e) {
  list.state = e
}

</script>

<style scoped>
.user {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.user_info, .user_msg{
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 20px;
}
.user_info_name {
  padding: 10px;
}
.user_info_avatar, .user_info_name {
  float: left;
}
.user_info_edit {
  float: right;
}
.user_msg {
  margin-top: 20px;
  padding: 0;
}
.el-menu-item {
  font-size: 15px;
  font-weight: 500;
}
.user_msg_list {
  background: #E9EEF3;
}
</style>