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

/**
 * JSX => createElement,createTextElement => Element
 * render => start workLoop => loop performUnitOfWork => all dom node in document
 */
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
  /**
   * set root node
   * start workloop
   * */
  nextUnitOfWork = {
    type: 'div',
    dom: container,
    props: {
      children: [element],
    },
  }
}

const createDom = (fiber: Fiber): DomType => {
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

let nextUnitOfWork: Fiber | undefined

/**
 * add element to DOM
 * create new fiber for children
 * return next UnitOfWork
 */
const performUnitOfWork = (fiber: Fiber): Fiber | undefined => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  if (fiber.parent) {
    // parent => children
    fiber.parent.dom!.appendChild(fiber.dom)
  }
  console.log('Current unit of work is: ', fiber.type)

  /**
   * Elements art all created by own createElement, like ReactNode
   * Dom is created by document.createElement
   * Fiber has Dom and Elements both, to unit work
   */
  const elements: ElementType[] = fiber.props.children
  let prevSibling: Fiber | null = null
  for (const element of elements) {
    const newFiber: Fiber = {
      type: element.type,
      props: element.props,
      parent: fiber, // set parent fiber to add in dom next
      dom: null,
    }
    // first child
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
  // 没有children 就向上寻找 parent 的 sibling
  // 没找到 sibling 就一直寻找直到root
  let nextFiber: Fiber | undefined = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

// eslint-disable-next-line no-undef
const workLoop: IdleRequestCallback = (deadline) => {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

const mecat = {
  createElement,
  render,
}

const element3 = (
  <main className="mecat" id="step 2">
    <h1>Me Cat</h1>
    <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, quasi.</p>
    <footer>
      <h2 color="red">Step 4</h2>
      <p>open console to see unit of work render</p>
    </footer>
  </main>
)

const container = document.getElementById('root')!
mecat.render(element3, container)
