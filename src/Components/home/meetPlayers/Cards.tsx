import React from "react";
import { easePolyOut } from "d3-ease";
import Animate from 'react-move/Animate';

import Kompany from '../../../Resources/images/players/Vincent_Kompany.png';
import Raheem from '../../../Resources/images/players/Raheem_Sterling.png';
import Otamendi from '../../../Resources/images/players/Otamendi.png';

interface Card {
    bottom: number;
    left: number;
    player: string;
}

let cards: Card[] = [
    {
        bottom: 0,
        left: 0,
        player: Kompany,
    },
    {
        bottom: 0,
        left: 0,
        player: Raheem,
    },
    {
        bottom: 0,
        left: 0,
        player: Otamendi,
    },
    {
        bottom: 0,
        left: 0,
        player: Kompany,
    }
]

export const HomeCard = () => {

    const showAnimateCards = () => (
        cards.map((card, i) => (
            <Animate></Animate>
        ))
    );
    return(
        <div>
            {showAnimateCards()}
        </div>
    )
}