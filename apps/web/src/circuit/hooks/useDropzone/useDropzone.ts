import { DragEventHandler, useCallback } from 'react';

type DropzoneOnDrop = (files: FileList) => void;

export const useDropzone = (onDrop: DropzoneOnDrop) => {
    const handleDrag: DragEventHandler<HTMLDivElement> = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop: DragEventHandler<HTMLDivElement> = useCallback(
        async e => {
            if (e.target instanceof HTMLTextAreaElement) {
                e.preventDefault();
                e.stopPropagation();

                onDrop(e.dataTransfer.files);
            }
        },
        [onDrop]
    );

    const handleDragOver: DragEventHandler<HTMLDivElement> = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    return { handleDrag, handleDrop, handleDragOver };
};
