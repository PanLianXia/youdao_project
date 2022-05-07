import { defineComponent,PropType,Ref,ref } from "vue";
// 定义组件可以用一个箭头函数，但是箭头函数没法用响应式值，所以用setup函数
export const RefExample01 = defineComponent({
    setup() {
        const count = ref(0)
        console.log('setup只执行一次')
        return () => {
            console.log('render函数每次都会执行')
            return <div>
                <button onClick={() => {count.value++}}>+</button>
                {/* 进行跟踪 */}
                {count.value}
                </div>
        }
    }
})

export const RefExample02 = defineComponent({
    setup() {
        const count = ref(0)
        console.log('setup只执行一次')
        return () => {
            console.log('render函数每次都会执行', count.value)
            return <div>
                <button onClick={() => {count.value++}}>+</button>
                {/* 进行跟踪 */}
                {/* {count.value} */}
                </div>
        }
    }
})

export const RefExample03 = defineComponent({
    setup() {
        const count = ref(0)
        console.log('setup只执行一次')
        return () => {
            console.log('render函数每次都会执行')
            return <div>
                <button onClick={() => {count.value++}}>+</button>
                {/* 进行跟踪 */}
                <Counter count={count}/>
                <Counter1 count={count}/>
                </div>
        }
    }
})

const Counter = ({count}: {count: Ref<number>}) => {
    console.log('重新绘制')
    return <div>{count.value}</div>
}
const Counter1 = defineComponent({
    props: {
        count: {
            type: Object as PropType<Ref<number>>,
            required: true
        }
    },
    setup(props) {
        console.log('重新绘制setup')
        return () => {
            console.log('重新绘制setup return')
            return <div>{props.count.value}</div>
        }
    }
})