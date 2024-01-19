import { step, float, smoothstep } from '@thi.ng/shader-ast';

import { Smoothstep } from './Smoothstep';

describe('Smoothstep', () => {
    it('should initialize with correct values', () => {
        const s = new Smoothstep();

        expect(typeof s.id).toEqual('string');
        expect(s.name).toEqual('Smoothstep');
        expect(s.inputs.input).toBeDefined();
        expect(s.inputs.edgeA).toBeDefined();
        expect(s.inputs.edgeB).toBeDefined();
        expect(s.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const s = new Smoothstep();

        const spy = jest.fn();
        s.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(smoothstep(float(0), float(0), float(0)));

        s.inputs.edgeA.next(float(200));
        expect(spy).toHaveBeenCalledWith(smoothstep(float(200), float(0), float(0)));

        s.inputs.edgeB.next(float(300));
        expect(spy).toHaveBeenCalledWith(smoothstep(float(200), float(300), float(0)));

        s.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(smoothstep(float(200), float(300), float(100)));
    });
});
