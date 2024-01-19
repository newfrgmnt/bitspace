import { sign, float, vec2 } from '@thi.ng/shader-ast';

import { Sign } from './Sign';

describe('Sign', () => {
    it('should initialize with correct values', () => {
        const s = new Sign();

        expect(typeof s.id).toEqual('string');
        expect(s.name).toEqual('Sign');
        expect(s.inputs.input).toBeDefined();
        expect(s.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const s = new Sign();

        const spy = jest.fn();
        s.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(sign(float(0)));

        s.inputs.input.next(float(-100));
        expect(spy).toHaveBeenCalledWith(sign(float(-100)));
    });

    it('should support vectors', () => {
        const s = new Sign();

        const spy = jest.fn();
        s.outputs.output.subscribe(spy);

        s.inputs.input.next(vec2(-100));
        expect(spy).toHaveBeenCalledWith(sign(vec2(-100)));
    });
});
