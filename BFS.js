/**
 * 1.利用队列先入先出的特性，进行节点遍历，广度优先，就是横向优先。
 * @param {*} node 
 */
let DeepFirst = (node) => {
    // 记录节点
    let nodes = []
    // 执行栈
    let stack = []
    if (node) {
      stack.push(node)
      while (stack.length) {
        // 首部先出
        let item = stack.shift()
        // 获得子节点
        let children = item.children
        // 父节点任务完成
        nodes.push(item)
        //把子节点压入执行栈中，重复操作，知道执行栈执行结束
        for (let i = 0; i < children.length; i++) {
          stack.push(children[i])
        }
      }
    }
    return nodes
  }