import { defineComponent, ref, watch } from "vue";

export const watchExample01 = defineComponent({
    setup() {
        const count = ref(0)
        watch(count, () => {
            console.log('count', count.value)
        })
        setTimeout(() => {
            count.value ++
        }, 1000)
        return () => {
            return <div>
                {count.value}
            </div>
        }
    }
})
/**
 * watch可以监听多个值
 */
export const watchExample02 = defineComponent({
    setup() {
        const a = ref(0)
        const b = ref(0)
        const c = ref(a.value + b.value)

        watch([a, b], (x, y) => {
            c.value = a.value + b.value
        })
        setInterval(() => {
            a.value += 0.2
        }, 500)
        setInterval(() => {
            b.value += 0.7
        }, 700)
        return () => {
            return <div>
                {c.value}
            </div>
        }
    }
})

/**
 * 单纯watch属性的变化
 */
export const watchExample03 = defineComponent({
    setup() {
        const greetings = ref('hello')
        setTimeout(() => {
            greetings.value = 'world'
        }, 1000);
        return () => <div>
                <Item text={greetings.value} />
            </div>
    }
})

// const Item = ({text}:{text: string}) => {
//     return <div>{text}</div>
// }
const Item = defineComponent({
    props: {
        text: {
            type: String
        }
    },
    setup(props) {
        watch(() => props.text, (to, from) => {
            console.log("prop changed to", to)
        })
        return () => {
            return <div>{props.text}</div>
        }
    }
})

/**
 * watch的执行时机
 */
export const watchExample04 = defineComponent({
    setup() {
        const c = ref(0)

        watch(c, () => {
            console.log('here--')
        }, {
            // 一边不用，除非特殊情况
            immediate: true
        })

        return () => <div onClick={() => {c.value++}}>
            {c.value}
        </div>
    }
})