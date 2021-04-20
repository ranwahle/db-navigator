import { ThrowStmt } from '@angular/compiler';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { DbData } from '../model/db-data';
import { Node } from '../model/node';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent {

  /**
   * This event fires when node is clicked, and there maybe a need to load its children
   * It won't be fired if the node has children already
   */
  @Output() nodeClick = new EventEmitter<Node<DbData>>();

  /**
   * Node data
   */
  @Input() node?: Node<DbData>;

  expanded = true;
  constructor() {}

  /**
   * A function that returns a string to be bounded as className for the icon element
   * for the corresponding node type. 
   */
  @Input() getIconByNodeType: (data: any) => string = () => '';

  nodeClicked(): void {
    if (this.node?.children.length) {
      this.expanded = !this.expanded;
      (this.node as any).expanded = this.expanded;
    } else {
      this.nodeClick.emit(this.node);
    }
  }
}
