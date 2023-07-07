export interface ImportApiReferenceSummary {
  rootCategoryId: string;
  projectId: string;
  projectDocumentVersionId: string;
  categoriesCreated: number;
  articlesCreated: number;
  isApiDefinitionImported: boolean;
  errors: LogMessageAndPointer[];
  warnings: LogMessageAndPointer[];
  is_successs: boolean;
  apiDefinitionsCount: number;
  api_definition_id?: string;
  is_server_available: boolean;
}

export interface LogMessageAndPointer {
    logMessage: string;
    logPointer: string;
}
export interface ValidateApiReferenceSummary {
    rootCategoryId: string;
    projectId: string;
    projectDocumentVersionId: string;
    categoriesCreated: number;
    articlesCreated: number;
    isApiDefinitionImported: boolean;
    errors: ValidateMessageAndPointer[];
    warnings: ValidateMessageAndPointer[];
    isSuccess: boolean;
    apiDefinitionsCount: number;
    apiDefinitionId?: string;
    isServerAvailable: boolean;
}
export interface ValidateMessageAndPointer {
    logMessage: string;
    logPointer: string;
}
