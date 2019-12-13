
let curry = (fn, ...args) => {
    let lens = fn.length
    let _args = args || []
    return (...lastArgs) => {
        _args.push(...lastArgs)
        if (_args.length === lens) {
            return fn(..._args)
        } else {
            // 要注意的事当...会自动将参数转为数组，下次递归过程中要将数组展开
            return curry(fn,..._args)
        }
    }
}
var fn = curry(function (a, b, c) {
    console.log([a, b, c]);
});
fn("a", "b","c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]