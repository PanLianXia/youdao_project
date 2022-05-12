import { defineComponent, ref, watch } from "vue";

export const ExposeExample01 = defineComponent( {
    setup() {
        const ipt = ref<HTMLInputElement|null>(null)
        watch(ipt, () => {
            if(ipt.value) {
                ipt.value.value = 'hello'
                ipt.value.focus()
            }
        })
        return () => {
            return <input ref={ipt} />
        }
    }
})

export const ExposeExample02 = defineComponent( {
    setup() {
        const someRef1 = ref<any>(null)
        const someRef2 = ref<any>(null)
        watch([someRef1, someRef2], () => {
            if(someRef1.value) {
                console.log('someRef1.value',someRef1.value)
            }
            if(someRef2.value) {
                console.log('someRef2.value',someRef2.value)
                console.log('someRef2.value',someRef2.value.div)
                someRef2.value.test()
            }
        })
        return () => {
            return <div>
                <A ref={someRef1} />
                <B ref={someRef2} />
            </div>
        }
    }
})

const A = () => {
    return <div>我是A</div>
}

const B = defineComponent({
    setup(props, {expose}) {
        const divRef = ref<HTMLDivElement | null>(null)
        expose({
            foo: 1,
            test() {
                console.log('test')
            },
            div: divRef
        })
        return () => <div ref={divRef}>我是B</div>
    }
})