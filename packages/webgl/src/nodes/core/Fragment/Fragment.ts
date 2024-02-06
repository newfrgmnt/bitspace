import { Input, Node } from '@bitspace/circuit';
import { assign, defMain, Sym, Term, vec4 } from '@thi.ng/shader-ast';
import { GLSLTarget } from '@thi.ng/shader-ast-glsl';

import { Vec4Schema } from '../../schemas'Vec4/Vec4';

export class Fragment extends Node {
    static displayName = 'Fragment';

    uniforms = {};
    ins = {};
    outs = {};

    inputs = {
        // eslint-disable-next-line @typescript-eslint/ban-types
        color: new Input<Term<'vec4'> | Function>({
            name: 'Color',
            type: Vec4Schema,
            defaultValue: vec4(0, 0, 0, 1)
        })
    };

    outputs = {};

    /** Resolves the shader graph */
    public resolve<
        TUniforms extends Record<string, Sym<any>>,
        TIns extends Record<string, Sym<any>>,
        TOuts extends Record<string, Sym<any>>
    >(gl: GLSLTarget, uniforms: TUniforms, ins: TIns, outs: TOuts) {
        this.uniforms = uniforms;
        this.ins = ins;
        this.outs = outs;

        const value = this.inputs.color.value;

        // @ts-ignore
        return [defMain(() => [assign(outs.fragColor, typeof value === 'function' ? value() : value)])];
    }
}
