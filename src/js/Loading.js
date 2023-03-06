import { ElLoading } from 'element-plus'

export const screenLoading = () => {
  return ElLoading.service({
    lock: true,
    text: 'Đang load',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}