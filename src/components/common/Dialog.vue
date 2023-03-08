<template>
  <el-dialog
      v-bind="$attrs"
      v-model="dialogVisible"
      :width="width"
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      :before-close="handleClose"
  >
    <slot/>
    <template v-if="$attrs.title" #header>
      <slot name="header"/>
    </template>
    <template #footer>
      <slot name="footer"/>
    </template>
  </el-dialog>
</template>

<script setup>
import {computed} from "vue";
import {windowWidthHeight} from "@/js/WindowWidthHeight";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
const width = computed(() => {
  return windowWidthHeight.value.width > 1600 ? '30%' :
      (windowWidthHeight.value.width > 1280 ? '40%' :
          (windowWidthHeight.value.width > 800 ? '60%' : (windowWidthHeight.value.width > 720 ? '80%' : '100%')))
})

function handleClose() {
  dialogVisible.value = false
}
</script>

<style scoped>

</style>