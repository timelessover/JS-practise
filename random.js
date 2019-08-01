/**
 * 需求：实现一个函数，打乱个元素顺序
 * 历数组元素，然后将当前元素与以后随机位置的元素进行交换
 * @param {*} arr 
 */
function shuffle(arr) {
    let lens = arr.length
    for (let i = 0; i < lens; i++) {
        let j = Math.floor(Math.random() * lens);
        //当前元素与以后的随机元素替换
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}