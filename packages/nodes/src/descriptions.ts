import { NodeType } from './types';

export const NodeDescriptionsMap: Record<NodeType, string> = {
    [NodeType.CIRCUIT]: 'A representation of a nested Circuit graph',
    [NodeType.CIRCUIT_INPUTS]: 'Accessors for the input values of the Circuit',
    [NodeType.CIRCUIT_OUTPUTS]:
        'Accessors for the output values of the Circuit',

    [NodeType.CONSOLE]: 'Serializes the input to JSON & logs it to the console',
    [NodeType.LERP]:
        'Linearly interpolates between two input values, using a third input as the interpolation factor',
    [NodeType.TIMER]:
        'Emits the time since Circuit was initialized in milliseconds',
    [NodeType.OSCILLATOR]:
        'Outputs an oscillated value between 0 and the given amplitude, using the frequecy as the time interval',

    [NodeType.CUBIC_BEZIER]:
        'Returns the cubic-bezier function for a given set of control points',

    [NodeType.ADDITION]: 'Performs addition on the input values',
    [NodeType.SUBTRACTION]: 'Performs subtraction on the input values',
    [NodeType.MULTIPLICATION]: 'Performs multiplication on the input values',
    [NodeType.DIVISION]: 'Performs division on the input values',
    [NodeType.MODULO]:
        'Performs modulo on the input values - returning the remainder of division',
    [NodeType.ABSOLUTE]: 'Returns the absolute value of the input',
    [NodeType.CEIL]: 'Rounds the input value up to the nearest integer',
    [NodeType.FLOOR]: 'Rounds the input value down to the nearest integer',
    [NodeType.ROUND]: 'Rounds the input value to the nearest integer',
    [NodeType.MAX]: 'Returns the maximum value of the input values',
    [NodeType.MIN]: 'Returns the minimum value of the input values',
    [NodeType.POWER]:
        'Returns the value of a base expression taken to a specified power',
    [NodeType.SQUARE_ROOT]: 'Returns the square root of the input value',
    [NodeType.LOGARITHM]: 'Returns the natural logarithm of the input value',
    [NodeType.LOGARITHM2]: 'Returns the base 2 logarithm of the input value',
    [NodeType.SINE]: 'Returns the sine of the input value',
    [NodeType.COSINE]: 'Returns the cosine of the input value',
    [NodeType.TANGENT]: 'Returns the tangent of the input value',
    [NodeType.ARCSINE]: 'Returns the arcsine of the input value',
    [NodeType.ARCCOSINE]: 'Returns the arccosine of the input value',
    [NodeType.ARCTANGENT]: 'Returns the arctangent of the input value',
    [NodeType.EXPONENTIAL]:
        'Returns E (the base of natural logarithms) raised to a power.',
    [NodeType.SIGN]: 'Returns the sign of the input value',
    [NodeType.EULER]: "Returns Euler's number, E",
    [NodeType.PI]: 'Returns the value of PI',
    [NodeType.RANDOM]: 'Returns a random number between 0 and 1',

    [NodeType.ANALOGOUS_COLOR]:
        'Returns the analogous colors of the input color',
    [NodeType.COMPLEMENTARY_COLOR]:
        'Returns the complementary color of the input color',
    [NodeType.TRIAD_COLOR]: 'Returns the triad colors of the input color',
    [NodeType.TETRADIC_COLOR]: 'Returns the tetradic colors of the input color',
    [NodeType.SQUARE_COLOR]: 'Returns the square colors of the input color',
    [NodeType.GRADIENT]: 'Returns a gradient based on the input colors',

    [NodeType.IMAGE]: 'Returns an image from the given source URL',
    [NodeType.WEBCAM]: 'Returns a webcam stream',
    [NodeType.GAMEPAD]: 'Returns states from a connected gamepad',
    [NodeType.SYNTHESIZED_IMAGE]: 'Returns an image based on the input prompt',
    [NodeType.IMAGE_EDIT_AI]:
        'Returns a new image based on the input image, a given instruction prompt & a mask with transparent area to replace',
    [NodeType.IMAGE_VARIATION_AI]:
        'Returns a new image based on the input image & a given instruction prompt',
    [NodeType.PROMPT_AI]: 'Returns text based on the input prompt',
    [NodeType.VISION]: 'Returns text based on the input image',
    [NodeType.FROM_VECTOR]:
        'Returns the individual components of a given Vector',
    [NodeType.SHADER]: 'Returns a WebGL shader program',
    [NodeType.FROM_COLOR]:
        'Computes the individual components of a given Color',
    [NodeType.TO_COLOR]: 'Returns a Color based on the given components'
};
