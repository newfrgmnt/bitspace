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
