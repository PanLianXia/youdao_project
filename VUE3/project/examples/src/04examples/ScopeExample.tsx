import { defineComponent, effectScope, ref, watch, reactive, toRefs, onUnmounted, onScopeDispose, EffectScope, Ref } from "vue";

export const ScopeExample01 = defineComponent({
    setup() {
        const scope = effectScope()
        const c = ref(0)
        scope.run(() => {
            watch(c, () => {
                console.log('watch effect', c.value)
            })
        })
        setInterval(() => {
            c.value++
        }, 300)
        setTimeout(() => {
            scope.stop() 
        }, 3000);
        return () => <div>{c.value}</div>
    }
})

/**
 * 嵌套的scope
 */
export const ScopeExample02 = defineComponent({
    setup() {
        const scope = effectScope()
        const c = ref(0)
        scope.run(() => {
            // subScope会随着scope的停止而停止
            const subScope = effectScope()
            // const subScope = effectScope(true) 吐过effectScope中的参数设置为true，则就不会随着父scope停止而停止
            subScope.run(() => {
                watch(c, () => {
                    console.log('watch effect', c.value)
                })
            })
        })
        setInterval(() => {
            c.value++
        }, 300)
        setTimeout(() => {
            scope.stop() 
        }, 3000);
        return () => <div>{c.value}</div>
    }
})

function useMouseMove() {
    const point = reactive({x: 0, y: 0})

    function handler(e: MouseEvent) {
        point.x = e.clientX
        point.y = e.clientY
        console.log('point update', point)
    }
    window.addEventListener('mousemove', handler)

    onScopeDispose(() => {
        window.removeEventListener('mousemove', handler)
    })

    return toRefs(point)
}

export const ScopeExample03 = defineComponent({
    setup() {
        let point: {
            x: Ref<number>,
            y: Ref<number>,
        } | null = null
        let scope:EffectScope | null = null
        const active = ref(false)
        watch(active, () => {
            if(active.value) {
                scope = effectScope()
                point = scope.run(() => useMouseMove())!
            } else {
                scope?.stop()
                point = null
            }
        })

        return () => <div>
            {active.value && <span>point is: {point?.x.value}, {point?.y.value}</span>}
            <button onClick={()=>{
                active.value = !active.value
            }}>toogle</button>
        </div>
    }
})


/**
 * 不使用scope去实现
 * @returns 
 */
function useMouseMove1() {
    const point = reactive({x: 0, y: 0})
    const active = ref(false)

    function handler(e: MouseEvent) {
        point.x = e.clientX
        point.y = e.clientY
        console.log('point update', point)
    }

    watch(active, () => {
        if(active.value) {
            window.addEventListener('mousemove', handler)
        }
        else {
            window.removeEventListener('mousemove', handler)
        }
    })
    return {
        ...toRefs(point),
        active
    }
}

export const ScopeExample04 = defineComponent({
    setup() {
        const {x, y, active} = useMouseMove1()
        return () => <div>
            {active.value && <span>point is: {x.value}, {y.value}</span>}
            <button onClick={()=>{
                active.value = !active.value
            }}>toogle</button>
        </div>
    }
})