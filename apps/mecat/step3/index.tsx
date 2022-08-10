import type {
  HTMLElementPropsSimple,
  TEXT_ELEMENT,
  HTMLElementTagKey,
  ElementType,
  TextType,
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

const render = (element: ElementType, container: DomType) => {
  const dom = element.type === TextELEMENT ? document.createTextNode('') : document.createElement(element.type)
  const isProperty = (key: string) => key !== 'children'
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

// nextUnitOfWork should be a fiber
let nextUnitOfWork = 1

const performUnitOfWork = (currentWork: number) => {
  console.log(`DO ${currentWork} task`)
  return currentWork + 1
}

// eslint-disable-next-line no-undef
const workLoop: IdleRequestCallback = (deadline) => {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    // 把这一片的所有任务一个个执行完，做完这个做下一个任务
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    /**
     * 为什么要小于 1,这是一个判断执行任务的需要的空闲是否足够，
     * 当它的值为 0 时，其实就是这个已经没有空闲执行该任务，此时 didTimeout 返回 false 表示超时
     * 阅读 https://developer.chrome.com/blog/using-requestidlecallback/
     * */
    shouldYield = deadline.timeRemaining() < 1
  }
  if (nextUnitOfWork < 10000) {
    // 循环的执行队列，和链表递归遍历类似
    requestIdleCallback(workLoop)
  }
}
// 启动任务队列
requestIdleCallback(workLoop)

const mecat = {
  createElement,
  render,
}

const element3 = (
  <div className="mecat" id="step 2">
    <h1>Me Cat</h1>
    <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, quasi.</p>
    <footer>
      <h2 color="red">Step 3</h2>
      <p title="Step 3" draggable={true}>
        Open browser console.
      </p>
    </footer>
  </div>
)

const container = document.getElementById('root')!
mecat.render(element3, container)
