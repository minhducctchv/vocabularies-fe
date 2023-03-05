export function requiredRule(label, trigger) {
    return {
        required: true,
        message: `${label} là bắt buộc`,
        trigger: trigger || ['change', 'blur']
    }
}