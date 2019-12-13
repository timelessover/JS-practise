class MyPromise {
    constructor(fn) {
        const PENDING = 'pending'
        const FULFILLED = 'fulfilled'
        const REJECTER = 'rejected'
        this.stutus = PENDING
        // then中返回的resolve值
        this.value = null
        // then中返回的reject值
        this.reason = null
        // resolve函数回调队列，在宏任务中settimeout中触发
        this.fulfilledQueue = []
        // reject函数回调函数队列，在宏任务中settimeout中触发
        this.rejectQueue = []

        // reslove函数，异步操作
        const resolve = value => {
            // 放在事件循环最后获取值
            setTimeout(() => {
                this.status = FULFILLED
                // promise状态下，没调用then时的value
                this.value = value
                // cb就是then传入的函数，例如：(res) => {console.log(res)}
                this.fulfilledQueue.map(cb => {
                    this.value = cb(value)
                })
            });
        }
        const reject = reason => {
            setTimeout(() => {
                this.status = REJECTER
                this.reason = reason
                this.rejectQueue.map(cb => {
                    this.reason = cb(reason)
                })
            });
        }
        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(resolveFn, rejectFn) {
        typeof resolveFn === 'function' && this.fulfilledQueue.push(resolveFn)
        typeof rejectFn === ' function' && this.rejectQueue.push(rejectFn)
        return this
    }
    all(promises) {
        return new MyPromise((resolve, reject) => {
            // 需要记录一下promise的个数
            let length = promises.length
            let count = 0
            let arr = []

            promises.forEach((promise, index) => {
                promise.then((value) => {
                    // 没便利一个promise都要+1
                    count++
                    arr.push(value)
                }).then(res => {
                    // 相等的时候才resolve
                    if (count === length) {
                        resolve(arr)
                    }
                })
            })
        })
    }
    race(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((promise) => {
                // 谁快谁先出
                promise.then(resolve, reject);
            });
        });
    }
    // 用于promise方法链时 捕获前面onRejected抛出的异常
    catch(rejectFn) {
        return this.then(null, rejectFn);
    }
}

// test
let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('1')
    }, 8000);
})
let promise1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('2')
    }, 2000);
})
let promise2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('3')
    }, 5000);
})
let promise3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('4')
    }, 7000);
})
promise.all([promise1, promise2, promise3]).then(res => {
    console.log(res)
})
promise.race([promise1, promise2, promise3]).then(res => {
    console.log(res)
}).catch(e => {
    console.log(e)
})
