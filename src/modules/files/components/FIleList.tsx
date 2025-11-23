import React, { useEffect, useState } from "react";
import FileItem from "./FileItem"
import FilesService from '@/modules/files/services/files-service'
import { FileInterface } from "@/modules/files/interfaces/files-service-base-interface";
import { eventBus } from '@/helpers/event-bus';

const FileList = () => {
    const [files, setFiles] = useState<FileInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await FilesService.getAll();
                if (response.success) {
                    setFiles(response.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch files:", error);
            } finally {
                setLoading(false);
            }
        };

        eventBus.on('fetch-files-event', fetchFiles)
        fetchFiles();

        return () => {
            eventBus.off('fetch-files-event', fetchFiles);
        };
    }, []);

    if (loading) {
        return <div className="text-center py-4">Loading files...</div>;
    }

    if (files.length === 0) {
        return <div className="text-center py-4 text-gray-500">No files found.</div>;
    }

    return (
        <div className="space-y-2">
            {files.map(file => (
                <FileItem key={file.path} file={file} />
            ))}
        </div>
    );
}

export default FileList;