import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col items-center h-screen overflow-y-auto">
            <div className="flex flex-col items-center w-full h-fit p-24 gap-y-24">
                <div className="flex flex-col items-center w-full">
                    <h1 className="text-2xl text-center">Bitspace</h1>
                </div>
                <div className="flex flex-col w-full">{children}</div>
                <Footer />
            </div>
        </div>
    );
}

const Footer = () => {
    return (
        <div className="flex flex-col items-center w-full py-12">
            <div className="flex flex-col items-center w-full gap-y-8">
                <h2 className="text-2xl">
                    A passion project from{' '}
                    <Link
                        className="text-gray-400"
                        href="https://twitter.com/newfrgmnt"
                        target="_blank"
                    >
                        new fragment
                    </Link>
                </h2>
            </div>
        </div>
    );
};
