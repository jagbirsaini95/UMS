import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import Pagination from '@material-ui/lab/Pagination';
import { useNavigate } from 'react-router-dom';
import { usercontext } from "../App";
import UserTable from './components-for-dashboard/UserTable';
import DeleteAccount from "./DeleteAccount"
import Editprofilepop from './Editprofilepop';

function DashboardN() {
    const { dispatch } = useContext(usercontext)
    const [user, setuser] = useState([])
    const [search, setSearch] = useState('')
    const [skip, setskip] = useState(0)
    const [sort, setSort] = useState(1)
    const [editprofile, seteditprofile] = useState(false)
    const [view, setView] = useState(true)
    const [pageNumber, setPageNumber] = useState(1)
    const [totalFiltered, setTotalFiltered] = useState(0)

    const usersPerPage = 5

    const navigate = useNavigate()
    //mounting
    // useEffect(() => {
    //     handleFetch()
    // }, [])
    // on update
    useEffect(() => {
        handleFetch()
        // const timeoutId = setTimeout(() => handleFetch(), 500);
        // return () => clearTimeout(timeoutId);
    }, [search, skip, sort, dispatch])
    const handleFetch = async () => {
        try {
            const res = await fetch(`/users/?search=${search}&skip=${skip}&sort=${sort}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    credentials: "include"
                }
            })
            if (!res.status === 200)
                throw new Error(res.error)
            const recievedObject = await res.json();
            setTotalFiltered(recievedObject.totalFiltered);
            const data = recievedObject.userFiltered;
            console.log()

            if (data) {
                setuser(data)
                dispatch({ type: "ADMIN", payload: true })
            }
        } catch (error) {
            dispatch({ type: "ADMIN", payload: false })
            alert("Please log in first!")

            navigate('/sign-in')
        }
    }
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    //handling pagination
    // const onClickBack = () => {
    //     setPageNumber(pageNumber - 1)
    //     setskip(skip - 5)
    // }
    // const onClickNext = () => {
    //     setPageNumber(pageNumber + 1)
    //     setskip(skip + 5)
    // }
    //edit profile toogle
    const tooglePop = () => {
        seteditprofile(!editprofile)
    }
    const sortUser = (e) => {
        if (e.target.value === "ascending")
            setSort(1)
        else if (e.target.value === "descending")
            setSort(-1)
    }
    const toggleView = () => {
        setView(!view)
    }
    const onPagination = (e, value) => {
        // console.log(value)
        setPageNumber(value)
        setskip((value - 1) * usersPerPage)

        // if (value === 1) {
        //     setskip(0)
        // }
        // else if (value === 2) {
        //     setskip(5)
        // }else if (value === 3) {
        //     setskip(10)
        // }else if (value === 4) {
        //     setskip(15)
        // }

    }
    return (
        <div className='mt-4 ' >.<br /><br />
            <span>
                <h1 className="text-center" tabIndex={0}>Users Data</h1>
                <Form.Select className='sortusers' role="option" aria-label='dropdown' onChange={sortUser}>
                    <option>Arrange Users</option>
                    <option value="ascending" >a-z</option>
                    <option value="descending" >z-a</option>
                </Form.Select>

                <InputGroup className="alignment">

                    {/* back button  using ternary operator*/}
                    {/* {skip === 0 ? <OverlayTrigger overlay={<Tooltip>No data back!</Tooltip>}>
                        <span >
                            <Button className="m-2" variant="outline-primary" disabled>
                                Back
                            </Button>
                        </span>
                    </OverlayTrigger> :
                        <Button className="m-2" variant="outline-primary" onClick={onClickBack}>  Back </Button>
                    } */}

                    {/* input box for search filtering */}
                    <Form.Control className="search" name="search" value={search} type="text" placeholder="Search User " onChange={handleSearchChange} autoComplete="true" />
                    <InputGroup className="view">
                        <InputGroup.Checkbox className="" aria-label="Display style for data" onChange={toggleView} />
                        <InputGroup.Text className="" id="inputGroup-sizing-default">card view</InputGroup.Text>
                    </InputGroup>
                    {/* next button */}
                    {/* {skip < totalFiltered - usersPerPage ?<Button className="m-2" variant="outline-primary" id="button-addon1" onClick={onClickNext}>  Next </Button>:
                     <OverlayTrigger overlay={<Tooltip>No data forward!</Tooltip>}>
                        <span >
                            <Button className="m-2" variant="outline-primary" disabled>
                                Next
                            </Button>
                        </span>
                    </OverlayTrigger>                       
                    } */}


                </InputGroup>

                <div className='cardIndex' >
                    {view ? <UserTable users={user} /> :
                        user.map((user, index) => {
                            const date = user.created.split("T")
                            const time = date[1].split(".")
                            return (
                                <div className="cardsize" key={index} style={{}}>
                                    <div className="pop">
                                        {editprofile ? <Editprofilepop user={user} toogle={tooglePop} /> : null}
                                    </div>
                                    <Card role="table" tabIndex="0">
                                        <Row >
                                            <Col xs={3}>
                                                <Card.Img className="mt-2" aria-label={ 'card view '+user.fname + 'image'} src={`https://avatars.dicebear.com/v2/avataaars/${user._id}.svg?options[mood][
]=happy`} width="50%" height="70%" />
                                            </Col>
                                            <Col xs={7}>
                                                <Card.Body align="left" role="title" aria-label='greetings'><h2 >hello!</h2>
                                                    <Card.Title role='tab' aria-label='name'> <h2 >{user.fname} {user.lname}</h2></Card.Title>
                                                    {/* <div><strong>ID:</strong> {user._id}</div> */}
                                                    <div ><strong>Email:</strong> {user.email}</div>
                                                    <div ><strong>username:</strong> {user.username}</div>
                                                    <div><strong>contact Number:</strong> {user.mNo}</div>
                                                    <div ><strong>account creation date:</strong> {date[0]}</div>
                                                    <div ><strong>account creation Time</strong> {time[0]}</div>
                                                </Card.Body>
                                            </Col>
                                            <Col xs={2}>
                                                <div className='btn-dashboard'>
                                                    <div>
                                                        <Button onClick={tooglePop} >Edit<br /> profile</Button>
                                                    </div>
                                                    {/* <div className="pop">
                                                {editprofile ? <Editprofilepop toogle={editprofile} user={user} /> : false}
                                            </div> */}
                                                    <div>
                                                        <DeleteAccount userf={user.fname + user.lname} user={user.username} />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            )
                        })}
                </div>
                <div className='paginationUsers' role="" aria-label='pagination '>
                    <Pagination count={Math.ceil(totalFiltered / usersPerPage)} page={pageNumber} onChange={onPagination} />
                </div>
            </span>

        </div>
    )
}

export default DashboardN