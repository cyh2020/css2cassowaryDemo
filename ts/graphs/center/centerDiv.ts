import { ConstraintBase } from '../constraintBase.js'
import {BaseArgs} from '../../types/graph.js'
import { Strength } from '../../../es/kiwi.js'
export class CenterDiv extends ConstraintBase {
    constructor(args:BaseArgs, children: ConstraintBase[] = []) {
        super(args, children);
    }

    addConstriant2Solver() {
        this.solver.addEditVariable(this.width, Strength.strong);
        this.solver.addEditVariable(this.height, Strength.strong);
        this.solver.suggestValue(this.width, this.width.value());
        this.solver.suggestValue(this.height, this.height.value());
    }
}
