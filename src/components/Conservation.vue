<script setup>
defineProps(["item", "currentConversation", "index"])
defineEmits(["changeConservation"])
</script>

<template>
  <div class="list-item" @click="$emit('changeConservation', item, index)"
       :style="{ backgroundColor: index === currentConversation ? '#C4C4C4' : '' }">
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
            <div class="previewTime">{{ item.previewTime }}</div>
          </el-col>
        </el-row>
        <el-row>
          <div class="previewNew">{{ item.previewMessage }}</div>
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
</style>
