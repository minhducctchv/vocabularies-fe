<template>
  <el-form
    ref="refFormSearch"
    :model="formSearch"
    :rules="rules"
    label-position="top"
  >
    <el-row :gutter="gutter">
      <el-col v-bind="fnResponsive(12)">
        <el-form-item
          label="Từ"
          prop="word"
        >
          <el-input
            v-model="formSearch.word"
            type="text"
            maxlength="80"
            show-word-limit
            clearable
            placeholder="Từ"
          />
        </el-form-item>
      </el-col>
      <el-col v-bind="fnResponsive(12)">
        <el-form-item
          label="Nghĩa"
          prop="meaning"
        >
          <el-input
            v-model="formSearch.meaning"
            type="text"
            maxlength="255"
            show-word-limit
            clearable
            placeholder="Nghĩa"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="Tìm kiếm nâng cao" name="1">
        <el-row :gutter="gutter">
          <el-col v-bind="fnResponsive(12)">
            <el-form-item
              label="Level"
              prop="level"
            >
              <el-input
                v-model="formSearch.level"
                type="text"
                maxlength="3"
                show-word-limit
                clearable
                placeholder="Level"
              />
            </el-form-item>
          </el-col>
          <el-col v-bind="fnResponsive(12)">
            <el-form-item
              label="Loại từ"
              prop="type"
            >
              <el-select v-model="formSearch.type" placeholder="Loại từ" style="width: 100%" clearable>
                <el-option
                  v-for="item in wordType"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="gutter">
          <el-col v-bind="fnResponsive(12)">
            <el-form-item
              label="Pronunciation"
              prop="pronunciation"
            >
              <el-input
                v-model="formSearch.pronunciation"
                type="text"
                maxlength="50"
                show-word-limit
                clearable
                placeholder="Pronunciation"
              />
            </el-form-item>
          </el-col>
          <el-col v-bind="fnResponsive(12)">
            <el-form-item
              label="Gợi ý"
              prop="suggestion1"
            >
              <el-input
                v-model="formSearch.suggestion1"
                type="text"
                maxlength="200"
                show-word-limit
                clearable
                placeholder="Gợi ý"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align: right">
          <el-button
            :loading="loadingSearch"
            :icon="Search"
            type="primary"
            @click="onSearch"
          >
            Tìm kiếm
          </el-button>
          <el-button
            :icon="RefreshLeft"
            @click="onReset"
          >
            Xóa tìm kiếm
          </el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
import { useResponsive } from '@/hook/Responsive'
import { WORD_TYPE } from '@/const/const'
import { RefreshLeft, Search } from '@element-plus/icons-vue'
import { debounce } from 'lodash'
import { numberRule } from '@/js/Validation'

const { fnResponsive } = useResponsive()

const emits = defineEmits(['search'])

const { loadingSearch } = inject('loadingSearch');
const gutter = 20
const activeNames = ref('')
const wordType = ref(WORD_TYPE)
const refFormSearch = ref()
const formSearch = ref({
  word: '',
  meaning: '',
  level: '',
  pronunciation: '',
  suggestion1: '',
  type: ''
})
const rules = ref({
  level: [numberRule('Level')]
})

watch(
  () => [formSearch.value.word, formSearch.value.meaning],
  debounce(() => {
    onSearch()
  }, 500)
)

async function onSearch() {
  try {
    await refFormSearch.value.validate()
    emits('search', formSearch)
  } catch {
    // do nothing
  }
}

function onReset() {
  refFormSearch.value.resetFields()
}
</script>

<style scoped>
</style>