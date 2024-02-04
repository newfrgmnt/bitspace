import { Panel } from '../../components/Panel/Panel';
import { observer } from 'mobx-react-lite';
import { useContext, useMemo } from 'react';
import { Control } from '../../components/Control/Control';
import { HTMLMotionProps } from 'framer-motion';
import { StoreContext } from '../../circuit';
import clsx from 'clsx';

export const PropertyPanel = observer(({ className, ...props }: HTMLMotionProps<'div'>) => {
    const { store } = useContext(StoreContext);
    const selectedNode = store.selectedNodes[0];

    const inputs = useMemo(() => Object.values(selectedNode?.inputs ?? {}), [selectedNode]);
    const outputs = useMemo(() => Object.values(selectedNode?.outputs ?? {}), [selectedNode]);

    if (!selectedNode) {
        return null;
    }

    return (
        <Panel className={clsx('h-fit flex flex-col gap-y-8 p-8', className)} {...props}>
            <div className="flex flex-col gap-y-4">
                <h4 className="font-medium">Inputs</h4>
                <div className="flex flex-col gap-y-1">
                    {inputs.map(input => (
                        <div key={input.id} className="flex flex-row items-center justify-between text-sm">
                            <h3 className="font-medium w-full">{input.name}</h3>
                            <Control port={input} disabled={input.connected} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <h4 className="font-medium">Outputs</h4>
                <div className="flex flex-col gap-y-1">
                    {outputs.map(output => (
                        <div key={output.id} className="flex flex-row items-center justify-between text-sm">
                            <h3 className="font-medium w-full">{output.name}</h3>
                            <Control port={output} disabled />
                        </div>
                    ))}
                </div>
            </div>
        </Panel>
    );
});
