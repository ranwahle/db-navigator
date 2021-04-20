/**
 * Tree node generic interface
 */
export interface Node<T> {
  /**
   * Node value
   */
  value: T;

  /**
   * Child nodes
   */
  children: Array<Node<T>>;

  /**
   * isLeaf - when true, laziliy getting children should be avoided 
   */
  isLeaf?: boolean;
}
