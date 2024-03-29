import React from "react";
import { easePolyOut } from "d3-ease";
import Animate from 'react-move/Animate';

import Kompany from '../../../Resources/images/players/Vincent_Kompany.png';
import Raheem from '../../../Resources/images/players/Raheem_Sterling.png';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import { PlayerCard } from "../../utils/PlayerCard.tsx";

interface Card {
    bottom: number;
    left: number;
    player: string;
}

let cards: Card[] = [
    {
        bottom: 90,
        left: 300,
        player: Kompany,
    },
    {
        bottom: 60,
        left: 200,
        player: Raheem,
    },
    {
        bottom: 30,
        left: 100,
        player: Otamendi,
    },
    {
        bottom: 0,
        left: 0,
        player: Kompany,
    }
]

interface HomeCardProps {
    show: boolean;
}
export const HomeCard: React.FC<HomeCardProps> = ({show}) => {

    const showAnimateCards = () => (
        cards.map((card, i) => (
            <Animate
                key={i}
                show={show}
                start={{
                    left: 0,
                    bottom: 0
                }}
                enter={{
                    left: [card.left],
                    bottom: [card.bottom],
                    timing: {delay:1000, duration: 500, ease: easePolyOut}
                }}
            >
                {({left, bottom}) => (
                    <div
                        style={{
                            position: 'absolute',
                            left,
                            bottom
                        }}
                    >
                        <PlayerCard
                            number = "30"
                            name="Nicolas"
                            lastname="Otemendi"
                            bck={card.player}
                        />
                    </div>
                )}
            </Animate>
        ))
    );
    return(
        <div>
            {showAnimateCards()}
        </div>
    )
}