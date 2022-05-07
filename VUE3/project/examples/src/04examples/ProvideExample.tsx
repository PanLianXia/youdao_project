import { defineComponent, inject, provide, reactive } from "vue";
type Theme = {
    color: string
}
export const ProvideExample01 = defineComponent({
    setup() {
        const theme = reactive({
            color: 'red'
        })
        provide('theme', theme)
        return () => <div>
            <button onClick={() => {
                theme.color = 'blue'
            }}>change theme to blue</button>
            <A />
        </div>
    }
})

const B = defineComponent({
    setup(){
        const theme = inject('theme') as Theme
        return () => <div style={{backgroundColor: theme.color}}>
            Hello world
        </div>
    }
})
const A = () => {
    return <B />
}

/**
 * 全局的登录状态
 */
async function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, ms);
    })
}
async function login() {
    await wait(2000)
    return {
        success: true,
        data: null
    }
}
type User = {
    username: string,
    loggedIn: boolean
}
export const ProvideExample02 = defineComponent({
    setup() {
        const user = reactive<User>({
            username: '',
            loggedIn: false
        })
        provide("user", user)
        login().then(() => {
            user.username = 'youdao'
            user.loggedIn = true
        })
        return () => <div>
            <Header />
            <Content />
        </div>
    }
})

const Header = defineComponent({
    setup(){
        const user = inject('user') as User
        return () => {
            return <header>有道精品课系统 <strong>{user.username}</strong> </header>
        }
    }
})
const Content= () => {
    return <div>你好</div>
}

/**
 * 组合API的封装精髓
 */

function useUserContext() {
    const user = reactive<User>({
        username: '',
        loggedIn: false
    })
    provide("user", user)
    login().then(() => {
        user.username = 'youdao'
        user.loggedIn = true
    })
}

export const ProvideExample03 = defineComponent({
    setup() {
        useUserContext()
        return () => <div>
            <Header />
            <Content />
        </div>
    }
})