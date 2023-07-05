import { useContext, useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { usercontext } from "../App";

export default function Admininfo(props) {
    const [user, setuser] = useState([])
    const { dispatch } = useContext(usercontext)

    useEffect(() => {
        const welcome = async () => {
            try {
                const res = await fetch('/user/profile', {
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
                    setuser(data)
                    dispatch({ type: "ADMIN", payload: true })
                    // console.log(data)
                }
            } catch (error) {
                console.log("error")
            }
        }
        welcome();
    }, [dispatch])

    return (
        <center>
            <h1 className="admindata">Admin Data</h1>
            <div className="cardsize">
                <Card style={{ }}>
                    <Row >
                        <Col xs={3}>
                            <Card.Img className="mt-3" src={`https://avatars.dicebear.com/v2/avataaars/${user._id}.svg?options[mood][
]=happy`} height="80%" />
                        </Col>
                        <Col xs={7}>
                            <Card.Body align="left"><h2>hello!</h2>
                                <Card.Title> <h2>{user.fname} {user.lname}</h2></Card.Title>
                                {/* <div><strong>ID:</strong> {user._id}</div> */}
                                <div><strong>Email:</strong> {user.email}</div>
                                <div><strong>username:</strong> {user.username}</div>
                                <div><strong>contact Number:</strong> {user.mNo}</div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </div>

        </center>
    )
}