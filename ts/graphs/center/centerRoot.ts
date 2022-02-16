import { ConstraintBase } from '../constraintBase.js'
import { Variable, Expression, Operator, Strength, Constraint, Solver } from '../../../es/kiwi.js'

export class CenterRoot extends ConstraintBase {
    protected bgColor: string = 'aquamarine';
    addConstriant2Solver() {
        const childCenterX = new Expression([1/2, this.children[0].width], this.children[0].x);
        const selfCenderX = new Expression([1/2, this.width], this.x);
        const childCenterY = new Expression([1/2, this.children[0].height], this.children[0].y);
        const selfCenderY = new Expression([1/2, this.height], this.y);

        this.solver.addConstraint(
            new Constraint(childCenterX, Operator.Eq, selfCenderX)
        )
        this.solver.addConstraint(
            new Constraint(childCenterY, Operator.Eq, selfCenderY)
        )

        this.solver.addEditVariable(this.width, Strength.weak);
        this.solver.addEditVariable(this.height, Strength.weak);
        this.solver.suggestValue(this.width, this.width.value());
        this.solver.suggestValue(this.height, this.height.value());
    }
}