<template>
  <div>
    <div class="header-text">ĐĂNG NHẬP</div>
    <el-form
        ref="formLogin"
        :model="formValues"
        :rules="rules"
        label-position="top"
    >
      <el-form-item
          label="Tên đăng nhập"
          prop="username">
        <el-input
            v-model="formValues.username"
            type="text"
            placeholder="Tên đăng nhập"
            maxlength="20"
            show-word-limit
            clearable
        />
      </el-form-item>
      <el-form-item
          label="Mật khẩu"
          prop="password">
        <el-input
            v-model="formValues.password"
            type="password"
            placeholder="Mật khẩu"
            maxlength="20"
            show-word-limit
            clearable
        />
      </el-form-item>
      <div style="text-align: center">
        <el-button
            :loading="loadingLoginBtn"
            type="success"
            @click="login(formLogin)"
        >
          <span>Đăng nhập</span>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import {reactive, ref, unref} from "vue";
import {requiredRule} from "@/js/Validation";
import {callApi} from "@/js/ApiFactory";
import {API} from "@/js/ConstantApi";
import {saveToken} from "@/js/Token";
import {ALERT_TYPE, showAlert, showError} from "@/js/Alert";

const emits = defineEmits(['loginSuccess'])

const loadingLoginBtn = ref(false)
const formLogin = ref()
const formValues = ref({
  username: '',
  password: ''
})
const rules = reactive({
  username: requiredRule('Tên đăng nhập'),
  password: requiredRule('Mật khẩu')
})

const login = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      loadingLoginBtn.value = true
      callApi(API.LOGIN, {}, unref(formValues)).then(rs => {
        saveToken(rs)
        showAlert('Đăng nhập thành công', ALERT_TYPE.SUCCESS)
        emits('loginSuccess')
      }).catch(err => {
        showError(err)
      }).finally(() => {
        loadingLoginBtn.value = false
      })
    }
  })
}
</script>

<style scoped>
.header-text {
  font-family: Averta, serif;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}

</style>