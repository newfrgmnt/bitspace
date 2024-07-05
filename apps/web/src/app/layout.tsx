import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import type { Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GeistMono } from 'geist/font/mono';
import '@bitspace/ui/globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
    title: 'Bitspace',
    description: 'A playground for creative ideas'
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
    // Also supported by less commonly used
    // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <html lang="en">
                <body
                    className={`${inter.className} ${GeistMono.variable} bg-slate-50`}
                >
                    {children}
                    <Analytics />
                </body>
            </html>
        </Providers>
    );
}
