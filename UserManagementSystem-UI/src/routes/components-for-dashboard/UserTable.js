import React from 'react'
import { Table } from 'react-bootstrap'

function UserTable(props) {
    return (
        <div className='usertable' tabIndex="0" role="cell" aria-label='displayed data in table'>
            <div className="col-2 "  >
                <Table >
                    <thead>
                        <tr >
                            <th>FName</th>
                            <th>LName</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Username</th>
                            <th>Creation Date</th>
                            <th>Creation Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.users.map((user, index) => {
                             const date = user.created.split("T")
                             const time = date[1].split(".")
                            return (
                                <tr key={index}>
                                    {/* <td>{user._id}</td> */}
                                    <td>{user.fname}</td>
                                    <td>{user.lname || '-'}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mNo}</td>
                                    <td>{user.username}</td>
                                    <td>{date[0]}</td>
                                    <td>{time[0]}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

        </div>
    )
}

export default UserTable