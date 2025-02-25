import React from "react";
import ButtonDefault from '@/components/buttons/Button'
import { FileInterface } from "../interfaces/files-service-base-interface";
import { eventBus } from '@/helpers/event-bus';
import FilesService from '@/modules/files/services/files-service'

interface PropsInterface {
    file: FileInterface
}

const FileItem = (props: PropsInterface) => {
    const typeStr = props.file.path.slice(props.file.path.lastIndexOf('.') + 1);

    const handleGetName = () => {
        const arr = props.file.path.split('/')
        return arr[arr.length - 1]
    }
    const nameStr = handleGetName()

    const handleRemovFile = async () => {
        await FilesService.remove(props.file.path)
        eventBus.emit('fetch-files-event')
    }

    return (
        <div className="border-2 border-white rounded-md flex items-center mb-2">
            <div className="w-3/6 pl-4">
                File: {nameStr}
            </div>
            <div className="w-1/6 pl-4">
                Type: {typeStr}
            </div>

            <ButtonDefault type="button" viewType="danger" className="w-1/6 ml-auto" eventClick={handleRemovFile}>
                Delete
            </ButtonDefault>
        </div>
    )
}

export default FileItem;