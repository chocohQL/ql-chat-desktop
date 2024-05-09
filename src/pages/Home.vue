<script setup>
import {inject, onMounted} from "vue";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {ref, nextTick} from 'vue'
import {Search} from '@element-plus/icons-vue'
import ChatHistory from "../components/ChatHistory.vue";
import Menu from "../components/Menu.vue";
import ChatHeader from "../components/ChatHeader.vue";
import Conservation from "../components/Conservation.vue";
import config from "../config";

const {ipcRenderer} = require('electron')
const $api = inject('$api');
const blank = ''
const textarea = ref('')
const scrollbarRef = ref()
const innerRef = ref()
let search = ref('')
let currentConversationId = ref()
const chatHistoryList = ref([])
let userInfo = ref({})
const conversation = ref({})
const conversationList = ref([])
let ws = null;
const contextMenuParam = ref({
  contextMenuVisible: false,
  chatHistoryId: 0,
  x: 0,
  y: 0
})
const contextMenu = [
  {
    value: 2,
    label: '撤回',
  }]

onMounted(() => {
  // 设置窗口大小
  ipcRenderer.send("window-resize-home")
  // 获取用户信息
  $api.user.me().then(response => {
    userInfo.value = response.data.data;
    // 获取聊天会话
    $api.chat.lisConversation(userInfo.value.id).then(response => {
      conversationList.value = response.data.data;
      conversation.value = conversationList.value[0];
      currentConversationId.value = conversation.value.id;
      listChatHistory(userInfo.value.id, conversation.value.targetId, conversation.value.type)
    })
  })
  // 点击隐藏菜单事件
  document.addEventListener('click', hideMenu)
  // 初始化websocket
  initWebSocket()
})

const initWebSocket = async () => {
  console.log(config.requestConfig.socketURL)
  ws = new WebSocket(config.requestConfig.socketURL);
  console.log(config.requestConfig.socketURL)
  ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);
    if (message.type === config.constant.SEND_CHAT_HISTORY) {
      console.log(config.constant.SEND_CHAT_HISTORY)
      pushChatHistory(message.data)
    } else if (message.type === config.constant.DELETE_CHAT_HISTORY) {
      console.log(config.constant.DELETE_CHAT_HISTORY)
      deleteChatHistory(message.data)
    }
  }
}
function showContextMenu(event, id) {
  contextMenuParam.value.contextMenuVisible = true;
  contextMenuParam.value.chatHistoryId = id;
  contextMenuParam.value.x = event.x;
  contextMenuParam.value.y = event.y;
}

function hideMenu() {
  contextMenuParam.value.contextMenuVisible = false;
}

async function updateConversation() {
  $api.chat.lisConversation(userInfo.value.id).then(response => {
    conversationList.value = response.data.data;
  })
}

async function listChatHistory(userId, targetId, type) {
  $api.chat.listChatHistory(userId, targetId, type).then(response => {
    chatHistoryList.value = response.data.data;
    setScrollToBottom()
  })
}

async function changeConservation(cur) {
  conversation.value = cur;
  currentConversationId.value = cur.id;
  textarea.value = blank;
  await listChatHistory(userInfo.value.id, cur.targetId, cur.type)
}

async function setScrollToBottom() {
  await nextTick()
  const max = innerRef.value.clientHeight
  scrollbarRef.value.setScrollTop(max)
}

async function submit() {
  if (textarea.value.trim() !== blank) {
    $api.chat.sendChatHistory({
      content: textarea.value,
      userId: userInfo.value.id,
      targetId: conversation.value.targetId,
      type: conversation.value.type,
    }).then(response => {
      if (response.data.code === 200) {
        pushChatHistory(response.data.data)
      }
    })
    textarea.value = blank
  }
}

async function handleContextMenu(value) {
  hideMenu()
  if (value === 2) {
    var chatHistoryId = contextMenuParam.value.chatHistoryId;
    $api.chat.deleteChatHistory(chatHistoryId).then(response => {
      if (response.data.data === 1) {
        deleteChatHistory(chatHistoryId)
      }
    })
  }
}

