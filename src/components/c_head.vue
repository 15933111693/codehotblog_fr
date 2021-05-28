<template>
  <div class="c_head">
    <div class="img">
      <img
        class="pc_img"
        src="https://sf6-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/logo.a7995ad.svg"
        alt=""
      />
      <img
        class="mobile_img"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQ1cHgiIGhlaWdodD0iMzhweCIgdmlld0JveD0iMCAwIDQ1IDM4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPkp1ZWppbjwvdGl0bGU+CiAgICA8ZGVzYz5KdWVqaW4uY248L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iMC4xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAtMTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCA1LjAwMDAwMCkiIGZpbGw9IiMwMDZDRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMjEuMjkzNDMyOCwyLjU4MzEzMDQ5IEwxOC4wMTczOTg0LDAgTDE0LjU5NDYyNCwyLjY5ODg3ODAxIEwxNC40MTcyMDc3LDIuODQxODIzMDQgTDE4LjAxNzM5ODQsNS43MTI0MjQ4MyBMMjEuNjI4NjU3OCwyLjg0MTgyMzA0IEwyMS4yOTM0MzI4LDIuNTgzMTMwNDkgWiBNMzMuNzA3ODI4OSwxMi42MDA2Njc0IEwxOC4wMDc5MTA5LDI0Ljk4MDI3NiBMMi4zMTc0ODA0NCwxMi42MDgyNTc0IEwwLDE0LjQ2OTcwNTIgTDE4LjAwNzkxMDksMjguNjY5MDE2NyBMMzYuMDI1NjI1NiwxNC40NjIxMTUyIEwzMy43MDc4Mjg5LDEyLjYwMDY2NzQgWiBNMTguMDA3OTEwOSwxMy42MDUwNzc2IEw5LjQ2NDQxNTU0LDYuODY4NjM1MDUgTDcuMTQ2NjE4ODUsOC43MzAwODI5IEwxOC4wMDc5MTA5LDE3LjI5NDEzNDUgTDI4Ljg3ODM3NDIsOC43MjI0OTI5IEwyNi41NjA1Nzc1LDYuODYxMDQ1MDUgTDE4LjAwNzkxMDksMTMuNjA1MDc3NiBaIiBpZD0iRmlsbC0xLUNvcHkiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
        alt=""
      />
    </div>

    <!-- pc -->
    <div class="pc_nav">
      <div @click="router.push('/')">首页</div>
      <div @click="router.push('/recommended')">吐槽</div>
      <div class="pc_search">
        <el-input v-model="input.val" placeholder="请输入内容" size="small">
          <template #suffix>
            <i
              @click="search"
              style="cursor: pointer"
              class="el-input__icon el-icon-search"
            ></i>
          </template>
        </el-input>
      </div>
      <div>
        <el-button @click="router.push('/editor')" type="primary" size="small"
          >写文章</el-button
        >
      </div>
      <div>
        <el-button v-if="!store.state.isLogin"  @click="show" type="primary" plain size="small">登陆</el-button>
        <div class="avatar" v-if="store.state.isLogin">
          <el-avatar @click="router.push(`user?id=${store.state._id}`)" :src="store.state.avatar"></el-avatar>
        </div>
      </div>
    </div>

    <!-- mobile -->
    <div class="mobile_nav">
      <div class="left">
        <el-dropdown>
          <span class="el-dropdown-link">
            <span @click="router.push(navlist.titlelink)">{{
              navlist.title
            }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                command="a"
                v-for="(i, index) in navlist.next"
                :key="index"
                ><span
                  @click="router.push(navlist.nextlink[index]), swap(index)"
                  >{{ i }}</span
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="right">
        <div class="mobile_search">
          <el-input
            v-model="input.val"
            placeholder="请输入内容"
            resize="none"
            size="small"
          >
            <template #suffix>
              <i
                @click="search"
                style="cursor: pointer"
                class="el-input__icon el-icon-search"
              ></i>
            </template>
          </el-input>
        </div>
        <div>
          <el-button v-if="!store.state.isLogin" @click="show" type="primary" plain size="small"
            >登陆</el-button
          >
          <div class="avatar" v-if="store.state.isLogin">
            <el-avatar @click="router.push(`user?id=${store.state._id}`)" :src="store.state.avatar"></el-avatar>
          </div>
        </div>
      </div>
    </div>

    <!-- login -->

    <c_login />
  </div>
</template>

<script setup>
import { onMounted, provide, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import store from '@/store/index'
const route = useRoute();
const router = useRouter();

// login
import c_login from "@/components/c_login";
const login = reactive({val: false});
const show = () => {login.val = true;}
provide("c_login->visible", login);

// 移动端下拉菜单
let navlist = reactive({
  title: "首页",
  next: ["首页", "吐槽"],
  titlelink: "/",
  nextlink: ["/", "/recommended"],
});
const swap = function (i) {
  navlist.title = navlist.next[i];
  navlist.titlelink = navlist.nextlink[i];
};
watch(
  () => route.path,
  (val) => {
    const link = navlist.nextlink;
    const n = link.length;
    for (let i = 0; i < n; i++) {
      if (link[i] === val) {
        swap(i);
        break;
      }
    }
  }
);

// 搜索框
let input = reactive({ val: "" });
const search = () => {
  if (input.value === "") {
    ElMessage.warning({ message: "内容不可为空!" });
  }
  router.push(`/search?content=${input.val}`);
  input.val = "";
};
</script>

<style scoped>
.c_head {
  color: #007fff;
  display: flex;
  align-content: center;
  width: 100%;
  height: 100%;
}

@media (max-width: 980px) {
  .mobile_img {
    display: block !important;
    padding-left: 10px;
  }
  .mobile_nav {
    display: flex !important;
  }
  .mobile_search {
    padding-left: 0px !important;
  }

  .pc_img,
  .pc_nav {
    display: none !important;
  }
}

.mobile_img,
.mobile_nav {
  display: none;
}

.img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.11rem;
}

.pc_nav {
  width: 100%;
  display: flex;
  font-size: 22px;
  text-align: center;
  line-height: 22px;
  white-space: nowrap;
}
.pc_nav > div {
  padding: 0 19px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.pc_search {
  justify-content: flex-end;
  padding-left: 250px !important;
  cursor: default !important;
}

.mobile_nav {
  width: 100%;
  display: none;
  font-size: 22px;
  text-align: center;
  line-height: 22px;
  white-space: nowrap;
  justify-content: space-between;
}

.mobile_nav > div {
  padding: 0 19px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.mobile_nav > .right > div {
  padding: 0 3px;
}

.mobile_search {
  display: flex;
  cursor: default !important;
}

.el-dropdown-link {
  cursor: pointer;
  color: #007fff;
  font-size: 22px;
}
.el-icon-arrow-down {
  font-size: 12px;
  color: #71777c;
}
</style>