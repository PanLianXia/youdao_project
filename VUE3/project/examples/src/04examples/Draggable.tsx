import { defineComponent, ref } from 'vue';
import _ from 'lodash'

export const DraggableExample = defineComponent({
    setup() {
        return () => <div style={{
            width: '1000px',
            height: '1000px',
        }} onDragover={e => e.preventDefault()}>
            <Draggable>
                <div style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'blue'
                }}></div>
            </Draggable>
        </div>
    }
})

function useDrag({
    onDragend
}: {
    onDragend: (x: number, y: number) => void
}) {
    let startX = 0, startY = 0
    let diffX = ref(0)
    let diffY = ref(0)
    const handlers = {
        onDragstart(e: DragEvent) {
            startX = e.clientX
            startY = e.clientY
        },
        onDrag(e: DragEvent) {
            console.log('onDrag')
            // diffX.value = e.clientX - startX
            // diffY.value = e.clientY - startY
        },
        onDragend(e: DragEvent) {
            diffX.value = e.clientX - startX
            diffY.value = e.clientY - startY
            onDragend(diffX.value, diffY.value)
            diffX.value = 0
            diffY.value = 0
        }
    }
    return {handlers, diffX, diffY}
}

const Draggable = defineComponent({
    setup(props, {slots}){
        const x = ref(0)
        const y = ref(0)
        const {handlers, diffX, diffY} = useDrag({
            onDragend: (diffX, diffY) => {
                x.value = x.value + diffX
                y.value = y.value + diffY
            }
        })
        return () => {
            const vNode = slots.default!()[0]
            vNode.props = _.merge(vNode.props, {
                draggable: true,
                ...handlers,
                style: {
                    position: 'absolute',
                    top: `${y.value}px`,
                    left: `${x.value}px`,
                    transform: `translate(${diffX.value}px, ${diffY.value}px)`
                }
            })
            console.log('vNode', vNode)
            return <>{vNode}</>
        }
    }
})