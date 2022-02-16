export interface Drawable {
    draw(ctx: CanvasRenderingContext2D): void;
}

export interface BaseArgs  {
    x: number, y: number, w: number, h: number, r: number, bgColor?: string,
    index?: number
};