<template>
  <div>
    <div style="text-align: right">
      <el-button
        type="success"
        :icon="Plus"
        @click="onCreate"
        style="margin: 10px"
        >
        Thêm mới
      </el-button>
      <el-switch v-model="isShowMeaning" inactive-text="Show nghĩa" />
    </div>
    <el-table
      v-loading="loadingSearch"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="STT" type="index" width="50" />
      <el-table-column
        prop="word"
        label="Từ"
        minWidth="160"
      />
      <el-table-column
        prop="type"
        label="Loại"
        minWidth="160"
      />
      <el-table-column
        prop="pronunciation"
        label="Pronunciation"
        minWidth="160"
      />
      <el-table-column
        v-if="isShowMeaning"
        prop="meaning"
        label="Nghĩa"
        minWidth="160"
      />
      <el-table-column
        label="Thao tác"
        minWidth="100"
        fixed="right"
        align="center"
      >
        <template #default="scope">
          <Dropdown
            :row="scope.row"
            :items="items"
            @command="handleCommand"
          />
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: center; margin-top: 10px">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 50, 100]"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
    </div>
  </div>
</template>

<script setup>
import { inject, ref, unref } from 'vue'
import Dropdown from '@/components/common/Dropdown.vue'
import { Plus } from '@element-plus/icons-vue'
import { API } from '@/js/ConstantApi'
import { callApi } from '@/js/ApiFactory'
import { COMMAND, FORM_MODE } from '@/const/const'
import { showAlert, showConfirm, showError } from '@/js/Alert'
import { screenLoading } from '@/js/Loading'

const props = defineProps({
  formSearch: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['command'])

const { loadingSearch, updateLoadingSearch } = inject('loadingSearch');
const tableData = ref([])
const isShowMeaning = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const items = [
  { command: COMMAND.EDIT, label: 'Sửa' },
  { command: COMMAND.VIEW, label: 'Xem chi tiết' },
  { command: COMMAND.DELETE, label: 'Xóa' }
]

function handleCommand({ row, command }) {
  switch (command) {
    case COMMAND.EDIT:
      emits('command', row, FORM_MODE.EDIT)
      break
    case COMMAND.VIEW:
      emits('command', row, FORM_MODE.VIEW)
      break
    case COMMAND.DELETE:
      onDelete(row)
      break
  }
}
function onCreate() {
  emits('command', null, FORM_MODE.CREATE)
}
const handleSizeChange = (val) => {
  pageSize.value = val
  search()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  search()
}
function search() {
  const params = {
    ...unref(props.formSearch),
    page: unref(currentPage) - 1,
    size: unref(pageSize)
  }
  updateLoadingSearch(true)
  callApi(API.VOCA_SEARCH, params).then(rs => {
    tableData.value = rs.content
    total.value = rs.totalElements
  }).finally(() => {
    updateLoadingSearch(false)
  })
}
function onDelete(row) {
  showConfirm('Bạn có chắc chắn muốn xóa?', () => {
    const loading = screenLoading()
    callApi(API.VOCA_DELETE, { id: row.id }).then(() => {
      showAlert('Xóa thành công')
      search()
    }).catch(err => {
      showError(err)
    }).finally(() => {
      loading.close()
    })
  })
}

defineExpose({
  search
})
</script>

<style scoped>

</style>