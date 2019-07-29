/**
 *
 * 判断fn类型
 * @param {*} fn
 * @returns Boolean
 */
function isValidn(fn) {
    if (typeof fn === 'function') {
        return true
    } else if (fn && typeof fn === 'object') {
        return isValidfn(fn.fn)
    } else {
        return false
    }
}

/**
 *
 * 查找命名相同事件
 * @param {*} array
 * @param {*} item
 * @returns
 */
function indexOf(array, item) {
    let result = -1
    item = typeof item === 'object' ?
        item.fn :
        item

    for (let i = 0, len = array.length; i < len; i++) {
        if (array[i].fn === item) {
            result = i
            break
        }
    }

    return result
}

/**
 *
 * 开始功能函数
 * @class EventEmitter
 */
class EventEmitter {
    constructor() {
        this.events = {}
    }
    /**
     * 监听事件
     * @param  {String} eventName 事件名称
     * @param  {Function} fn 监听器函数
     * @return {Object} 可链式调用
     */
    on(eventName, fn) {
        if (!eventName || !fn) return;

        if (!isValidfn(fn)) {
            throw new TypeError('第二个参数是一个函数');
        }

        let events = this.events;
        let fnList = events[eventName] = events[eventName] || [];
        let fnIsObject = typeof fn === 'object';

        // 不重复添加事件
        if (indexOf(fnList, fn) === -1) {
            fnList.push(fnIsObject ? fn : {
                fn: fn,
                once: false
            });
        }

        return this;
    }
    /**
     * 触发事件
     * @param  {String} eventName 事件名称
     * @param  {Array} args 传入监听器函数的参数，使用数组形式传入
     * @return {Object} 可链式调用
     */
    emit(eventName, args) {
        let fnList = this.events[eventName];
        if (!fnList) return;

        for (let i = 0; i < fnList.length; i++) {
            let fn = fnList[i];
            if (fn) {
                fn.fn.call(this, args || []);
                if (fn.once) {
                    this.off(eventName, fn.fn)
                }
            }

        }

        return this;

    }
    /**
     * 删除事件
     * @param  {String} eventName 事件名称
     * @param  {Function} fn 监听器函数
     * @return {Object} 可链式调用
     */
    off(eventName, fn) {
        let fnList = this.events[eventName];
        if (!fnList ) return;
        let index;
        for (let i = 0, len = fnList.length; i < len; i++) {
            let _fn = JSON.stringify(fn)
            let _fnItem = fnList[i].fn ? JSON.stringify(fnList[0].fn): []
            if (  _fnItem === _fn) {
                index = i;
            }
        }

        if (typeof index !== 'undefined') {
            fnList.splice(index, 1)
        }

        return this;
    }
    /**
     * 添加事件，该事件只能被执行一次
     * @param  {String} eventName 事件名称
     * @param  {Function} fn 监听器函数
     * @return {Object} 可链式调用
     */
    once(eventName, fn) {
        return this.on(eventName, {
            fn: fn,
            once: true
        })
    }
}
