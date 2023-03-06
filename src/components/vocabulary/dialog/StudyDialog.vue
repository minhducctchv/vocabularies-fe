<template>
  <Dialog
      v-model="showDialog"
      title="Học từ"
  >
    <el-carousel indicator-position="outside" :autoplay="false">
      <el-carousel-item v-for="item in listWord" :key="item.id">
        <StudyWord :word="item" />
      </el-carousel-item>
    </el-carousel>
  </Dialog>
</template>

<script setup>
import Dialog from "@/components/common/Dialog.vue";
import {onMounted, ref, watch} from "vue";
import {callApi} from "@/js/ApiFactory";
import {API} from "@/js/ConstantApi";
import {screenLoading} from "@/js/Loading";
import StudyWord from "@/components/vocabulary/dialog/StudyWord.vue";

const showDialog = ref(false)
const listWord = ref([])

watch(showDialog, (val) => {
  if (val) {
    setTimeout(() => {
      findWord()
    })
  }
})
async function findWord() {
  // tìm về 100 từ sort theo level thấp
  const loading = screenLoading()
  const rs = await callApi(API.VOCA_SEARCH, {
    page: 0,
    size: 50,
    direction: 'ASC',
    properties: 'level'
  })
  listWord.value = rs.content
  loading.close()
  if (listWord.value.length < 1) return
  // filter lấy ra tập hợp từ có level = từ đầu tiên
  listWord.value = listWord.value.filter(item => item.level === listWord.value[0].level)
  // xáo trộn các từ trong list
  shuffleArray(listWord.value)
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function openDialog() {
  showDialog.value = true
}

defineExpose({
  openDialog
})
</script>

<style scoped>
</style>