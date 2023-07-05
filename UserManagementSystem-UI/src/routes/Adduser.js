import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { usercontext } from "../App";

function Adduser() {
    const navigate = useNavigate()
    const { dispatch } = useContext(usercontext)

    const [user, setUser] = useState({
        fname: "", lname: "", username: "", mNo: "", email: "", password: ""
    })


useEffect(()=>{
    dispatch({ type: "ADMIN", payload: true })

},[])


    let inputname, inputvalue
    const handleChange = (e) => {
        // console.log(e)
        inputname = e.target.name
        inputvalue = e.target.value
        setUser({ ...user, [inputname]: inputvalue })
    }
    const handleOnClick = async (e) => {
        e.preventDefault();
        const { fname, lname, username, mNo, email, password } = user;
        const res = await fetch("/register-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, lname, username, mNo, email, password
            })
        })

        const data = await res.json();
        // console.log(data);
        if (data.username === username) {
            alert("successs")
            navigate("/admin/allusers")
        }

        else if (data.msg) {
            alert(data.errr)
        }
        else if (data.error.status === 422) {
            alert("already avaialable user")
        }
    }
    return (
        <div><div className="signup" role="form" aria-label='add user'>
            <Form method="POST">
                <h2>Add new user </h2>
                <Form.Group className="mb-3" >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="fname" value={user.fname} type="text" placeholder="Enter First name" onChange={handleChange} autoComplete="true" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lname" value={user.lname} type="text" placeholder="Enter Last name" onChange={handleChange} autoComplete="true" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" value={user.username} type="text" placeholder="Enter Username" onChange={handleChange} autoComplete="true" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control name="mNo" value={user.mNo} type="text" placeholder="Enter mobile number" onChange={handleChange} autoComplete="true" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value={user.email} type="email" placeholder="Enter email" onChange={handleChange} autoComplete="true" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" value={user.password} type="password" placeholder="Enter Password" onChange={handleChange} autoComplete="true" required />
                </Form.Group>
                {/* <InputGroup className="mb-3">
            <InputGroup.Checkbox name="show" onChange={togglePassword} aria-label="Checkbox for following text input" />
            <InputGroup.Text id="inputGroup-sizing-default">Show Password</InputGroup.Text>
        </InputGroup> */}
                <div className="btn">
                    <Button className="sidebaranchor" type="submit" name="button" onClick={handleOnClick} >
                        Add     user       </Button>

                </div>
            </Form>
        </div></div>
    )
}

export default Adduser