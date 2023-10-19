import { Tag } from '../../utils/tools.tsx';
import { Fade } from "react-awesome-reveal";

let tagDefault = {
    bck: '#0e1731',
    size: '100px',
    color: '#ffffff'
}
export const MeetPlayers = () => {

    const showTextTag = (text: string) => (
        <Tag
            {...tagDefault}
            add={{
                display: 'inline-block',
                marginBottom: '20px'
            }}
        >
            {text}
        </Tag>
    )
    return (
        <Fade
            triggerOnce
        >
            <div className="home_meetplayers">
                <div className="container">
                    <div className="home_meetplayers_wrapper">
                        <div className="home_card_wrapper">
                            card
                        </div>
                        <div className="home_text_wrapper">
                            <div>{showTextTag('Meet')}</div>
                            <div>{showTextTag('The')}</div>
                            <div>{showTextTag('Players')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}