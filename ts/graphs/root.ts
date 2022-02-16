import { ConstraintBase } from './constraintBase.js'
import { DrawBase } from './drawBase.js';

import { BaseArgs } from '../types/graph.js'

export class Root extends ConstraintBase {
    protected bgColor = 'rgba(0,200,200,1)';

    constructor(args: BaseArgs, children: ConstraintBase[] = []) {
        super(args, children);
    }
    // bindMove() {
    //     window.addEventListener('mousemove',(ev: MouseEvent) => {
    //         var x = ev.pageX - canvas.offsetLeft;
    //         // this.width = x;
    //         eventCenter.emit('changeRootWidth', x)
    //     })
    // }
}