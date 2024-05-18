import type { Metadata } from 'next';
import { CircuitExample } from './CircuitExample';
import { Hero } from './Hero';

export const metadata: Metadata = {
    title: 'Bitspace',
    description: 'A creative environment for the 21st century'
};

export default function Page() {
    return (
        <div className="flex flex-col items-center gap-y-32">
            <Hero />
            <div className="w-full flex flex-col">
                <CircuitExample />
            </div>
        </div>
    );
}
