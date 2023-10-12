import React from "react";
import { Animate} from "react-move";
import { easePolyOut } from  "d3-ease";

import FeaturedPlayer from '../../../Resources/images/featured_player.png';
import * as url from "url";

export const Text = () => {

    const animateNumber = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                rotate: 0
            }}
            enter={{
                opacity: [1],
                rotate: [360],
                timing: {duration: 1000, ease: easePolyOut}
            }}
        >
            {({ opacity, rotate }) => (
                <div className='featured_number'
                    style={{
                        opacity,
                        transform: `translate(260px, 170px) rotateY(${rotate}deg)`

                    }}
                >
                    5
                </div>
            )}
        </Animate>
    )

    const animateFirstText = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                x: 503,
                y: 480
            }}
            enter={{
                opacity: [1],
                x: [273],
                y: [479],
                timing: {duration: 500, ease: easePolyOut}

            }}
        >
            { ({ opacity, x, y}) => (
                <div className='featured_first'
                    style={{
                        opacity,
                        transform:`translate(${x}px, ${y}px)`
                    }}
                >
                    League
                </div>
            )}
        </Animate>
    )

    const animateSecondText = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                x: 503,
                y: 586
            }}
            enter={{
                opacity: [1],
                x: [273],
                y: [616],
                timing: {delay: 300, duration: 500, ease: easePolyOut}

            }}
        >
            { ({ opacity, x, y}) => (
                <div className='featured_first'
                     style={{
                         opacity,
                         transform:`translate(${x}px, ${y}px)`
                     }}
                >
                    championships
                </div>
            )}
        </Animate>
    )

    const animatePlayer = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
            }}
            enter={{
                opacity: [1],
                timing: {delay: 800, duration: 500, ease: easePolyOut}
            }}
        >
            { (opacity) => (
                <div className='featured_player'
                    style={{
                        opacity,
                        background: `url(${FeaturedPlayer}) no-repeat`,
                        transform:`translate(550px, 201px)`
                    }}
                >

                </div>
            )}
        </Animate>
    )

    return (
        <div className="featured_text">
            {animatePlayer()}
            {animateNumber()}
            {animateFirstText()}
            {animateSecondText()}
        </div>
    )
}