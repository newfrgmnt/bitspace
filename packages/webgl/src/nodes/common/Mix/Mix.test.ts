import { mix, float, vec2 } from '@thi.ng/shader-ast';

import { Mix } from './Mix';

describe('Mix', () => {
    it('should initialize with correct values', () => {
        const m = new Mix();

        expect(typeof m.id).toEqual('string');
        expect(m.name).toEqual('Mix');
        expect(m.inputs.a).toBeDefined();
        expect(m.inputs.b).toBeDefined();
        expect(m.inputs.t).toBeDefined();
        expect(m.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const m = new Mix();

        const spy = jest.fn();
        m.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(mix(float(0), float(1), float(0)));

        m.inputs.a.next(float(100));
        expect(spy).toHaveBeenCalledWith(mix(float(100), float(1), float(0)));

        m.inputs.b.next(float(200));
        expect(spy).toHaveBeenCalledWith(mix(float(100), float(200), float(0)));

        m.inputs.t.next(float(1));
        expect(spy).toHaveBeenCalledWith(mix(float(100), float(200), float(1)));
    });
});
