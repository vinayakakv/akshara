const recurse = (node: Node): string[] =>
  node.name ? [node.name] : node.children?.map(recurse).flat() || []

type Node = {
  name?: string
  children: Node[]
  content: number
}

class PatternTree {
  private readonly root: Node

  constructor() {
    this.root = {
      children: [],
      content: 0,
    }
  }

  insert(pattern: string, name: string) {
    const numbers = pattern.split('|').map(Number)
    let current = this.root
    numbers.forEach((number) => {
      const matchingChild = current.children.find(
        (child) => child.content === number,
      )
      if (matchingChild) {
        current = matchingChild
        return
      }
      const newNode = {
        content: number,
        children: [],
      }
      current.children.push(newNode)
      current = newNode
    })
    current.children = [{ name, children: [], content: 0 }]
  }

  match(arr: number[]) {
    let terminals = [
      ...this.root.children.map((node) => ({ node, diff: node.content })),
    ]
    arr.forEach((number) => {
      const matches = terminals
        .filter(({ diff }) => number <= diff)
        .map(({ node, diff }) => ({
          node,
          diff: diff - number,
        }))
      const exactMatches = matches.filter(({ diff }) => diff === 0)
      const res = exactMatches
        .map(({ node }) => node.children)
        .flat()
        .map((node) => ({ node, diff: node.content }))
      terminals = [...res, ...matches.filter(({ diff }) => diff > 0)]
    })
    const fullMatches = terminals
      .filter(({ node }) => node.name)
      .map(({ node }) => node.name)
    const partialMatches = terminals
      .filter(({ node }) => !node.name)
      .map(({ node }) => recurse(node))
      .flat()
    return { fullMatches, partialMatches }
  }
}

const pt = new PatternTree()
pt.insert('4|4|4|4', 'T1')
pt.insert('3|4|3|4', 'T2')
pt.insert('3|6|5|1', 'T3')
const res = pt.match([1, 2, 1, 2, 1, 1, 1, 1, 2, 2])
console.log(res)
