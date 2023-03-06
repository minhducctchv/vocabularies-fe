export function requiredRule(label, trigger) {
    return {
        required: true,
        message: `${label} là bắt buộc`,
        trigger: trigger || ['change', 'blur']
    }
}

const REGEX_NUMBER_ONLY = /^[0-9]*$/
export function numberRule(label, trigger) {
    return {
        pattern: REGEX_NUMBER_ONLY,
        message: `${label} là kiểu số`,
        trigger: trigger || ['change', 'blur']
    }
}