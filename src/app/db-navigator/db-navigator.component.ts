import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DbData } from '../model/db-data';
import { Node } from '../model/node';
import { debounce } from 'rxjs/operators';
import { fromEvent, Subscription, timer } from 'rxjs';

/**
 * Dictonary of FontAuesome icon classes, and node type
 */
const iconByType: any = {
  table: 'fa-table',
  connection: 'fa-server',
  schema: 'fa-database',
  column: 'fa-columns',
};

@Component({
  selector: 'app-db-navigator',
  templateUrl: './db-navigator.component.html',
  styleUrls: ['./db-navigator.component.scss'],
})
export class DBNavigatorComponent implements OnInit, OnDestroy {
  
  // tslint:disable-next-line:variable-name
  private _dbData: Node<DbData>[] = [];
  get dbData(): Node<DbData>[] {
    return this._dbData;
  }

  @Input() set dbData(value: Node<DbData>[]) {
    this._dbData = value;
    this.displayedData = this.getDisplayedData(this.dbData);
  } 

  @Input() maxItems = 10;
  displayedData: Node<DbData>[] = [];
  lastScrollTop = 0;
  startIndex = 4;
  componentsubscription: Subscription | undefined = undefined;
  @Output() nodeClick = new EventEmitter<Node<DbData>>();
  

  ngOnDestroy() {
    if (this.componentsubscription) {
    this.componentsubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    const scrollEvent = fromEvent(document, 'scroll');
    this.componentsubscription = scrollEvent
      .pipe(debounce(() => timer(300)))
      .subscribe(this.onScroll);
  }

  onScroll = (evt: any) => {
    const { scrollTop } = document.scrollingElement as any;
    if (scrollTop > this.lastScrollTop) {
      this.startIndex++;
    } else if (this.startIndex > 0) {
      this.startIndex--;
    }
    this.lastScrollTop = scrollTop;
    this.displayedData = this.getDisplayedData(this.dbData);
  };

  isLastItemShown(): boolean {
    return !!this.displayedData.find(
      (item) => item === this.dbData[this.dbData.length - 1]
    );
  }
  decrement() : void {
    this.startIndex--;
    this.displayedData = this.getDisplayedData(this.dbData);
  }
  increment(): void {
    this.startIndex++;
    this.displayedData = this.getDisplayedData(this.dbData);
  }

  getItemTotalChildren(node: Node<DbData>): number {
    if (!node.children?.length || !(node as any).expanded) {
      return 1;
    }
    return (
      1 +
      node.children.length +
      node.children
        .map((item) => this.getItemTotalChildren(item))
        .reduce((total, child) => total + child, 0)
    );
  }
  getDisplayedData(data: any[]): any[] {
    let length = 0;
    let index = this.startIndex;

    while (length < this.maxItems && index < this.dbData.length) {
      length += this.getItemTotalChildren(this.dbData[index]);
      if (length <= this.maxItems) {
        index++;
      }
    }

    const result = data.slice(this.startIndex, index);
    return result;
  }

  getIconByNodeType(node: Node<DbData>): string {
       return iconByType[node.value.type]; //'table_chart';
  }



  
}
