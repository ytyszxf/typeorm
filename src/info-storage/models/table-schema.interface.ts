import { IColumnSchema } from './column-schema.interface';
import { IIndexSchema } from './index-schema.interface';
import { IForeignKeySchema } from './foreign-key-schema.interface';
import { IPrimaryKeySchema } from './primary-key-schema.interface';

export interface ITableSchema {
  /**
     * Table name.
     */
  name: string;

  /**
   * Table columns.
   */
  columns: IColumnSchema[];

  /**
   * Table indices.
   */
  indices: IIndexSchema[];

  /**
   * Table foreign keys.
   */
  foreignKeys: IForeignKeySchema[];

  /**
   * Table primary keys.
   */
  primaryKeys: IPrimaryKeySchema[];
}
