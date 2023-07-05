import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';

function ForgetPassword() {
    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [user, setUser] = useState([])

    const onHandleClick = (async () => {
        try {
            const res = await fetch('/forgetpassword', {
                method: 'Post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email, fname
                })
            })
            const data = await res.json();
            // console.log(data)
            setUser(data)
        } catch (error) {
            alert("please check input details")
        }
    })
    return (
        <div className='forget'>
           <h2>Forgot  Password</h2>
            <Form method='POST' className=''>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" autoComplete="false" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicfname">
                    <Form.Label>Fname</Form.Label>
                    <Form.Control type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="fname" autoComplete="false" />
                </Form.Group>
                <Button variant="primary" className='sidebaranchor' onClick={onHandleClick}>
                    Get Data
                </Button>
                <Button type="reset" className='sidebaranchor' onClick={()=>{
                    setEmail('')
                    setFname('')
                    setUser([])
                }}>
                    reset Data
                </Button>
            </Form>
            <table className='forgetTable m-5'>
                <tbody>
                    <tr>
                        <td>Username </td>
                        <td><strong>  {user.username}</strong></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><strong>  {user.fname}</strong> <strong>  {user.lname}</strong></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><strong>  {user.email}</strong></td>
                    </tr>
                    <tr>
                        <td>Mobile</td>
                        <td><strong>  {user.mNo}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ForgetPassword