function pushChatHistory(chatHistory) {
  chatHistoryList.value.push(chatHistory)
  updateConversation()
  setScrollToBottom()
}

function deleteChatHistory(chatHistoryId) {
  for (let i = 0; i < chatHistoryList.value.length; i++) {
    console.log(chatHistoryList.value[i].content)
    if (chatHistoryList.value[i].id === chatHistoryId) {
      chatHistoryList.value[i].content = null;
      chatHistoryList.value[i].type = 1;
    }
  }
  updateConversation()
}
</script>

<template>
  <el-container class="container">
    <!--菜单-->
    <el-aside class="menu">
      <Menu :avatar="userInfo.avatar"/>
    </el-aside>
    <el-container class="side">
      <!--搜索栏-->
      <el-header class="search">
        <el-input size="small" placeholder="搜索" :prefix-icon="Search" class="search-input" v-model="search"/>
      </el-header>
      <!--好友列表-->
      <el-main class="list">
        <el-scrollbar>
          <conservation @change-conservation="changeConservation" v-for="(item) in conversationList"
                        :item="item" :currentConversationId="currentConversationId">
          </conservation>
        </el-scrollbar>
      </el-main>
    </el-container>
    <el-container class="chat">
      <!--聊天顶部区-->
      <el-header class="header">
        <chat-header :title="conversation.name"/>
      </el-header>
      <!--聊天主体区-->
      <el-main class="main">
        <el-scrollbar ref="scrollbarRef">
          <div ref="innerRef">
            <ChatHistory @showContextMenu="showContextMenu" v-for="item in chatHistoryList" :item="item" :id="userInfo.id"/>
          </div>
        </el-scrollbar>
      </el-main>
      <el-footer class="footer">
        <div class="footer-div">
          <!--聊天输入选项-->
          <div class="input-option">
            <i class="bi bi-emoji-smile input-option-icon"/>
            <i class="bi bi-folder input-option-icon"/>
            <i class="bi bi-chat-dots input-option-icon"/>
          </div>
          <!--聊天输入区-->
          <div class="input-textarea">
            <el-input type="textarea" maxlength="500" rows="3" cols="72" resize="none"
                      class="textarea" @keyup.enter.exact="submit" v-model="textarea"/>
          </div>
          <!--聊天发送按钮-->
          <div class="input-button">
            <el-button @click="submit" type="success" class="submit" plain>发送(S)</el-button>
          </div>
        </div>
      </el-footer>
    </el-container>
  </el-container>
  <!--悬浮菜单-->
  <div class="context-menu" v-if="contextMenuParam.contextMenuVisible"
       :style="{top: `${contextMenuParam.y}px`, left: `${contextMenuParam.x}px`}">
    <div v-for="item in contextMenu" class="context-menu-item">
      <div class="context-menu-item-font" @click="handleContextMenu(item.value)">
        {{ item.label }}
      </div>
    </div>
  </div>
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

.input-textarea {
  height: 100px;
  width: 620px;
  margin-left: 10px;
  margin-right: 10px;
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

.submit {
  margin-right: 30px;
  float: right;

  --el-button-text-color: #07C160 !important;
  --el-button-bg-color: #E9E9E9 !important;
  --el-button-border-color: transparent !important;
}

.input-option-icon {
  color: #494949;
  font-size: 18px;
  margin-left: 20px;
  margin-top: 10px;
}

.input-option {
  height: 30px;
  margin-top: 10px;
}

.input-button {
  height: 60px;
}

.context-menu {
  position: fixed;
  background-color: white;
  z-index: 9999;
  border: 1px solid #cccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.context-menu-item {
  width: 80px;
  height: 30px;
}

.context-menu-item:hover {
  background-color: #E2E2E2;
}

.context-menu-item-font {
  font-size: 14px;
  text-align: center;
  font-family: Arial, sans-serif;
  line-height: 2.2;
}
</style>
