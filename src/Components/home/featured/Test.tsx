//import  from "react";
import {useState} from "react";
import { Animate} from "react-move";
import { easePolyOut } from  "d3-ease";

export const Test = () => {
    const [show, setShow] = useState(true)
    const [bck, setBck] = useState('#ffffff')
    return (
        <>
            <button
                onClick={ () => {
                    setBck('#f44336')
                }}
            >
                Update
            </button>

            <button
                onClick={ () => {
                    setShow(false)
                }}
            >
                Remove
            </button>

            <button
                onClick={ () => {
                    setShow(true)
                }}
            >
                Show
            </button>

            <Animate
                show={show}
                start={{
                    backgroundColor: bck,
                    width: 500,
                    height: 500,
                    opacity: 1
                }}

                enter={{
                    backgroundColor: bck,
                    width: [100],
                    height: [100],
                    opacity: [1],
                    timing: {
                        duration: 1000,
                        dalay: 1000,
                        ease: easePolyOut
                    }
                }}

                update={{
                    backgroundColor: bck,
                    opacity: [0.5],
                    timing: {
                        duration: 2000,
                        ease: easePolyOut
                    },
                    events: {
                        start: () => {
                            console.log('STARTED')
                        },
                        end: () => {
                            console.log('ENDED')
                        },
                        interrupt: () => {
                            ////
                        }
                    }

                }}

                leave={[
                    {
                        width: [1000],
                        timing: {
                            duration: 500,
                            ease: easePolyOut
                        }
                    },
                    {
                        opacity: [0],
                        timing: {
                            delay: 2000,
                            duration: 3000,
                            ease: easePolyOut
                        }
                    }
                ]}
            >
                { ({ backgroundColor, width, height, opacity}) => (
                    <div
                        style = {{
                            width,
                            opacity,
                            height,
                            backgroundColor
                        }}
                    >

                        hello
                    </div>
                )}
            </Animate>
        </>
    )
}