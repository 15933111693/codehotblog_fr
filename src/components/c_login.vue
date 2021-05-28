<template>
    <div class="c_login" v-if="login_visible.val">
        <div class="login_bg" @click="login_visible.val = false"></div>
        <div class="card">
            <div class="login" v-if="status === 'login'">
                <div class="text"><h1>登陆</h1></div>
                <div class="admin"><el-input v-model="login.admin" placeholder="请输入账号"></el-input></div>
                <div class="password"><el-input v-model="login.password" type="password" placeholder="请输入密码"></el-input></div>
                <div class="submit"><el-button @click="loginSubmit" type="primary">登陆</el-button></div>
                <div class="change" @click="status = 'register'">注册</div>
            </div>
            
            <div class="register" v-if="status === 'register'">
                <div class="text"><h1>注册</h1></div>
                <div class="admin"><el-input v-model="register.admin" placeholder="请输入账号"></el-input></div>
                <div class="password"><el-input v-model="register.password1" type="password" placeholder="请输入密码"></el-input></div>
                <div class="password"><el-input v-model="register.password2" type="password" placeholder="请再次输入密码"></el-input></div>
                <div class="submit"><el-button @click="registerSubmit" type="primary">注册</el-button></div>
                <div class="change" @click="status = 'login'">登陆</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, ref, watch } from "vue";
import { ElMessage } from 'element-plus'
import {login_api, registor_api} from '@/api/login'
import store from '@/store/index'
// 注册登陆界面
let status = ref('login')
let data = reactive({status})
watch(status, (val) => {
    for(let i in login) login[i] = ''
    for(let i in register) register[i] = ''
})

// 控制组件显隐
let login_visible = inject('c_login->visible')
watch(login_visible, (val) => {
    data.status = 'login'
    for(let i in login) login[i] = ''
    for(let i in register) register[i] = ''
}) 

import {isRegisterUserName, isPasswd} from '@/util/index'
// login
const login = reactive({admin: '', password: ''})
const loginSubmit = async () => {
    if(!isRegisterUserName(login.admin)) {
        ElMessage.error("请输入5-20个以字母开头、可带数字、_、.的用户名")
        return
    }
    if(!isPasswd(login.password)) {
        ElMessage.error("请输入6-20个字母、数字、下划线的密码")
        return
    }
    const res = await login_api(login.admin, login.password)
    if(res.data) {
        login_visible.val = false
        store.commit('initUser', res.data)
    }
}

// register
const register = reactive({admin: '', password1: '', password2: ''})
const registerSubmit = async () => {
    if(!isRegisterUserName(register.admin)) {
        ElMessage.error("请输入5-20个以字母开头、可带数字、_、.的用户名")
        return
    }
    if(!isPasswd(register.password1) || !isPasswd(register.password2)) {
        ElMessage.error("请输入6-20个字母、数字、下划线的密码")
        return
    }
    if(register.password1 != register.password2) {
        ElMessage.error("两次输入密码不一致哦!")
        return
    }

    const res = await registor_api(register.admin, register.password1)
    status = 'login'
}
</script>

<style scoped>
.c_login {
    position: fixed;
    z-index: 200;
}
.login_bg {
    position: fixed;
    padding: 0px;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    opacity:0.7;
    filter: alpha(opacity=40);
    background-color: #000000;
    z-index: 200;
}
.card {
    width: 360px;
    height: 300px;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: fixed;
    z-index: 201;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.login, .register {
    padding: 25px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 50px);
    justify-content: space-around;
}
.submit > .el-button {
    width: 100%;
}
.change {
    color: #007fff;
    cursor: pointer;
}
</style>