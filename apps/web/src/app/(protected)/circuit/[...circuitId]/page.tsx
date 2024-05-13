import { ExtendedNode } from '../../../../circuit/utils/circuit/buildCircuit';
import { getCircuit } from '../../../../server/query/getCircuit';
import { ClientPage } from './ClientPage';

export default async function Page({
    params: { circuitId }
}: {
    params: { circuitId: string[] };
}) {
    const circuit = await getCircuit(circuitId[circuitId.length - 1] as string);

    if (!circuit) {
        return null;
    }

    return <ClientPage circuit={circuit as unknown as ExtendedNode} />;
}
