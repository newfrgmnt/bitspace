import { NodeWindow } from '../circuit/components/Node/Node';
import { ImageEditor } from '../components/ImageEditor/ImageEditor';
import { useEffect, useState } from 'react';
import { ImageEdit } from '../nodes/ai/ImageEdit/ImageEdit';

export const ImageEditWindow = ({ node }: { node: ImageEdit }) => {
    const [imageSrc, setImageSrc] = useState<string>('');

    useEffect(() => {
        const subscription = node.inputs.image.subscribe(value => {
            setImageSrc(value);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [node]);

    return (
        <NodeWindow>
            <ImageEditor
                imageUrl={imageSrc}
                onImageChange={image => {
                    node.outputs.output.next(image);
                }}
            />
        </NodeWindow>
    );
};
