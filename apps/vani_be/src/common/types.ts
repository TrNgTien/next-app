export interface IApplicationError {
  statusCode?: number;
  messageCode?: string;
  message: string;
}
export interface ITableTemplateName {
  default: string;
  withQuotationMarks: string;
  alias: string;
}

export interface IBaseResponse {
  id: number;
  createdAt: string;
  modifiedAt: string;
}

export interface IUser extends IBaseResponse {
  status: string;
  activateAt: string;
  lastLoginAt: string;
  phone: string;
}
