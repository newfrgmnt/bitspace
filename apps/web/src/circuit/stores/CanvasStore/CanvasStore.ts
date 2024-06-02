import { Connection, Input, Node, Output, Circuit } from '@bitspace/circuit';
import { isEmpty, isEqual, xorWith } from 'lodash';
import { autorun, IReactionDisposer, makeAutoObservable } from 'mobx';
import { createContext } from 'react';

import { NODE_CENTER } from '../../constants';
import { normalizeBounds, withinBounds } from '../../utils/bounds/bounds';
import { Bounds } from '../../utils/bounds/bounds.types';
import { fromCanvasCartesianPoint } from '../../utils/coordinates/coordinates';
import { Position, Size, StoreProviderValue } from './CanvasStore.types';

export class CanvasStore {
    /** Associated Circuit */
    public circuit: Circuit;
    /** Associated Node Elements */
    public nodeElements: Map<Node['id'], HTMLDivElement> = new Map();
    /** Associated Port Elements */
    public portElements: Map<Input['id'] | Output['id'], HTMLDivElement> =
        new Map();
    /** Selected Nodes */
    public selectedNodes: Node[] = [];
    /** Draft Connection Source */
    public draftConnectionSource: Output | null = null;
    /** Selection bounds */
    public selectionBounds: Bounds | null = null;
    /** Mouse Position */
    public mousePosition: Position = { x: 0, y: 0 };
    /** Canvas Size */
    public canvasSize: Size = { width: 0, height: 0 };
    /** Canvas Position */
    public canvasPosition: Position = { x: 0, y: 0 };

    /** Selection Bounds autorun disposer */
    private selectionBoundsDisposer: IReactionDisposer;

    constructor(circuit: Circuit) {
        this.circuit = circuit;

        makeAutoObservable(this);

        this.selectionBoundsDisposer = this.onSelectionBoundsChange();
    }

    /** All associated connections */
    public get connections() {
        return this.circuit.nodes
            .flatMap(node => node.connections)
            .filter((value, index, self) => self.indexOf(value) === index);
    }

    /** Canvas midpoint */
    public get canvasMidpoint(): Position {
        return {
            x: this.canvasPosition.x + this.canvasSize.width / 2,
            y: this.canvasPosition.y + this.canvasSize.height / 2
        };
    }

    /** Removes a node from the store */
    public removeNode(node: Node) {
        this.circuit.removeNode(node);
        this.nodeElements.delete(node.id);
    }

    /** Associates a given Node instance with an HTML Element */
    public setNodeElement(
        nodeId: Node['id'],
        portElement: HTMLDivElement
    ): void {
        this.nodeElements.set(nodeId, portElement);
    }

    /** Clears a given Node's associated HTML Element from store */
    public removeNodeElement(nodeId: Node['id']): void {
        this.nodeElements.delete(nodeId);
    }

    /** Associates a given Input or Output instance with an HTML Element */
    public setPortElement(
        portId: Input['id'] | Output['id'],
        portElement: HTMLDivElement
    ): void {
        this.portElements.set(portId, portElement);
    }

    /** Clears a given Input's or Output's associated HTML Element from store */
    public removePortElement(portId: Input['id'] | Output['id']): void {
        this.portElements.delete(portId);
    }

    /** Sets an Output as the current draft connection source */
    public setDraftConnectionSource(source: Output | null): void {
        this.draftConnectionSource = source;
    }

    /** Sets an Output as the current draft connection source */
    public commitDraftConnection<T>(target: Input<T>): Connection<T> | void {
        if (this.draftConnectionSource) {
            const connection = this.draftConnectionSource.connect(target);

            this.setDraftConnectionSource(null);

            return connection;
        }
    }

    /** Selects the given nodes */
    public selectNodes(nodes: Node[]): void {
        this.selectedNodes = nodes;
    }

    /** Sets the selection bounds */
    public setSelectionBounds(bounds: Bounds | null): void {
        this.selectionBounds = bounds;
    }

    /** Sets the mouse position */
    public setMousePosition(mousePosition: Position): void {
        this.mousePosition = mousePosition;
    }

    /** Sets the canvas size */
    public setCanvasSize(size: Size): void {
        this.canvasSize = size;
    }

    /** Sets the canvas position */
    public setCanvasPosition(position: Position): void {
        this.canvasPosition = position;
    }

    /** Returns the node with the associated port */
    public getNodeByPortId(portId: Input['id'] | Output['id']) {
        return this.circuit.nodes.find(node => {
            return [
                ...Object.values(node.inputs),
                ...Object.values(node.outputs)
            ].some(port => port.id === portId);
        });
    }

    /** Disposes the store by cleaning up effects */
    public dispose(): void {
        this.circuit.dispose();
        this.nodeElements.clear();
        this.portElements.clear();
        this.selectedNodes = [];
        this.selectionBounds = null;
        this.draftConnectionSource = null;
        this.mousePosition = { x: 0, y: 0 };

        this.selectionBoundsDisposer();
    }

    /** Automatically selects the nodes which are within the selection bounds */
    private onSelectionBoundsChange(): IReactionDisposer {
        return autorun(() => {
            if (this.selectionBounds) {
                const bounds = normalizeBounds(this.selectionBounds);

                const selectionCandidates = [];

                for (const node of this.circuit.nodes) {
                    const nodeElement = this.nodeElements.get(node.id);

                    if (nodeElement) {
                        const nodeRect = nodeElement.getBoundingClientRect();

                        const nodePosition = node.position;

                        if (
                            nodePosition &&
                            withinBounds(bounds, {
                                ...fromCanvasCartesianPoint(
                                    nodePosition.x - NODE_CENTER,
                                    nodePosition.y
                                ),
                                width: nodeRect.width,
                                height: nodeRect.height
                            })
                        ) {
                            selectionCandidates.push(node);
                        }
                    }
                }

                if (
                    !isEmpty(
                        xorWith(
                            this.selectedNodes,
                            selectionCandidates,
                            isEqual
                        )
                    )
                ) {
                    this.selectNodes(selectionCandidates);
                }
            }
        });
    }
}

const defaultStoreProviderValue: StoreProviderValue = {
    store: new CanvasStore(new Circuit())
};

export const StoreContext = createContext(defaultStoreProviderValue);
