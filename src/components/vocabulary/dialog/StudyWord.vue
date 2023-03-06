<template>
  <div>{{ props.word }}</div>
</template>

<script setup>
// cho phép slide qua trái qua phải (UI)
// tập hợp các chữ cái
// các dấu nháy (hoặc ô)
// khi gõ chữ nào chữ đó biến mất, nếu gõ ko có trong tập chữ => báo lỗi

// phiên âm, phát âm, gợi ý... => đoán nghĩa
import {ref} from "vue";

const wordTest = ref('yes')

const props = defineProps({
  word: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>

</style>