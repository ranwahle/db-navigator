import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DbData, dbType } from './model/db-data';
import { Node } from './model/node';

@Injectable({
  providedIn: 'root',
})
export class DbDataService {
  getDbData(node?: DbData): Observable<Node<DbData>[]> {
    if (node) {
      if (node.canRead === false) {
        return of([]);
      }
      return this.canRead(node).pipe(
        switchMap((canRead) => {
          if (!canRead) {
            node.canRead = false;
            return of([]);
          }
          const result = createMockData(node);
          return of(result);
        })
      );
    } else {
      return of(createMockData());
    }
  }

  canRead(data: DbData): Observable<boolean> {
    const randomNumber = Math.round(Math.random() * 100);
    return of(randomNumber % 2 === 0);
  }

  constructor() {}
}
function createMockData(data?: DbData): Node<DbData>[] {
  if (!data) {
    const result = creatEmptyArrayWithRandomLength();

    result.fill({
      value: {
        name: 'postgres',
        type: 'connection',
      },
      children: [],
    });
    // Create unuqueness for each array item
    return uniquify(result);
  }

  return getDataByType(data.type);
}

const childrenType: { [key: string]: dbType } = {
  connection: 'schema',
  schema: 'table',
  table: 'column',
};

function uniquify(items: Node<DbData>[]): Node<DbData>[] {
  const result = items.map((item) => ({
    ...item,
    value: { ...item.value },
    children: uniquify(item.children),
  }));

  return result;
}

function getDataByType(type: string): Node<DbData>[] {
  const childType = childrenType[type];
  if (!childType) {
    return [];
  }
  const result: Node<DbData>[] = creatEmptyArrayWithRandomLength();
  const node: Node<DbData> = {
    value: {
      name: 'products',
      type: childType,
    },
    isLeaf: !childrenType[childType],
    children: [],
  };
  result.fill(node);

  return uniquify(result);
}

function creatEmptyArrayWithRandomLength() {
  const length = Math.round(Math.random() * 100);

  const result: Node<DbData>[] = [];
  result.length = length;
  return result;
}
