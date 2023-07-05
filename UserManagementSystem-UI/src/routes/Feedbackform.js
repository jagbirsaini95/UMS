import {   useState } from "react"
import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { usercontext } from "../App";

export default function Feedbackform(props) {
    const navigate=useNavigate();
    // const { dispatch } = useContext(usercontext)
    const [formData, setformData] = useState({
        name: "", email: "", mNo: "", message: "",
    });
    let inputname, inputvalue;
    const handleChange = (e) => {
        inputname = e.target.name;
        inputvalue = e.target.value;
        setformData({ ...formData, [inputname]: inputvalue })
    }
    const handleOnClick = async (e) => {
        e.preventDefault();
        const { name, email, mNo, message } = formData;
        // console.log(name, email);
        const res = await fetch("/feedbackform", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, mNo, message,
            })
        })

        const data = await res.json();
        // console.log(data);
        if (data.msg) {
            alert(data.errr)
        }
        else if (data.message === message) {
            alert("feedback sent")
            navigate("/admin/welcome")
        }
    }
    // useEffect(() => {
    //     dispatch({ type: "ADMIN", payload: true })

    // })
    return (
        <div className=" feedback " role="form" aria-label="feedback ">
            <Form method="POST">
                <h2>Feedback Form</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" value={formData.name} placeholder="Enter your name" autoComplete="true" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" value={formData.email} placeholder="enter your email" onChange={handleChange} autoComplete="true" required />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control name="mNo" type="number" value={formData.mNo} placeholder="Enter your mobile number" onChange={handleChange} autoComplete="true" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Feedback message</Form.Label>
                    <Form.Control as="textarea" name="message" role="textbox area" aria-label="Enter your message here" placeholder="Enter your message here" value={formData.message} onChange={handleChange} rows={4} />
                </Form.Group>
                <Form.Group className="mb-2 ">
                    <Col>
                        <Button onClick={handleOnClick} className="sidebaranchor">Submit</Button>
                        <Button type="reset" className="sidebaranchor">Reset</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}