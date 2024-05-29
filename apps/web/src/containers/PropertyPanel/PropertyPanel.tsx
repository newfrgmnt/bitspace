import { NodeType } from '@prisma/client';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { ComponentProps, useContext, useMemo } from 'react';
import { StoreContext } from '../../circuit';
import { Control } from '../../components/Controls/Control/Control';
import { NodeDescriptionsMap } from '@bitspace/nodes/descriptions';
import { updateInput } from '../../server/mutations/updateInput';
import { Input, Output } from '@bitspace/circuit';
import { LockOutlined } from '@mui/icons-material';

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
                    'h-full flex flex-col w-80 py-12 pr-4 divide-y divide-slate-200',
                    className
                )}
                {...props}
            >
                <div className="flex flex-col gap-y-2 pb-8">
                    <h2 className="text-lg">{selectedNode.name}</h2>
                    <p className="text-sm text-slate-500 leading-relaxed text-pretty">
                        {NodeDescriptionsMap[selectedNode.type as NodeType]}
                    </p>
                </div>
                {inputs.length > 0 && (
                    <div className="flex flex-col gap-y-6 py-8">
                        <h4 className="font-medium">Inputs</h4>
                        <div className="flex flex-col gap-y-4">
                            {inputs.map(input => (
                                <Port
                                    key={input.id}
                                    port={input}
                                    disabled={input.connected}
                                    onBlur={value =>
                                        updateInput(input.id, value)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}
                {outputs.length > 0 && (
                    <div className="flex flex-col gap-y-6 py-8">
                        <h4 className="font-medium">Outputs</h4>
                        <div className="flex flex-col gap-y-4">
                            {outputs.map(output => (
                                <Port
                                    key={output.id}
                                    port={output}
                                    disabled={true}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

interface PortProps {
    port: Input | Output;
    disabled?: boolean;
    onBlur?: (value: any) => void;
}

const Port = observer(({ port, disabled, onBlur }: PortProps) => (
    <div className="flex flex-col gap-2 text-sm">
        <div className="flex flex-row items-center gap-x-3 justify-between">
            <h3 className="font-medium">{port.name}</h3>
            <div className="flex flex-row items-center">
                {disabled && (
                    <LockOutlined
                        className="mr-2 text-slate-400"
                        fontSize="inherit"
                    />
                )}
                <span className="bg-slate-200/60 text-slate-500 rounded-lg px-1.5 font-medium text-xxs">
                    {port.type.description}
                </span>
            </div>
        </div>
        <Control port={port} disabled={disabled} onBlur={onBlur} />
    </div>
));
