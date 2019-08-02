/** 
 * Vue的响应式原理
 **/

function observer(_obj) {
  if (!_obj || typeof _obj !== 'object') return
  //proxy可以劫持更多类型
  return new Proxy(_obj, {
    get(obj, prop) {
      return obj[prop]
    },
    set(obj, prop, newVal) {
      if (newVal === obj[prop]) return
      obj[prop] = newVal
    }
  })
}


class Vue {
  constructor(options) {
    this.$data = observer(options.data);
  }
}

let vm = new Vue({
  data: {
    test: "test"
  }
});
vm.$data.test = 'xxx'
vm.$data.test