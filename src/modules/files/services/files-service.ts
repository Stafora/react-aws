import FilesServiceInterface, { CallbackProgressInterface, FilesError, FileInterface, ResultInterface } from "../interfaces/files-service-base-interface";
import { list, ListPaginateWithPathOutput, uploadData, remove, RemoveWithPathOutput } from 'aws-amplify/storage';

class FilesService implements FilesServiceInterface<FileInterface>{
    async getAll(): Promise<ResultInterface<FileInterface[]>> {
        try {
            const response = await list({
                path: ({identityId}) => `files/${identityId}`
            }) as ListPaginateWithPathOutput;
            
            const files = response.items.filter(item => !item.path.endsWith('/')) as FileInterface[];
            
            return {
                success: true,
                data: files || []
            }
        } catch (e) {
            return {
                success: false,
                error: new FilesError(e instanceof Error ? e?.message : 'Error when "getFiles" in aws-amplify/storage', 400)
            }
        }
    }
    
    async upload(file: File, callbackProgress?: (event: CallbackProgressInterface) => void): Promise<ResultInterface<FileInterface>> {
        try{
            const result = await uploadData({
                path: ({identityId}) => `files/${identityId}/${file.name}`,
                data: file,
                options: {
                    onProgress: callbackProgress
                }
            }).result as FileInterface

            return {
                success: true,
                data: result
            }
        } catch(e){
            return {
                success: false,
                error: new FilesError(e instanceof Error ? e?.message : 'Error when "uploadData" in aws-amplify/storage', 400)
            }
        }
    }

    async remove(path: string) {
        try{
            const response = await remove({ 
                path: path
            }) as RemoveWithPathOutput
            return {
                success: true,
                data: response.path
            }
        } catch(e){
            return {
                success: false,
                error: new FilesError(e instanceof Error ? e?.message : 'Error when "uploadData" in aws-amplify/storage', 400)
            }
        }
    }
}

export default new FilesService()