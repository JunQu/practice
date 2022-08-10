import type { HTMLProps } from 'react'
import ReactDOM from 'react-dom'
/**
 * 这一步目的是实现 createElement 得到一个对象
 * 下一步实现render，把得到的对象对应真实的dom
 * path: /mecat/step1/index.html
 * */
type ElementType = {
  // eslint-disable-next-line no-undef
  type: keyof HTMLElementTagNameMap
  props: HTMLProps<any>
  children: number | string | ElementType
}

const createTextElement = (text: number | string) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

const createElement = (type: ElementType['type'], props: ElementType['props'], ...children: ElementType[]) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof child === 'object' ? child : createTextElement(child))),
    },
  }
}

const mecat = {
  createElement,
}

/**
 * 由于esbuild的原因需要在vite.config.ts进行设置：
 * esbuild: { jsxFactory: 'mecat.createElement'}
 *
 * 如果你是用的是babel 那么只需要添加两行注释在这上边（去掉\符号）：
 * \/** @jsxRuntime classic *\/
 * \/** @jsx mecat.createElement *\/
 * */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)

console.log(element)
/**
 * element 输出的结构
 * {
 *     "type": "div",
 *     "props": {
 *         "id": "foo",
 *         "children": [
 *             {
 *                 "type": "a",
 *                 "props": {
 *                     "children": [
 *                         {
 *                             "type": "TEXT_ELEMENT",
 *                             "props": {
 *                                 "nodeValue": "bar",
 *                                 "children": []
 *                             }
 *                         }
 *                     ]
 *                 }
 *             },
 *             {
 *                 "type": "b",
 *                 "props": {
 *                     "children": []
 *                 }
 *             }
 *         ]
 *     }
 * }
 */

const container = document.getElementById('root')!
/**
 * 这里并不能运行，因为ReactDOM只会接受React虚拟dom结点，显然我们创造的还缺少像key、ref这样的属性
 * 完成下一步后，用我们自己的render就能跑起来了
 * 强行运行会报错：
 * Uncaught Error: Objects are not valid as a React child (found: object with keys {type, props}). If you meant to render a collection of children, use an array instead.
 */
ReactDOM.render(element, container)
