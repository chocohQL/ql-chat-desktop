<script setup>
import {Close, Minus} from "@element-plus/icons-vue";
import {ref} from "vue";
defineProps(["title"])
const { ipcRenderer } = require('electron')
let isOnTop = ref(false)

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
</script>

<template>
  <div class="top" @click="close()">
    <el-icon class="icon-window" size="14px"><Close /></el-icon>
  </div>
  <div class="top" @click="min()">
    <el-icon class="icon-window" size="14px"><Minus /></el-icon>
  </div>
  <div v-if="!isOnTop" class="top" @click="alwaysOnTop()">
    <i class="bi bi-pin icon-not-top"/>
  </div>
  <div v-if="isOnTop" class="top" @click="alwaysOnTop()">
    <i class="bi bi-pin icon-on-top"/>
  </div>
  <div class="title">{{title}}</div>
</template>

<style scoped>
.title {
  width: 680px;
  height: max-content;
  font-size: 20px;
  margin: 20px;
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

.icon-on-top {
  margin: 4px;
  font-size: 13px;
  color: #07C160
}

.icon-not-top {
  margin: 4px;
  font-size: 13px
}

.icon-window {
  margin: 4px
}
</style>
