<script setup>
import {inject, onMounted, reactive} from "vue";
import {ElMessage} from 'element-plus'
import router from "../router/index.js";
import {Close} from "@element-plus/icons-vue";

const { ipcRenderer } = require('electron')
const $api = inject('$api')
const form = reactive({
  password: '',
  username: '',
})

onMounted(() => {
  ipcRenderer.send("window-resize-login")
})
async function close () {
  ipcRenderer.send("window-close");
}
async function onSubmit () {
  $api.user.login({
    username: form.username,
    password: form.password
  }).then(resp => {
    if (resp.data.code === 200) {
      router.push('/home')
    } else {
      ElMessage.error("登录失败")
    }
  })
}
</script>

<template>
  <div class="card">
    <div class="top" @click="close()">
      <el-icon class="icon" style="margin: 4px" size="14px"><Close /></el-icon>
    </div>
    <div class="form">
      <div class="title">登录</div>
      <div class="form">
        <el-input class="input" v-model="form.username" placeholder="username"/>
        <el-input class="input" v-model="form.password" type="password" placeholder="password" show-password/>
        <el-button @click="onSubmit" class="submit" type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  height: 400px;
  background-color: #FFFFFF;
  -webkit-app-region: drag;
  overflow-y: hidden;
  overflow-x: hidden;
}

.form {
  margin: 40px 20px 80px;
  -webkit-app-region: no-drag
}

.input {
  margin-top: 20px;
}

.submit {
  width: 100%;
  margin-top: 20px;
  border-width: 0;
}

.top {
  height: 24px;
  width: 24px;
  float: right;
  -webkit-app-region: no-drag
}

.top:hover {
  background-color: #E2E2E2;
}

.title {
  font-size: 48px;
  text-align: center;
}
</style>
