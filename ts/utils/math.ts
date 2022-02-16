export interface Point{
    x: number;
    y: number;
}
export const distance = (pt0: Point, pt1: Point) => {
    return Math.sqrt(Math.pow(pt1.x - pt0.x, 2) + Math.pow(pt1.y - pt0.y, 2));
}