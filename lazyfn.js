/** 
 * 需求：实现一函数，返回首次调用的值 
 * 第一次调用变量foo函数，但二次抵用foo函数返回给全局，调用内部的foo函数，t就成为了函数内部的缓存。
 **/
var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
};