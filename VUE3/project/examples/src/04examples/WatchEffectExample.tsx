import { defineComponent, onUnmounted, ref, watchEffect } from "vue";

export const WatchExamples01 = defineComponent({
    setup() {
        const count = ref(0)
        // 观察副作用(会先执行一次收集依赖)
        watchEffect(() => {
            console.log('watch')
            document.title = "count:"+count.value
        })

        return () => {
            return <div>
                <button onClick={() => {count.value++}}>+</button>
                {count.value}
            </div>
        }
    }
})

/**
 * watchEffect和render执行顺序
 */
export const WatchExamples02 = defineComponent({
    setup() {
        const count = ref(0)
        // 观察副作用(会先执行一次收集依赖)
        watchEffect(() => {
            console.log('watch')
        },{flush: "post"})
        // sync 同步执行，count.value变化的第一时间，就在set当中尽量最快速度触发，不需要调度
        // tick 相当于settimeout
        // pre 
        // render
        // post

        return () => {
            console.log('render...')
            return <div>
                <button onClick={() => {count.value++}}>+</button>
                {count.value}
            </div>
        }
    }
})

/**
 * 副作用失效
 */
export const WatchExamples03 = defineComponent({
    setup() {
        const count = ref(0)
        // 观察副作用(会先执行一次收集依赖)
        watchEffect((onInvalidate) => {
            console.log(count.value)
            // 没有上边的console log watchEffect只会执行一次
            let I = setInterval(() => {
                count.value++
            }, 1000)
            // vue对于副作用失效问题的处理
            onInvalidate(() => {
                clearInterval(I)
            })
            // console.log('watch', count.value)
        })

        return () => {
            return <div>
                {count.value}
            </div>
        }
    }
})

export const WatchExamples04 = defineComponent({
    setup() {
        const count = ref(0)
        // 观察副作用(会先执行一次收集依赖)
        // const stop = watchEffect(() => {
        //     console.log(count.value)
        //     setInterval(() => {
        //         count.value++
        //     }, 1000)
        //     // console.log('watch', count.value)
        // })

        // stop()

        let I = setInterval(() => {
            count.value ++
        }, 1000)

        onUnmounted(() => {
            clearInterval(I)
        })

        return () => {
            return <div>
                {count.value}
            </div>
        }
    }
})