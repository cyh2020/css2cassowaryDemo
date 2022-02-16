import { ConstraintBase } from '../constraintBase.js'
import { Variable, Expression, Operator, Strength, Constraint, Solver } from '../../../es/kiwi.js'

export class SandWichRoot extends ConstraintBase {
    protected bgColor: string = 'aquamarine';
    addConstriant2Solver() {
        this.children.forEach((child, index) => {
            if (index === 0) {
                // 第一个子节点与自己的左边界重合
                this.solver.addConstraint(new Constraint(new Expression(child.y), Operator.Eq,
                 new Expression(this.y)))
            } 
             
            if (index === this.children.length - 1) {
                // 最后一个子节点与自己的右边界重合
                this.solver.addConstraint(new Constraint(new Expression(child.y, child.height), Operator.Eq,
                    new Expression(this.y, this.height)))
            }
            
            if (index !== this.children.length - 1) {
                // 子节点x轴首尾相连
                const nextChild = this.children[index + 1];
                this.solver.addConstraint(new Constraint(new Expression(child.y, child.height),
                    Operator.Eq, new Expression(nextChild.y)))
            }

            // 子节点高度与自己的宽相同
            this.solver.addConstraint(new Constraint(new Expression(child.x), Operator.Eq, new Expression(this.x)))
            this.solver.addConstraint(new Constraint(new Expression(child.width), Operator.Eq, new Expression(this.width)))
        })

        this.solver.addEditVariable(this.width, Strength.weak);
        this.solver.addEditVariable(this.height, Strength.weak);
        this.solver.addEditVariable(this.x, Strength.weak);
        this.solver.addEditVariable(this.y, Strength.weak);
        this.solver.suggestValue(this.width, this.width.value());
        this.solver.suggestValue(this.x, 0);
        this.solver.suggestValue(this.y, 0);
        this.solver.suggestValue(this.height, this.height.value());
    }
}