import { defineComponent, reactive, toRefs } from "vue";
// 定义组件可以用一个箭头函数，但是箭头函数没法用响应式值，所以用setup函数
export const ReactiveExample01 = defineComponent({
    setup() {
        const state = reactive<{a: number, b: number}>({
            a: 1, 
            b: 2
        })
        setTimeout(() => {
            state.a = 456
        }, 1000);
        setTimeout(() => {
            state.b = 100
        }, 2000);
        return () => {
            return <div>
                <div>{state.a}</div>
                <div>{state.b}</div>
            </div>
        }
    }
})

// reactive值通过toRefs转化成ref值
export const ReactiveExample02 = defineComponent({
    setup() {
        const state = reactive<{a: number, b: number}>({
            a: 1, 
            b: 2
        })

        const {a, b} = toRefs(state)
        setTimeout(() => {
            a.value = 456
        }, 1000);
        setTimeout(() => {
            b.value = 100
        }, 2000);
        return () => {
            return <div>
                <div>{a.value}</div>
                <div>{b.value}</div>
            </div>
        }
    }
})