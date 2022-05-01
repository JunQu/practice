// const element1 = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )
//
// const container1 = document.getElementById('root')
// ReactDOM.render(element1, container1)
//
// const createTextElement = (text) => {
//   return {
//     type: 'TEXT_ELEMENT',
//     props: {
//       nodeValue: text,
//       children: [],
//     },
//   }
// }
//
// const createElement = (type, props, ...children) => {
//   return {
//     type,
//     props: {
//       ...props,
//       children: children.map((child) => (typeof child === 'object' ? child : createTextElement(child))),
//     },
//   }
// }
//
// const MeReact = {
//   createElement,
// }
//
// const element2 = MeReact.createElement(
//   'div',
//   { id: 'foo' },
//   MeReact.createElement('a', null, 'bar'),
//   MeReact.createElement('b', null)
// )
// const container = document.getElementById('root')
// ReactDOM.render(element2, container)

import ReactDom from 'react-dom'

const creatTextElement = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof child === 'object' ? child : creatTextElement(child))),
    },
  }
}

const MiaoReact = {
  createElement,
}

/** @jsxRuntime classic */
/** @jsx MiaoReact.createElement */
export const Element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)

// const container = document.getElementById('miao-react')
// ReactDom.render(Element, container)
