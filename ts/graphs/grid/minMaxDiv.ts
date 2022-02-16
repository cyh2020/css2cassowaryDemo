import { ConstraintBase } from '../constraintBase.js'
import {BaseArgs} from '../../types/graph.js'
import { Variable, Expression, Operator, Strength, Constraint, Solver } from '../../../es/kiwi.js'
export class MinMaxDiv extends ConstraintBase {
    constructor(args:BaseArgs, children: ConstraintBase[] = []) {
        super(args, children);
    }

    addConstriant2Solver() {
        // 父元素的 40%
        this.solver.createConstraint(new Expression(this.width), Operator.Eq,
            new Expression([0.4, this.parent.width]), Strength.weak);
        // 宽度一定大于 100
        this.solver.addConstraint(new Constraint(new Expression(this.width), Operator.Ge, 100));
    }
}
