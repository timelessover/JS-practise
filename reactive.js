/** 
 * Vue的响应式原理 
 **/

function observer(_obj) {
  if (!_obj || typeof _obj !== 'object') return
  return new Proxy(_obj, {
    get(obj, prop) {
      console.log('2')
      return obj[prop]
    },
    set(obj, prop, newVal) {
      console.log('1')
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