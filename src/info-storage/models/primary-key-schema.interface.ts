export interface IPrimaryKeySchema {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  /**
   * Key name.
   */
  name: string;

  /**
   * Column to which this primary key is bind.
   */
  columnName: string;
}
