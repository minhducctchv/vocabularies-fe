<script setup>
import LoginForm from "@/components/login/LoginForm.vue";
import {onMounted, ref} from "vue";
import {getToken} from "@/js/Token";
import {callApi} from "@/js/ApiFactory";
import TokenHetHanDialog from "@/components/login/dialog/TokenHetHanDialog.vue";
import {API} from "@/js/ConstantApi";

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
  const token = getToken().token
  if (token) {
    callApi(API.CHECK_TOKEN, {
      token: token
    }).catch(() => {
      handleHetHan()
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
  </div>

  <TokenHetHanDialog ref="tokenHetHanDialog"/>
</template>

<style scoped>
</style>
