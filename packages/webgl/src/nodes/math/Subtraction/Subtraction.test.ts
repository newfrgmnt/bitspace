import { sub, float, vec2 } from '@thi.ng/shader-ast';

import {Subtraction} from './Subtraction';

describe('Subtraction', () => {
    it('should initialize with correct values', () => {
        const subtraction = new Subtraction();

        expect(typeof subtraction.id).toEqual('string');
        expect(subtraction.name).toEqual('Subtraction');
        expect(subtraction.inputs.a).toBeDefined();
        expect(subtraction.inputs.b).toBeDefined();
        expect(subtraction.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const subtraction = new Subtraction();

        const spy = jest.fn();
        subtraction.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(sub(float(0), float(0)));

        subtraction.inputs.a.next(float(100));
        expect(spy).toHaveBeenCalledWith(sub(float(100), float(0)));

        subtraction.inputs.b.next(float(100));
        expect(spy).toHaveBeenCalledWith(sub(float(100), float(100)));
    });

    it('should support vectors', () => {
        const subtraction = new Subtraction();

        const spy = jest.fn();
        subtraction.outputs.output.subscribe(spy);

        subtraction.inputs.a.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(sub(vec2(100), float(0)));

        subtraction.inputs.b.next(vec2(200));
        expect(spy).toHaveBeenCalledWith(sub(vec2(100), vec2(200)));
    });
});
