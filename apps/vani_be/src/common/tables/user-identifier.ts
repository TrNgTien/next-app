export default class UserIdentifier {
  static readonly tableName = {
    default: 'UserIdentifier',
    quotationMarks: `"UserIdentifier"`,
    alias: 'usrItf',
  };
  static readonly columns = {
    id: 'id',
    createdAt: 'created_at',
    modifiedAt: 'modified_at',
    scheme: 'scheme',
    provider: 'provider',
    userId: 'user_id',
    identifier: 'identifier',
    verified: 'verified',
    details: 'details',
  };

  static getTableWithAlias(alias: string = this.tableName.alias) {
    return `${this.tableName.quotationMarks} ${alias}`;
  }

  static getColumns(customAlias: string = this.tableName.alias) {
    return {
      id: `${customAlias}.${this.columns.id}`,
      createdAt: `${customAlias}.${this.columns.createdAt}`,
      modifiedAt: `${customAlias}.${this.columns.modifiedAt}`,
      scheme: `${customAlias}.${this.columns.scheme}`,
      provider: `${customAlias}.${this.columns.provider}`,
      identifier: `${customAlias}.${this.columns.identifier}`,
      verified: `${customAlias}.${this.columns.verified}`,
      details: `${customAlias}.${this.columns.details}`,
      userId: `${customAlias}.${this.columns.userId}`,
    };
  }
}
