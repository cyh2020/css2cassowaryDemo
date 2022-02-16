import { Drawable } from '../types/graph.js';
import { Point } from '../utils/point.js';
import { Variable } from '../../es/kiwi.js'
import {BaseArgs} from '../types/graph.js'
import { flexLine } from './wrap/flexLine.js';

export class DrawBase implements Drawable {
    protected bgColor = 'rgba(0,0,0,1)';

    protected _x: Variable;
    public get x(): Variable {
        return this._x;
    }
    public set x(value: Variable) {
        this._x = value;
    }
    protected _y: Variable;
    public get y(): Variable {
        return this._y;
    }
    public set y(value: Variable) {
        this._y = value;
    }
    protected _width: Variable;
    public get width(): Variable {
        return this._width;
    }
    public set width(value: Variable) {
        this._width = value;
    }
    protected _height: Variable;
    public get height(): Variable {
        return this._height;
    }
    public set height(value: Variable) {
        this._height = value;
    }

    radius: Variable;
    children: DrawBase[] = [];
    parent?: DrawBase;

    constructor(args: BaseArgs, children: DrawBase[] = []) {
        const { x = 0, y = 0, w = 64, h = 64, r = 7, bgColor = 'rgba(0,0,0,1)'} = args
        this.x = new Variable();
        this.x.setValue(x);
        this.y = new Variable();
        this.y.setValue(y)
        this.width = new Variable();
        this.width.setValue(w)
        this.height = new Variable();
        this.height.setValue(h)
        this.radius = new Variable();
        this.radius.setValue(r)

        this.addChildren(children);
        this.bgColor = bgColor as string;
    }

    addChildren(children: DrawBase[]){
        this.children.push(...children)
        this.children.forEach(child => child.setParent(this));
    }

    removeChild(children: DrawBase[]) {

    }

    changeBrush(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.bgColor;
    }

    draw(ctx: CanvasRenderingContext2D) {
       this.drawSelf(ctx);
       this.drawChildren(ctx); 
    }

    drawSelf(ctx: CanvasRenderingContext2D) {
        this.changeBrush(ctx);
        const ptA = new Point(this.x.value() + this.radius.value(), this.y.value());
        const ptB = new Point(this.x.value() + this._width.value(), this.y.value());
        const ptC = new Point(this.x.value() + this._width.value(), this.y.value() + this.height.value());
        const ptD = new Point(this.x.value(), this.y.value() + this.height.value());
        const ptE = new Point(this.x.value(), this.y.value());

        ctx.beginPath();

        ctx.moveTo(ptA.x, ptA.y);
        ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, this.radius.value());
        ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, this.radius.value());
        ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, this.radius.value());
        ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, this.radius.value());

        ctx.fill();
    }

    drawChildren (ctx: CanvasRenderingContext2D) {
        this.children.forEach(c => c.draw(ctx));
    }

    setParent(parent: DrawBase) {
        this.parent = parent;
    }
}