import { Input, Node, Output } from '@bitspace/circuit';
import {
    BehaviorSubject,
    combineLatest,
    map,
    of,
    Subscription,
    switchMap,
    tap
} from 'rxjs';
import { NodeType } from '../../types';
import { z } from 'zod';
import { DoubleSide, ShaderMaterial } from 'three';
import { autorun, computed, makeObservable, observable } from 'mobx';
import {
    AnySchema,
    NumberSchema,
    Vector2Schema,
    Vector3Schema,
    Vector4Schema
} from '@bitspace/schemas';

const VERTEX_SHADER = `varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}`;

const FRAGMENT_SHADER = `varying vec2 vUv;
uniform vec3 color;
uniform float time;

void main() {
    float r = sin(time) * 0.5 + 0.5;
    gl_FragColor = vec4(vUv.x, r, 1.0, 1.0);
}`;

export const ShaderSchema = () =>
    z.instanceof(ShaderMaterial).describe('Shader');

export class Shader extends Node {
    static displayName = 'Shader';
    static type = NodeType.SHADER;

    public $fragmentShader = new BehaviorSubject(FRAGMENT_SHADER);

    inputs = {};

    outputs = {
        output: new Output({
            name: 'Output',
            type: ShaderSchema(),
            observable: this.$fragmentShader.pipe(
                tap(console.log),
                tap(this.buildInputs.bind(this)),
                map(this.buildMaterial.bind(this)),
                switchMap(this.updateUniforms.bind(this))
            )
        })
    };

    constructor() {
        super();

        makeObservable(this, {
            inputs: observable,
            outputs: observable
        });
    }

    public buildInputs(fragmentShader: string) {
        for (const input of Object.values(this.inputs)) {
            (input as Input).dispose();
        }

        const inputs = this.parseUniforms(fragmentShader).map(input => {
            const output = new Input({
                name: input.name,
                type: this.resolveSchema(input.type),
                defaultValue: null
            });

            return output;
        });

        this.inputs = inputs;
    }

    public buildMaterial(fragmentShader: string) {
        return new ShaderMaterial({
            vertexShader: VERTEX_SHADER,
            fragmentShader,
            side: DoubleSide,
            uniforms: this.parseUniforms(fragmentShader).reduce(
                (acc, uniform) => ({
                    ...acc,
                    [uniform.name]: {
                        value: 0
                    }
                }),
                {}
            )
        });
    }

    public updateUniforms(material: ShaderMaterial) {
        return combineLatest(this.inputs).pipe(
            tap(inputs => {
                // @ts-ignore
                Object.values(this.inputs).forEach(({ name }, index) => {
                    if (material && material.uniforms[name]) {
                        material.uniforms[name].value = inputs[index];
                    }
                });
            }),
            map(inputs => material)
        );
    }

    public parseUniforms(source: string) {
        const uniforms =
            source.match(/uniform\s+\w+\s+\w+\s*;/g)?.map(uniform => {
                const [type, name] = uniform
                    .replace('uniform', '')
                    .replace(';', '')
                    .trim()
                    .split(' ');

                return { name: name ?? 'untitled', type: type ?? 'float' };
            }) ?? [];

        return uniforms;
    }

    public resolveSchema(type: string) {
        switch (type) {
            case 'float':
                return NumberSchema();
            case 'vec2':
                return Vector2Schema();
            case 'vec3':
                return Vector3Schema();
            case 'vec4':
                return Vector4Schema();
            default:
                return AnySchema();
        }
    }
}
