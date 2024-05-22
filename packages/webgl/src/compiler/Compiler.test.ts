import { float } from '@thi.ng/shader-ast';
import { GLSLVersion } from '@thi.ng/shader-ast-glsl';

import { compile } from './Compiler';
import { Fragment } from '../nodes/core/Fragment/Fragment';
import { Addition } from '../nodes/math/Addition/Addition';
import { Vector4 } from '../nodes/vectors/Vector4/Vector4';

describe('Compiler', () => {
    it('should produce valid GLSL code', () => {
        const fragmentNode = new Fragment();
        const compiledOutput = compile(fragmentNode, {}, GLSLVersion.GLES_300);

        expect(compiledOutput).toMatchSnapshot();
    });

    it('should produce valid GLSL code from a complex graph', () => {
        const a = new Vector4();
        const b = new Vector4();
        const add = new Addition();
        const fragmentNode = new Fragment();

        a.inputs.x.next(float(0.3));
        a.inputs.y.next(float(0.5));
        a.inputs.z.next(float(0.1));

        b.inputs.x.next(float(1));
        b.inputs.y.next(float(0.02));
        b.inputs.z.next(float(0.6));
        b.inputs.w.next(float(1));

        // @ts-ignore
        a.outputs.output.connect(add.inputs.a);
        // @ts-ignore
        b.outputs.output.connect(add.inputs.b);
        // @ts-ignore
        add.outputs.output.connect(fragmentNode.inputs.color);

        const compiledOutput = compile(fragmentNode, {}, GLSLVersion.GLES_300);

        expect(compiledOutput).toMatchSnapshot();
    });
});
