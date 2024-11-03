export class Trie<T> {
  private children: Record<string, Trie<T>> = {}

  constructor(private data: T | null) {}

  insert(key: string, data: T) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let node: Trie<T> = this
    for (const char of key) {
      if (!node.children[char]) node.children[char] = new Trie<T>(null)
      node = node.children[char]!
    }
    node.data = data
  }

  get(key: string): T | null {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let node: Trie<T> = this
    for (const char of key) {
      if (!node.children[char]) return null
      node = node.children[char]!
    }
    return node.data
  }
}
