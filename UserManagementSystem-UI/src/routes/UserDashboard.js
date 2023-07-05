import React, { useContext, useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { usercontext } from "../App";
import DeleteAccount from './DeleteAccount';
import Editprofilepop from './Editprofilepop';

function UserDashboard() {
    const navigate = useNavigate();

    const [user, setuser] = useState([])
    const { dispatch } = useContext(usercontext)
    const [editprofile, seteditprofile] = useState(false)

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
                    throw new Error(res)

                const data = await res.json()
                if (data) {
                    setuser(data)
                    if (data.role === 'admin')
                        dispatch({ type: "Admin", payload: true })
                    if (data.role === 'user')
                        dispatch({ type: "USER", payload: 1 })
                    console.log(data.role)
                }
                else {
                }

            } catch (error) {
                // alert("please login")
                    navigate("/sign-in")
            }
        }
        welcome();
    }, [dispatch])
    //edit profile toogle
    const tooglePop = () => {
        seteditprofile(!editprofile)
    }
    const redirectgallery=()=>{
    alert("Want to view all photos")
        navigate("/user/gallery")

    }
    return (
        <div className='user-dashboard'>
           
            <div className="pop">
                {editprofile ? <Editprofilepop user={user} toogle={tooglePop} /> : null}
            </div>
            <Card className='usercard' role="banner" aria-label=' user Details ' tabIndex={0}>
                <Card.Img variant="top" height="150px" src="https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png" />
                <Card.Body>
                    <Card.Title>User Info</Card.Title>
                    <h2>{user.fname} {user.lname}</h2>
                </Card.Body>
                <ListGroup className="list-group-flush" tabIndex={0}>
                    <ListGroupItem></ListGroupItem>
                    {/* <ListGroupItem><strong>ID:</strong> {user._id}</ListGroupItem> */}
                    <ListGroupItem><strong>Email:</strong> {user.email}</ListGroupItem>
                    <ListGroupItem><strong>username:</strong> {user.username}</ListGroupItem>
                    <ListGroupItem><strong>contact Number:</strong> {user.mNo}</ListGroupItem>
                    <ListGroupItem></ListGroupItem>
                </ListGroup>
                <Card.Body>
                    {/* <Card.Link href="#"></Card.Link> */}
                </Card.Body>
            </Card>
            <div className='editbtn'>
            <Button onClick={redirectgallery}>Show Gallery</Button><br/>
                <Button onClick={tooglePop} >Edit<br /> profile</Button>
                <br />
                <DeleteAccount />
            </div>

        </div>
    )
}

export default UserDashboard