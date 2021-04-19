import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DbDataService } from './db-data.service';
import { DbData } from './model/db-data';
import {Node} from './model/node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'db-navigator';
  dbData: Array<Node<DbData>> = [];

  constructor(private dataService: DbDataService) {

  }

  ngOnInit() {
    this.dataService
    .getDbData()
    .pipe(first())
    .subscribe((data: Node<DbData>[]) => {
      this.dbData = data;
  });
}

getChildren(node: Node<DbData>): void {
  this.dataService
    .getDbData(node.value)
    .pipe(first())
    .subscribe((data: Node<DbData>[]) => {
      node.children = data;
    });
}


}
