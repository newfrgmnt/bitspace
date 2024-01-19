import { acos, float, vec2 } from '@thi.ng/shader-ast';

import { Arccosine } from './Arccosine';

describe('Arccosine', () => {
    it('should initialize with correct values', () => {
        const arccosine = new Arccosine();

        expect(typeof arccosine.id).toEqual('string');
        expect(arccosine.name).toEqual('Arccosine');
        expect(arccosine.inputs.input).toBeDefined();
        expect(arccosine.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const arccosine = new Arccosine();

        const spy = jest.fn();
        arccosine.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(acos(float(0)));

        arccosine.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(acos(float(100)));
    });

    it('should support vectors', () => {
        const arccosine = new Arccosine();

        const spy = jest.fn();
        arccosine.outputs.output.subscribe(spy);

        arccosine.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(acos(vec2(100)));
    });
});
