import { Button, Form, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FiLogIn } from 'react-icons/fi'
import { RiUserAddLine } from 'react-icons/ri'
import { useState } from "react"
export default function Signup() {
    const navigate = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false);
    // const [mobile, setmobile] = useState("");
    // const [isError, setIsError] = useState(false);
    const [user, setUser] = useState({
        fname: "", lname: "", username: "", mNo: "", email: "", password: ""
    })
    let inputname, inputvalue
    const handleChange = (e) => {
        // console.log(e)
        inputname = e.target.name
        inputvalue = e.target.value
        setUser({ ...user, [inputname]: inputvalue })
    }
    const togglePassword = () => {
        // inverse state of passwordShown
        setPasswordShown(!passwordShown);
    };
    const handleOnClick = async (e) => {
        e.preventDefault();
        const { fname, lname, username, mNo, email, password } = user;
        // const res = await fetch("/register-user", {
            const res = await fetch("/register-admin", {
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
            navigate("/sign-in")
        }

        else if (data.msg) {
            alert(data.errr)
        }
        else if (data.error.status === 422) {
            alert("already avaialable user")
        }

    }
    return (
        <div className="signup" >
            {/* action="http://localhost:1000/register" */}
            <Form method="POST" role="form" aria-label="signup ">
                <h2>Signup </h2>
                <Form.Group className="mb-3" >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="fname" value={user.fname} type="text" placeholder=" Enter First name" onChange={handleChange} autoComplete="true" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lname" value={user.lname} type="text" placeholder="Enter Last name" onChange={handleChange} autoComplete="true" />
                </Form.Group>
                <Form.Group className="mb-3" >
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
                    <Form.Control name="password" value={user.password} type={passwordShown ? "text" : "password"} placeholder="Enter Password" onChange={handleChange} autoComplete="true" required />
                </Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Checkbox name="show" onChange={togglePassword} aria-label="show password" />
                    <InputGroup.Text id="inputGroup-sizing-default">Show Password</InputGroup.Text>
                </InputGroup>
                <div className="btn">
                    <Button className="sidebaranchor" type="submit" name="button" onClick={handleOnClick} >
                        <RiUserAddLine />&nbsp;&nbsp;   Sign Up
                    </Button>
                    <Button className="sidebaranchor ml-5" onClick={() => navigate("/sign-in")}>
                        <FiLogIn />&nbsp;&nbsp;   Sign In
                    </Button>
                </div>
            </Form>
        </div>
    )
}