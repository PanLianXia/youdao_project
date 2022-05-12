import { defineComponent, PropType, reactive, ref, watch } from 'vue';

const M = defineComponent({
    props: {
        position: {
            // position 数组中只能有两个元素
            type: Array as any as PropType<[number, number]>,
            required: true
        }
    },
    setup(props) {
        // position最下下标是1
        props.position[1]
    }
})

function R() {
    // 必须穿两个参数
    return <M position={[1,2]}></M>
}


export const reactivityType = defineComponent({
    setup() {
        const count = ref(0)
        const count1 = ref({
            a: ref(3)
        })
        const state = reactive({
            a: ref(6)
        })
        watch(count, () => {
            
        })
        return () => <div></div>
    }
})