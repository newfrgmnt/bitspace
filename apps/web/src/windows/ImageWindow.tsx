import { observer } from 'mobx-react-lite';
import { NodeWindow } from '../circuit/components/Node/Node';
import { SynthesizedImage } from '../nodes/ai/SynthesizedImage/SynthesizedImage';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner/Spinner';
import { Image } from '@/nodes/primitives/Image/Image';

export const ImageWindow = observer(
    ({ node }: { node: Image | SynthesizedImage }) => {
        const [imageSrc, setImageSrc] = useState<string>();

        useEffect(() => {
            const subscription = node.outputs.output.subscribe(setImageSrc);

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
                                ? `url('${imageSrc}')`
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
    }
);
