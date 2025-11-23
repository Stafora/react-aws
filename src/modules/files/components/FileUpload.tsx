import React, { useState, useRef } from "react";
import ButtonDefault from '@/components/buttons/Button'
import FilesService from '@/modules/files/services/files-service'
import { eventBus } from '@/helpers/event-bus';

const FileUpload = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState(false);
    const [isLoadOnServer, setIsLoadOnServer] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
        const droppedFiles = event.dataTransfer.files ? Array.from(event.dataTransfer.files) : [];
        setFiles(droppedFiles);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
        setFiles(selectedFiles);
    };

    const handleRemoveFile = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, fileToRemove: File) => {
        event.stopPropagation();
        const filteredFiles = files.filter((file) => file.name !== fileToRemove.name);
        setFiles(filteredFiles);
    }

    const handleUploadFilesOnServer = async () => {
        if (!isLoadOnServer) {
            setIsLoadOnServer(true);
            await Promise.allSettled(files.map((file) => FilesService.upload(file)));
            eventBus.emit('fetch-files-event');
            setFiles([]);
            setIsLoadOnServer(false);
        }
    }

    return (
        <div className="flex flex-wrap mb-6">
            <div
                className={`w-full pt-6 pb-6 flex flex-wrap items-center justify-center border-2 border-dashed rounded-lg transition-all cursor-pointer 
                    ${dragging ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-gray-100"}`
                }
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                {files.length > 0 && (
                    <p className="text-gray-900 w-full text-center mb-2">
                        Selected files:
                    </p>
                )}

                {files.map((file, index) => (
                    <div key={index} className="text-gray-900 w-full text-center">
                        📂 {file.name} <span className="cursor-pointer ml-2" onClick={(e) => handleRemoveFile(e, file)}>❌</span>
                    </div>
                ))}

                {!files.length && (
                    <p className="text-gray-900">Click or drag files here</p>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
            />

            {!!files.length && !isLoadOnServer && (
                <div className="w-full flex gap-4 mt-4">
                    <ButtonDefault className="w-1/2" type="button" viewType="danger" onClick={() => setFiles([])}>
                        Clear
                    </ButtonDefault>
                    <ButtonDefault className="w-1/2" type="button" viewType="primary" onClick={handleUploadFilesOnServer}>
                        Upload to Server
                    </ButtonDefault>
                </div>
            )}
        </div>
    );
};

export default FileUpload;