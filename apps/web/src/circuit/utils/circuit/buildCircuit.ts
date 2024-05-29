import { Circuit, Input, Output } from '@bitspace/circuit';
import { JsonObject } from '@prisma/client/runtime/library';
import {
    Input as SerializedInput,
    Output as SerializedOutput,
    Node as SerializedNode,
    NodePosition as SerializedPosition,
    Connection as SerializedConnection
} from '@prisma/client';
import { NodeConstructor, NodeConstructors } from '@bitspace/nodes';

export interface ExtendedNode extends SerializedNode {
    children: ExtendedNode[];
    position: SerializedPosition;
    inputs: SerializedInput[];
    outputs: (SerializedOutput & {
        connections: SerializedConnection[];
    })[];
}

export const buildCircuit = (serializedNode: ExtendedNode) => {
    if (serializedNode.type !== 'CIRCUIT') {
        return;
    }

    const connectionCache = new Set<[Output['id'], Input<any>['id']]>();
    const portCache = new Map<
        Input['id'] | Output['id'],
        Input<any> | Output<any>
    >();

    const circuit = new Circuit();
    circuit.id = serializedNode.id;

    for (const child of serializedNode.children) {
        const nodeConstructor = NodeConstructors.find(
            (nodeConstructor: NodeConstructor) =>
                nodeConstructor.type === child.type
        );

        if (!nodeConstructor) continue;

        const node = new nodeConstructor();

        node.id = child.id;
        node.position = { x: child.position.x, y: child.position.y };
        node.data = (child.data as JsonObject) ?? {};

        for (const serializedOutput of Object.values(child.outputs)) {
            // @ts-ignore
            const output = node.outputs[serializedOutput.key];

            if (output) {
                output.id = serializedOutput.id;

                portCache.set(output.id, output);

                for (const serializedConnection of serializedOutput.connections) {
                    connectionCache.add([
                        serializedConnection.fromId,
                        serializedConnection.toId
                    ]);
                }
            }
        }

        for (const serializedInput of Object.values(child.inputs)) {
            // @ts-ignore
            const input: Input = node.inputs[serializedInput.key];

            if (input) {
                input.id = serializedInput.id;

                portCache.set(input.id, input);

                if (typeof serializedInput.value !== 'undefined') {
                    input.next(input.type.parse(serializedInput.value));
                }
            }
        }

        circuit.addNode(node);
    }

    for (const [outputId, inputId] of connectionCache) {
        const output = portCache.get(outputId) as Output<any>;
        const input = portCache.get(inputId) as Input<any>;

        if (!output || !input) {
            continue;
        }

        output.connect(input);
    }

    return circuit;
};
