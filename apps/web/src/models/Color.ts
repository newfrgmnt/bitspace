import convert from 'color-convert';

type RGBModel = {
    red: number;
    green: number;
    blue: number;
};

type LCHModel = {
    luminance: number;
    chroma: number;
    hue: number;
};

export class ColorModel {
    /** Internal Color Model */
    private color: LCHModel = { luminance: 0, chroma: 0, hue: 0 };

    /** Alpha channel */
    private _alpha = 1;

    /** Returns a model with complementary color */
    public static complementary(model: ColorModel) {
        return model.clone().rotate(180);
    }

    /** Returns three models with triad-arranged colors */
    public static triad(model: ColorModel) {
        return [model.clone(), model.clone().rotate(120), model.clone().rotate(240)];
    }

    /** Returns three models with analogous colors */
    public static analogous(model: ColorModel) {
        return [model.clone().rotate(-30), model.clone(), model.clone().rotate(30)];
    }

    /** Returns three models with split complementary colors */
    public static splitComplementary(model: ColorModel) {
        return [model.clone(), model.clone().rotate(-30), model.clone().rotate(30)];
    }

    /** Returns four models with tetradic colors */
    public static tetradic(model: ColorModel) {
        return [model.clone(), model.clone().rotate(90), model.clone().rotate(180), model.clone().rotate(240)];
    }

    /** Returns four models with squared colors */
    public static square(model: ColorModel) {
        return [model.clone(), model.clone().rotate(90), model.clone().rotate(180), model.clone().rotate(270)];
    }

    constructor(color?: LCHModel, alpha?: number) {
        if (color) {
            this.setLuminance(color.luminance);
            this.setChroma(color.chroma);
            this.setHue(color.hue);
        }

        if (alpha) {
            this.setAlpha(alpha);
        }
    }

    /** Returns the Luminance */
    get luminance(): number {
        return this.color.luminance;
    }

    /** Sets the Luminance */
    set luminance(luminance: number) {
        this.setLuminance(luminance);
    }

    /** Sets the Lightness */
    public setLuminance(luminance: number) {
        this.color.luminance = Math.min(Math.max(luminance, 0), 100);
    }

    /** Returns the Chroma */
    get chroma(): number {
        return this.color.chroma;
    }

    /** Sets the Chroma */
    set chroma(chroma: number) {
        this.setChroma(chroma);
    }

    /** Sets the Chroma */
    public setChroma(chroma: number) {
        this.color.chroma = Math.min(Math.max(chroma, 0), 230);
    }

    /** Returns the Hue */
    get hue(): number {
        return this.color.hue;
    }

    /** Sets the Hue */
    set hue(hue: number) {
        this.setHue(hue);
    }

    /** Sets the Hue */
    public setHue(hue: number) {
        hue = hue % 360;
        hue = hue < 0 ? 360 + hue : hue;
        this.color.hue = Math.max(hue, 0) % 360;
    }

    /** Returns the Alpha channel */
    get alpha(): number {
        return this._alpha;
    }

    /** Sets the Alpha channel */
    set alpha(alpha: number) {
        this.setAlpha(alpha);
    }

    /** Sets the Alpha */
    public setAlpha(alpha: number) {
        this._alpha = Math.min(Math.max(alpha, 0), 1);
    }

    /** Returns the model as RGB */
    get rgb(): RGBModel {
        const [l, c, h] = this.asArray();

        // eslint-disable-next-line import/no-named-as-default-member
        const [red, green, blue] = convert.lch.rgb([l, c, h]);

        return { red, green, blue };
    }

    /** Clones the model */
    public clone() {
        return new ColorModel(this.color, this.alpha);
    }

    /** Rotates the Hue */
    public rotate(degrees: number) {
        let hue = this.hue;

        hue = (hue + degrees) % 360;
        hue = hue < 0 ? 360 + hue : hue;

        this.setHue(hue);

        return this;
    }

    /** Returns a model with complementary color */
    public complementary() {
        return ColorModel.complementary(this);
    }

    /** Returns three models with triad-arranged colors */
    public triad() {
        return ColorModel.triad(this);
    }

    /** Returns three models with analogous colors */
    public analogous() {
        return ColorModel.analogous(this);
    }

    /** Returns three models with split complementary colors */
    public splitComplementary() {
        return ColorModel.splitComplementary(this);
    }

    /** Returns four models with tetradic colors */
    public tetradic() {
        return ColorModel.tetradic(this);
    }

    /** Returns four models with squared colors */
    public square() {
        return ColorModel.square(this);
    }

    /** Returns model as array */
    public asArray(): [number, number, number, number] {
        return [this.luminance, this.chroma, this.hue, this.alpha];
    }

    /** Returns model as CSS string */
    public css() {
        return `lch(${this.luminance}% ${this.chroma} ${this.hue} / ${this.alpha})`;
    }
}
