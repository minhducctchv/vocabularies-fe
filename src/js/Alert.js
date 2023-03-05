import {ElMessage} from "element-plus";

export const ALERT_TYPE = {
    DEFAULT: '',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
}

export const showAlert = (mess, type) => {
    ElMessage({
        showClose: true,
        message: mess,
        type: type,
    })
}

export const showError = (err) => {
    ElMessage({
        showClose: true,
        message: err.response.data.message,
        type: ALERT_TYPE.ERROR,
    })
}

