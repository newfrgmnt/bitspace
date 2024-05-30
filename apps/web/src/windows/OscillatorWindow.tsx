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
    const [frequency, setFrequency] = useState<number>(0);
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        const outputSubscription = node.outputs.output.subscribe(setValue);
        const amplitudeSubscription =
            node.inputs.amplitude.subscribe(setAmplitude);
        const frequencySubscription =
            node.inputs.frequency.subscribe(setFrequency);
        const timeSubscription = node.inputs.time.subscribe(setTime);

        return () => {
            outputSubscription.unsubscribe();
            amplitudeSubscription.unsubscribe();
            frequencySubscription.unsubscribe();
            timeSubscription.unsubscribe();
        };
    }, [node]);

    const pendulumLength = 226 - 8;
    const scale = 1 - ((value / amplitude) * 2 - 1);

    return (
        <NodeWindow>
            <div className="w-[226px] h-80 bg-cover bg-center flex flex-col items-center justify-center relative">
                <SineWave
                    phase={time * frequency * Math.PI + Math.PI / 2}
                    frequency={frequency}
                />
                <motion.div
                    className="w-2 h-2 bg-black rounded-full absolute"
                    style={{
                        y: `${(pendulumLength / 2) * (scale - 1)}px`,
                        x: '50%'
                    }}
                />
            </div>
        </NodeWindow>
    );
});

const SineWave = ({
    frequency,
    phase
}: {
    phase: number;
    frequency: number;
}) => {
    const [pathData, setPathData] = useState('');

    useEffect(() => {
        const generatePathData = () => {
            const size = 226; // Height of the SVG
            const points = 226; // Number of points to plot

            let path = '';
            for (let i = 0; i <= points; i++) {
                const x = ((i / points) * size) / 2;
                const y =
                    size / 2 +
                    (size / 2) *
                        Math.sin(Math.PI * (i / points) + phase * 2 + Math.PI);
                path += `${i === 0 ? 'M' : 'L'}${x},${y}`;
            }
            return path;
        };

        setPathData(generatePathData());
    }, [frequency, phase]);

    return (
        <svg width="226" height="226" viewBox="0 0 226 226">
            <path
                d={pathData}
                stroke="rgb(203, 213, 225)"
                strokeWidth={2}
                fill="transparent"
            />
        </svg>
    );
};
