import { ElMessage, ElMessageBox } from 'element-plus'

export const ALERT_TYPE = {
  DEFAULT: '',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

export const showAlert = (mess, type = ALERT_TYPE.SUCCESS) => {
  ElMessage({
    showClose: true,
    message: mess,
    type: type
  })
}

export const showError = (err) => {
  ElMessage({
    showClose: true,
    message: err.response.data.message,
    type: ALERT_TYPE.ERROR
  })
}

export const showConfirm = (mess, callback, title = 'Chú ý', confirmText = 'Đồng ý', cancelText = 'Từ chối', type = ALERT_TYPE.WARNING) => {
  ElMessageBox.confirm(
    mess,
    title,
    {
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      type: type
    }
  )
    .then(callback)
}

