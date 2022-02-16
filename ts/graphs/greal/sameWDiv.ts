import { ConstraintBase } from '../constraintBase.js'
import {BaseArgs} from '../../types/graph.js'
import { Strength } from '../../../es/kiwi.js'
export class SameWDiv extends ConstraintBase {
    constructor(args:BaseArgs, children: ConstraintBase[] = []) {
        super(args, children);
    }

    addConstriant2Solver() {
        this.solver.addEditVariable(this.width, Strength.weak);
        this.solver.suggestValue(this.width, this.width.value());
    }
}
