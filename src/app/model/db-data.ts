export declare type dbType =
  | 'connection'
  | 'schema'
  | 'table'
  | 'view'
  | 'column';

  /**
   * Db entity data
   */
export interface DbData {
  name: string;
  type: dbType;
  canRead?: boolean;
}
