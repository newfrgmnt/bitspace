import { useEffect, useRef, useState } from 'react';
import { Console } from '../../nodes/Console/Console';
import { takeRight } from 'lodash';
import { NodeWindow } from '../../circuit/components/Node/Node';

export const ConsoleWindow = ({ node }: { node: Console }) => {
    const scrollRef = useRef<HTMLPreElement>(null);
    const [stack, setStack] = useState<string[]>([]);

    useEffect(() => {
        const subscription = node.inputs.input.subscribe(value => {
            setStack(stack => [...takeRight(stack, 100), JSON.stringify(value)]);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [stack]);

    return (
        <NodeWindow className="font-mono flex flex-col text-xxs flex-wrap shadow-none border-slate-100 bg-slate-50 border-2 text-slate-500 rounded-2xl">
            <pre ref={scrollRef} className="w-full h-full text-wrap overflow-y-auto flex flex-col gap-y-1 p-2">
                {stack.map((v, i) => (
                    <div className="flex flex-row w-full" key={i}>
                        {v}
                    </div>
                ))}
            </pre>
        </NodeWindow>
    );
};
