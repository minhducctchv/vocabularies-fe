<template>
  <Dialog
      v-model="show"
      title="Hết phiên đăng nhập"
  >
    <span>Bạn đã hết phiên làm việc. Vui lòng đăng nhập lại</span>
    <template #footer>
      <div style="text-align: center">
        <el-button
            type="primary"
            @click="closeDialog">
          Đóng
        </el-button>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import Dialog from "@/components/common/Dialog.vue";
import {ref} from "vue";

const show = ref(false)

function openDialog() {
  show.value = true
}
function closeDialog() {
  show.value = false
}

defineExpose({
  openDialog
})
</script>

<style scoped>

</style>