import type {
  HTMLElementPropsSimple,
  TEXT_ELEMENT,
  TextType,
  HTMLElementTagKey,
  ElementType,
  DomType,
} from '../type/typing'

const TextELEMENT = 'TEXT_ELEMENT'

const createTextElement = (text: TextType): ElementType => {
  return {
    type: TextELEMENT,
    props: {
      nodeValue: text,
      children: Array<ElementType>(),
    },
  }
}

const createElement = (
  // eslint-disable-next-line no-undef
  type: HTMLElementTagKey,
  props: HTMLElementPropsSimple,
  ...children: (number | string | ElementType)[]
): ElementType => {
  return {
    type,
    props: {
      ...props,
      children: children.map<ElementType>((child) => (typeof child === 'object' ? child : createTextElement(child))),
    },
  }
}
/**
 * 简单的实现了一下 render：
 * 把从 createElement 得到的对象转化为dom节点，并把相应的属性给它
 * 至此，我们简单的完成了 React 的最基础功能，createElement属于React，render 属于 ReactDOM
 * */
const render = (element: ElementType, container: DomType) => {
  const dom = element.type === TextELEMENT ? document.createTextNode('') : document.createElement(element.type)
  const isProperty = (key: string) => key !== 'children'
  // 没有泛型的设计有点差劲
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      // @ts-ignore
      dom[name] = element.props[name as keyof HTMLElementPropsSimple]
    })

  element.props.children.forEach((child) => {
    render(child, dom)
  })

  container.appendChild(dom)
}

const mecat = {
  createElement,
  render,
}
/*
 * 当然这里有很多属性不能正常的工作比如color，但是目前主要目的不是考虑这些边缘的东西
 * */
const element3 = (
  <div className="mecat" id="step 2">
    <h1>Me Cat</h1>
    <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, quasi.</p>
    <footer>
      <h2 color="red">Step 2</h2>
      <p title="WelCome" draggable={true}>
        implement render function.
        <br /> you can draggable this block.
      </p>
    </footer>
  </div>
)

const container = document.getElementById('root')!
mecat.render(element3, container)
