import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usercontext } from "../App";

export default function Editprofilepop(props) {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(usercontext)
    const [updateuser, setupdatuser] = useState({
        fname: props.user.fname , lname: props.user.lname, mNo: props.user.mNo
    })
    let inputname, inputvalue
    const handleChange = (e) => {
        // console.log(e)
        inputname = e.target.name
        inputvalue = e.target.value
        setupdatuser({ ...updateuser, [inputname]: inputvalue })
    }
    const handleOnClick = async (e) => {
        // e.preventDefault()   
        console.log(updateuser.fname);

        const { fname, lname, mNo } = updateuser;

        const res = await fetch("/updateuser", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: props.user._id, fname, lname, mNo
            })
        })
        const data = await res.json();
        props.seteditprofile(false)
        console.log(data);
        dispatch({ type: "Admin", payload: true })

        navigate("/admin")

    }
    const handleOnCancel = () => {
        props.toogle()
    }
    const handleOnLogout = () => {
        navigate("/logout")
    }
    return (
        <>
        {/* {console.log(props.id)} */}
            <div className="fixed-top text-center">
                <form className="modal_content" >
                <h2 role="heading" aria-label="edit profile"> Edit profile</h2>
                    <table className="editTable">
                        <tbody>

                            <tr>
                                <td>ID:</td>
                                <td> <input type="text" name="username" defaultValue={props.user._id} readOnly /></td>
                            </tr>
                            <tr>
                                <td>Fname:</td>
                                <td> <input type="text" defaultValue={props.user.fname} name="fname" onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Lname:</td>
                                <td> <input type="text" defaultValue={props.user.lname} name="lname" onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td>Mobile:</td>
                                <td> <input type="text" defaultValue={props.user.mNo} name="mNo" onChange={handleChange} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="ml-5">
                        <button onClick={handleOnClick}>Edit</button>
                        <button onClick={handleOnCancel}>Cancel</button>
                        <button onClick={handleOnLogout}>Logout</button>

                    </div>
                </form>
            </div>
        </>
    )
}