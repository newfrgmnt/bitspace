import { step, float } from '@thi.ng/shader-ast';

import { Step } from './Step';

describe('Step', () => {
    it('should initialize with correct values', () => {
        const s = new Step();

        expect(typeof s.id).toEqual('string');
        expect(s.name).toEqual('Step');
        expect(s.inputs.input).toBeDefined();
        expect(s.inputs.edge).toBeDefined();
        expect(s.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const s = new Step();

        const spy = jest.fn();
        s.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(step(float(0), float(0)));

        s.inputs.edge.next(float(200));
        expect(spy).toHaveBeenCalledWith(step(float(200), float(0)));

        s.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(step(float(200), float(100)));
    });
});
