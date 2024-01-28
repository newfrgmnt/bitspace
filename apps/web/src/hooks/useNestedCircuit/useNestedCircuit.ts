import { useParams } from 'next/navigation';

export const useNestedCircuit = () => {
    const { id: circuitId } = useParams();
    const previous = circuitId && circuitId[circuitId?.length - 2];
    const current = circuitId && circuitId[circuitId?.length - 1];

    return {
        previous,
        current
    };
};
