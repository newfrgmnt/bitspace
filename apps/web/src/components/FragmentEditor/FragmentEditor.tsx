import { updateNode } from "@/server/mutations/updateNode";
import { Shader } from "@bitspace/nodes";
import { set } from "mobx";
import { useEffect, useState } from "react";

export const FragmentEditor = ({ node }: { node: Shader }) => {
    const [fragment, setFragment] = useState('');

    useEffect(() => {
        const subscription = node.$fragmentShader.subscribe(setFragment);

        return () => {
            subscription.unsubscribe();
        };
    }, [node]);

    return (
        <div className="flex flex-col p-12 min-h-96">
            <textarea
                className="bg-slate-100 p-4 h-full rounded-2xl font-mono text-sm"
                value={fragment}
                onKeyDown={e => {
                    e.stopPropagation();
                }}
                onChange={e => {
                    e.stopPropagation();
                    setFragment(e.target.value);
                }}
                onBlur={e => {
                    set(node, 'data', { fragmentShader: fragment });
                    updateNode(node.id, { data: { fragmentShader: fragment } });
                }}
            />
        </div>
    );
};