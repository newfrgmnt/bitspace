import { Input, Node, Output } from '@bitspace/circuit';
import {
    BehaviorSubject,
    combineLatest,
    EMPTY,
    filter,
    map,
    mergeMap,
    of,
    pairwise,
    startWith,
    Subscription,
    switchMap,
    tap
} from 'rxjs';
import { NodeType } from '../../types';
import { Schema, z } from 'zod';
import { ShaderMaterial } from 'three';
import { makeObservable, observable } from 'mobx';
import {
    AnySchema,
    ColorSchema,
    NumberSchema,
    Vector2Schema
} from '@bitspace/schemas';
import { hsv2rgb } from '../../../../../apps/web/src/components/ColorPicker/ColorPicker.utils';

const VERTEX_SHADER = `varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}`;

const FRAGMENT_SHADER = `varying vec2 vUv;
uniform float time;
uniform vec3 offset;

void main() {
    float r = sin(time) * 0.5 + 0.5;
    gl_FragColor = vec4(vUv * offset.xy, r, 1.0);
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
                startWith(''),
                pairwise(),
                // Compare the fragment shader to its previous value
                mergeMap(([prev, next]) => (prev !== next ? of(next) : EMPTY)),
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

        const inputs = this.parseUniforms(fragmentShader).map(
            input =>
                new Input({
                    name: input.name,
                    type: this.resolveSchema(input.type),
                    defaultValue: this.resolveSchema(input.type).parse(
                        input.type === 'float' ? 0 : {}
                    )
                })
        );

        this.inputs = inputs;
    }

    public buildMaterial(fragmentShader: string) {
        return new ShaderMaterial({
            vertexShader: VERTEX_SHADER,
            fragmentShader,
            uniforms: this.parseUniforms(fragmentShader).reduce(
                (acc, uniform) => ({
                    ...acc,
                    [uniform.name]: {
                        value: this.resolveTypesafeValue(uniform.type)
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
                    if (
                        material &&
                        material.uniforms[name] &&
                        inputs[index] !== null
                    ) {
                        material.uniforms[name].value = this.resolveSchemaValue(
                            inputs[index]
                        );
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
                return ColorSchema();
            case 'vec4':
                return ColorSchema();
            default:
                return AnySchema();
        }
    }

    public resolveTypesafeValue(type: string) {
        switch (type) {
            case 'vec2':
                return [0, 0];
            case 'vec3':
                return [0, 0, 0];
            case 'vec3':
                return [0, 0, 0, 1];
            case 'float':
            default:
                return 0;
        }
    }

    public resolveSchemaValue(value: Zod.infer<Schema>) {
        if (value === null || typeof value === 'number') return value;

        if ('x' in value && 'y' in value) {
            return [value.x, value.y];
        }

        if ('hue' in value && 'saturation' in value && 'value' in value) {
            const [r, g, b] = hsv2rgb(value.hue, value.saturation, value.value);
            return [r / 255, g / 255, b / 255];
        }
    }
}
