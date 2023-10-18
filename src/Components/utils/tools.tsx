import {Link} from "react-router-dom";
import {toast} from "react-toastify";



import mcitylogo from "../../Resources/images/logos/manchester_city_logo.png";
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase-config.tsx";
import {ReactNode} from "react";

export const CityLogo = (props: any) => {
    const template = <div
        className= "img_cover"
        style={{
            width: props.width,
            height: props.height,
            background: `url(${mcitylogo}) no-repeat`
        }}
    >
    </div>

    if (props.link){
        return <Link className="link_logo" to={props.linkTo}>
            {template}
        </Link>
    }else {
        return template
    }
}

export interface TagProps {
    children: ReactNode;
    link?: boolean;
    linkTo?: string;
    bck?: string;
    size?: string;
    color?: string;
    add?: React.CSSProperties;
}
export const Tag: React.FC<TagProps> = (props) => {
    const template = (
        <div
            style={{
                background: props.bck ? props.bck : '#ffffff',
                fontSize: props.size ? props.size : '15px',
                color: props.color ? props.color : '#000000',
                padding: '5px 10px',
                display: 'inline-block',
                fontFamily: 'Righteous',
                ...props.add
            }}
        >
            {props.children}
        </div>
    )

    if (props.link && props.linkTo){
        return(
                <Link to={props.linkTo}>{template}</Link>
        )
    }else {
        return template
    }
}

export const showErrorToast = (msg: string) => {
    toast.error(msg,{
        position: toast.POSITION.TOP_LEFT
    })
}

export const showSuccessToast = (msg: string) => {
    toast.success(msg,{
        position: toast.POSITION.TOP_LEFT
    })
}

export const logoutHandler = () => {
    signOut(auth)
        .then(() => {
            showSuccessToast('Good bye!!')
        }).catch(error => {
        showErrorToast(error.message)
    })
}