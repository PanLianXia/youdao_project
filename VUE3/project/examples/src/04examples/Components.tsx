import { defineComponent, PropType, VNode, reactive, Ref, toRef, toRefs } from 'vue';
import "./button.scss"
import classes from './button.module.scss'

/**
 * 展示类组件封装
 */
export const Component01 = defineComponent({
    setup() {
        return () => <Button text={"hello button1"} />
    }
})

export const Component02 = defineComponent({
    setup() {
        return () => <Button2> <span style={{color: 'red'}}>hello button2</span> </Button2>
    }
})

/**
 * 展示类组件
 */
const Button = defineComponent({
    props: {
        text: {
            type: String
        }
    },
    setup({text}) {
        return () => <button class="button" style={{backgroundColor: 'red'}}>{text}</button>
    }
})

/**
 * 以下是容器类封装
 */
const Button2 = defineComponent({
    setup(props, {slots}) {
        const Child = slots.default! as any as () => JSX.Element
        // 这两种都可以
        return () => <button><Child /></button>
        // return () => <button>{Child()}</button>
    }
})

export const Component03 = () => {
    return (<Panel v-slots={{header: <span>Title</span>}}>
        <span>Hello Content</span>
    </Panel>)
}

const Panel = defineComponent({
    setup(props, {slots}) {
        return () => {
            return <div>
                <header>{slots.header!()}</header>
                {slots.default!()}
            </div>
        }
    }
})

/**
 * Component03可以不用slot实现(这种方式比上述方式好)
 */
 export const Component04 = () => {
    return (<Panel1 header={<span>Title</span>}>
        <span>Hello Content</span>
    </Panel1>)
}

const Panel1 = defineComponent({
    props: {
        header: {
            type: Object as PropType<JSX.Element>
        }
    },
    setup(props, {slots}) {
        return () => {
            return <div>
                <header>{props.header}</header>
                {slots.default!()}
            </div>
        }
    }
})

export const Component05 = () => {
    return (
        <Flex>
            <div>
                <div>a</div>
                <div>b</div>
                <div>c</div>
            </div>
        </Flex>
    )
}

const Flex = defineComponent({
    setup(props, {slots}) {
        return () => {
            //slots.default!()返回的是数组
            const vNode: VNode = slots.default!()[0] as any
            if(!vNode.props) vNode.props = {}
            vNode.props!.style = {
                display: 'flex'
            }
            // 不占层级
            return <>{vNode}</>
        }
    }
})

export const Component06 = defineComponent({
    setup() {
        const form = reactive({
            username:'plx'
        })
        setTimeout(() => {
            form.username = 'hi'
        }, 1000);
        const {username} = toRefs(form)
        return () => (
            <>
                {username.value}
                <Input value={username} />
            </>
        )
    }
})

const Input = ({value}: {value: Ref<string>}) => {
    return <input value={value.value} onInput={e => {
        value.value = (e.target as HTMLInputElement).value
    }} />
}


export const Component07 = defineComponent({
    setup() {
      const { form } = useForm({
        username: "abc",
      })
  
      setTimeout(() => {
        form.username = "def"
      }, 1000)
  
      return () => (
        <div>
          <button onClick={() => {
            console.log ( form.getValues() )
          }}>submit</button>
          <Input1
            {...form.getField('username')}
          />
        </div>
      )
    },
  })
  
  const Input1 = ({
    value,
    onChange,
  }: {
    value: string
    onChange?: (v: string) => void
  }) => {
    return (
      <input
        value={value}
        onChange={e => {
          // 阻止冒泡
          e.stopImmediatePropagation()
        }}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value
          onChange && onChange(value)
        }}
      />
    )
  }
  class Form<T extends Record<string, any>> {
    private data: {
      [key: string]: any
    }
    constructor(data: T) {
      this.data = reactive(data)
    }
  
    public getValue(key: string) {
      return this.data[key]
    }
  
    public setValue(key: string, value: any) {
      this.data[key] = value
    }
  
    public getValues = () => {
      return JSON.parse(JSON.stringify(this.data))
      // return unref(this.data)
    }
  
    public getField = (key: string): {
      value: any
      onChange: (v: any) => void
    } => {
      return {
        value : this.data[key], 
        onChange : (v : any) => {
          this.data[key] = v
        }
      }
    }
  }
  
  
  interface FormOperators<T> {
    getValues() : T,
    getField(key : string) : {value : any, onChange : (v : any) => void} 
  }

  function useForm<T extends Record<string, any>>(data : T) {
    const form = new Form<T>(data)
  
    const proxy = new Proxy(form, {
      get(target, key) {
        if(key === 'getValues') {
          return form.getValues
        }
        else if(key === 'getField') {
          return form.getField
        }
        return form.getValue(key as string)
      },
      set(target, key, value) {
        console.log('set key', key, value)
        form.setValue(key as string, value)
        return true
      }
    })
    return {
      form : proxy as any as (T & FormOperators<T>)
    } 
  }
  