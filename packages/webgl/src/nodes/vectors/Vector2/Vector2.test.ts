import { float, vec2 } from '@thi.ng/shader-ast';

import {Vector2} from './Vector2';

describe('Vector 2', () => {
    it('should initialize with correct values', () => {
        const vector = new Vector2();

        expect(typeof vector.id).toEqual('string');
        expect(vector.name).toEqual('Vector 2');
        expect(vector.inputs.x).toBeDefined();
        expect(vector.inputs.y).toBeDefined();
        expect(vector.outputs.output).toBeDefined();
    });
    
    it('should compute properly', () => {
        const vector = new Vector2();

        const spy = jest.fn();
        vector.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(vec2(float(0), float(0)));

        vector.inputs.x.next(float(100));
        expect(spy).toHaveBeenCalledWith(vec2(float(100), float(0)));

        vector.inputs.y.next(float(100));
        expect(spy).toHaveBeenCalledWith(vec2(float(100), float(100)));
    });
});
