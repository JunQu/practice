export type TEXT_ELEMENT = 'TEXT_ELEMENT'
export type TextType = number | string | undefined
// eslint-disable-next-line no-undef
export type HTMLElementTagKey = keyof HTMLElementTagNameMap
export type DomNodeType = HTMLElementTagKey | TEXT_ELEMENT
export type DomType = HTMLElement | Text

export type HTMLElementPropsSimple = {
  /**
   * there are some HTML prop I have used
   * it is too many and defined in react,  HTMLProps<string> eg
   */
  className?: string | undefined
  class?: string | undefined
  contentEditable?: boolean | 'inherit' | undefined
  draggable?: boolean | undefined
  hidden?: boolean | undefined
  id?: string | undefined
  placeholder?: string | undefined
  style?: CSSStyleDeclaration
  title?: string | undefined
  translate?: 'yes' | 'no' | undefined
  role?: string | undefined
  rel?: string | undefined
  href?: string | undefined
  alt?: string | undefined
  src?: string | undefined
  height?: number | string | undefined
  width?: number | string | undefined
  onClick?: Function
}

export type ElementType = {
  type: DomNodeType
  props: HTMLElementPropsSimple & {
    nodeValue?: string | number
    children: ElementType[]
  }
}

export type Hook<T = undefined> = {
  state?: T
  queue: ((preState: T) => T)[]
}

export type Fiber<T = undefined> = {
  type: DomNodeType | Function
  props: ElementType['props']
  dom: DomType | null // 对应生成真实的 DOM 节点
  parent?: Fiber
  child?: Fiber
  sibling?: Fiber
  effectTag?: 'UPDATE' | 'PLACEMENT' | 'DELETION'
  alternate?: Fiber | null // 记录旧 fiber 节点用于比较
  hooks?: Array<Hook<T>>
}
