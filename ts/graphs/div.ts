import { ConstraintBase } from './constraintBase.js'
import {BaseArgs} from '../types/graph.js'
import { Variable, Expression, Operator, Strength, Constraint, Solver } from '../../../es/kiwi.js'
export class Div extends ConstraintBase {
    protected bgColor: string = 'rgba(0,0,200,1)';

    constructor(args:BaseArgs, children: ConstraintBase[] = []) {
        super(args, children);
    }

    addConstriant2Solver() {

        // // const x1 = new Variable();
        // const half = new Expression([1/2, this.graphArray[0].width]);
        // // const e1 =new Expression([1/2, new Expression(this.graphArray[1].x, this.graphArray[1].x, this.graphArray[1].width)]);
        // const e1 =new Expression(this.graphArray[1].x, this.graphArray[1].width);
        // // const e2 = new Expression(x1, -5, -9.5);

        // const c1 = new Constraint(e1, Operator.Eq, this.graphArray[0].width);
        // // const c2 = new Constraint(e2, Operator.Eq);
        // this.solver.addConstraint(c1);
        // this.solver.addConstraint(new Constraint(new Expression(this.graphArray[1].x), Operator.Eq, 150));
        // const x2 = (this.graphArray[0] as Root).width;
        // this.solver.addEditVariable(x2, Strength.strong);

        // eventCenter.on('changeRootWidth', (w: number) => {
        //     this.solver.suggestValue(x2, w);
        //     this.solver.updateVariables();
        //         //    console.log('x2', x2.value());
        //     eventCenter.emit('requestDraw');

        // })

        // center of firstChild in the center of root
        // const side =  new Expression([ -1, new Expression(this.width, this.x)], this.;
        // const selfCenderX = new Expression([1/2, this.width], this.x);
        // const childCenterY = new Expression([1/2, this.children[0].height], this.children[0].y);
        // const selfCenderY = new Expression([1/2, this.height], this.y);

        // this.solver.addConstraint(
        //     new Constraint(, Operator.Eq, selfCenderX)
        // )
        // this.solver.addConstraint(
        //     new Constraint(childCenterY, Operator.Eq, selfCenderY)
        // )


        // const ex = new Expression([0.5, this.x])
        // const cons = new Constraint(ex, Operator.Eq, 10);
        // this.solver.addConstraint(cons);
        // console.log(this)
        this.solver.addEditVariable(this.width, Strength.strong);
        this.solver.addEditVariable(this.height, Strength.strong);
        this.solver.suggestValue(this.width, 60);
        this.solver.suggestValue(this.height, 60);
    }
}
