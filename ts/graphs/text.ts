import { Drawable } from '../types/graph.js';
import { Point } from '../utils/point.js';
import { DrawBase } from './drawBase.js'

import {BaseArgs} from '../types/graph.js'
export class Text extends DrawBase {
    protected bgColor = 'rgba(200,200,200,1)';
    constructor(args: BaseArgs) {
        super(args);
    }
}