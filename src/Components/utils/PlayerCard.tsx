import React from "react";

interface PlayerCardProps {
    bck: string;
    number: string;
    name: string;
    lastname: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = (props) => {
    return (
        <div className="player_card_wrapper">
            <div
                className="player_card_thmb"
                style={{background: `#f2f9ff url(${props.bck})`}}
            ></div>
            <div className="player_card_nfo">
                <div className="player_card_number">{props.number}</div>
                <div className="player_card_name">
                    <span>{props.name}</span>
                    <span>{props.lastname}</span>
                </div>
            </div>
        </div>
    )
}