import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '../providers';
import { ClientLayout } from './ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Bitspace',
    description: 'Your personal space for bits and pieces'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <Providers>
            <html lang="en">
                <body className={`${inter.className} bg-slate-50`}>
                    <ClientLayout>{children}</ClientLayout>
                </body>
            </html>
        </Providers>
    );
}
