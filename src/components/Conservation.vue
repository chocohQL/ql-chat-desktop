<script setup>
defineProps(["item", "currentConversationId"])
defineEmits(["changeConservation"])
</script>

<template>
  <div class="list-item"
       @click="$emit('changeConservation', item)"
       :style="{ backgroundColor: item.id === currentConversationId ? '#C4C4C4' : '' }">
    <el-row>
      <el-col :span="6">
        <el-avatar shape="square" :size="40" class="avatar" :src="item.avatar"/>
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-col :span="18">
            <div class="previewName">{{ item.name }}</div>
          </el-col>
          <el-col :span="6">
            <div class="previewTime">{{ item.previewTimeFormat }}</div>
          </el-col>
        </el-row>
        <el-row>
          <div class="previewChat">{{ item.previewMessage }}</div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.list-item {
  width: 240px;
  height: 60px;
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

.previewChat {
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: #999999;
}

.previewTime {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 12px;
  font-family: Arial, sans-serif;
  color: #999999;
}
</style>
