import type { Metadata } from 'next';
import { CircuitExample } from './CircuitExample';
import { Hero } from './Hero';

export const metadata: Metadata = {
    title: 'Bitspace',
    description: 'A space for exploration, prototypes & creative computation',
    openGraph: {
        images: [
            {
                url: 'https://polar.sh/_next/image?url=https%3A%2F%2F7vk6rcnylug0u6hg.public.blob.vercel-storage.com%2Fimage-uNOjlhlA1jNCzDcYXCtAJ9Xtdcqh1q.png&w=1920&q=90',
                width: 1920,
                height: 1080
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Bitspace',
        description:
            'A space for exploration, prototypes & creative computation',
        creator: '@newfrgmnt',
        images: [
            {
                url: 'https://polar.sh/_next/image?url=https%3A%2F%2F7vk6rcnylug0u6hg.public.blob.vercel-storage.com%2Fimage-uNOjlhlA1jNCzDcYXCtAJ9Xtdcqh1q.png&w=1920&q=90',
                width: 1920,
                height: 1080
            }
        ]
    }
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
