/** 
 * 响应式并不会观察数据是否挂载到页面上，我们需要不挂载的数据不触发setter方法 
 * Vue的深度监听 其实加了一个发布订阅模式
 * **/
//发布订阅模式
class Dep {
    constructor () {
        this.subs = [];
    }

    addSub (sub) {
        this.subs.push(sub);
    }

    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}
class Watcher {
    constructor () {
        Dep.target = this;
    }

    update () {
        console.log("视图更新啦～");
    }
}
//双向数据绑定，view控制model层,model层控制view层，model多余数据改变，不触发视图层更新
function observer(_obj) {
   
    if (!_obj || typeof _obj !== 'object') return
    let dep = new Dep()
    //proxy可以劫持更多类型
    return new Proxy(_obj, {
        get(obj, prop) {
            dep.addSub(Dep.target);
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
        this.$data = observer(options.data);
        new Watcher();
        console.log('render~', this.$data.test1);
    }
}
let vm = new Vue({
    data: {
        test1: "test1",
        test2: "test2"
    }
});
vm.$data.test1 = '2'


