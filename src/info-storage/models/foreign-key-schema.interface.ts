export interface IForeignKeySchema {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  /**
   * Name of the table which contains this foreign key.
   */
  name: string;

  /**
   * Column names which included by this foreign key.
   */
  columnNames: string[];

  /**
   * Table referenced in the foreign key.
   */
  referencedTableName: string;

  /**
   * Column names which included by this foreign key.
   */
  referencedColumnNames: string[];

  onDelete: string;
}
