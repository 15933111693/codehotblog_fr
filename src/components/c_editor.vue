<template>
  <div class="editor">
    <div class="title">
      <div>
        <el-input placeholder="请输入标题" v-model="title.val">
          <template #append>
            <el-upload
              :http-request="uploadTitleImg"
              :multiple="false"
              :show-file-list="false"
              :on-remove="() => title.img = ''"
            >
              <img width="30" height="30" v-if="title.img" :src="title.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </template>
        </el-input>
      </div>
    </div>
    <div class="target" ref="target"></div>
    <div class="submit">
      <el-button @click="submit" type="primary">发布</el-button>
    </div>
  </div>
</template>

<script setup>
import { Editor, Viewer } from "bytemd";
import "bytemd/dist/index.min.css";
import gfm from "@bytemd/plugin-gfm";
import mediumZoom from '@bytemd/plugin-medium-zoom';
import zh_cn from 'bytemd/lib/locales/zh_Hans.json'
import { ref, onMounted, reactive } from "vue";
import uploadImg from '@/api/uploadImg'
import {ElMessage} from 'element-plus'
import {publish_api} from '@/api/publishArticle'
import store from '@/store/index'
import { useRouter } from "vue-router";

const router = useRouter()
const plugins = [
  gfm(),
  mediumZoom()
];
// title
const title = reactive({val:"", img: ""})
const uploadTitleImg = async function(e) {
  const data = new FormData()
  data.append('file', e.file)
  const res = await uploadImg(data)
  title.img = res.url
}
const submit = async function() {
  if(title.val === '') {
    ElMessage.warning({
      message: '标题不可为空',
      type: 'warning'
    })
    return
  }
  // title, titleImg, content, authorId, timing
  const data = {
    title: title.val,
    titleImg: title.img,
    content: editor.$$.ctx[19],
    authorId: store.state._id,
    timing: new Date().getTime(),
    username: store.state.username,
  }
  const res = await publish_api(data)
  if(res.code === 200) {
    router.push(`/user?id=${store.state._id}`)
  }
}

// 编辑器
const target = ref(null);
let editor
onMounted(() => {
  editor = new Editor({
    target: target.value, // DOM to render
    props: {
      value: "",
      plugins,
      locale: zh_cn,
      // 上传图片
      uploadImages: async (e) => {
        const data = new FormData()
        data.append('file', e[0])
        const res = await uploadImg(data)
        return [{url: res.url, alt: res.originalname}]
      }
    },
  });
  // console.log(editor);
  editor.$on("change", (e) => {
    editor.$set({ value: e.detail.value });
  });
});
</script>


<style scoped>
.bytemd {
  height: calc(100vh - 200px);
}
.title {
  padding: 10px 0;
}
.submit {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
</style>