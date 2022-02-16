import { Text } from './graphs/text.js'
import { Div } from './graphs/div.js'
import { CenterRoot } from './graphs/center/centerRoot.js'
import { CenterDiv } from './graphs/center/centerDiv.js'
import { Root } from './graphs/Root.js'
import { GridRoot } from './graphs/grid/gridRoot.js'
import { WrapRoot } from './graphs/wrap/wrapRoot.js'
import { WrapDiv } from './graphs/wrap/wrapDiv.js'

import { FrDiv } from './graphs/grid/frDiv.js'
import { MinMaxDiv } from './graphs/grid/minMaxDiv.js'
import { SandWichRoot } from './graphs/sandwich/sandWichRoot.js'
import { BodyDiv } from './graphs/sandwich/bodyDiv.js'
import { FooterDiv } from './graphs/sandwich/footerDiv.js'
import { HeaderDiv } from './graphs/sandwich/headerDiv.js'

import { GrealRoot } from './graphs/greal/grealRoot.js'
import { GrealMiddle } from './graphs/greal/grealMiddle.js'
import { SameHDiv } from './graphs/greal/sameHDiv.js'
import { SameWDiv } from './graphs/greal/sameWDiv.js'
import { MainDiv } from './graphs/greal/mainDiv.js'
export const GraphArr = [
    [
        new CenterRoot({ x: 0, y: 0, w: 400, h: 400, r: 0, index: 0 },
            [
                new CenterDiv({ x: 20, y: 20, w: 60, h: 60, r: 9, bgColor: 'lightsalmon' })
            ])
    ],
    [
        new WrapRoot({ x: 0, y: 0, w: 400, h: 400, r: 0, index: 1, bgColor: 'aquamarine' },
        [
            new WrapDiv({ x: 20, y: 20, w: 59, h: 60, r: 9, bgColor: 'lightsalmon' }),
            new WrapDiv({ x: 20, y: 20, w: 60, h: 60, r: 9, bgColor: 'lightsalmon' }),
            new WrapDiv({ x: 20, y: 20, w: 60, h: 60, r: 9, bgColor: 'lightsalmon' }),
            new WrapDiv({ x: 20, y: 20, w: 60, h: 60, r: 9, bgColor: 'lightsalmon' }),
            new WrapDiv({ x: 20, y: 20, w: 60, h: 60, r: 9, bgColor: 'lightsalmon' }),
        ]
        ),
    ],
    [
        new GridRoot({ x: 0, y: 0, w: 400, h: 400, r: 0, index: 2 },
            [
                new MinMaxDiv({ x: 0, y: 0, w: 60, h: 60, r: 0, bgColor: 'lightsalmon' }),
                new FrDiv({ x: 20, y: 0, w: 90, h: 60, r: 0, bgColor: 'rgb(235, 255, 148)' })
            ])
    ],
    [
        new SandWichRoot({ x: 0, y: 0, w: 400, h: 400, r: 0, index: 3 }, [
            new HeaderDiv({ x: 0, y: 0, w: 400, h: 32, r: 0, bgColor: 'lightsalmon' }),
            new BodyDiv({ x: 0, y: 0, w: 400, h: 400, r: 0, bgColor: 'rgb(148, 243, 255)' }),
            new FooterDiv({ x: 0, y: 0, w: 400, h: 32, r: 0, bgColor: 'rgb(235, 255, 148' })
        ]),
    ],
    [
        new GrealRoot({ x: 0, y: 0, w: 400, h: 400, r: 0, index: 4 }, [
            new SameHDiv({ x: 0, y: 0, w: 400, h: 32, r: 0, bgColor: 'lightpink' }),
            new GrealMiddle({ x: 0, y: 0, w: 400, h: 290, r: 0 },
                [
                    new SameWDiv({ x: 0, y: 0, w: 32, h: 60, r: 0, bgColor: 'lightblue' }),
                    new MainDiv({ x: 20, y: 0, w: 90, h: 60, r: 0, bgColor: 'coral' }),
                    new SameWDiv({ x: 0, y: 0, w: 32, h: 60, r: 0, bgColor: 'yellow' }),
                ]),
            new SameHDiv({ x: 0, y: 0, w: 400, h: 32, r: 0, bgColor: 'wheat' })
        ]),
    ]
]