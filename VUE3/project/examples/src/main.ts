import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App';
import { MyRouteType } from './mytypes';
// 读取04examples下的所有tsx（ts和jsx结合）文件
const examples = import.meta.glob('./04examples/**/*.tsx');
console.log(examples);
const examplePromises = Object.keys(examples)
  .map((x) => examples[x])
  .map((f) => f());
console.log(examplePromises);

const routes: MyRouteType[] = [];
Promise.all(examplePromises).then((list) => {
  console.log(list);
  for (let module of list) {
    for (let key in module) {
      const Component = module[key];
      routes.push({
        path: '/' + key.toLocaleLowerCase(),
        key,
        component: Component,
      });
    }
  }
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  const app = createApp(App, { routes });
  app.use(router);
  app.mount('#app');
});
