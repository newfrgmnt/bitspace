import { useEffect, useState } from 'react';
import { console } from '../../circuit/console';

export const Console = () => {
    const [stack, setStack] = useState<string[]>([]);

    useEffect(() => {
        console.subscribe(value => {
            setStack([JSON.stringify(value)]);
        });
    }, []);

    return (
        <div className="rounded-3xl bg-white shadow-2xl p-4 w-64 h-64 font-mono">
            <pre>
                {stack.map((v, i) => (
                    <div key={i}>{v}</div>
                ))}
            </pre>
        </div>
    );
};
