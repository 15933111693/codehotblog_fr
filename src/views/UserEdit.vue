<template>
    <div class="userEdit">
        <div class="userEdit_item"><h1>个人资料</h1></div>
        <div class="userEdit_contain">
            <div class="userEdit_avatar">
                <div class="left">
                    <div class="text">头像</div>
                    <div class="content"><el-avatar :src="store.state.avatar"></el-avatar></div>
                </div>
                <div class="edit"><el-upload :show-file-list="false" :limit="1" :http-request="avatar.submit">修改</el-upload></div>
            </div>
            <div class="userEdit_admin">
                <div class="left">
                    <div class="text">用户名</div>
                    <div class="content"> <input v-model="admin.val" class="input" type="text" :disabled="admin.edit"/> </div>
                </div>
                <div v-if="admin.edit" @click="admin.edit = false" class="edit">修改</div>
                <div v-if="!admin.edit" class="editing">
                    <div @click="admin.submit">保存</div>
                    <div @click="admin.edit = true; admin.val = store.state.username;">取消</div>
                </div>
            </div>
            <div class="userEdit_password">
                <div class="left">
                    <div class="text">密码</div>
                    <div class="content"><input v-model="password.val" class="input" type="text" :disabled="password.edit"/></div>
                </div>
                <div v-if="password.edit" @click="password.edit = false" class="edit">修改</div>
                <div v-if="!password.edit" class="editing">
                    <div @click="password.submit">保存</div>
                    <div @click="password.edit = true; password.val = store.state.password">取消</div>
                </div>
            </div>
            <div class="bottom"></div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import store from '@/store/index'
import {editAvatar_api, editUsername_api, editPwd_api} from "@/api/userEdit"
import uploadImg from "@/api/uploadImg"
import { getUserInfo } from '../api/login'
import {isPasswd} from "@/util/index"
import {ElMessage} from "element-plus"

// 头像
const avatar = reactive({src: '', async submit(e) {
    const file = e.file
    const formdata = new FormData()
    formdata.append("file", file)
    let res = await uploadImg(formdata)
    const url = res.url
    res = await editAvatar_api({_id: store.state._id, avatar: url})
    store.state.avatar = url
}, edit: true})
// 用户名
const admin = reactive({val: store.state.username, async submit() {
    if(admin.val === '') {
        ElMessage.error("用户名不可为空")
        return
    }
    const data = {_id: store.state._id, username: admin.val}
    const res = await editUsername_api(data)
    if(res.code === 200) {
        store.state.username = admin.val
        admin.edit = true
    }
}, edit: true})
// 密码
const password = reactive({val: store.state.password, async submit() {
    if(!isPasswd(password.val)) {
        ElMessage.error("请输入6-20个字母、数字、下划线的密码")
        return
    }
    const data = {_id: store.state._id, password: password.val}
    const res = await editPwd_api(data)
    if(res.code === 200) {
        let res1 = await getUserInfo()
        if(res1.code === 200) store.commit('initUser', res1.data)
        password.val = store.state.password
        password.edit = true
    }
}, edit: true})
</script>


<style scoped>
.userEdit {
    width: 100%;
    height: auto;
    padding: 30px;
    background: white;
}
.userEdit_item {
    padding: 10px 0;
}
.userEdit_avatar, .userEdit_admin, .userEdit_password {
    padding: 0 10px;
}
.userEdit_avatar, .userEdit_admin, .userEdit_password {
    display: flex;
    border-top: 1px solid #eee;
    justify-content: space-between;
    padding: 20px;
}
.left {
    display: flex;
}
.text, .content, .edit {
    display: flex;
    align-items: center;
}
.text {
    width: 100px;
}
.content {
    padding-left: 20px;
}
.edit, .editing {
    color: #007fff;
    cursor: pointer;
}
.bottom {
    border-top: 1px solid #eee;
}
.input {
    border: none;
    background: rgba(0, 0, 0, 0);
}
.input:hover, .input:focus {
    border: none;
    outline: none;
}
.editing {
    display: flex;
}
.editing > div {
    padding-left: 5px;
}
</style>