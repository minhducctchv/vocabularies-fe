<script setup>
import LoginForm from "@/components/login/LoginForm.vue";
import {onMounted, ref} from "vue";
import {getToken} from "@/js/Token";
import {callApi} from "@/js/ApiFactory";
import TokenHetHanDialog from "@/components/login/dialog/TokenHetHanDialog.vue";
import {API} from "@/js/ConstantApi";
import Table from '@/components/vocabulary/table/index.vue'
import {screenLoading} from "@/js/Loading";

const showLogin = ref(true)
const tokenHetHanDialog = ref()
let timeoutLogin = null

onMounted(() => {
  // khi mới vào app thì check xem token còn hạn ko
  checkToken()
})
const handleLogin = () => {
  showLogin.value = false

  // 2h sau khi login thì bắt login lại
  if (timeoutLogin) {
    clearTimeout(timeoutLogin)
  }
  timeoutLogin = setTimeout(() => {
    handleHetHan()
  }, 1000*60*60*2)
}

const handleHetHan = () => {
  showLogin.value = true
  tokenHetHanDialog.value.openDialog()
}
const checkToken = () => {
  const token = getToken()
  if (token) {
    const loading = screenLoading()
    callApi(API.CHECK_TOKEN, {
      token: token
    }).then(() => {
      showLogin.value = false
    }).catch(() => {
      handleHetHan()
    }).finally(() => {
      loading.close()
    })
  } else {
    handleHetHan()
  }
}

</script>

<template>
  <LoginForm
    v-if="showLogin"
    @login-success="handleLogin"
  />
  <div v-else>
<!--    toàn bộ componet + dialog sau khi đăng nhập mới access được thì đặt trong này-->
    <Table />
  </div>

  <TokenHetHanDialog ref="tokenHetHanDialog"/>
</template>

<style scoped>
</style>
