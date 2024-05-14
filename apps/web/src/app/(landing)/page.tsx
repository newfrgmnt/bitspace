import type { Metadata } from 'next';
import { CircuitExample } from './CircuitExample';

export const metadata: Metadata = {
    title: 'Bitspace',
    description: 'A creative environment for the 21st century'
};

export default function Page() {
    return (
        <div className="flex flex-col items-center h-screen p-24">
            <div className="flex flex-col items-center max-w-7xl w-full">
                <h1 className="text-2xl text-center">Bitspace</h1>
                <h1 className="text-lg text-center text-slate-500">
                    A creative environment for the 21st century
                </h1>
                <div className="w-full aspect-video">
                    <CircuitExample />
                </div>
            </div>
        </div>
    );
}
