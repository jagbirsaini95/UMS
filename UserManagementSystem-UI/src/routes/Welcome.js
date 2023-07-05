import { useContext, useEffect } from "react"
import { usercontext } from "../App";

export default function Welcome() {
    const { dispatch } = useContext(usercontext)
    useEffect(() => {
        dispatch({ type: "ADMIN", payload: true })

    })
    return (
        <div className="welcome">
            {/* <h1 className="mt-5">welcome</h1> */}
            <img src="https://shaneatkins.co.uk/wp-content/uploads/2013/03/business-plan-social-media.jpg" alt="heloo" width="70%" />
        </div>
    )
}