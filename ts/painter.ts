import { Drawable } from './types/graph.js'
import { Text } from './graphs/text.js'
import { Div } from './graphs/div.js'
import { Root } from './graphs/root.js'
import { eventCenter } from './utils/eventCenter.js'
import { Calculator } from './calculator.js'


export class Drawer {
    graphArray: Array<Drawable> = [];
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(graphArr: Array<Drawable>, canvas: HTMLCanvasElement) {
        this.addGraph(graphArr);
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.subscribe();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.graphArray.forEach((o: Drawable) => o.draw(this.ctx));
    }

    addGraph(g: Drawable[]) {
        this.graphArray.push(...g);
    }

    subscribe() {
        eventCenter.on('requestDraw', (data) => {
            this.draw();
        })
    }
}
