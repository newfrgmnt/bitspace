import { DragEventHandler, useCallback } from 'react';

type DropzoneOnDrop = (files: FileList) => void;

export const useDropzone = (onDropCallback: DropzoneOnDrop) => {
    const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
        e => {
            e.preventDefault();
            e.stopPropagation();

            onDropCallback(e.dataTransfer.files);
        },
        [onDropCallback]
    );

    const onDragOver: DragEventHandler<HTMLDivElement> = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    return {
        onDrop,
        onDragOver
    };
};

export const useUploadFile = (callback: (blob: Promise<Response>) => void) => {
    async function uploadFile(files: FileList) {
        const file = files[0];

        const fetchRequest = fetch(`/api/upload?filename=${file?.name}`, {
            method: 'POST',
            body: file
        });

        callback(fetchRequest);
    }

    return uploadFile;
};
