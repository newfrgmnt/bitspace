import { NodeType } from '@prisma/client';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { ComponentProps, useContext, useMemo } from 'react';
import { StoreContext } from '../../circuit';
import { Control } from '../../components/Controls/Control/Control';
import { NodeDescriptionsMap } from '../../nodes/descriptions';
import { updateInput } from '../../server/mutations/updateInput';

export const PropertyPanel = observer(
    ({ className, ...props }: ComponentProps<'div'>) => {
        const { store } = useContext(StoreContext);
        const selectedNode = store.selectedNodes[0];

        const inputs = useMemo(
            () => Object.values(selectedNode?.inputs ?? {}),
            [selectedNode]
        );
        const outputs = useMemo(
            () => Object.values(selectedNode?.outputs ?? {}),
            [selectedNode]
        );

        if (!selectedNode) {
            return null;
        }

        return (
            <div
                className={clsx(
                    'h-full flex flex-col gap-y-8 w-96 py-8 pr-12',
                    className
                )}
                {...props}
            >
                <div className="flex flex-col gap-y-2">
                    <h2 className="font-semibold">{selectedNode.name}</h2>
                    <p className="text-sm text-slate-500 leading-relaxed text-pretty">
                        {NodeDescriptionsMap[selectedNode.type as NodeType]}
                    </p>
                </div>
                {inputs.length > 0 && (
                    <div className="flex flex-col gap-y-4">
                        <h4 className="font-medium">Inputs</h4>
                        <div className="flex flex-col gap-y-4">
                            {inputs.map(input => (
                                <div
                                    key={input.id}
                                    className="flex flex-col gap-2 text-sm"
                                >
                                    <h3 className="font-medium w-full text-slate-500">
                                        {input.name}
                                    </h3>
                                    <Control
                                        port={input}
                                        disabled={input.connected}
                                        onBlur={value =>
                                            updateInput(input.id, value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {outputs.length > 0 && (
                    <div className="flex flex-col gap-y-4">
                        <h4 className="font-medium">Outputs</h4>
                        <div className="flex flex-col gap-y-4">
                            {outputs.map(output => (
                                <div
                                    key={output.id}
                                    className="flex flex-col gap-2 text-sm"
                                >
                                    <h3 className="font-medium w-full text-slate-500">
                                        {output.name}
                                    </h3>
                                    <Control port={output} disabled />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
);
