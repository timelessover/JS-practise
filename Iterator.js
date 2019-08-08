/** 
 * 迭代器模式
 * 定义: 能访问到聚合对象的顺序与元素 
 * **/
const iterator = function(arr) {
    let current = 0
    const next = function() {
      current = current + 1
    }
    const done = function() {
      return current >= arr.length
    }
    const value = function() {
      return arr[current]
    }
    return {
      next,
      done,
      value,
    }
  }
  
  const arr1 = [1, 2 ,3]
  const arr2 = [1, 2, 3]
  const iterator1 = iterator(arr1)
  const iterator2 = iterator(arr2)
  
  const compare = function(iterator1, iterator2) {
    while (!iterator1.done() && !iterator2.done()) {
      if (iterator1.value() !== iterator2.value()) {
        console.log('两数组不等')
        return
      }
      iterator1.next() // 外部迭代器将遍历的权利转移到外部
      iterator2.next()
    }
    console.log('两数组相等')
  }
  
  compare(iterator1, iterator2)