import { Form, Button, InputGroup } from "react-bootstrap"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { FiLogIn } from 'react-icons/fi'
import { RiUserAddLine } from 'react-icons/ri'
import { usercontext } from "../App";

export default function Signin() {
  const { dispatch } = useContext(usercontext)
  const navigate = useNavigate()

  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const togglePassword = () => {
    // inverse state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const handleOnClick = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email, password
      })
    })
    const data = await res.json();
    // console.log(data);
    if (data.role === 'user') {
      alert("Login Success as user ")
      //action to be performed
      dispatch({ type: "USER", payload: 1 })
      //redirect to user dashboard component
      navigate("/user/dashboard")
    }
    else if (data.role === 'admin') {
      alert("Login Success as admin ")
      //action to be performed
      dispatch({ type: "ADMIN", payload: true })
      //redirect to admin dashboard component
      navigate("/admin/welcome")
    }
    else if (data.error.status === 402) {
      alert(data.error.message)
    }
    else if (data.error.status === 404) {
      alert(data.error.message)
      navigate("/sign-up")
    }
    else if (data.error.status === 401) {
      alert(data.error.message)
    }
  }

  return (
    <div className="login" role="form" aria-label="signin ">
      <Form >
        <h2>Login </h2>
        <Form.Group className="mb-3" >
          <Form.Label  >Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="true" required />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type={passwordShown ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" autoComplete="true" required />
        </Form.Group>
        <InputGroup className="mb-3">
          <InputGroup.Checkbox aria-label="show password" onChange={togglePassword} />
          <InputGroup.Text id="inputGroup-sizing-default">Show Password</InputGroup.Text>
        </InputGroup>

        <Button className="sidebaranchor" onClick={handleOnClick}>
          <FiLogIn />&nbsp; &nbsp;  Log In         </Button>

        <Button className="sidebaranchor" onClick={() => navigate("/sign-up")}>
          <RiUserAddLine />&nbsp; &nbsp;  Sign Up
        </Button>
        <div className="">
          <a href="/forgetpassword">Forgot password</a>
        </div>
      </Form>
    </div>
  )
}