import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { usercontext } from "../App";

export default function Getfeedbacks(props) {
    const [feedback, setfeedback] = useState([])
    const { dispatch } = useContext(usercontext)

    useEffect(() => {
        dispatch({ type: "ADMIN", payload: true })

        const welcome = async () => {
            try {
                const res = await fetch('/getfeedbacks', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        credentials: "include"
                    }
                })

                if (!res.status === 200)
                    throw new Error(res.error)
                const data = await res.json()
                if (data) {
                    setfeedback(data)
                    // console.log(data)
                }
            } catch (error) {
                console.log("error")
            }
        }
        welcome();
    }, [])

    return (
        <>
        <h1 className="text-center headingfeedback" tabIndex={0}>Feedbacks</h1>  
        <div className="feedbacksTable col-6" >
            <Table tabIndex={0} >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Feedback</th>
                        <th>Feedback Date</th>
                        <th>Feedback Time</th>
                    </tr>
                </thead>
                <tbody>
                    {feedback.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mNo}</td>
                                <td>{user.message}</td>
                                <td>{user.feedback_creation_Date}</td>
                                <td>{user.feedback_creation_Time}</td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            </div>
        </>
    )
}