import { defineComponent, ref } from 'vue';
import classes from './table.module.scss'

type TableMeta  = {
    title: string,
    key: string
}
function useList() {
    const data = ref<any>(null)
    request().then(resp => {
        data.value = resp
    })
    return data
}
function request() {
    return Promise.resolve(
        [
            {
                name: "zhangsan",
                score: '98'
            },
            {
                name: "lisi",
                score: '23'
            }
        ]
    )
}
export const FilterExample = defineComponent({
    setup() {
        const tableMeta: TableMeta[] = [{
            title: '姓名',
            key: 'name'
        },{
            title: '分数',
            key: 'score'
        }]
        const data = useList()
        return () => <div>
            <Table tableMeta={tableMeta} data={data.value}></Table>
        </div>
    }
})

type TableProps = {tableMeta: TableMeta[], data: Array<Record<string, any>>}
const Table = ({tableMeta, data}: TableProps) => {
console.log('222222222', data)

    return <table class={classes.table}>
        <THead tableMeta={tableMeta}></THead>
        <TBody tableMeta={tableMeta} data={data}></TBody>
    </table>
}

// Omit 从TableProps中去掉data
const THead = ({tableMeta}: Omit<TableProps, 'data'>) => {
    return <tr>
    {tableMeta.map(item => {
        return <td key={item.key}>{item.title}</td>
    })}
    </tr>
}
const TBody = ({tableMeta, data}: TableProps) => {
    console.log('111111111111', data)
    return <>
    {data && data.map((item, i) => {
        return <tr key={i}>
            {tableMeta.map(meta => {
                return <td key={meta.key}>{item[meta.key]}</td>
            })}
        </tr>
    })}
    </>
}