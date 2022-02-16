import { Variable, Expression, Operator, Strength, Constraint, Solver } from '../es/kiwi.js'
import { ConstraintBase } from './graphs/constraintBase.js';
import { Root } from './graphs/root.js';
import { Drawable } from './types/graph.js'
import { eventCenter } from './utils/eventCenter.js'
import { Point } from './utils/point.js';

export class Calculator {
    private graphArray: Array<ConstraintBase> = [];
    private solver = new Solver();
    private index: number;
    constructor(arr: Array<ConstraintBase>, index: number) {
        this.graphArray = arr;
        this.index = index;
        this.addConstraint();
        this.subscribe();
    }

    addConstraint() {
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

        // this.solver.addEditVariable(this.graphArray[0].width, Strength.strong);
        // this.solver.addEditVariable(this.graphArray[0].height, Strength.strong);
        this.graphArray.forEach(g => g.bindSlover(this.solver));
        this.solver.updateVariables();
        eventCenter.emit('requestDraw');
    }

    subscribe() {
        const onlyRoot = this.graphArray[0]
        const x2 = onlyRoot.width;
        const y2 = onlyRoot.height;
        eventCenter.on(`${this.index}_ROOT_SIZE_CHANGE`, (point: Point) => {
            const { x, y } = point
            this.solver.suggestValue(x2, x);
            this.solver.suggestValue(y2, y);
            this.solver.updateVariables();

            const checked = onlyRoot.check()
            
            if (checked) {
                eventCenter.emit('requestDraw');
            } else {
                onlyRoot.repaire();
                this.solver.updateVariables();
                eventCenter.emit('requestDraw');
            }
        })
    }






    // function doit() {
    //     console.time('elapsed');
    //     for (const i = 0; i < 1000000; ++i) {
    //         solver.suggestValue(x2, i);
    //         solver.updateVariables();
    //     }
    //     console.timeEnd('elapsed');
    //     console.log('x1', x1.value());
    //     console.log('x2', x2.value());
    //     console.log('x3', x3.value());
    //     console.log(solver);
    // }
    // doit();
}