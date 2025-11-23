import React from "react";
import ButtonDefault from '@/components/buttons/Button'
import { FileInterface } from "../interfaces/files-service-base-interface";
import { eventBus } from '@/helpers/event-bus';
import FilesService from '@/modules/files/services/files-service'

interface PropsInterface {
    file: FileInterface
}

const FileItem = ({ file }: PropsInterface) => {
    const fileName = file.path.split('/').pop() || file.path;
    const fileType = fileName.split('.').pop() || 'unknown';

    const handleRemoveFile = async () => {
        if (window.confirm(`Are you sure you want to delete ${fileName}?`)) {
            await FilesService.remove(file.path);
            eventBus.emit('fetch-files-event');
        }
    }

    return (
        <div className="border border-gray-200 rounded-md flex items-center p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1 truncate pr-4">
                <span className="font-medium text-gray-700">{fileName}</span>
            </div>
            <div className="w-24 text-sm text-gray-500 uppercase text-center">
                {fileType}
            </div>

            <div className="ml-4">
                <ButtonDefault
                    type="button"
                    viewType="danger"
                    onClick={handleRemoveFile}
                    className="text-sm px-3 py-1"
                >
                    Delete
                </ButtonDefault>
            </div>
        </div>
    )
}

export default FileItem;