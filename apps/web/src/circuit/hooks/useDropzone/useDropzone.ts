import { createClient } from '@/supabase/browser';
import { DragEventHandler, useCallback } from 'react';
import type { PutBlobResult } from '@vercel/blob';

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

export const useUploadFile = (callback: (blob: PutBlobResult) => void) => {
    async function uploadFile(files: FileList) {
        const file = files[0];

        const response = await fetch(`/api/upload?filename=${file?.name}`, {
            method: 'POST',
            body: file
        });

        const newBlob = (await response.json()) as PutBlobResult;

        callback(newBlob);
    }

    return uploadFile;
};
