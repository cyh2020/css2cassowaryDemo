import { ConstraintBase } from '../constraintBase.js'
import {BaseArgs} from '../../types/graph.js'
import { Strength } from '../../../es/kiwi.js'
export class BodyDiv extends ConstraintBase {
    constructor(args:BaseArgs, children: ConstraintBase[] = []) {
        super(args, children);
    }
}
