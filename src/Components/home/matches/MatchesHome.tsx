//import React from "react";
import { Tag } from '../../utils/tools.tsx';
import { Blocks } from './Blocks.tsx';

export const MatchesHome = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag
                    bck= '#0e1731'
                    size= '50px'
                    color= '#ffffff'
                >
                    Matches
                </Tag>
                    <Blocks/>
                <Tag
                    size= '22px'
                    color= '#0e1731'
                    link={true}
                    linkTo="/the_team"
                >
                    See more matches
                </Tag>
            </div>
        </div>
    )
}