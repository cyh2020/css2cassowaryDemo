import { Variable, Expression, Operator, Strength, Constraint, Solver } from '../es/kiwi.js'
import { Calculator } from './calculator.js';
import { Drawer as Painter } from './painter.js'
import { Dragger } from './dom/dragger.js'
import { GraphArr } from './store.js'

// const calculator = new Calculator(GraphArr);
// painter.draw();
const painterArr: Painter[] = []
const canvas = document.querySelectorAll('canvas');
const init = () => {
    document.querySelectorAll('.resizeable').forEach((dom, index) => {
        new Dragger(dom as HTMLElement);
        const painter = new Painter(GraphArr[index], canvas[index + 1]);
        const calculator = new Calculator(GraphArr[index], index);
        painter.draw();
        painterArr.push(painter);
    })
}
init()


const ratio = window.devicePixelRatio || 1;

const resizeCanvas = () => {

    canvas.forEach(c => {
        c.width = window.innerWidth / 2 * ratio;
        c.height = 800 * ratio;
        c.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
    })
    painterArr.forEach(p => p.draw())
}

window.onresize = resizeCanvas;
document.addEventListener("DOMContentLoaded", resizeCanvas, false);
