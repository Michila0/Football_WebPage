import { Tag } from '../../utils/tools.tsx';
import { Fade } from "react-awesome-reveal";
import { HomeCard } from "./Cards.tsx";
import {useState} from "react";

let tagDefault = {
    bck: '#0e1731',
    size: '100px',
    color: '#ffffff'
}
export const MeetPlayers = () => {

    const [show, setShow] = useState(false);
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
            onVisibilityChange={(inView) => {
                if (inView){setShow(true)}
            }}

            triggerOnce
        >
            <div className="home_meetplayers">
                <div className="container">
                    <div className="home_meetplayers_wrapper">
                        <div className="home_card_wrapper">
                            <HomeCard show={show}/>
                        </div>
                        <div className="home_text_wrapper">
                            <div>{showTextTag('Meet')}</div>
                            <div>{showTextTag('The')}</div>
                            <div>{showTextTag('Players')}</div>
                            <div>
                                <Tag
                                    bck= '#ffffff'
                                    size= "27px"
                                    color= "#0e1731"
                                    link= {true}
                                    linkTo= "/the_team"                                    add={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                        border: '1px solid #0e1731'
                                    }}
                                >
                                    Meet them here
                                </Tag>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}