<template>
  <div>
    <el-scrollbar height="520px">
      <el-card>
        <div style="text-align: center">
      <span
        v-for="(letter, key) in remainingLetter"
        :key="key"
        class="letter-style mau-blue"
      >
        <el-icon v-if="letter === ' '"><StarFilled /></el-icon><span v-else>{{ letter }}</span>
      </span>
          <span class="word-type">({{ WORD_TYPE[props.word.type]?.value }})</span>
        </div>
        <div style="text-align: center">
          <span>{{ props.word.pronunciation }}</span>
        </div>
        <div v-if="props.word.linkMp3" style="text-align: center; margin-top: 10px">
          <el-button
            :loading="loadingBtnPlay"
            plain
            type="primary"
            :class="{ 'background-red': props.word.linkMp3 === 'a' }"
            :icon="VideoPlay"
            @click="playMp3(props.word.linkMp3)"
          />
        </div>
        <div style="text-align: center">
      <span
        v-for="(letter, key) in showWordInput"
        :key="key"
        :class="{ 'letter-style': true, 'mau-xanh': inputColor === 'xanh', 'mau-do': inputColor === 'do'}"
      >
        {{ letter }}
      </span>
        </div>
        <el-input
          v-model="wordInput"
          :maxlength="word.word.length"
          show-word-limit
          @keydown="preventChar"
        />
      </el-card>
      <div style="height: 20px" />
      <el-card v-if="props.word.suggestion1 || props.word.suggestion2 || props.word.linkImage">
        <el-form-item v-if="props.word.suggestion1" label="Gợi ý 1:">
          <div>{{ isShowAnswer ? props.word.suggestion1 : replaceKeyWord(props.word.suggestion1) }}</div>
        </el-form-item>
        <el-form-item v-if="props.word.suggestion2 && isShowAnswer" label="Gợi ý 2:">
          <div>{{ isShowAnswer ? props.word.suggestion2 : replaceKeyWord(props.word.suggestion2) }}</div>
        </el-form-item>
        <div v-if="props.word.linkImage" style="text-align: center">
          <el-image
            style="width: 300px; height: auto"
            :src="props.word.linkImage"
            :preview-src-list="[props.word.linkImage]"
            fit="cover"
          />
        </div>
      </el-card>
      <div style="height: 20px" />
      <el-card v-if="isShowAnswer">
        <div style="text-align: center">
          <span class="letter-style" style="color: #005aff">{{ props.word.word }}</span>
        </div>
        <div style="text-align: center">
          <span style="font-style: italic; font-size: 16px; white-space: pre-line;">{{ props.word.meaning }}</span>
        </div>
      </el-card>
    </el-scrollbar>
    <div style="text-align: center; margin-top: 20px">
      <el-button
        type="default"
        @click="editWord"
      >
        Sửa
      </el-button>
      <el-button
        v-if="!isShowAnswer"
        type="warning"
        @click="showAnswer"
      >
        Xem đáp án
      </el-button>
      <el-button
        v-if="isShowAnswer"
        :icon="Close"
        @click="skip"
      >
        Bỏ qua
      </el-button>
      <el-button
        v-if="isShowAnswer"
        type="success"
        :icon="Select"
        @click="finish"
      >
        Xong
      </el-button>
      <div style="margin-top: 10px; font-size: 16px">
        Số lần đã học: <span style="font-size: 20px; font-weight: bold; color: darkslateblue">{{ props.word.level
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, unref, watch } from 'vue'
import { ALERT_TYPE, showAlert, showConfirm, showError } from '@/js/Alert'
import { Close, Select, StarFilled, VideoPlay } from '@element-plus/icons-vue'
import { WORD_TYPE } from '@/const/const'
import { callApi } from '@/js/ApiFactory'
import { screenLoading } from '@/js/Loading'
import { API } from '@/js/ConstantApi'
import {getMp3} from "@/js/GetMp3";

const emits = defineEmits(['finish', 'edit'])

const props = defineProps({
  word: {
    type: Object,
    required: true
  }
})

const wordInput = ref('')
const loadingBtnPlay = ref(false)
const isShowAnswer = ref(false)

const remainingLetter = computed(() => {
  const wordArr = unref(props.word.word).split('').sort()
  const wordInputArr = unref(wordInput).split('')
  wordInputArr.forEach((s) => {
    const index = wordArr.findIndex(item => item === s)
    wordArr.splice(index, 1)
  })
  return wordArr
})
const showWordInput = computed(() => {
  const wordArr = unref(props.word.word).split('')
  const wordInputArr = unref(wordInput).split('')
  while (wordInputArr.length < wordArr.length) {
    wordInputArr.push('_')
  }
  return wordInputArr
})
const inputColor = computed(() => {
  if (unref(wordInput).length === unref(props.word.word).length) {
    if (unref(wordInput) === unref(props.word.word)) {
      return 'xanh'
    } else {
      return 'do'
    }
  }
  return ''
})

watch(wordInput, (val) => {
  if (val.length === unref(props.word.word).length) {
    if (val === unref(props.word.word)) {
      showAlert('CHÚC MỪNG BẠN ĐÃ TRẢ LỜI ĐÚNG')
    } else {
      showAlert('SAI MẤT TIÊU RỒI', ALERT_TYPE.WARNING)
    }
  }
})

function preventChar(e) {
  if (e.key !== 'Unidentified') { // th máy tính (ko phải mobile)
    if (!(
      unref(remainingLetter).includes(e.key) ||
      ['Backspace', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Enter', 'NumLock',
        'Insert', 'Home', 'PageUp', 'Delete', 'End', 'PageDown', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
        'AudioVolumeMute', 'AudioVolumeDown', 'AudioVolumeUp',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(e.key)
    )) {
      showAlert(`Không có chữ [${e.key}]`, ALERT_TYPE.ERROR)
      e.preventDefault()
    }
  }
}

let mp3 = ''
async function playMp3(linkMp3) {
  loadingBtnPlay.value = true

  if (!linkMp3 || linkMp3 === 'a') {
    const word = unref(props.word)
    mp3 = await getMp3(props.word.word)
    if (!mp3) {
      loadingBtnPlay.value = false
      return
    }
    word.linkMp3 = mp3
    callApi(API.VOCA_UPDATE, {}, word).then(() => {
      showAlert('Thêm mp3 thành công')
    }).catch(err => {
      showError(err)
      loadingBtnPlay.value = false
    })
  }

  const audio = new Audio(linkMp3 ? linkMp3 : mp3)

  audio.addEventListener('ended', () => {
    loadingBtnPlay.value = false
  })
  audio.play().catch(() => {
    showAlert('Đã có lỗi không thể phát MP3', ALERT_TYPE.ERROR)
    loadingBtnPlay.value = false
  })
}

function showAnswer() {
  isShowAnswer.value = true
}

function finish() {
  showConfirm('Bạn đã đoán đúng nghĩa của từ chưa?', () => {
    const loading = screenLoading()
    const word = unref(props.word)
    word.level = word.level + 1
    if (mp3) word.linkMp3 = mp3
    callApi(API.VOCA_UPDATE, {}, word).then(() => {
      showAlert(`Học xong từ: ${word.word}`)
      emits('finish', true, word)
    }).catch(err => {
      showError(err)
    }).finally(() => {
      loading.close()
    })
  })
}

function replaceKeyWord(str) {
  return str.replace(new RegExp(props.word.word, 'gi'), 'XXX')
  // g để replace all (thay vì first)
  // i để ko phân biệt hoa thường
}

function editWord() {
  showConfirm('Bạn có muốn sửa từ này?', () => {
    emits('edit', unref(props.word))
  })
}

function skip() {
  emits('finish', false, unref(props.word))
}
</script>

<style scoped>
.letter-style {
  margin: 5px;
  font-weight: bold;
  font-size: 30px;
}

.mau-blue {
  color: rgb(35, 50, 110);
}

.mau-xanh {
  color: rgba(21, 112, 5, 0.84);
}

.mau-do {
  color: rgba(157, 4, 4, 0.84);
}

.word-type {
  font-style: italic;
  color: #ed5e32;
}

.background-red {
  background-color: rgb(245, 187, 190);
}
</style>
