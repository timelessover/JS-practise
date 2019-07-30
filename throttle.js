//需求：持续触发事件，每隔一段时间，只执行一次事件。可以说是debounce函数的升级版本
//1. wait 倒计时 fn事件函数 throttle(fn,time) 指向this =》事件对象, 参数arguments =》event参数
//2.优化第一次立刻执行，最后触发再执行一次，有头有尾 
//leading：false 表示禁用第一次执行，trailing: false 表示禁用停止触发的回调
const throttle = function (fn, wait, options = {}) {
    let timer, lastThis, lastArgs,result
    let previous = 0
    let options = options
    function later() {
        previous = options.leading ? new Date().getTime() : 0
        timer = null
        result = fn.apply(lastThis, lastArgs)
        if (!timer) lastThis = lastArgs = null
        return result
    }
    function cancel(){
        clearTimeout(timer)
        timer = null
        previous = 0
    }
    function throttled() {
        let now = new Date().getTime()
        lastThis = this
        lastArgs = arguments
        let remaining = wait - (now - previous)
        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            result = fn.apply(lastThis, lastArgs)
            previous = now
            if (!timer) lastThis = lastArgs = null
            return result
        } else if (!timer && options.trailing) {
            timer = setTimeout(later, remaining)
        }
    }
    throttle.cancel = cancel
    return throttled
}