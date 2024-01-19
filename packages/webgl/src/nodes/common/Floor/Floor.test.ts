import { floor, float, vec2 } from '@thi.ng/shader-ast';

import { Floor } from './Floor';

describe('Floor', () => {
    it('should initialize with correct values', () => {
        const floor = new Floor();

        expect(typeof floor.id).toEqual('string');
        expect(floor.name).toEqual('Floor');
        expect(floor.inputs.input).toBeDefined();
        expect(floor.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const f = new Floor();

        const spy = jest.fn();
        f.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(floor(float(0)));

        f.inputs.input.next(float(1.2));
        expect(spy).toHaveBeenCalledWith(floor(float(1.2)));
    });

    it('should support vectors', () => {
        const f = new Floor();

        const spy = jest.fn();
        f.outputs.output.subscribe(spy);

        f.inputs.input.next(vec2(-1.2));
        expect(spy).toHaveBeenCalledWith(floor(vec2(-1.2)));
    });
});
