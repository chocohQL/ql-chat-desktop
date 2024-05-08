<script setup>
import {ref} from "vue";

defineProps(["avatar"])

let active = ref(0)
</script>

<template>
  <el-row>
    <el-avatar shape="square" :size="40" class="userAvatar" :src="avatar"/>
  </el-row>
  <el-row>
    <i v-if="active === 0" class="bi bi-chat-fill menu-icon-on"/>
    <i v-if="active !== 0" class="bi bi-chat menu-icon"/>
  </el-row>
  <el-row>
    <i v-if="active === 1" class="bi bi-people-fil menu-icon-on"/>
    <i v-if="active !== 1" class="bi bi-people menu-icon"/>
  </el-row>
  <el-row>
    <i class="bi bi-list"/>
  </el-row>
</template>

<style scoped>
.userAvatar {
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  -webkit-app-region: no-drag
}

.menu-icon {
  margin-left: 30px;
  margin-top:20px;
  font-size: 20px;
  color: #8F8F8F
}

.menu-icon-on {
  margin-left: 30px;
  margin-top:20px;
  font-size: 20px;
  color: #07C160
}

.bi-list {
  margin-left: 27px;
  margin-top:425px;
  font-size: 25px;
  color: #8F8F8F
}
</style>
