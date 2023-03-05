import {ref} from "vue";

export const windowWidthHeight = ref({
    width: window.innerWidth,
    height: window.innerHeight
})

export function windowResizeListener() {
    window.addEventListener("resize", () => {
        windowWidthHeight.value.width = window.innerWidth
        windowWidthHeight.value.height = window.innerHeight
    });
}

