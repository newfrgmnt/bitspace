import { pow, float, vec2 } from '@thi.ng/shader-ast';

import { Power } from './Power';

describe('Power', () => {
    it('should initialize with correct values', () => {
        const power = new Power();

        expect(typeof power.id).toEqual('string');
        expect(power.name).toEqual('Power');
        expect(power.inputs.a).toBeDefined();
        expect(power.inputs.b).toBeDefined();
        expect(power.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const power = new Power();

        const spy = jest.fn();
        power.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(pow(float(0), float(0)));

        power.inputs.a.next(float(100));
        expect(spy).toHaveBeenCalledWith(pow(float(100), float(0)));

        power.inputs.b.next(float(100));
        expect(spy).toHaveBeenCalledWith(pow(float(100), float(100)));
    });
});
