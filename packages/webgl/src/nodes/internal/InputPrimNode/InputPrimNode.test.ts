import {InputPrimNode} from './InputPrimNode';

describe('Input Prim', () => {
    it('should initialize with correct values', () => {
        class TestInputPrimNode extends InputPrimNode {}
        const inputPrim = new TestInputPrimNode();

        expect(typeof inputPrim.id).toEqual('string');
        expect(inputPrim.name).toEqual('Input Prim Node');
        expect(inputPrim.inputs.input).toBeDefined();
        expect(inputPrim.outputs).toEqual({});
    });
});
