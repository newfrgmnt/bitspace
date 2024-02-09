import { Node, Input, Output } from '@bitspace/circuit';
import { map } from 'rxjs';
import * as THREE from 'three';
import { BoxGeometry, MeshPhongMaterial } from 'three';
import { HSVSchema, MeshSchema } from '../../schemas';
import { hsv2rgb } from '../../../components/ColorPicker/ColorPicker.utils';
import { NodeType } from '@prisma/client';

export class Mesh extends Node {
    static displayName = 'Mesh';
    static type = NodeType.MESH_3D;

    inputs = {
        color: new Input({
            name: 'Color',
            type: HSVSchema,
            defaultValue: { hue: 0, saturation: 1, value: 1 }
        })
    };

    outputs = {
        mesh: new Output({
            name: 'Mesh',
            type: MeshSchema,
            observable: this.inputs.color.pipe(
                map(
                    color =>
                        new THREE.Mesh(
                            new BoxGeometry(),
                            new MeshPhongMaterial({
                                color: new THREE.Color().setRGB(...hsv2rgb(color.hue, color.saturation, color.value))
                            })
                        )
                )
            )
        })
    };
}
