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
export class TreeNodeComponent implements OnInit {
  @Output() nodeClick = new EventEmitter<Node<DbData>>();
  @Input() node?: Node<DbData>;
  @Output() leafClick = new EventEmitter<Node<DbData>>();
  expanded = true;
  constructor() {}

  @Input() getIconByNodeType: (data: any) => string = () => '';

  nodeClicked() {
    if (this.node?.children.length) {
      this.expanded = !this.expanded;
      (this.node as any).expanded = this.expanded;
    } else {
      this.nodeClick.emit(this.node);
    }
  }

  hasLeafAction() {
    return this.leafClick.observers.length > 0;
  }

  leafClicked() {
    if (this.leafClick.observers.length) {
      this.leafClick.emit(this.node);
    }
  }

  ngOnInit(): void {}
}
