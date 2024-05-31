import { z } from 'zod';
import { minMaxNumber } from './utility';

export const HSVSchema = () =>
    z
        .object({
            hue: minMaxNumber(0, 360, true),
            saturation: minMaxNumber(0, 1),
            value: minMaxNumber(0, 1)
        })
        .describe('HSV');

export const HSLSchema = () =>
    z
        .object({
            hue: minMaxNumber(0, 360, true),
            saturation: minMaxNumber(0, 1),
            luminance: minMaxNumber(0, 1)
        })
        .describe('HSL');

export const RGBSchema = () =>
    z
        .object({
            red: minMaxNumber(0, 1),
            green: minMaxNumber(0, 1),
            blue: minMaxNumber(0, 1)
        })
        .describe('RGB');

export const HexSchema = () =>
    z.string().startsWith('#').min(4).max(7).describe('Hex');

export const ColorSchema = () =>
    z
        .union([HSVSchema(), HSLSchema(), RGBSchema(), HexSchema()])
        .describe('Color');
