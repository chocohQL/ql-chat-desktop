<script setup>
defineProps(["avatar"])
</script>

<template>
  <el-row>
    <el-avatar shape="square" :size="40" class="userAvatar" :src="avatar" />
  </el-row>
  <el-row>
    <i class="bi bi-chat-fill" style="margin-left: 30px;margin-top:20px;font-size: 20px; color: #07C160"/>
    <!--        <i class="bi bi-chat" style="margin-left: 30px;margin-top:20px;font-size: 20px; color: #8F8F8F"/>-->
  </el-row>
  <!--      bi bi-people-->
  <el-row>
    <!--        <i class="bi bi-people-fil" style="margin-left: 30px;margin-top:20px;font-size: 20px; color: #07C160"/>-->
    <i class="bi bi-people" style="margin-left: 30px;margin-top:20px;font-size: 20px; color: #8F8F8F"/>
  </el-row>
  <el-row>
    <i class="bi bi-list" style="margin-left: 27px;margin-top:425px;font-size: 25px; color: #8F8F8F"/>
  </el-row>
</template>

<style scoped>
.userAvatar {
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  -webkit-app-region: no-drag
}
</style>
