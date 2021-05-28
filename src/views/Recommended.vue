<template>
  <div class="recommended">
    <!-- 我的评论 -->
    <div class="mycomment">
      <div class="mycomment_input">
        <el-input
          v-model="mycomment.val"
          type="textarea"
          :autosize="{ minRows: 8, maxRows: 8 }"
          resize="none"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="mycomment_submit">
        <el-button @click="mycomment.submit" type="primary" size="small"
          >发布</el-button
        >
      </div>
    </div>

    <!-- 其他人评论 -->
    <c_card v-for="i in data.val" :key="i._id" :recommend="i"/>
  </div>
</template>

<script setup>
import c_card from "@/components/c_card";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import {postComment, getAllComment_api} from "@/api/comment"
import store from "@/store/index"
// 拉取所有评论
const data = reactive({val: ref([])})
async function getAllComment() {
  const res = await getAllComment_api()
  data.val = ref(res.data)
}
getAllComment()

// 我的评论
const mycomment = reactive({
  val: "",
  submit: async function () {
    if (mycomment.val === "") {
      ElMessage.error("内容不可为空");
      return;
    }
    const res = await postComment(store.state._id, mycomment.val, new Date().getTime())
    if(res.code === 200) {
      await getAllComment()
      mycomment.val = ''
    }
  },
});

// 其他人评论

</script>


<style scoped>
.recommended {
  width: 100%;
  height: 100%;
}
.mycomment {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
}
.mycomment_input {
  padding-bottom: 10px;
}
.mycomment_submit {
  display: flex;
  justify-content: flex-end;
}
</style>