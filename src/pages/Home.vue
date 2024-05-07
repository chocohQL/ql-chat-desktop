<script setup>
import {inject, onMounted} from "vue";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {ref,nextTick} from 'vue'
import {Close, Minus, Search} from '@element-plus/icons-vue'
import ChatHistory from "../components/ChatHistory.vue";
import Menu from "../components/Menu.vue";

const { ipcRenderer } = require('electron')
const textarea = ref('')
const $api = inject('$api');
const scrollbarRef = ref()
const innerRef = ref()
let isOnTop = ref(false)
let search = ref('')
const blank = ''
let currentConservation = ref(3)
let userInfo = ref({
  username: blank,
  avatar: blank
})

onMounted(() => {
  ipcRenderer.send("window-resize-home")
  $api.user.me().then(response => {
    userInfo.value = response.data.data;
  })
  setScrollToBottom()
})
const min = () => {
  ipcRenderer.send("window-min");
}
const close = () => {
  ipcRenderer.send("window-close");
}
const alwaysOnTop = () => {
  isOnTop.value = !isOnTop.value
  if (isOnTop.value) {
    ipcRenderer.send("always-on-top-true")
  } else {
    ipcRenderer.send("always-on-top-false")
  }
}
const checkConservation = (check, index) => {
  conservation.value = check;
  currentConservation.value = index;
  if (index === 3) {
    chatHistoryList.value = chat.value;
  } else {
    chatHistoryList.value = []
  }
  setScrollToBottom()
}
async function setScrollToBottom() {
  await nextTick()
  const max = innerRef.value.clientHeight
  scrollbarRef.value.setScrollTop(max)
}
async function submit () {
  if (textarea.value.trim() === blank) {
    textarea.value = blank
    return
  }
  let newChatHistory = {
    username: userInfo.value.username,
    type: 1,
    avatar: userInfo.value.avatar,
    content: textarea.value,
  }
  textarea.value = blank
  chatHistoryList.value.push(newChatHistory)
  await setScrollToBottom()
}

const list = ref([
  {
    id: 1,
    type: 0,
    username: "文件传输助手",
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/2e6b934a-d7f1-47b3-9e99-d0768c79af10.jpg",
    new: "?",
    time: "24/4/28",
  },
  {
    id: 2,
    type: 1,
    username: "chocoh.",
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/4fe52b66-9b16-4abf-b78f-52f5a9f69144.jpg",
    new: "hello",
    time: "昨天",
  },
  {
    id: 3,
    type: 0,
    username: "googer",
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/5c4b59d1-2498-48f7-8ec3-58cc425d532a.jpg",
    new: "😭😭😭",
    time: "12:30",
  },
  {
    id: 4,
    type: 0,
    username: "蓝色蜻蛉",
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/68cde9a5-6cb1-45a7-8022-6fee501f0784.jpg",
    new: "...",
    time: "昨天",
  }
])

const conservation = ref({
    id: 3,
    username: "googer",
    type: 0,
})

const chat = ref([
  {
    username: "chocoh.",
    type: 1,
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/4fe52b66-9b16-4abf-b78f-52f5a9f69144.jpg",
    content: "hello world",
  },
  {
    username: "chocoh.",
    type: 1,
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/4fe52b66-9b16-4abf-b78f-52f5a9f69144.jpg",
    content: "hello world hello world hello world hello world hello world hello world hello world hello world",
  },
  {
    username: "googer.",
    type: 0,
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/5c4b59d1-2498-48f7-8ec3-58cc425d532a.jpg",
    content: "what can i say",
  },
  {
    username: "googer.",
    type: 0,
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/5c4b59d1-2498-48f7-8ec3-58cc425d532a.jpg",
    content: "what can i say what can i say what can i say what can i say what can i say what can i say",
  },
  {
    username: "chocoh.",
    type: 1,
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/4fe52b66-9b16-4abf-b78f-52f5a9f69144.jpg",
    content: "😭😭😭",
  },
])

const chatHistoryList = ref([])
chatHistoryList.value = chat.value
</script>

<template>
  <el-container class="container">
<!--侧边栏-->
    <el-aside class="menu">
      <Menu :avatar="userInfo.avatar"/>
    </el-aside>
<!--列表栏-->
    <el-container class="side">
      <!--搜索栏-->
      <el-header class="search">
        <el-input
            class="search-input"
            size="small"
            v-model="search"
            placeholder="搜索"
            :prefix-icon="Search"
        />
      </el-header>
      <!--好友列表-->
      <el-main class="list">
        <el-scrollbar>
          <div v-for="(item, index) in list">
            <div class="list-item" @click="checkConservation(item, index)" :style="{ backgroundColor: index === currentConservation ? '#C4C4C4' : '' }">
              <el-row>
                <el-col :span="6">
                  <el-avatar shape="square" :size="40" class="avatar" :src="item.avatar" />
                </el-col>
                <el-col :span="18">
                  <el-row>
                    <el-col :span="18"><div class="previewName">{{item.username}}</div></el-col>
                    <el-col :span="6"><div class="previewTime">{{item.time}}</div></el-col>
                  </el-row>
                  <el-row><div class="previewNew">{{item.new}}</div></el-row>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
    <el-container class="chat">
