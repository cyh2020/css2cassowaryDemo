import { DrawBase } from './drawBase.js'
import { Solver } from '../../es/solver.js';
import { BaseArgs } from '../types/graph.js'
import { Constraint } from '../../es/constraint.js';
export class ConstraintBase extends DrawBase {
    solver: Solver;
    protected valid = true;
    constraints: Constraint[] = []
    constructor(args: BaseArgs, children: ConstraintBase[] = []) {
        super(args, children);
    }

    bindSlover(solver: Solver) {
        this.solver = solver;
        this.children.forEach(c => (c as ConstraintBase).bindSlover(solver));
        this.addConstriant2Solver();
    }

    removeConstaint(c: Constraint){
        const index = this.constraints.indexOf(c);
        if (index !== -1) {
            this.constraints.splice(index, 1)
        }
    }

    addConstriant2Solver() {
        this.constraints.forEach(cons => this.solver.addConstraint(cons));
    }

    // 检查是否符合组件自己的要求
    check() {
        const ret = this.children.map((child: ConstraintBase) => child.check());
        for (let i = 0; i < ret.length; i++) {
            if (ret[i] === false) {
                this.valid = false;
                return false;
            }
        }
        return true;
    }

    // 修复排版
    repaire() {
        this.valid = true;
        this.children.forEach((c: ConstraintBase) => c.repaire())
    }
}