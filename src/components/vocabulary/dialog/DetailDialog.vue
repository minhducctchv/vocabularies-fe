<template>
  <Dialog
    v-model="showDialog"
    :title="title"
    top="5vh"
  >
    <el-form
      ref="refForm"
      :model="formValues"
      :rules="isView ? {} : rules"
      label-position="top"
    >
      <el-row :gutter="gutter">
        <el-col v-bind="fnResponsive(12)">
          <el-form-item
            label="Từ"
            prop="word"
          >
            <el-input
              v-if="!isView"
              v-model="formValues.word"
              type="text"
              maxlength="80"
              placeholder="Từ"
              show-word-limit
              clearable
            />
            <span v-else>{{ formValues.word }}</span>
          </el-form-item>
        </el-col>
        <el-col v-bind="fnResponsive(12)">
          <el-form-item
            label="Pronunciation"
            prop="pronunciation"
          >
            <el-input
              v-if="!isView"
              v-model="formValues.pronunciation"
              type="text"
              maxlength="50"
              show-word-limit
              placeholder="Pronunciation"
              clearable
            />
            <span v-else>{{ formValues.pronunciation }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-alert
        v-if="listItemDuplicate.length > 0"
        title="Từ đã tồn tại"
        type="error"
        :closable="false"
        style="margin-bottom: 8px"
      >
        <el-button
          v-for="item in listItemDuplicate"
          type="primary"
          link
          @click="handleEditOther(item)"
        >
          Word: [{{ item.word }}] - id: [{{ item.id }}]
        </el-button>
      </el-alert>
      <el-row :gutter="gutter">
        <el-col v-bind="fnResponsive(12)">
          <el-form-item
            label="Loại từ"
            prop="type"
          >
            <el-select
              v-if="!isView"
              v-model="formValues.type"
              placeholder="Loại từ"
              style="width: 100%"
              clearable
              @change="validateField('type')"
              @blur="validateField('type')"
            >
              <el-option
                v-for="item in WORD_TYPE"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
            <span v-else>{{ WORD_TYPE[formValues.type]?.value }}</span>
          </el-form-item>
        </el-col>
        <el-col v-bind="fnResponsive(12)">
          <el-form-item
            label="Level"
            prop="level"
          >
            <el-input
              v-if="!isView"
              v-model="formValues.level"
              type="text"
              maxlength="50"
              disabled
              show-word-limit
              placeholder="Level"
              clearable
            />
            <span v-else>{{ formValues.level }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="gutter">
        <el-col v-bind="fnResponsive(24)">
          <el-form-item
            label="Link mp3"
            prop="linkMp3"
          >
            <el-row :gutter="10" style="width: 100%">
              <el-col v-if="!isView" :span="18">
                <el-input
                  v-model="formValues.linkMp3"
                  type="text"
                  maxlength="255"
                  show-word-limit
                  placeholder="Link mp3"
                  clearable
                />
              </el-col>
              <el-col v-if="formValues.linkMp3" :span="6">
                <el-button
                  :loading="loadingBtnPlay"
                  plain
                  type="primary"
                  :icon="Headset"
                  @click="playMp3(formValues.linkMp3)"
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="gutter">
        <el-col v-bind="fnResponsive(24)">
          <el-form-item
            label="Link image"
            prop="linkImage"
          >
            <el-row :gutter="10" style="width: 100%">
              <el-col v-if="!isView" :span="18">
                <el-input
                  v-model="formValues.linkImage"
                  type="text"
                  maxlength="255"
                  show-word-limit
                  placeholder="Link image"
                  clearable
                />
              </el-col>
              <el-col v-if="formValues.linkImage" :span="6">
                <div>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="formValues.linkImage"
                    :preview-src-list="[formValues.linkImage]"
                    fit="cover"
                  />
                </div>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="gutter">
        <el-col v-bind="fnResponsive(24)">
          <el-form-item
            label="Gợi ý 1"
            prop="suggestion1"
          >
            <el-input
              v-if="!isView"
              v-model="formValues.suggestion1"
              type="text"
              maxlength="255"
              show-word-limit
              placeholder="Gợi ý 1"
              clearable
            />
            <span v-else>{{ formValues.suggestion1 }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="gutter">
        <el-col v-bind="fnResponsive(24)">
          <el-form-item
            label="Gợi ý 2"
            prop="suggestion2"
          >
            <el-input
              v-if="!isView"
              v-model="formValues.suggestion2"
              type="text"
              maxlength="255"
              show-word-limit
              placeholder="Gợi ý 2"
              clearable
            />
            <span v-else>{{ formValues.suggestion2 }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="gutter">
        <el-col v-bind="fnResponsive(24)">
          <el-form-item
            label="Ý nghĩa"
            prop="meaning"
          >
            <el-input
              v-if="!isView"
              v-model="formValues.meaning"
              type="textarea"
              maxlength="500"
              :autosize="{ minRows: 2, maxRows: 4 }"
              show-word-limit
              placeholder="Ý nghĩa"
              clearable
            />
            <span v-else style="white-space: pre-line;">{{ formValues.meaning }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div style="text-align: center">
        <el-button @click="closeDialog">
          Hủy bỏ
        </el-button>
        <el-button
          v-if="!isView"
          type="primary"
          @click="onSave"
        >
          Lưu
        </el-button>
        <el-button
          v-if="mode !== FORM_MODE.CREATE"
          type="danger"
          @click="onDelete"
        >
          Xóa
        </el-button>
      </div>
    </template>
    <DuplicateDialog ref="refDuplicateDialog" @save="onSave" @edit="handleEditOther" />
  </Dialog>

</template>

<script setup>
import Dialog from '@/components/common/Dialog.vue'
import { computed, ref, unref, watch } from 'vue'
import { cloneDeep, debounce } from 'lodash'
import { FORM_MODE, WORD_TYPE } from '@/const/const'
import { useResponsive } from '@/hook/Responsive'
import { ALERT_TYPE, showAlert, showConfirm, showError } from '@/js/Alert'
import { Headset } from '@element-plus/icons-vue'
import { requiredRule } from '@/js/Validation'
import { screenLoading } from '@/js/Loading'
import { API } from '@/js/ConstantApi'
import { callApi } from '@/js/ApiFactory'
import DuplicateDialog from '@/components/vocabulary/dialog/DuplicateDialog.vue'

const { fnResponsive } = useResponsive()

const emits = defineEmits(['search'])

const INIT_FORM = {
  'level': 0,
  'linkImage': '',
  'linkMp3': '',
  'meaning': '',
  'pronunciation': '',
  'suggestion1': '',
  'suggestion2': '',
  'type': '',
  'word': ''
}
const gutter = 20
const refForm = ref()
const showDialog = ref(false)
const formValues = ref(INIT_FORM)
const mode = ref('')
const title = ref('')
const refDuplicateDialog = ref()
const listItemDuplicate = ref([])
const rules = ref({
  word: [requiredRule('Từ')],
  pronunciation: [requiredRule('Pronunciation')],
  type: [requiredRule('Loại từ')],
  level: [requiredRule('Level')],
  meaning: [requiredRule('Ý nghĩa')]
})
const loadingBtnPlay = ref(false)

const isView = computed(() => {
  return unref(mode) === FORM_MODE.VIEW
})

watch(() => formValues.value.word, debounce(async(val) => {
  listItemDuplicate.value = await getListDuplicateWord(val, unref(formValues).id, false)
}, 1000))

async function openDialog(row, formMode) {
  if (row) {
    const loading = screenLoading()
    try {
      formValues.value = await callApi(API.VOCA_GET_ONE, { id: row.id })
    } catch (err) {
      showError(err)
    } finally {
      loading.close()
    }
  } else {
    formValues.value = cloneDeep(INIT_FORM)
  }
  mode.value = formMode
  title.value = `${unref(mode) === FORM_MODE.CREATE ? 'Thêm mới' : (unref(mode) === FORM_MODE.EDIT ? 'Cập nhật' : 'Xem')} từ vựng`
  showDialog.value = true
  listItemDuplicate.value = []
}

function closeDialog() {
  showDialog.value = false
}

async function onSave(isCheckDup = true) {
  try {
    await refForm.value.validate()
    const payload = unref(formValues)
    if (isCheckDup) {
      const duplicateItem = await getListDuplicateWord(payload.word, payload.id)
      if (duplicateItem.length > 0) {
        refDuplicateDialog.value.openDialog(duplicateItem)
        return
      }
    }
    const loading = screenLoading()
    callApi(payload.id ? API.VOCA_UPDATE : API.VOCA_CREATE, {}, payload).then(() => {
      showAlert(`${payload.id ? 'Cập nhật' : 'Thêm mới'} thành công`)
      closeDialog()
      emits('search', true)
    }).catch(err => {
      showError(err)
    }).finally(() => {
      loading.close()
    })
  } catch {
    // do nothing
  }
}

function playMp3(linkMp3) {
  loadingBtnPlay.value = true
  const audio = new Audio(linkMp3)
  audio.addEventListener('ended', () => {
    loadingBtnPlay.value = false
  })
  audio.play().catch(() => {
    showAlert('Đã có lỗi không thể phát MP3', ALERT_TYPE.ERROR)
    loadingBtnPlay.value = false
  })
}

function validateField(field) {
  refForm.value.validateField(field)
}

async function getListDuplicateWord(word, id, isLoading = true) {
  const loading = !isLoading ? null : screenLoading()
  try {
    const listDuplicateItem = await callApi(API.VOCA_FIND_BY_WORD, { word: word })
    if (listDuplicateItem && listDuplicateItem.length > 0 && unref(mode) === FORM_MODE.CREATE) {
      return listDuplicateItem
    }
    if (id && unref(mode) === FORM_MODE.EDIT && listDuplicateItem && listDuplicateItem.length > 0) {
      const listDup = listDuplicateItem.filter(item => item.id !== id)
      if (listDup.length > 0) return listDup
    }
  } catch (err) {
    showError(err)
  } finally {
    if (loading) loading.close()
  }
  return []
}

function handleEditOther(item) {
  mode.value = FORM_MODE.EDIT
  formValues.value = cloneDeep(item)
  listItemDuplicate.value = []
}

function onDelete() {
  showConfirm('Bạn có chắc chắn muốn xóa?', () => {
    const loading = screenLoading()
    callApi(API.VOCA_DELETE, { id: unref(formValues).id }).then(() => {
      showAlert('Xóa thành công')
      closeDialog()
      emits('search', true)
    }).catch(err => {
      showError(err)
    }).finally(() => {
      loading.close()
    })
  })
}

defineExpose({
  openDialog,
  closeDialog,
  playMp3,
  handleEditOther
})
</script>

<style scoped>

</style>