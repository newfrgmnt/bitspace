'use client';

import { Bit } from '@prisma/client';
import Link from 'next/link';

export default function ClientPage({ bit }: { bit: Bit | undefined }): JSX.Element {
    if (!bit) {
        return <></>;
    }

    return (
        <div>
            <h1>{bit.name}</h1>
            <Link href={`/bit/${bit.id}/circuit/${bit.rootId}`}>Go to Circuit</Link>
        </div>
    );
}
