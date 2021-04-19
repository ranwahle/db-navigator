export declare type dbType =
  | 'connection'
  | 'schema'
  | 'table'
  | 'view'
  | 'column';

export interface DbData {
  name: string;
  type: dbType;
  canRead?: boolean;
}
