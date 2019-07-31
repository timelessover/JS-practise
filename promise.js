const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(fn) {
        //当前状态
        this.state = PENDING;
        //返回值
        this.value = null;
        //拒因
        this.reason = null;
        //成功态回调队列
        this.onFulfilledCallbacks = [];
        //拒绝态回调队列
        this.onRejectedCallbacks = [];

        //成功态回调     
        const resolve = value => {
            // 使用macro-task机制(setTimeout),确保onFulfilled异步执行,且在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
            setTimeout(() => {
                if (this.state === PENDING) {
                    // pending(等待态)迁移至 fulfilled(执行态),保证调用次数不超过一次。
                    this.state = FULFILLED;
                    // 终值
                    this.value = value;
                    this.onFulfilledCallbacks.map(cb => {
                        this.value = cb(this.value);
                    });
                }
            });
        };
        //拒绝态回调
        const reject = reason => {
            // 使用macro-task机制(setTimeout),确保onRejected异步执行,且在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。 (满足要求 -> 调用时机)
            setTimeout(() => {
                if (this.state === PENDING) {
                    // pending(等待态)迁移至 fulfilled(拒绝态),保证调用次数不超过一次。
                    this.state = REJECTED;
                    //拒因
                    this.reason = reason;
                    this.onRejectedCallbacks.map(cb => {
                        this.reason = cb(this.reason);
                    });
                }
            });
        };
        try {
            //执行promise
            fn(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        typeof onFulfilled === 'function' && this.onFulfilledCallbacks.push(onFulfilled);
        typeof onRejected === 'function' && this.onRejectedCallbacks.push(onRejected);
        // 链式调用
        return this;
    }
    /**
     * Promise.all Promise进行并行处理
     * 参数: promise对象组成的数组作为参数
     * 返回值: 返回一个Promise实例
     * 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
     */
    all(promises) {
        return new Promise((resolve, reject) => {
            let next = this.gen(promises.length, resolve);
            promises.forEach((promise, index) => {
                promise.then((value) => {
                    next(index, value)
                }, reject)
            })
        })
    }
    //判断promise长度，执行完每个promise对象之后返回resolve
    gen(length, resolve) {
        let count = 0;
        let values = [];
        return function (i, value) {
            //每个promise结果保存在value中
            values[i] = value;
            if (++count === length) {
                resolve(values);
            }
        }
    }
    /**
     * Promise.race
     * 参数: 接收 promise对象组成的数组作为参数
     * 返回值: 返回一个Promise实例
     * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
     */
    race(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((promise) => {
                //谁快谁先金
                promise.then(resolve, reject);
            });
        });
    }
    // 用于promise方法链时 捕获前面onRejected抛出的异常
    catch(onRejected) {
        return this.then(null, onRejected);
    }
}