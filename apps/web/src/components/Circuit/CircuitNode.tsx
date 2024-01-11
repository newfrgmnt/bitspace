import Draggable from 'react-draggable';

export const CircuitNode = () => {
    return (
        <Draggable>
            <div className="absolute w-[320px] h-[240px] rounded-3xl bg-slate-50" />
        </Draggable>
    );
};
