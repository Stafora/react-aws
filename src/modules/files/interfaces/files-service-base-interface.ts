export interface ResultInterface<T = null> {
    success: boolean,
    data?: T | null | []
    error?: FilesError
}

export interface FileInterface {
    path: string,
    eTag: string,
    lastModifuied: Date,
    size: number
}

export interface CallbackProgressInterface {
    transferredBytes: number;
    totalBytes?: number;
}

export class FilesError extends Error {
    public code: number | string;
    public context?: Record<string, unknown>;
  
    constructor(message: string, code: number | string, context?: Record<string, unknown>) {
        super(message);
        this.name = 'FilesError';
        this.code = code;
        this.context = context;
    
        Object.setPrototypeOf(this, FilesError.prototype);
    }
}

export default interface FilesServiceInterface<T> {
    getAll: () => Promise<ResultInterface<T[]>>
    upload: (file: File, callbackProgress?: (event: CallbackProgressInterface) => void) => Promise<ResultInterface<T>>
    remove: (path: string) => Promise<ResultInterface<string>>
}