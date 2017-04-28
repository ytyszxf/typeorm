export interface IColumnSchema {
   /**
     * Column name.
     */
    name: string;

    /**
     * Column type.
     */
    type: string;

    /**
     * Column's default value.
     */
    default: any;

    /**
     * Indicates if column is NULL, or is NOT NULL in the database.
     */
    isNullable: boolean;

    /**
     * Indicates if column is auto-generated sequence.
     */
    isGenerated: boolean;

    /**
     * Indicates if column is a primary key.
     */
    isPrimary: boolean;

    /**
     * Indicates if column has unique value.
     */
    isUnique: boolean;

    /**
     * Column's comment.
     */
    comment: string|undefined;
}