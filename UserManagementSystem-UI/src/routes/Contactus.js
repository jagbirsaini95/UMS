import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { usercontext } from "../App";

export default function Contactus(props) {
    const { dispatch } = useContext(usercontext)
    useEffect(()=>{
        dispatch({ type: "ADMIN", payload: true })
    },[])
    return (
        <center>
            <h1 className="contact">  Fill feedback form to contact us</h1>
            Go to   <br />
            <NavLink to="/admin/feedback" className="sidebaranchor m-5">Feedback form</NavLink>
        </center>
    )
}