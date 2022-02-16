import { ConstraintBase } from '../constraintBase.js'
import { Expression, Operator, Constraint } from '../../../es/kiwi.js'
import { eventCenter } from '../../utils/eventCenter.js';
import { DrawBase } from '../drawBase.js';
import { WrapDiv } from './wrapDiv.js';
export class flexLine extends ConstraintBase {
    protected childConstraints: Constraint[] = []
    children: WrapDiv[];

    addChildren(children: ConstraintBase[]): void {
        if (children.length === 0) return
        children.forEach(c => {
            this.children.push(c)
            c.setParent(this);
        });

        if (this.children.length === 1) {
            const firstChild = this.children[0];
            const eq = new Constraint(new Expression(firstChild.x, [-1, this.x]),
                Operator.Eq,
                new Expression(this.x, this.width, [-1, new Expression(firstChild.x, firstChild.width)]));
            this.childConstraints.push(eq);
            this.solver && this.solver.addConstraint(eq);
        } else {
            for (let i = 2; i < this.children.length; i++) {
                const lastLastChild = this.children[i - 2]
                const lastChild = this.children[i - 1]
                const child = this.children[i]

                // 到上一个的距离 === 上一个到上上个的距离
                const eq1 = new Constraint(new Expression(lastChild.x, [-1, new Expression(lastLastChild.x, lastLastChild.width)]),
                    Operator.Eq,
                    new Expression(child.x, [-1, new Expression(lastChild.x, lastChild.width)]))
                this.childConstraints.push(eq1)
                this.solver && this.solver.addConstraint(eq1);
            }

            // 第二个到第一个的距离 === 第一个到line的距离
            const firstChild = this.children[0];
            const secondChild = this.children[1];
            const eq = new Constraint(new Expression(firstChild.x, [-1, this.x]),
                Operator.Eq,
                new Expression(secondChild.x, [-1, new Expression(firstChild.x, firstChild.width)]));
            this.childConstraints.push(eq);
            this.solver && this.solver.addConstraint(eq);

            // 最后一个到前一个的距离 === 最后一个到line的距离
            const lastLastChild = this.children[this.children.length - 2]
            const lastChild = this.children[this.children.length - 1]
            const eq2 = new Constraint(new Expression(this.x, this.width, [-1, new Expression(lastChild.x, lastChild.width)]),
                Operator.Eq,
                new Expression(lastChild.x, [-1, new Expression(lastLastChild.x, lastLastChild.width)]));
            this.childConstraints.push(eq2);
            this.solver && this.solver.addConstraint(eq2);
        }

        // y 居中
        this.children.forEach((child: ConstraintBase) => {
            const selfCenderY = new Expression(this.y, [0.5, this.height]);
            const childCenterY = new Expression(child.y, [0.5, child.height]);
            const centerC = new Constraint(childCenterY, Operator.Eq, selfCenderY);
            this.childConstraints.push(centerC)
            this.solver && this.solver.addConstraint(centerC);
        })
    }

    clearConstraint() {
        this.childConstraints.forEach(c => this.solver.removeConstraint(c))
        this.childConstraints = []
    }

    appendChildren(children: ConstraintBase[]) {
        const newChildren: ConstraintBase[] = [...(this.children as ConstraintBase[]), ...children];
        this.clearConstraint();
        this.children = [];
        this.addChildren(newChildren);
    }

    unshiftChildren(children: ConstraintBase[]) {
        const newChildren: ConstraintBase[] = [...children, ...(this.children as ConstraintBase[])];
        this.clearConstraint();
        this.children = [];
        this.addChildren(newChildren);
    }

    shiftChildren(children: ConstraintBase[]) {
        this.popChildren(children)
    }

    popChildren(children: ConstraintBase[]) {
        children.forEach(c => {
            const index = this.children.findIndex(c0 => c0 === c)
            if (index !== -1) {
                this.children.splice(index, 1);
            }
        })
        const newChildren = [...this.children];
        this.clearConstraint();
        this.children = [];
        this.addChildren(newChildren as ConstraintBase[]);
    }

    // 当加入了solver时，需要将一些限制条件加入solver
    addConstriant2Solver() {
        super.addConstriant2Solver()
        this.childConstraints.forEach(cons => this.solver.addConstraint(cons));
    }

    check(): boolean {
        const ret = super.check();
        // 检查最后一个子节点是否超过了右侧
        const overflow = this.checkOverflow();

        if (!ret || overflow) {
            this.valid = false;
            return false;
        }

        // 检查是否能容纳更多的子节点
        return true;
    }

    checkOverflow() {
        if (this.children.length === 0) return false;
        const lastChild = this.children[this.children.length - 1]
        return lastChild.x.value() + lastChild.width.value() >= this.x.value() + this.width.value();
    }

    repaire(): void {
        this.valid = true;
        if (this.checkOverflow()) {
            eventCenter.emit('overflow')
        }
    }

    remains() {
        const childLenSum = this.children.reduce((p, c) => { return p + c.width.value() }, 0);
        return this.width.value() - childLenSum;
    }
}