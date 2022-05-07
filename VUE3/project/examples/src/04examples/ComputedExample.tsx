import { computed, defineComponent, ref } from "vue";
function reverse(str: string) {
    return [...str].reverse().join('')
}
export const ComputedExample01 = defineComponent({
    setup() {
        const c = ref('hello')
        return () => {
            
            return <div>
                {reverse(c.value)}
                <input onInput={e => {
                    c.value = (e.target as HTMLInputElement).value
                }} />
            </div>
        }
    }
})
/**
 * 用computed实现ComputedExample01
 */
export const ComputedExample02 = defineComponent({
    setup() {
        const c = ref('hello')
        const s = computed(() => {
            return [...c.value].reverse().join('')
        })
        return () => {
            return <div>
                {s.value}
                <input onInput={e => {
                    c.value = (e.target as HTMLInputElement).value
                }} />
            </div>
        }
    }
})

/**
 * 完全屏蔽掉了原始c
 */
export const ComputedExample03 = defineComponent({
    setup() {
        const c = ref('hello')
        const s = computed({
            get() {
                return reverse(c.value)
            },
            set(str: string) {
                c.value = str
            }
        })
        return () => {
            return <div>
                {s.value}
                <input value={s.value} onInput={e => {
                    s.value = (e.target as HTMLInputElement).value
                }} />
            </div>
        }
    }
})

function fib(n: number): number {
    if(n === 1 || n === 2) {
        return 1
    }
    return fib(n-1) + fib(n-2)
}
// 由于上边的普通函数计算没有缓存，所以随着n的值不断变大，计算会卡死。
export const ComputedExample04 = defineComponent({
    setup() {
        const n = ref(1)
        return () => {
            return <div>
                <span>fibor value： {fib(n.value)}</span>
                <button onClick={() => {
                    n.value++
                }}>+</button>
            </div>
        }
    }
})

/**
 * 使用缓存解决上述问题
 * @param f 
 * @returns 
 */
let fib1 = function(n: number): number {
    if(n === 1 || n === 2) {
        return 1
    }
    return fib(n-1) + fib(n-2)
}
fib1 = cache(fib1)
function cache(f: Function) {
    const m: {
        [key: string]: any
    } = {}
    function hash(...args: any[]) {
        return args.map(x => x.toString()).join("-")
    }
    return (...args: any[]) => {
        const h = hash(...args)
        if(h in m) {
            return m[h]
        }
        const r = f(...args)
        m[h] = r
        return r
    }
}
export const ComputedExample05 = defineComponent({
    setup() {
        const n = ref(1)
        return () => {
            return <div>
                <span>fibor value： {fib1(n.value)}</span>
                <button onClick={() => {
                    n.value++
                }}>+</button>
            </div>
        }
    }
})

/**
 * computed解决不了fib本身计算逻辑需要缓存
 */
 export const ComputedExample06 = defineComponent({
    setup() {
        const n = ref(1)
        const fibValue = computed(() => {
            return fib1(n.value)
        })
        return () => {
            return <div>
                <span>fibor value： {fibValue.value}</span>
                <button onClick={() => {
                    n.value++
                }}>+</button>
            </div>
        }
    }
})