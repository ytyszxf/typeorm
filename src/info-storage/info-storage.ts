import { TableSchema } from '../schema-builder/schema/TableSchema';
import { ITableSchema } from './models/table-schema.interface';
import { IColumnSchema } from './models/column-schema.interface';
import { IIndexSchema } from './models/index-schema.interface';
import { IForeignKeySchema } from './models/foreign-key-schema.interface';
import { IPrimaryKeySchema } from './models/primary-key-schema.interface';
import { ColumnSchema } from '../schema-builder/schema/ColumnSchema';
import { ForeignKeySchema } from '../schema-builder/schema/ForeignKeySchema';
import { IndexSchema } from '../schema-builder/schema/IndexSchema';
import { PrimaryKeySchema } from '../schema-builder/schema/PrimaryKeySchema';

const STORAGE_SUFFIX = 'bas-sql';

declare const localStorage: any;

export class InfoStorage {
  public static put(schema: TableSchema) {
    let tableSchemaData: ITableSchema = {
      /**
     * Table name.
     */
      name: schema.name,

      /**
       * Table columns.
       */
      columns: !schema.columns ? [] : schema.columns.map((d) => {
        return {
          name: d.name,

          /**
           * Column type.
           */
          type: d.type,

          /**
           * Column's default value.
           */
          default: d.default,

          /**
           * Indicates if column is NULL, or is NOT NULL in the database.
           */
          isNullable: d.isNullable,

          /**
           * Indicates if column is auto-generated sequence.
           */
          isGenerated: d.isGenerated,

          /**
           * Indicates if column is a primary key.
           */
          isPrimary: d.isPrimary,

          /**
           * Indicates if column has unique value.
           */
          isUnique: d.isUnique,

          /**
           * Column's comment.
           */
          comment: d.comment
        } as IColumnSchema;
      }),

      /**
       * Table indices.
       */
      indices: !schema.indices ? [] : schema.indices.map((d) => {
        return {
          tableName: d.tableName,

          /**
           * Index name.
           */
          name: d.name,

          /**
           * Columns included in this index.
           */
          columnNames: d.columnNames,

          /**
           * Indicates if this index is unique.
           */
          isUnique: d.isUnique
        } as IIndexSchema;
      }),

      /**
       * Table foreign keys.
       */
      foreignKeys: schema.foreignKeys.map((d) => {
        return {
          name: d.name,

          /**
           * Column names which included by this foreign key.
           */
          columnNames: d.columnNames,

          /**
           * Table referenced in the foreign key.
           */
          referencedTableName: d.referencedTableName,

          /**
           * Column names which included by this foreign key.
           */
          referencedColumnNames: d.referencedColumnNames,

          onDelete: d.onDelete
        } as IForeignKeySchema;
      }),

      /**
       * Table primary keys.
       */
      primaryKeys: schema.primaryKeys.map((d) => {
        return {
          name: d.name,

          /**
           * Column to which this primary key is bind.
           */
          columnName: d.columnName,
        } as IPrimaryKeySchema;
      })
    };

    localStorage.setItem(`${STORAGE_SUFFIX}.table:${schema.name}`, JSON.stringify(tableSchemaData));
  }

  public static get(tableName: string) {
    let data: ITableSchema = JSON.parse(localStorage.getItem(`${STORAGE_SUFFIX}.table:${tableName}`));
    let tableSchema: TableSchema = new TableSchema(tableName, [], false);

    let columns = data.columns.map((d) => new ColumnSchema(d));
    let foreignKeys = data.foreignKeys.map((d) => new ForeignKeySchema(
      d.name,
      d.columnNames,
      d.referencedColumnNames,
      d.referencedTableName,
      d.onDelete
    ));
    let indices = data.indices.map((d) => new IndexSchema(
      d.tableName,
      d.name,
      d.columnNames,
      d.isUnique
    ));
    let primaryKeys = data.primaryKeys.map((d) => new PrimaryKeySchema(d.name, d.columnName));

    tableSchema.addColumns(columns);
    tableSchema.addForeignKeys(foreignKeys);
    tableSchema.addPrimaryKeys(primaryKeys);
    tableSchema.indices = indices;

    return tableSchema;
  }
}
