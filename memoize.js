/** 
 * 需求：实现一个记忆函数，如果参数参数调用过，则从缓存中中获取结果，否则执行并且进行缓存
 *  **/
function memoize(f) {
    var cache = {};
    return function(){
        //cache中唯一key
        var key = arguments.length + Array.prototype.join.call(arguments, ",");
        if (key in cache) {
            //调缓存结果
            return cache[key]
        }
        else {
            //将结果加入缓存中
            return cache[key] = f.apply(this, arguments)
        }
    }
}
