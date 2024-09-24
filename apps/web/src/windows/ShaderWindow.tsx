import { observer } from 'mobx-react-lite';
import { NodeWindow } from '@/circuit/components/Node/Node';
import { useEffect, useRef, useState } from 'react';
import { Shader } from '@bitspace/nodes';
import { Canvas, useThree } from '@react-three/fiber';
import { ShaderMaterial } from 'three';

const Scene = ({ material }: { material: ShaderMaterial }) => {
    const viewport = useThree(state => state.viewport);

    return (
        <mesh scale={[viewport.width, viewport.height, 1]} material={material}>
            <planeGeometry />
        </mesh>
    );
};

export const ShaderWindow = observer(({ node }: { node: Shader }) => {
    const [material, setMaterial] = useState<ShaderMaterial | undefined>();

    useEffect(() => {
        const subscription = node.outputs.output.subscribe(setMaterial);

        return () => {
            subscription.unsubscribe();
        };
    }, [node]);

    return (
        <NodeWindow>
            <Canvas className="!w-[226px] !h-[226px]">
                <orthographicCamera />
                {material && <Scene material={material} />}
            </Canvas>
        </NodeWindow>
    );
});
