/** 
 * 实现类似object.assign的功能函数extend
  **/

const extend = function () {
    let target = arguments[0];//目标对象
    let length = arguments.length;//要合拼对象的个数
    let key, options, copy;
    //第二个开始向目标对象合拼元素，不存在key则直接加入，存在则覆盖值
    for (let i = 1; i < length; i++) {
        options = arguments[i];
        if (options !== null) {
            for (key in options) {
                copy = options[key];
                if (copy !== undefined) {
                    target[key] = copy;
                }
            }
        }
    }

    return target;
}