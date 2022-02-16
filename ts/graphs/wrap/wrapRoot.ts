import { ConstraintBase } from '../constraintBase.js'
import { Expression, Operator, Strength, Constraint } from '../../../es/kiwi.js'
import { flexLine } from './flexLine.js';
import { BaseArgs } from '../../types/graph.js';
import { eventCenter } from '../../utils/eventCenter.js';
import { DrawBase } from '../drawBase.js';
// import {WrapDiv} from './wrapDiv.js'

export class WrapRoot extends ConstraintBase {
    protected bgColor: string = 'aquamarine';
    protected lastConstraint: Constraint;
    protected firstConstraint: Constraint;
    children: flexLine[];

    constructor(args: BaseArgs, children: ConstraintBase[] = []) {
        super(args, children);
        this.bindListener();
    }

    bindListener() {
        eventCenter.on('overflow', this.arrangeChildWhenOverFlow);
    }

    arrangeChildWhenOverFlow = () => {
        // 一行的总宽度
        const maxW = this.width.value();

        const pushAndpop = (pre: ConstraintBase[], flexLine: flexLine) => {
            flexLine.unshiftChildren([...pre]);
            pre.length = 0;
            let currentLen = 0;
            let ret: ConstraintBase[] = []
            // possible bug: maxW is too small
            for (let i = 0; i < flexLine.children.length; i++) {
                currentLen += flexLine.children[i].width.value();
                if (currentLen > maxW) {
                    const start = i;
                    ret = flexLine.children.splice(start, flexLine.children.length - start) as ConstraintBase[];
                    flexLine.popChildren(ret);
                    break
                }
            }
            return ret;
        }

        let pre: ConstraintBase[] = [];
        this.children.forEach((c: flexLine) => {
            pre = pushAndpop(pre, c);
        })

        // 处理过多的孩子节点
        if (pre.length !== 0) {
            const newLine = this.addFlexLine();
            newLine.appendChildren(pre);
        }
    }

    addChildren(childrenInFlex: ConstraintBase[]) {
        // FIXME： 这里暂时只使用了一条flexline，之后肯定要增加
        const line = this.addFlexLine();
        line.addChildren(childrenInFlex);
    }

    addFlexLine() {
        // const line = new flexLine({ x: 0, y: 0, w: 50, h: 50, r: 0, bgColor: `rgba(1, 1,222, ${Math.random()})` });
        const line = new flexLine({ x: 0, y: 0, w: 50, h: 50, r: 0, bgColor: `rgba(1, 1,222, 0)` });
        line.solver = this.solver
        line.setParent(this);
        // 首个flexLine
        if (this.children.length === 0) {
            this.firstConstraint = new Constraint(new Expression(line.y), Operator.Eq,
                new Expression(this.y))
            this.solver && this.solver.addConstraint(this.firstConstraint);
        } else {
            // 需要与前一个flex保持距离关系
            const prev = this.children[this.children.length - 1];
            const toPrev = new Constraint(new Expression(line.y),
                Operator.Eq, new Expression(prev.y, prev.height));
            line.constraints.push(toPrev);
            this.solver && this.solver.addConstraint(toPrev)

            const sameH = new Constraint(new Expression(line.height),
                Operator.Eq, new Expression(prev.height));
            line.constraints.push(sameH);
            this.solver && this.solver.addConstraint(sameH)
        }

        // 子节点宽度与自己的宽相同
        const xC = new Constraint(new Expression(line.x), Operator.Eq, new Expression(this.x))
        const wC = new Constraint(new Expression(line.width), Operator.Eq, new Expression(this.width))
        line.constraints.push(xC, wC);
        this.solver && this.solver.addConstraint(xC)
        this.solver && this.solver.addConstraint(wC)

        this.children.push(line);
        this.modifyBottomConstraint();
        return line;
    }

    modifyBottomConstraint() {
        this.solver && this.solver.removeConstraint(this.lastConstraint)
        const child = this.children[this.children.length - 1];
        this.lastConstraint = new Constraint(new Expression(child.y, child.height), Operator.Eq,
            new Expression(this.y, this.height))
        this.solver && this.solver.addConstraint(this.lastConstraint);
    }

    check(): boolean {
        const ret = super.check();
        const surplus = this.checkSurplus();
        if (!ret || surplus) {
            this.valid = false;
            return false;
        }

        return true;
    }

    repaire(): void {
        super.repaire();
        if (this.checkSurplus()) {
            this.fixSurplus();
        }
    }

    // 当上一行有多余的空间时修复
    fixSurplus() {
        // 转移下一行内的元素
        // 一行的总宽度
        const maxW = this.width.value();

        const howManyCanISteal = (preLine: flexLine, nextLine: flexLine) => {
            const remains = preLine.remains();
            let sum = 0
            for (let i = 0; i < nextLine.children.length; i++) {
                sum += nextLine.children[i].width.value();
                if (sum > remains) {
                    return i;
                }
                if (i === nextLine.children.length - 1) {
                    return nextLine.children.length;
                }
            }
            return 0;
        }

        const stealFromNextLine = (preLine: flexLine, nextLine: flexLine) => {
            const count = howManyCanISteal(preLine, nextLine);
            // steal
            const stolenChildren = nextLine.children.slice(0, count);
            preLine.appendChildren(stolenChildren);
            nextLine.shiftChildren(stolenChildren);
        }

        let stealFrom = 1;
        // FIXME: 前一行将后面多行全部偷光了
        for (let i = 0; i < this.children.length - 1; i++) {
            if (stealFrom === this.children.length) break;
            stealFromNextLine(this.children[i], this.children[stealFrom]);
            stealFrom++;
        }

        this.removeEmptyFlexlines();
    }

    // FIXME: 这里只考虑了最后一行被偷光
    removeEmptyFlexlines() {
        const lastLine = this.children[this.children.length - 1];
        if (lastLine.children.length === 0) {
            lastLine.constraints.forEach((cons) => {
                this.solver.removeConstraint(cons)
            })
            this.children.pop();
            this.modifyBottomConstraint();
        }
    }

    checkSurplus() {
        // FIXME: 应该是子类实现
        const remians = this.children.map((c) => {
            return c.remains()
        })
        const fistChild = this.children.map(c => c.children[0] ? c.children[0].width.value() : 0)

        for (let i = 0; i < remians.length - 1; i++) {
            if (remians[i] > fistChild[i + 1]) {
                return true;
            }
        }
        return false
    }

    addConstriant2Solver() {
        // 将孩子节点的cons加入
        this.solver.addConstraint(this.lastConstraint)
        this.solver.addConstraint(this.firstConstraint)
        this.solver.addEditVariable(this.width, Strength.weak);
        this.solver.addEditVariable(this.height, Strength.weak);
        this.solver.addEditVariable(this.x, Strength.weak);
        this.solver.addEditVariable(this.y, Strength.weak);
        this.solver.suggestValue(this.x, 0);
        this.solver.suggestValue(this.y, 0);
        this.solver.suggestValue(this.width, this.width.value());
        this.solver.suggestValue(this.height, this.height.value());
    }
}