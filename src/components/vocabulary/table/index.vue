<template>
  <div>
    <SearchForm ref="refSearch" @search="handleSearch" />
    <ListVocabularies ref="refTable" :form-search="formSearch" @command="handleTableCommand" @study="showStudy" @studyCustom="handleStudyCustom"/>
    <DetailDialog ref="refDetailDialog" @search="handleCloseDialog" />
    <StudyDialog ref="refStudyDialog" @edit="handleEditWord"/>
  </div>
</template>

<script setup>
import SearchForm from '@/components/vocabulary/table/SearchForm.vue'
import ListVocabularies from '@/components/vocabulary/table/ListVocabularies.vue'
import { provide, ref, unref } from 'vue'
import DetailDialog from '@/components/vocabulary/dialog/DetailDialog.vue'
import StudyDialog from "@/components/vocabulary/dialog/StudyDialog.vue";
import { FORM_MODE } from '@/const/const'

const loadingSearch = ref(false)
const formSearch = ref({})
const refSearch = ref()
const refTable = ref()
const refDetailDialog = ref()
const refStudyDialog = ref()

provide('loadingSearch', {
  loadingSearch,
  updateLoadingSearch: (val) => {
    loadingSearch.value = val
  }
})

function handleSearch(val) {
  formSearch.value = unref(val)
  setTimeout(() => {
    refTable.value.search()
  })
}
function handleTableCommand(row, mode) {
  refDetailDialog.value.openDialog(row, mode)
}
function handleCloseDialog() {
  refSearch.value.onSearch()
}
function showStudy() {
  refStudyDialog.value.openDialog()
}
function handleStudyCustom(row) {
  refStudyDialog.value.openDialog(row)
}
function handleEditWord(item) {
  refDetailDialog.value.openDialog(item, FORM_MODE.EDIT)
}
</script>

<style scoped>

</style>