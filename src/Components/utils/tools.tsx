import {Link} from "react-router-dom";
import {toast} from "react-toastify";



import mcitylogo from "../../Resources/images/logos/manchester_city_logo.png";
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase-config.tsx";

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