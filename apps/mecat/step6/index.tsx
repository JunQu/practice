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

const TextELEMENT = 'TEXT_ELEMENT' // 仅仅为了保存这个字符串变量
let nextUnitOfWork: Fiber | undefined // 当前以及下一次需要处理的 Fiber ，这是一个中间变量
let wipRoot: Fiber | undefined // work in progress root，在一次 commit render 中的 root 节点
let currentRoot: Fiber | undefined // 保存当前 Fiber 树，用于下一次 Fiber 树的 Diff
let deletions: Fiber[] | null = null // 删除的 Fiber 集合，标记 Fiber 删除，下一次更新跳过

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
    alternate: currentRoot,
  }
  deletions = []
  nextUnitOfWork = wipRoot
}

const createDom = (fiber: Fiber): DomType => {
  const dom =
    fiber.type === TextELEMENT ? document.createTextNode('') : document.createElement(fiber.type as HTMLElementTagKey)
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  updateDom(dom, {} as ElementType['props'], fiber.props)
  return dom
}

const isEvent = (key: string) => key.startsWith('on')
const isProperty = (key: string) => key !== 'children' && !isEvent(key)
const isNew = (perv: Record<string, any>, next: Record<string, any>) => (key: string) => perv[key] !== next[key]
const isGone = (prev: Record<string, any>, next: Record<string, any>) => (key: string) => !next.hasOwnProperty(key)

const updateDom = (dom: Fiber['dom'], prevProps?: Fiber['props'], nextProps?: Fiber['props']) => {
  if (!prevProps || !nextProps) {
    return
  }

  // remove old changed event listener
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !nextProps.hasOwnProperty(key) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().slice(2)
      // @ts-ignore
      dom?.removeEventListener(eventType, prevProps[name])
    })

  // remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      // @ts-ignore
      dom[name] = ''
    })

  // add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2)
      // @ts-ignore
      dom?.addEventListener(eventType, nextProps[name])
    })

  // set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      // @ts-ignore
      dom[name] = nextProps[name]
    })
}

/**
 * 对新 Fiber 和旧 Fiber 节点进行对比，即 Diff 过程
 * React 使用 Key 来对比，当然也对比 type 和 props， 过程确实是差不多的
 * */
const reconcileChildren = (wipFiber: Fiber, elements: ElementType[]) => {
  let prevSibling: Fiber | null = null
  let oldFiber = wipFiber.alternate?.child
  let index = 0

  while (index < elements.length || oldFiber !== undefined) {
    const element = elements[index]
    let newFiber: Fiber | null = null

    const sameType = oldFiber && oldFiber?.type === element?.type
    /**
     * if same type update node with props
     * if the type is different and there is a new element, it means we need to create a new DOM node
     * and if the types are different and there is an old fiber, we need to remove the old node
     * */
    if (sameType) {
      newFiber = {
        type: oldFiber!.type,
        props: element.props,
        dom: oldFiber!.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
      }
    }
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      }
    }
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION'
      // deletions is init in render
      deletions!.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    if (index === 0) {
      wipFiber.child = newFiber!
    } else if (element) {
      prevSibling!.sibling = newFiber!
    }

    prevSibling = newFiber
    index += 1
  }
}

const performUnitOfWork = (fiber: Fiber): Fiber | undefined => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  const elements: ElementType[] = fiber.props.children

  reconcileChildren(fiber, elements)

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

const commitWork = (fiber?: Fiber) => {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent?.dom
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
    domParent?.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate?.props, fiber.props)
  } else if (fiber.effectTag === 'DELETION') {
    domParent?.removeChild(fiber.dom!)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

const commitRoot = () => {
  /**
   * 提交所有删除的 Fiber，在这次更新删除
   */
  deletions!.forEach(commitWork)
  commitWork(wipRoot?.child)
  /**
   * 记录旧 fiber 树，用于 diff
   * */
  currentRoot = wipRoot
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

const container = document.getElementById('root')

const updateValue = (e: any) => {
  rerender(e.target.value)
}

const rerender = (value: string) => {
  const element = (
    <main id="step 6">
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
    </main>
  )
  mecat.render(element, container!)
}

rerender('mao')
