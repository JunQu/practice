const element1 = <h1 title="foo">Hello</h1>
const container1 = document.getElementById('root')
ReactDOM.render(element1, container1)

// convert element to valid js
const element2 = React.createElement('h1', { title: 'foo' }, 'hello')
const container2 = document.getElementById('root')
ReactDOM.render(element2, container2)

// element is a object, convert it to document node
const element3 = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'Hello',
  },
}

const container3 = document.getElementById('root')

const node = document.createElement(element3.type)
node['title'] = element3.props.title

const textNode = document.createTextNode('')
textNode['nodeValue'] = element3.props.children

node.append(textNode)
container3.append(node)

// we have the same app
