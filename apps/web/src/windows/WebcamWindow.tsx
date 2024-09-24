import { observer } from 'mobx-react-lite';
import { NodeWindow } from '../circuit/components/Node/Node';
import { Spinner } from '../components/Spinner/Spinner';
import { useWindowSubscription } from '@/hooks/useWindowSubscription';
import { Webcam } from '@bitspace/nodes';

export const WebcamWindow = observer(({ node }: { node: Webcam }) => {
    const sourceObject = useWindowSubscription(node.outputs.output);

    return (
        <NodeWindow>
            <video
                ref={element => {
                    if (!element) return;

                    element.srcObject = sourceObject;
                }}
                className="w-[226px] h-80 bg-cover bg-center flex flex-col items-center justify-center"
                controls={false}
                autoPlay
            />
        </NodeWindow>
    );
});
