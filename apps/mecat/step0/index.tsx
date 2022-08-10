import React from 'react'
import ReactDOM from 'react-dom'

// JSX（Babel 插件解析） => React.createElement(得到VDom对象) => ReactDOM.render（得到 DOM 元素）
const element = <h1 title="foo">hello</h1>
const container = document.getElementById('root')
// 它在 react18 18 已经改变
// 此时传入的 element 还只是一个对象，render 函数将会把它转化为 DOM 元素
ReactDOM.render(element, container)

// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#react-classic-runtime
// 首先 babel 之类的工具和插件会把 JSX 解析成语法树，然后再把语法树上的参数传递  React.createElement
const element1 = React.createElement('h1', { title: 'foo' }, 'hello')

// 这是经过 React.createElement 处理得到的结果(也就是 element1)，这个对象将会被React DOM 处理(render)
// 经过 render 后，将会得到 DOM 元素，并挂在 root 节点下
const element2 = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'hello',
  },
}
// 模拟 render 函数的过程，把 element2 这个对象转化为 DOM 元素
const node = document.createElement('h1')
node['title'] = element2.props.title
const text = document.createTextNode('')
text['nodeValue'] = element2.props.children

// 挂载到根结点上
const container2 = document.getElementById('root2')!
node.appendChild(text)
container2.appendChild(node)
