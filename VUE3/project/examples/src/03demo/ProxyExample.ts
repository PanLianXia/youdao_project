function createRef<T>(val: T) {
  const obj = {
    get value() {
      // track()
      console.log('get');
      return val;
    },
    set value(v: T) {
      // trigger()
      console.log('set trigger', v);
      val = v;
    },
  };
  return obj;
}
// 创建count的代理
// const count = createRef(0);
// count.value = 1;
// console.log(count.value);

function reactive<T extends object>(obj: T) {
  const proxy = new Proxy(obj, {
    get(target, key) {
      console.log('get');
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      console.log('set');
      Reflect.set(target, key, value);
      return true;
    },
  });
  return proxy;
}

const state = reactive({ a: 1, b: 2 });
console.log(state.a);

// let obj = {
//   _value: 0,
//   get value() {
//     return this._value;
//   },
//   set value(val: any) {
//     this._value = val;
//   },
// };

// obj.value;
