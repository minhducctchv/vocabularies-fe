<template>
  <Dialog
    v-model="showDialog"
    title="Học từ"
    top="5vh"
  >
    <el-carousel
      v-if="listWord.length > 0"
      indicator-position="outside"
      :autoplay="false"
      height="620px"
      trigger="click"
    >
      <el-carousel-item v-for="item in listWord" :key="item.id">
        <StudyWord :word="item" @finish="handleFinish" @edit="editWord"/>
      </el-carousel-item>
    </el-carousel>
    <div v-else>
      <el-empty
        image="https://thuviendohoa.vn/upload/images/items/chu-meo-may-doreamon-an-banh-ran-hinh-anh-png-627.jpg"
        description="BẠN HỌC XONG HẾT RỒI ĐẤY"
      />
    </div>
    <div style="text-align: center">
      <el-select-v2
          v-if="!studyCustom"
          v-model="numberWords"
          :options="options"
          placeholder="Chọn số từ sẽ học"
          :clearable="false"
          @change="findWord"
      />
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '@/components/common/Dialog.vue'
import { ref, unref, watch } from 'vue'
import { callApi } from '@/js/ApiFactory'
import { API } from '@/js/ConstantApi'
import { screenLoading } from '@/js/Loading'
import StudyWord from '@/components/vocabulary/dialog/StudyWord.vue'
import { showError } from '@/js/Alert'

const showDialog = ref(false)
const studyCustom = ref(false)
const listWord = ref([])
const options = ref([
  { value: 10, label: '10 bản ghi' },
  { value: 25, label: '25 bản ghi' },
  { value: 50, label: '50 bản ghi' }
])
const numberWords = ref(25)

const emits = defineEmits(['edit'])

watch(showDialog, (val) => {
  if (val) {
    setTimeout(() => {
      findWord()
    })
  }
})

async function findWord() {
  if (unref(studyCustom)) {
    const loading = screenLoading()
    try {
      const rs = await callApi(API.VOCA_GET_ONE, {
        id: unref(studyCustom).id
      })
      listWord.value = [rs]
    } catch (err) {
      showError(err)
    } finally {
      loading.close()
    }
  } else {
    // tìm về numberWords sort theo level thấp
    const loading = screenLoading()
    try {
      const rs = await callApi(API.VOCA_SEARCH, {
        page: 0,
        size: unref(numberWords),
        direction: 'ASC',
        properties: 'level'
      })
      listWord.value = rs.content
      if (listWord.value.length < 1) return
      // filter lấy ra tập hợp từ có level = từ đầu tiên
      listWord.value = listWord.value.filter(item => item.level === listWord.value[0].level)
      // xáo trộn các từ trong list
      shuffleArray(listWord.value)
    } catch (err) {
      showError(err)
    } finally {
      loading.close()
    }
  }
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}
function openDialog(id = false) {
  studyCustom.value = id
  showDialog.value = true
}
function closeDialog() {
  showDialog.value = false
}
function handleFinish(isFinish, word) {
  const index = listWord.value.findIndex(s => s.id === word.id)
  listWord.value.splice(index, 1)
  if (!isFinish) {
    // chuyển xuống cuối mảng
    setTimeout(() => {
      listWord.value.push(word)
    })
  }
}
function editWord(item) {
  closeDialog()
  emits('edit', item)
}

defineExpose({
  openDialog
})
</script>

<style scoped>
</style>