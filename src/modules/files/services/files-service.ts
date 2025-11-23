import FilesServiceInterface, { CallbackProgressInterface, FilesError, FileInterface, ResultInterface } from "../interfaces/files-service-base-interface";
import { list, ListPaginateWithPathOutput, uploadData, remove, RemoveWithPathOutput } from 'aws-amplify/storage';

class FilesService implements FilesServiceInterface<FileInterface> {
    async getAll(): Promise<ResultInterface<FileInterface[]>> {
        try {
            const response = await list({
                path: ({ identityId }) => `files/${identityId}/`
            }) as ListPaginateWithPathOutput;

            // Filter out the directory itself if it appears in the list
            const files = response.items
                .filter(item => !item.path.endsWith('/'))
                .map(item => ({
                    ...item,
                    // Ensure all required properties are present if needed
                })) as FileInterface[];

            return {
                success: true,
                data: files || []
            }
        } catch (error) {
            return this.handleError(error, 'getAll');
        }
    }

    async upload(file: File, callbackProgress?: (event: CallbackProgressInterface) => void): Promise<ResultInterface<FileInterface>> {
        try {
            const result = await uploadData({
                path: ({ identityId }) => `files/${identityId}/${file.name}`,
                data: file,
                options: {
                    onProgress: callbackProgress
                }
            }).result as FileInterface

            return {
                success: true,
                data: result
            }
        } catch (error) {
            return this.handleError(error, 'upload');
        }
    }

    async remove(path: string): Promise<ResultInterface<string>> {
        try {
            const response = await remove({
                path: path
            }) as RemoveWithPathOutput

            return {
                success: true,
                data: response.path
            }
        } catch (error) {
            return this.handleError(error, 'remove');
        }
    }

    private handleError(error: unknown, context: string): ResultInterface<any> {
        const message = error instanceof Error ? error.message : `Unknown error during ${context}`;
        return {
            success: false,
            error: new FilesError(message, 400)
        };
    }
}

export default new FilesService()