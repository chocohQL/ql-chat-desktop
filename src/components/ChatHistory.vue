<script setup>
defineProps(["item"])
</script>

<template>
  <!--聊天记录-用户-->
  <div v-if="item.type === 1">
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
  <div v-if="item.type === 0">
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
</template>

<style scoped>
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
