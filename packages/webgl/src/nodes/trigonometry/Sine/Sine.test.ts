import { sin, float, vec2 } from '@thi.ng/shader-ast';

import { Sine } from './Sine';

describe('Sine', () => {
    it('should initialize with correct values', () => {
        const sine = new Sine();

        expect(typeof sine.id).toEqual('string');
        expect(sine.name).toEqual('Sine');
        expect(sine.inputs.input).toBeDefined();
        expect(sine.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const sine = new Sine();

        const spy = jest.fn();
        sine.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(sin(float(0)));

        sine.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(sin(float(100)));
    });

    it('should support vectors', () => {
        const sine = new Sine();

        const spy = jest.fn();
        sine.outputs.output.subscribe(spy);

        sine.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(sin(vec2(100)));
    });
});
