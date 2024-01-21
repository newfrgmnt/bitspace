import { NodeWindow } from '../../circuit/components/Node/Node';
import { Image } from '../../nodes/Image/Image';
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
            <input
                className="text-black"
                onKeyDown={e => e.preventDefault()}
                onBlur={e => node.inputs.prompt.next(e.target.value)}
                defaultValue={node.inputs.prompt.value}
            />
            <div
                className="w-[244px] h-80 bg-cover bg-center bg-slate-100"
                style={{
                    backgroundImage: `url(${imageSrc})`
                }}
            />
        </NodeWindow>
    );
};
