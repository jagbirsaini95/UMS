import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../App";

export default function DeleteAccount(props) {
    const navigate = useNavigate()

    const {  dispatch } = useContext(usercontext)
    const handleOnDelete = async () => {
        try {
            const username=prompt("confirm usename to delete account",props.user)
            // alert(username)
            // console.log( username)
            if (username) {
                const res = await fetch(`/deleteuser?username=${ username}`, {
                    method: 'DELETE',
                })
                const data = await res.json();
                // console.log(data)

                if (data.username ===  username) {
                    alert("user deleted succesfully ")
                    dispatch({ type: "ADMIN", payload: false })
                    navigate("/sign-up")
                }
                else if (data.error.status === 401) {
                    alert(data.error.message)
                }
            }
        } catch (error) {
            // console.log(error)
        }
    }
    return (
        <>
        {/* {console.log(this.props.user)} */}
            <Button variant="danger" role="button" aria-label={props.userf +' delete account'} onClick={handleOnDelete}>Delete Account</Button>
        </>
    )
}