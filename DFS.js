/**
 * 1.深度优先，就是纵向优先。
 * @param {*} node 
 */
//递归
let DeepFirst1 = (node, nodeList = []) => {
    if (node !== null) {
      nodeList.push(node)
      //获取父节点，拿到子节点
      let children = node.children
      for (let i = 0; i < children.length; i++) {
        //继续遍历
        DeepFirst1(children[i], nodeList)
      }
    }
    return nodeList
  }
//非递归
let DeepFirst2 = (node) => {
    let stack = []
    let nodes = []
    if (node) {
      // 推入当前处理的node
      stack.push(node)
      while (stack.length) {
        let item = stack.pop()
        let children = item.children
        nodes.push(item)
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i])
        }
      }
    }
    return nodes
  }
