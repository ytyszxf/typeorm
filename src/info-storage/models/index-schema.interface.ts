
export interface IIndexSchema {
  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  /**
   * Table name that contains this unique index.
   */
  tableName: string;

  /**
   * Index name.
   */
  name: string;

  /**
   * Columns included in this index.
   */
  columnNames: string[];

  /**
   * Indicates if this index is unique.
   */
  isUnique: boolean;
}
