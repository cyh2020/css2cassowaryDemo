import { distance } from "../utils/math.js";
import { eventCenter } from '../utils/eventCenter.js'
export class Dragger {
    // 右下角
    private dom: HTMLElement;
    private index: number;

    constructor(dom: HTMLElement) {
        this.dom = dom;
        this.index = [...document.querySelectorAll('.resizeable')].findIndex(d => d === dom)
        document.addEventListener('pointerdown', this.pointerDown);
    }


    pointerDown = (e: PointerEvent) => {
        const domX = this.dom.offsetLeft + this.dom.offsetWidth;
        const domY = this.dom.offsetTop + this.dom.offsetHeight;
        const x = e.pageX;
        const y = e.pageY;
        if (distance({ x, y }, { x: domX, y: domY }) < 50) {
            document.addEventListener('pointermove', this.pointerMove);
            document.addEventListener('pointerup', this.pointerup);
        }
    }

    pointerMove = (e: PointerEvent) => {
        const x = e.pageX;
        const y = e.pageY;
        const domX = this.dom.offsetLeft + this.dom.offsetWidth;
        const domY = this.dom.offsetTop + this.dom.offsetHeight;
        const max = 180;
        const newW = Math.max(max, this.dom.offsetWidth + x - domX);
        const newH = Math.max(max, this.dom.offsetHeight + y - domY);
        this.dom.style.width = `${newW}px`;
        this.dom.style.height = `${newH}px`;
        this.invokeListenders(newW, newH);
    }

    pointerup = (e: PointerEvent) => {
        document.removeEventListener('pointermove', this.pointerMove);
        document.removeEventListener('pointerup', this.pointerup);
    }

    invokeListenders(x: number, y: number) {
        eventCenter.emit(`${this.index}_ROOT_SIZE_CHANGE`, {x, y})
    }
}