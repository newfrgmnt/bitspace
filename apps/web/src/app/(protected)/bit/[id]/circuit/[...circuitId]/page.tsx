import { getCircuit } from '../../../../../../server/query/getCircuit';
import { ClientPage } from './ClientPage';

export default async function Page({ params: { circuitId } }: { params: { circuitId: string[] } }) {
    const circuit = await getCircuit(circuitId[circuitId.length - 1] as string);
    console.log(circuit);

    return <ClientPage circuit={circuit} />;
}
