import { observer } from 'mobx-react-lite';
import { NodeWindow } from '@/circuit/components/Node/Node';
import { SynthesizedImage } from '../../../../packages/nodes/src/ai/SynthesizedImage/SynthesizedImage';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/Spinner/Spinner';
import { Image, Oscillator } from '@bitspace/nodes';
import { lerp } from '@/utils';
import { motion } from 'framer-motion';

export const OscillatorWindow = observer(({ node }: { node: Oscillator }) => {
    const [value, setValue] = useState<number>(0);
    const [amplitude, setAmplitude] = useState<number>(1);

    useEffect(() => {
        const outputSubscription = node.outputs.output.subscribe(setValue);
        const amplitudeSubscription =
            node.inputs.amplitude.subscribe(setAmplitude);

        return () => {
            outputSubscription.unsubscribe();
            amplitudeSubscription.unsubscribe();
        };
    }, [node]);

    const pendulumLength = 226 - 8;

    return (
        <NodeWindow>
            <div className="w-[226px] h-80 bg-cover bg-center flex flex-col items-center justify-center relative">
                <motion.div
                    className="w-2 h-2 bg-black rounded-full"
                    style={{
                        y: `${(((value / amplitude) * 2 - 1) * pendulumLength) / 2}px`,
                        x: '50%'
                    }}
                />
            </div>
        </NodeWindow>
    );
});
