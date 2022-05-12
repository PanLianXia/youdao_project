import { defineComponent, KeepAlive, onActivated, onBeforeMount, onBeforeUnmount, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onUnmounted, onUpdated, ref } from "vue";

export const LifeCycleExample01 = defineComponent({
    setup() {
        const toggle = ref(false)
        onUpdated(() => {
            console.log('update')
        })
        // 捕获异常
        onErrorCaptured((err) => {
            console.log('err', err)
        })
        // throw 'eee'

        return () => <div>
            <button onClick={() => {
                toggle.value = !toggle.value
            }}>click</button>
            {toggle.value &&  <A />}
        </div>
    }
})

const A = defineComponent({
    setup() {
        onMounted(() => {
            console.log('mounted')
        })
        onBeforeMount(() => {
            console.log('beforeMount')
        })
        // 组件销毁
        onBeforeUnmount(() => {
            console.log('beforeUnmount')
        })
        onUnmounted(() => {
            console.log('unmounted')
        })
        return () => <div>我是A</div>
    }
})


export const LifeCycleExample02 = defineComponent({
    setup() {
        const c = ref(0)
        onRenderTriggered((x) => {
            console.log('trigger', x)
        })
        onRenderTracked((x) => {
            console.log('track', x)
        })
        return () => <div onClick={() => {
            c.value++
        }}>
            {c.value}
        </div>
    }
})

export const LifeCycleExample03 = defineComponent({
    setup() {
        const toggle = ref(false)

        return () => <div>
            <button onClick={() => {
                toggle.value = !toggle.value
            }}>click</button>
            <KeepAlive>
                {toggle.value && <B />}
            </KeepAlive>
        </div>
    }
})

const B = defineComponent({
    setup() {
        const count = ref(0)
        onUnmounted(() => {
            console.log('B Unmounted')
        })
        onActivated(() => {
            console.log('B active')
        })
        onDeactivated(() => {
            console.log('B deActive')
        })
        return () => <div>
            <button onClick={() => {
                count.value++
            }}>+</button>
            我是{count.value}
        </div>
    }
})