export interface Node<T> {
  value: T;
  children: Array<Node<T>>;
  isLeaf?: boolean;
}
