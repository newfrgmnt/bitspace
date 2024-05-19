import { createClient } from '@/supabase/browser';
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

export const useUploadFile = () => {
    const supabase = createClient();

    // Upload file using standard upload
    async function uploadFile(files: FileList) {
        Promise.all(
            Array.from(files).map(async file => {
                const { data, error } = await supabase.storage
                    .from('circuit')
                    .upload(file.name, file);
                if (error) {
                    // Handle error
                } else {
                    // Handle success
                }
                console.log(error);
                console.log(data);
            })
        );
    }

    return uploadFile;
};
