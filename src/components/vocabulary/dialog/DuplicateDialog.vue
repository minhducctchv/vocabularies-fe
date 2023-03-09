<template>
  <Dialog
    title="Từ bị lặp"
    v-model="show"
  >
    <div>Từ đã tồn tại, bạn có muốn edit từ đã tồn tại không</div>
    <div v-for="item in listDuplicate">
      <el-button
        type="primary"
        link
        @click="editExistsWord(item)"
      >
        Word: [{{ item.word }}] - id: [{{ item.id }}]
      </el-button>
    </div>
    <template #footer>
      <div style="text-align: center">
        <el-button
          type="danger"
          @click="save"
        >
          Vẫn lưu
        </el-button>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import Dialog from '@/components/common/Dialog.vue'
import { ref } from 'vue'

const emits = defineEmits(['save', 'edit'])

const show = ref(false)
const listDuplicate = ref([])

const openDialog = (lstDuplicate) => {
  listDuplicate.value = lstDuplicate
  show.value = true
}
const closeDialog = () => {
  show.value = false
}
const editExistsWord = (item) => {
  emits('edit', item)
  closeDialog()
}
const save = () => {
  emits('save', false)
  closeDialog()
}

defineExpose({
  openDialog,
  closeDialog
})
</script>

<style scoped>

</style>