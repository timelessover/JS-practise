/** 
 * 响应式并不会观察数据是否挂载到页面上，我们需要不挂载的数据不触发setter方法 
 * Vue的深度监听 其实加了一个发布订阅模式
 * **/
//发布订阅模式
class Dep {
    constructor() {
        this.subs = [];
    }
    //添加一个观测对象
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        const subs = this.subs.slice()//copy一份
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()//更新视图
        }
    }
}
class Watcher {
    constructor(vm, cb) {
        this.cb = cb;
        this.vm = vm;
        this.cb.call(this.vm);//首次渲染
    }
    update() {
        this.cb.call(this.vm);
    }
}
//双向数据绑定，view控制model层,model层控制view层，model多余数据改变，不触发视图层更新
function observer(_obj,watch) {
   
    if (!_obj || typeof _obj !== 'object') return
    let dep = new Dep()
    dep.addSub(watch);
    //proxy可以劫持更多类型
    return new Proxy(_obj, {
        get(obj, prop) {
            return obj[prop]
        },
        set(obj, prop, newVal) {
            if (newVal === obj[prop]) return
            obj[prop] = newVal
            dep.notify();
        }
    })
}


class Vue {
    constructor(options) {
        let watch = new Watcher(options.data,()=>console.log('2'))
        //第一次挂载数据
        this.$data = observer(options.data,watch);
    }
}
let vm = new Vue({
    data: {
        test1: "test1",
        test2: "test2"
    }
});
vm.$data.test1 = '2'
vm.$data.test1 = '4'