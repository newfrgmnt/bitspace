import { cos, float, vec2 } from '@thi.ng/shader-ast';

import { Cosine } from './Cosine';

describe('Cosine', () => {
    it('should initialize with correct values', () => {
        const cosine = new Cosine();

        expect(typeof cosine.id).toEqual('string');
        expect(cosine.name).toEqual('Cosine');
        expect(cosine.inputs.input).toBeDefined();
        expect(cosine.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const cosine = new Cosine();

        const spy = jest.fn();
        cosine.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(cos(float(0)));

        cosine.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(cos(float(100)));
    });

    it('should support vectors', () => {
        const cosine = new Cosine();

        const spy = jest.fn();
        cosine.outputs.output.subscribe(spy);

        cosine.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(cos(vec2(100)));
    });
});
