import { Canvas, useFrame } from '@react-three/fiber';
import * as React from 'react';
import { Mesh } from 'three';
import { Mesh as MeshNode } from '../../../../packages/nodes/src/3d/Mesh/Mesh';
import { NodeWindow } from '../circuit/components/Node/Node';

const MeshComponent = ({ mesh }: { mesh: Mesh }) => {
    const meshRef = React.useRef<Mesh>();

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime();
            meshRef.current.rotation.y = clock.getElapsedTime();
        }
    });
    return <primitive ref={meshRef} object={mesh} position={[0, 0, 1]} />;
};

export const MeshWindow = ({ node }: { node: MeshNode }) => {
    const [mesh, setMesh] = React.useState<Mesh>();

    React.useEffect(() => {
        const sub = node.outputs.mesh.subscribe(value => {
            setMesh(value);
        });

        return () => {
            sub.unsubscribe();
        };
    }, [node]);

    return (
        <NodeWindow>
            <Canvas
                style={{ height: 222 }}
                gl={{ alpha: true }}
                camera={{ fov: 35 }}
            >
                <pointLight position={[0, 0, 10]} intensity={1} />
                {mesh ? <MeshComponent mesh={mesh} /> : undefined}
            </Canvas>
        </NodeWindow>
    );
};
