import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { usercontext } from "../App";

export default function Logout() {
    const navigate = useNavigate()
    const { dispatch } = useContext(usercontext)

    useEffect(() => {
        fetch('/logout', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setTimeout(() => {
                    dispatch({ type: "USER", payload: 2 })
                    dispatch({ type: "ADMIN", payload: false })
                    navigate('/sign-in')
                }, 100)
                if (res.status !== 201)
                    throw new Error(res.error)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])
    return (
        <center>
            <div className="logout">
              <h4>  Logging Out Successs Please Wait....</h4>
            </div>
        </center>
    )
}