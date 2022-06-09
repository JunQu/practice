import {
  DomNodeType,
  DomType,
  Fiber,
  ElementType,
  TextType,
  TEXT_ELEMENT,
  HTMLElementPropsSimple,
  HTMLElementTagKey,
} from '../type/typing'

const TextELEMENT = 'TEXT_ELEMENT'
let nextUnitOfWork: Fiber | undefined
let wipRoot: Fiber | undefined

const createTextElement = (text: TextType): ElementType => {
  return {
    type: TextELEMENT,
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

const createElement = (
  type: DomNodeType,
  props: HTMLElementPropsSimple,
  ...children: (number | string | ElementType)[]
): ElementType => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof child === 'object' ? child : createTextElement(child))),
    },
  }
}

const render = (element: ElementType, container: DomType) => {
  wipRoot = {
    type: 'div',
    dom: container,
    props: {
      children: [element],
    },
  }
  // eslint-disable-next-line no-debugger
  debugger
  nextUnitOfWork = wipRoot
}

const createDom = (fiber: Fiber): DomType => {
  // eslint-disable-next-line no-debugger
  debugger
  const dom =
    fiber.type === TextELEMENT ? document.createTextNode('') : document.createElement(fiber.type as HTMLElementTagKey)
  const isProperty = (key: string) => key !== 'children'
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      // @ts-ignore
      dom[name] = fiber.props[name]
    })

  return dom
}

const performUnitOfWork = (fiber: Fiber): Fiber | undefined => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  const elements: ElementType[] = fiber.props.children
  let prevSibling: Fiber | null = null

  for (const element of elements) {
    const newFiber: Fiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }
    if (prevSibling === null) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
  }

  if (fiber.child) {
    return fiber.child
  }

  let nextFiber: Fiber | undefined = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

/**
 * commitWork 就是遍历整个 fiber 树
 * 把 fiber 对应的 DOM 节点添加到 container 里
 * commitWork 是写入 DOM 的操作，此时 performUnitOfWork 只是生成 fiber 树，不对 DOM 进行操作
 * 这样的想法，可能不是我能够想到，写到这一步我感觉到设计的有点妙
 * */
const commitWork = (fiber?: Fiber) => {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent?.dom
  /**
   * root 节点就没有 parent 节点
   * 此时已经是完整的 fiber 树，每个 fiber 一定是有 dom 属性的
   * */
  domParent?.appendChild(fiber.dom!)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

/**
 * 这一步是先把 fiber 树(wipRoot)生成好，再进行 dom 更新
 * 它这目前只会执行一次 commitRoot ，因为我们只有在 fiber 树完成的时添加那一次
 * 这一步主要还是为了给更新和删除操作做铺垫，整体的 fiber 树更新应该会重新运行这个函数
 */
const commitRoot = () => {
  console.log('Run wipRoot times 1', wipRoot)
  commitWork(wipRoot?.child)
  wipRoot = undefined
}

// eslint-disable-next-line no-undef
const workLoop: IdleRequestCallback = (deadline) => {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

const mecat = {
  createElement,
  render,
}

const element3 = (
  <main className="mecat" id="step 5">
    <h1>Me Cat</h1>
    <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, quasi.</p>
    <footer>
      <h2 color="red">Step 5</h2>
      <p>Commit phases and render.</p>
    </footer>
  </main>
)

const container = document.getElementById('root')!
mecat.render(element3, container)
