import React from "react";
import { useState } from "react"
import ButtonDefault from '@/components/buttons/Button'
import FilesService from '@/modules/files/services/files-service'
import { eventBus } from '@/helpers/event-bus';

const FileUpload = () => {
    const [files, setFile] = useState<File[]>([]);
    const [dragging, setDragging] = useState(false);
    const [isLoadOnServer, setIsLoadOnServer] = useState(false);
  
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
        const droppedFile = event.dataTransfer.files || [];
        setFile([...droppedFile]);
    };
  
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    };
  
    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files || [];
        setFile([...selectedFile])
    };

    const handleRemovFile = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, file: File) => {
        event.stopPropagation()
        const filteredFiles = files.filter((iterationFile: File) => iterationFile.name != file.name)
        setFile(filteredFiles)
    }

    const handleUploadFilesOnServer = async () => {
        if(!isLoadOnServer){
            setIsLoadOnServer(true)
            await Promise.allSettled(files.map((file: File) => FilesService.upload(file)));
            eventBus.emit('fetch-files-event')
            setFile([])
            setIsLoadOnServer(false)
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
                    onClick={() => document.getElementById("fileInput")?.click()}
                >   
                    {files.length > 0 && (
                        <p className="text-gray-900">
                            Предзагрузочные файлы:
                        </p>
                    )}

                    {files.map((file, index) => (
                        <div key={index} className="text-gray-900 w-full text-center">
                            📂 {file.name} <span className="cursor-pointer" onClick={(e) => handleRemovFile(e, file)}>❌</span>
                        </div>
                    ))}

                    {!files.length && (
                        <p className="text-gray-900">Кликните или перетащите файл</p>
                    )}
                </div>
        
                <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                />
        
                {!!files.length && !isLoadOnServer && (
                    <div className="w-full">
                        <ButtonDefault className="w-1/2" type="button" viewType="danger" eventClick={() => setFile([])}>
                            Clear
                        </ButtonDefault>
                        <ButtonDefault className="w-1/2" type="button" viewType="primary" eventClick={handleUploadFilesOnServer}>
                            Send files on Server
                        </ButtonDefault>
                    </div> 
                )}
        </div>
        );
  };

export default FileUpload;