import React from "react";
import { Zoom } from 'react-awesome-reveal';
export const Animation = () => {
    return(
        <div className="promotion_animation">
            <div className="left">
                <Zoom>
                    <div>Win a</div>
                    <div>Jersey</div>
                </Zoom>
            </div>
            <div className="right">
                <Zoom>
                    <div className="jersey"></div>
                </Zoom>
            </div>
        </div>
    )
}