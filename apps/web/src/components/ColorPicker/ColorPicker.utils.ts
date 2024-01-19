export const harmonies = {
    triad: [120, 240],
    tetradic: [60, 180, 240],
    complementary: [180],
    analogous: [-30, 30],
    square: [90, 180, 270]
} as const;

export const xy2polar = (x: number, y: number): [number, number] => {
    let r = Math.sqrt(x * x + y * y);
    let phi = Math.atan2(y, x);
    return [r, phi];
};

export const polar2xy = (r: number, phi: number): [number, number] => {
    let x = r * Math.cos(phi);
    let y = r * Math.sin(phi);
    return [x, y];
};

export const rad2deg = (rad: number) => {
    return ((rad + Math.PI) / (2 * Math.PI)) * 360;
};

export const deg2rad = (hue: number) => {
    return hue * (Math.PI / 180);
};

// hue in range [0, 360]
// saturation, value in range [0,1]
// return [r,g,b] each in range [0,255]
// See: https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
export const hsv2rgb = (hue: number, saturation: number, value: number): [number, number, number] => {
    let chroma = value * saturation;
    let hue1 = hue / 60;
    let x = chroma * (1 - Math.abs((hue1 % 2) - 1));
    let r1: number = 0,
        g1: number = 0,
        b1: number = 0;
    if (hue1 >= 0 && hue1 <= 1) {
        [r1, g1, b1] = [chroma, x, 0];
    } else if (hue1 >= 1 && hue1 <= 2) {
        [r1, g1, b1] = [x, chroma, 0];
    } else if (hue1 >= 2 && hue1 <= 3) {
        [r1, g1, b1] = [0, chroma, x];
    } else if (hue1 >= 3 && hue1 <= 4) {
        [r1, g1, b1] = [0, x, chroma];
    } else if (hue1 >= 4 && hue1 <= 5) {
        [r1, g1, b1] = [x, 0, chroma];
    } else if (hue1 >= 5 && hue1 <= 6) {
        [r1, g1, b1] = [chroma, 0, x];
    }

    let m = value - chroma;
    let [r, g, b] = [r1 + m, g1 + m, b1 + m];

    // Change r,g,b values from [0,1] to [0,255]
    return [255 * r, 255 * g, 255 * b];
};

export const xy2rgb = (x: number, y: number, radius: number) => {
    x -= radius;
    y -= radius;

    const [r, phi] = xy2polar(x, y);

    const hue = rad2deg(phi);
    const saturation = r / radius;
    const value = 1.0;

    return hsv2rgb(hue, saturation, value);
};

export const hsv2xy = (hue: number, saturation: number, value: number, radius: number) => {
    const adjustedHue = hue - 180;

    const [r, phi] = polar2xy(radius * saturation, deg2rad(adjustedHue));
    return {
        x: r + radius,
        y: phi + radius
    };
};
