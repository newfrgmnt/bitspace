import { observer } from 'mobx-react-lite';
import { NodeWindow } from '@/circuit/components/Node/Node';
import { useEffect, useState } from 'react';
import { Oscillator } from '@bitspace/nodes';
import { motion } from 'framer-motion';
import { combineLatest } from 'rxjs';

export const OscillatorWindow = observer(({ node }: { node: Oscillator }) => {
    const [oscillation, setOscillation] = useState<{
        value: number;
        amplitude: number;
        frequency: number;
        time: number;
    }>({ value: 0, amplitude: 1, frequency: 0, time: 0 });

    useEffect(() => {
        const aggregatedSubscription = combineLatest([
            node.outputs.output,
            node.inputs.amplitude,
            node.inputs.frequency,
            node.inputs.time
        ]).subscribe(([value, amplitude, frequency, time]) =>
            setOscillation({ value, amplitude, frequency, time })
        );

        return () => {
            aggregatedSubscription.unsubscribe();
        };
    }, [node]);

    const { value, amplitude, frequency, time } = oscillation;

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

            let path = '';
            for (let i = 0; i <= size; i++) {
                const x = ((i / size) * size) / 2;
                const y =
                    size / 2 +
                    (size / 2) *
                        Math.sin(Math.PI * (i / size) + phase * 2 + Math.PI);
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
