/** 
 *需求：实现一个偏函数
 **/
// function add(a, b) {
//    return a + b;
// }

// add(1, 2) 3

// var addOne = partial(add, 1);

// addOne(2) // 3

//ES6
const partial = function(fn,...args1){
    return function(...args2){
        fn.call(this,args1,args2)
    }
}
//ES5
function partial(fn) {
    //获取实参
    var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
};