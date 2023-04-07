export interface ImportApiReferenceSummary {
    rootCategoryId: string;
    projectId: string;
    projectDocumentVersionId: string;
    categoriesCreated: number;
    articlesCreated: number;
    isApiDefinitionImported: boolean;
    errors: LogMessageAndPointer[];
    warnings: LogMessageAndPointer[];
    isSuccess: boolean;
    apiDefinitionsCount: number;
    apiDefinitionId?: string;
    isServerAvailable: boolean;
}

export interface LogMessageAndPointer {
    logMessage: string;
    logPointer: string;
}