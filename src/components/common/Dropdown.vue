<template>
  <el-dropdown @command="handleCommand" trigger="click">
    <span class="el-dropdown-link">
      <el-icon><More /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in props.items"
          :command="item.command"
          v-html="item.label"
        />
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { More } from '@element-plus/icons-vue'

const emits = defineEmits(['command'])
const props = defineProps({
  row: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

const handleCommand = (command) => {
  emits('command', { row: props.row, command: command })
}
</script>

<style scoped>

</style>