<!--聊天顶部区-->
      <el-header class="header">
        <div class="top" @click="close()">
          <el-icon style="margin: 4px" size="14px"><Close /></el-icon>
        </div>
        <div class="top" @click="min()">
          <el-icon style="margin: 4px" size="14px"><Minus /></el-icon>
        </div>
        <div v-if="!isOnTop" class="top" @click="alwaysOnTop()">
          <i class="bi bi-pin" style="margin: 4px;font-size: 13px"/>
        </div>
        <div v-if="isOnTop" class="top" @click="alwaysOnTop()">
          <i class="bi bi-pin" style="margin: 4px;font-size: 13px;color: #07C160"/>
        </div>
        <div class="title">
          {{conservation.username}}
        </div>
      </el-header>
<!--聊天主体区-->
      <el-main class="main">
        <el-scrollbar ref="scrollbarRef">
          <div ref="innerRef">
            <ChatHistory v-for="item in chatHistoryList" :item="item"/>
          </div>
        </el-scrollbar>
      </el-main>
<!--聊天输入区-->
      <el-footer class="footer">
        <div class="footer-div">
          <div style="height: 10px;"/>
          <div style="height: 30px;">
            <i class="bi bi-emoji-smile" style="color:#494949;font-size: 18px;margin-left: 30px;margin-top: 10px"/>
            <i class="bi bi-folder" style="color:#494949;font-size: 18px;margin-left: 20px;margin-top: 10px"/>
            <i class="bi bi-chat-dots" style="color:#494949;font-size: 18px;margin-left: 20px;margin-top: 10px"/>
          </div>
          <div class="textarea-area">
            <el-input @keyup.enter.exact="submit"
                      type="textarea"
                      v-model="textarea"
                      class="textarea"
                      maxlength="500"
                      rows="3" cols="72"
                      resize="none"/>
          </div>
          <div style="height: 60px">
            <el-button @click="submit" type="success" class="submit" plain>发送(S)</el-button>
          </div>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
.container {
  height: 650px;
  width: 1000px;
  max-height: 650px;
  max-width: 1000px;
  overflow-y: hidden;
  overflow-x: hidden;
}

.menu {
  width: 80px;
  max-width: 80px;
  max-height: max-content;
  background-color: #2E2E2E;

  overflow-y: hidden;
  overflow-x: hidden;

  -webkit-app-region: drag
}

.side {
  width: 240px;
  max-width: 240px;
  max-height: max-content;

  border-top-width: 0;
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 1px;
  border-color: #D6D6D6;
  border-style: solid;

  overflow-y: hidden;
  overflow-x: hidden;
}

.search {
  width: 240px;
  background-color: #F7F7F7;
  height: 70px;
  padding: 0;
  -webkit-app-region: drag
}

.list {
  width: 240px;
  background-color: #E5E4E4;
  padding: 0;
  overflow-y: hidden;
  overflow-x: hidden;
}

.chat {
  max-width: 680px;
  max-height: max-content;
  background-color: #F5F5F5;
}

.header {
  height: 70px;
  max-height: 70px;
  max-width: 680px;
  padding: 0;
  -webkit-app-region: drag
}

.title {
  width: 680px;
  height: max-content;
  font-size: 20px;
  margin: 20px;
}

.main {
  width: 680px;
  height: 390px;
  max-height: 390px;
  max-width: 680px;
  padding: 0;

  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 0;
  border-right-width: 0;
  border-color: #D6D6D6;
  border-style: solid;
}

.footer {
  height: 200px;
  max-height: 200px;
  max-width: max-content;
  padding: 0;
}

.footer-div {
  width: 680px;
  height: 200px;
  padding: 0;
}

.textarea-area {
  height: 100px;
  width: 620px;
  margin-left: 20px;
  margin-right: 20px;
}

.textarea {
  font-size: 16px;
  font-family: Arial, sans-serif;
  line-height: 1.5;
  overflow-y: hidden;
  overflow-x: hidden;

  --el-input-border-radius: 0;
  --el-input-border-color: transparent;
  --el-input-hover-border-color: transparent;
  --el-input-clear-hover-color: transparent;
  --el-input-focus-border-color: transparent;
}

.search-input {
  width: 220px;
  margin: 35px 10px 10px 10px;
  -webkit-app-region: no-drag;
  --el-input-placeholder-color: #818181 !important;
  --el-input-icon-color: #5D5D5D !important;
}

.list-item {
  width: 240px;
  height: 60px;
}

.list-item:hover {
  background-color: #D0D0D0;
}

.avatar {
  margin: 10px
}

.previewName {
  margin-top: 10px;
  font-size: 15px;
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

.previewNew {
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: #B2B2B2;
}

.previewTime {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 12px;
  font-family: Arial, sans-serif;
  color: #B2B2B2;
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

.submit {
  margin-right: 30px;
  float: right;

  --el-button-text-color: #07C160 !important;
  --el-button-bg-color: #E9E9E9 !important;
  --el-button-border-color: transparent !important;
}
</style>
