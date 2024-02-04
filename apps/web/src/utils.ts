export const lerp = (a: number, b: number, t: number) => {
    return a * (1 - t) + b * t;
};
