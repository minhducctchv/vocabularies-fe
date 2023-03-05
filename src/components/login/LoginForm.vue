<template>
  <div>
    <div class="header-text">ĐĂNG NHẬP</div>
    <el-form
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
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {ref} from "vue";

const formValues = ref({
  username: '',
  password: ''
})

const rules = {}
</script>

<style scoped>
.header-text {
  font-family: Averta,serif;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}

</style>