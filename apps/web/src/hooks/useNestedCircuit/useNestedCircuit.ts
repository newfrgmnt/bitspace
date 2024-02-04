import { useParams } from 'next/navigation';

export const useNestedCircuit = () => {
    const { circuitId } = useParams();
    const previous = circuitId && circuitId[circuitId?.length - 2];
    const current = circuitId && circuitId[circuitId?.length - 1];

    return {
        previous,
        current
    };
};
