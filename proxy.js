/** 
 * 代理模式特点
 * 发哦送者和接收者并没有直接交互，而是通过第三者转发消息。
 * 代理对象和本体对象具有一致的接口, 对使用者友好
 * 代理模式的种类有很多, 在 JS 中最常用的为虚拟代理和缓存代理。
 **/
//代理预加载，原图片未加载完成时时先加载loading
const myImage = (function() {
    const imgNode = document.createElement('img')
    document.body.appendChild(imgNode)
    return {
      setSrc: function(src) {
        imgNode.src = src
      }
    }
  })()
  
  const proxyImage = (function() {
    const img = new Image()
    img.onload = function() { // http 图片加载完毕后才会执行
      myImage.setSrc(this.src)
    }
    return {
      setSrc: function(src) {
        myImage.setSrc('loading.jpg') // 本地 loading 图片
        img.src = src
      }
    }
  })()
  
  proxyImage.setSrc('http://loaded.jpg')

  //缓存代理实现乘积计算，类似与记忆函数
  const mult = function() {
    let a = 1
    for (let i = 0, l; l = arguments[i++];) {
      a = a * l
    }
    return a
  }
  
  const proxyMult = (function() {
    const cache = {}
    return function() {
      const tag = Array.prototype.join.call(arguments, ',')
      if (cache[tag]) {
        return cache[tag]
      }
      cache[tag] = mult.apply(this, arguments)
      return cache[tag]
    }
  })()
  
  proxyMult(1, 2, 3, 4) // 24