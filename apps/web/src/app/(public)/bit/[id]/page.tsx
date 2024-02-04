import ClientPage from './ClientPage';
import { getBit } from '../../../../server/query/getBit';

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const bit = await getBit(id);

    if (!bit) {
        return <></>;
    }

    return <ClientPage bit={bit} />;
}
