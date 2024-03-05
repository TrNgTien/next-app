export default class User {
  static readonly tableName = {
    default: 'User',
    quotationMarks: `"User"`,
    alias: 'usr',
  };
  static readonly columns = {
    id: 'id',
    createdAt: 'created_at',
    modifiedAt: 'modified_at',
    status: 'status',
    userType: 'user_type',
    activatedAt: 'activated_at',
    lastLoginAt: 'last_login_at',
    phone: 'phone',
  };

  static getTableWithAlias(alias: string = this.tableName.alias) {
    return `${this.tableName.quotationMarks} ${alias}`;
  }

  static getColumns(customAlias: string = this.tableName.alias) {
    return {
      id: `${customAlias}.${this.columns.id}`,
      createdAt: `${customAlias}.${this.columns.createdAt}`,
      modifiedAt: `${customAlias}.${this.columns.modifiedAt}`,
      status: `${customAlias}.${this.columns.status}`,
      userType: `${customAlias}.${this.columns.userType}`,
      activatedAt: `${customAlias}.${this.columns.activatedAt}`,
      lastLoginAt: `${customAlias}.${this.columns.lastLoginAt}`,
      phone: `${customAlias}.${this.columns.phone}`,
    };
  }
}
