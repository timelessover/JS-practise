//需求: 触发事件，在 n 秒内再次触发，按照最后一次触发事件时间 n 秒后执行
//1. wait 倒计时 fn事件函数 denbounce(fn,time) 指向this =》事件对象, 参数arguments =》event参数
//2. 优化:立即执行 立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行.
//3. 优化:返回值
//4. 优化：取消
const denbounce = function (fn, wait, immediate) {
    let timer, result;
    function debounced() {
        let lastArgs = this
        let lastThis = arguments
        if (timer) clearTimeout(timer)
        if (immediate) {
            //第一次执行直接执行//第二次延迟 n 秒执行
            let callNow = !timer
            timer = setTimeout(function () {
                result = fn.apply(lastThis, lastArgs)
            }, wait)
            if (callNow) {
                result = fn.apply(lastThis, lastArgs)
                timer = true
            }
        } else {
            timer = setTimeout(function () {
                result = fn.apply(lastThis, lastArgs)
            }, wait)
        }
        return result
    }
    function cancel() {
        clearTimeout(timer)
        timer = null
    }
    debounced.cancel = cancel

    return debounced
}