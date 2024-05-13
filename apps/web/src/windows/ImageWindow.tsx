import { observer } from 'mobx-react-lite';
import { NodeWindow } from '../circuit/components/Node/Node';
import { Image } from '../nodes/ai/Image/Image';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner/Spinner';

export const ImageWindow = observer(({ node }: { node: Image }) => {
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
                className="w-[226px] h-80 bg-cover bg-center flex flex-col items-center justify-center"
                style={{
                    backgroundImage:
                        imageSrc && !node.outputs.output.loading
                            ? `url(${imageSrc})`
                            : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {node.outputs.output.loading && (
                    <Spinner className="border-slate-500" />
                )}
            </div>
        </NodeWindow>
    );
});
