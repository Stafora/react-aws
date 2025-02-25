import React, { useEffect, useState } from "react";
import FileItem from "./FileItem"
import FilesService from '@/modules/files/services/files-service'
import { FileInterface } from "@/modules/files/interfaces/files-service-base-interface";
import { eventBus } from '@/helpers/event-bus';

const FileList = () => {
    const [files, setFiles] = useState<FileInterface[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await FilesService.getAll();
            if (response.success) {
                setFiles(response.data || []);
            }
        };

        eventBus.on('fetch-files-event', fetchFiles)

        fetchFiles();

        return () => {
            eventBus.off('fetch-files-event', fetchFiles);
        };
    }, []);

    return (
        <>
            {files.map(file => (
                <FileItem key={file.path} file={file} />
            ))}
        </>
    );
}

export default FileList;