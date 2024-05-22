/** @jsxImportSource @emotion/react */
import { Input, Output } from '@bitspace/circuit';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useHover } from '../../hooks/useHover/useHover';
import { StoreContext } from '../../stores/CanvasStore/CanvasStore';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipPosition } from '../Tooltip/Tooltip.types';
import { PortProps } from './Port.types';
import clsx from 'clsx';
import { Close } from '@mui/icons-material';
import posthog from 'posthog-js';
import { createConnection } from '../../../server/mutations/createConnection';
import { AnimatePresence, motion } from 'framer-motion';

export const Port = observer(<T,>({ port, isOutput }: PortProps<T>) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const { onMouseEnter, onMouseLeave, isHovered } = useHover();
    const {
        onMouseEnter: onPortTypeEnter,
        onMouseLeave: onPortTypeLeave,
        isHovered: isPortTypeHovered
    } = useHover();
    const { store } = React.useContext(StoreContext);

    const tooltipPosition = React.useMemo(
        () => (isOutput ? TooltipPosition.RIGHT : TooltipPosition.LEFT),
        [isOutput]
    );
    const visuallyDisabled = React.useMemo(() => {
        const isOccupied = !isOutput && port.connected;
        const hasSharedNode = store.draftConnectionSource
            ? store.getNodeByPortId(store.draftConnectionSource.id) ===
              store.getNodeByPortId(port.id)
            : false;
        // const isUnrelatedToConnectionDraft = store.draftConnectionSource !== port;

        return store.draftConnectionSource
            ? isOccupied || isOutput || hasSharedNode
            : false;
    }, [isOutput]);

    React.useEffect(() => {
        if (ref.current) {
            store.setPortElement(port.id, ref.current);

            return () => {
                store.removePortElement(port.id);
            };
        }
    }, []);

    const onMouseDown: React.MouseEventHandler<HTMLDivElement> =
        React.useCallback(
            e => {
                e.stopPropagation();

                if (isOutput) {
                    store.setDraftConnectionSource(port as Output<any>);

                    posthog.capture('Connection Draft initiated');
                }
            },
            [isOutput]
        );

    const onMouseUp = React.useCallback(() => {
        if (!isOutput && store.draftConnectionSource) {
            const connection = store.commitDraftConnection(port as Input<any>);

            if (connection) {
                createConnection(connection.from.id, connection.to.id);
            }

            posthog.capture('Connection established');
        }
    }, [isOutput, port]);

    const onClick = React.useCallback(() => {
        if (port.connected) {
            const connections =
                'connection' in port ? [port.connection] : port.connections;

            for (const connection of connections) {
                if (connection) {
                    connection.dispose();

                    posthog.capture('Connection removed on port click');
                }
            }
        }
    }, [port]);

    const highlighted =
        port.connected ||
        (!store.draftConnectionSource && isHovered) ||
        (store.draftConnectionSource?.id === port.id && !visuallyDisabled);

    const portWrapperClassNames = clsx(
        'relative flex flex-row grow-1 items-center py-1 text-xs font-medium select-none transition-opacity',
        {
            'flex-row-reverse': isOutput,
            'flex-row': !isOutput,
            'opacity-30': visuallyDisabled,
            'text-black': highlighted
        }
    );

    const portTypeClassNames = clsx(
        'flex flex-col items-center justify-center text-xxs font-medium tracking-normal rounded w-4 h-4 transition-all',
        {
            'bg-red-500': port.connected && isPortTypeHovered,
            'bg-slate-200': !port.connected && !isHovered && !highlighted,
            'bg-black':
                (port.connected && !isPortTypeHovered) ||
                (!port.connected && isHovered) ||
                highlighted,
            'text-white': highlighted || isHovered,
            'ml-2': isOutput,
            'mr-2': !isOutput
        }
    );

    return (
        <Tooltip text={port.type.description ?? ''} position={tooltipPosition}>
            <div
                ref={ref}
                className={portWrapperClassNames}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
            >
                <div
                    className={portTypeClassNames}
                    onMouseEnter={onPortTypeEnter}
                    onMouseLeave={onPortTypeLeave}
                    onClick={onClick}
                >
                    <AnimatePresence mode="wait">
                        {port.connected &&
                        isPortTypeHovered &&
                        !visuallyDisabled ? (
                            <PortWrapper key={0}>
                                <Close fontSize="inherit" />
                            </PortWrapper>
                        ) : (
                            <PortWrapper key={1}>
                                <span>
                                    {port.type.description?.charAt(0) ?? '?'}
                                </span>
                            </PortWrapper>
                        )}
                    </AnimatePresence>
                </div>
                <span>{port.name}</span>
            </div>
        </Tooltip>
    );
});

const PortWrapper = ({ children }: React.PropsWithChildren) => {
    return (
        <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
        >
            {children}
        </motion.div>
    );
};
