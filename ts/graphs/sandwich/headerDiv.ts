import { ConstraintBase } from '../constraintBase.js'
import {BaseArgs} from '../../types/graph.js'
import { Variable, Expression, Operator, Strength, Constraint, Solver } from '../../../es/kiwi.js'
export class HeaderDiv extends ConstraintBase {
    constructor(args:BaseArgs, children: ConstraintBase[] = []) {
        super(args, children);
    }

    addConstriant2Solver() {
        this.solver.addEditVariable(this.height, Strength.weak);
        this.solver.suggestValue(this.height, this.height.value());
    }
}
