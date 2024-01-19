import { ceil, float, vec2 } from '@thi.ng/shader-ast';

import { Ceil } from './Ceil';

describe('Ceil', () => {
    it('should initialize with correct values', () => {
        const ceil = new Ceil();

        expect(typeof ceil.id).toEqual('string');
        expect(ceil.name).toEqual('Ceil');
        expect(ceil.inputs.input).toBeDefined();
        expect(ceil.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const c = new Ceil();

        const spy = jest.fn();
        c.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(ceil(float(0)));

        c.inputs.input.next(float(1.2));
        expect(spy).toHaveBeenCalledWith(ceil(float(1.2)));
    });

    it('should support vectors', () => {
        const c = new Ceil();

        const spy = jest.fn();
        c.outputs.output.subscribe(spy);

        c.inputs.input.next(vec2(-1.2));
        expect(spy).toHaveBeenCalledWith(ceil(vec2(-1.2)));
    });
});
