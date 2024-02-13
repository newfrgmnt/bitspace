import { NodeWindow } from '../circuit/components/Node/Node';
import { Image } from '../nodes/ai/Image/Image';
import { useEffect, useState } from 'react';

export const ImageWindow = ({ node }: { node: Image }) => {
    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {
        const subscription = node.outputs.output.subscribe(value => {
            setImageSrc(value);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [node]);

    return (
        <NodeWindow>
            <div
                className="w-[226px] h-80 bg-cover bg-center bg-slate-100"
                style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
        </NodeWindow>
    );
};
