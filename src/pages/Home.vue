<script setup>
import {inject, onMounted} from "vue";
import router from "../router/index.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {ref} from 'vue'
import {ChatRound, Close, Minus, Search} from '@element-plus/icons-vue'
const textarea = ref('')
const $api = inject('$api');
const { ipcRenderer } = require('electron')
onMounted(() => {
  ipcRenderer.send("window-resize-home")
})
const min = () => {
  ipcRenderer.send("window-min");
};
const close = () => {
  ipcRenderer.send("window-close");
};
const alwaysOnTop = () => {
  isOnTop.value = !isOnTop.value
  if (isOnTop.value) {
    ipcRenderer.send("always-on-top-true")
  } else {
    ipcRenderer.send("always-on-top-false")
  }
}
let isOnTop = ref(false)
const logout = () => {
  $api.user.logout().then(resp => {
    if (resp.data.code === 200) {
      localStorage.clear()
      sessionStorage.clear()
      router.push('/')
    } else {
      ElMessage.error(resp.data.msg)
    }
  })
}
$api.user.me()

const me = ref({
  username: "chocoh.",
  avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/4fe52b66-9b16-4abf-b78f-52f5a9f69144.jpg",
})

const list = ref([
  {
    id: 1,
    type: 0,
    username: "文件传输助手",
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/2e6b934a-d7f1-47b3-9e99-d0768c79af10.jpg",
    new: "?",
    time: "24/4/28",
    cur: false,
  },
  {
    id: 2,
    type: 1,
    username: "chocoh.",
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/4fe52b66-9b16-4abf-b78f-52f5a9f69144.jpg",
    new: "hello",
    time: "昨天",
    cur: false,
  },
  {
    id: 3,
    type: 0,
    username: "googer",
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/5c4b59d1-2498-48f7-8ec3-58cc425d532a.jpg",
    new: "😭😭😭",
    time: "12:30",
    cur: true,
  },
  {
    id: 4,
    type: 0,
    username: "蓝色蜻蛉",
    avatar: "https://chocoh.oss-cn-guangzhou.aliyuncs.com/cat/fast/68cde9a5-6cb1-45a7-8022-6fee501f0784.jpg",
    new: "...",
    time: "昨天",
    cur: false,
  }
])

const talkBox = ref({
    id: 3,
    name: "googer",
    talkType: 0,
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
</script>

<template>
  <el-container class="container">
<!--侧边栏-->
    <el-aside class="menu">
      <el-row>
        <el-avatar shape="square" :size="40" class="userAvatar" :src="me.avatar" />
      </el-row>
      <el-row>
        <i class="bi bi-chat-fill" style="margin-left: 30px;margin-top:20px;font-size: 20px; color: #07C160"/>
<!--        <i class="bi bi-chat" style="margin-left: 30px;margin-top:20px;font-size: 20px; color: #B6B6B6"/>-->
      </el-row>
<!--      bi bi-people-->
      <el-row>
<!--        <i class="bi bi-people-fil" style="margin-left: 30px;margin-top:20px;font-size: 20px; color: #07C160"/>-->
        <i class="bi bi-people" style="margin-left: 30px;margin-top:20px;font-size: 20px; color: #B6B6B6"/>
      </el-row>
    </el-aside>
<!--列表栏-->
    <el-container class="side">
      <el-header class="search">
        <el-input
            class="search-input"
            size="small"
            placeholder="搜索"
            :prefix-icon="Search"
        />
      </el-header>
      <el-main class="list">
        <el-scrollbar>
          <div v-for="item in list">
            <div class="list-item" :style="{ backgroundColor: item.cur ? '#C4C4C4' : '' }">
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
          {{talkBox.name}}
        </div>
      </el-header>
<!--聊天主体区-->
      <el-main class="main">
        <el-scrollbar>
          <div class="main-div" v-for="item in chat">
            <!--聊天记录-用户-->
            <div v-if="item.type === 1" class="chat-item-me">
              <div class="chat-item">
                <el-row>
                  <el-col :span="8"/>
                  <el-col :span="14">
                    <el-row><el-col :span="24"><div class="chat-name-me">{{item.username}}</div></el-col></el-row>
                    <div class="bubble-me">
                      <div class="chat-font">
                        {{item.content}}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div class="chat-avatar">
                      <el-avatar shape="square" style="margin: 0;float: left" :size="32" class="userAvatar" :src="item.avatar" />
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <!--聊天记录-好友-->
            <div v-if="item.type === 0" class="chat-item-other">
              <div class="chat-item">
                <el-row>
                  <el-col :span="2">
                    <div class="chat-avatar">
                      <el-avatar shape="square" style="margin: 0;float: right" :size="32" class="userAvatar" :src="item.avatar" />
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <el-row><el-col :span="24"><div class="chat-name-other">{{item.username}}</div></el-col></el-row>
                    <div class="bubble-other">
                      <div class="chat-font">
                        {{item.content}}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8"/>
                </el-row>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-main>
<!--聊天输入区-->
      <el-footer class="footer">
        <div class="footer-div">
          <div style="height: 40px;">

          </div>
          <div class="textarea-area">
            <el-input type="textarea"
                      v-model="textarea"
                      class="textarea"
                      maxlength="500"
                      rows="3" cols="72"
                      resize="none"/>
          </div>
          <div style="height: 60px">
            <el-button type="success" style="margin-right: 30px; float: right;" plain>发送(S)</el-button>
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
  height: 390px;
  max-height: 390px;
  max-width: max-content;
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
  margin-left: 30px;
  margin-right: 30px;
}

.textarea {
  font-size: 16px;
  font-family: Arial, sans-serif;
  line-height: 1.5;
  overflow-y: hidden;
  overflow-x: hidden;
}

.search-input {
  width: 220px;
  margin: 35px 10px 10px 10px;
  -webkit-app-region: no-drag
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

.userAvatar {
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  -webkit-app-region: no-drag
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

.bubble-me {
  background-color: #95EC69;
  float: right;
  border-radius: 4px;
  margin-right: 5px;
  margin-top: 5px;
}

.chat-name-me {
  font-size: 14px;
  font-family: Arial, sans-serif;
  line-height: 1.5;
  color: #B2B2B2;
  float: right;
  margin-right: 5px;
}

.bubble-other {
  background-color: #FFFFFF;
  float: left;
  border-radius: 4px;
  margin-left: 5px;
  margin-top: 5px;
}

.chat-name-other {
  font-size: 14px;
  font-family: Arial, sans-serif;
  line-height: 1.5;
  color: #B2B2B2;
  float: left;
  margin-left: 5px;
}

.chat-font {
  margin: 8px;
  font-size: 15px;
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

.chat-avatar {
  margin: 5px;
}

.chat-item {
  margin: 5px;
}
</style>
