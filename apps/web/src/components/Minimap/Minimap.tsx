import { useContext, useEffect, useRef, useState } from 'react';
import { CIRCUIT_SIZE } from '../../circuit/constants';
import Draggable from 'react-draggable';
import clsx from 'clsx';
import { StoreContext } from '../../circuit/stores/CanvasStore/CanvasStore';
import { observer } from 'mobx-react-lite';
import { autorun, get } from 'mobx';
import { Position } from '../../circuit';
import { lerp } from '../../utils';

export const Minimap = observer(({ className }: { className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [viewportScale, setCanvasScale] = useState({ width: 0, height: 0 });
    const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const { store } = useContext(StoreContext);

    useEffect(() => {
        if (!window.visualViewport || !ref.current) {
            return;
        }

        const { width: viewportWidth, height: viewportHeight } = window.visualViewport;
        const { width: mapWidth, height: mapHeight } = ref.current?.getBoundingClientRect();

        setCanvasScale({
            width: viewportWidth / CIRCUIT_SIZE,
            height: viewportHeight / CIRCUIT_SIZE
        });

        setMapSize({
            width: mapWidth,
            height: mapHeight
        });
    }, []);

    useEffect(() => {
        return autorun(() => {
            const viewportX = get(store.viewportPosition, 'x');
            const viewportY = get(store.viewportPosition, 'y');

            setPosition({
                x: lerp(0, mapSize.width, viewportX / CIRCUIT_SIZE),
                y: lerp(0, mapSize.height, viewportY / CIRCUIT_SIZE)
            });
        });
    }, [viewportScale, store]);

    return (
        <div ref={ref} className={clsx('w-64 h-64 rounded-3xl bg-white shadow-2xl', className)}>
            <Draggable bounds="parent" position={position}>
                <div
                    className="absolute border-2 rounded-md"
                    style={{
                        width: mapSize.width * viewportScale.width,
                        height: mapSize.height * viewportScale.height
                    }}
                />
            </Draggable>
        </div>
    );
});
