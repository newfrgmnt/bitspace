'use client';

import { Circuit, CircuitStore } from '@nodl/react';
import { useEffect, useState } from 'react';
import { ImageNode } from '../../nodes/ImageNode/ImageNode';
import { NodeWindowResolver } from '@nodl/react/build/containers/Circuit/Circuit.types';
import { Node } from '@nodl/core';

export const ImageWindow = ({ node }: { node: ImageNode }) => {
    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {
        node.outputs.output.subscribe(value => {
            setImageSrc(value);
        });
    }, [node]);

    return (
        <div
            className="w-full h-80 bg-cover bg-center"
            style={{
                backgroundImage: `url(${imageSrc})`
            }}
        />
    );
};

const nodeWindowManager: NodeWindowResolver = (node: Node) => {
    switch (node.name) {
        case 'Image':
            return <ImageWindow node={node as ImageNode} />;
    }
};

export default function Page(): JSX.Element {
    const circuitStore = new CircuitStore();

    useEffect(() => {
        const imageNode = new ImageNode();

        circuitStore.setNodes([[imageNode, { x: 100, y: 100 }]]);
    }, []);

    return (
        <main className="flex flex-col justify-between h-screen w-screen>
            <Circuit store={circuitStore} nodeWindowResolver={nodeWindowManager} />
        </main>
    );
}
