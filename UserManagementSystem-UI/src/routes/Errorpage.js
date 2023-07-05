import React from 'react'
import { NavLink } from 'react-router-dom'

function Errorpage() {
    return (
        <div className="errorimg">
            <center>
                <h1 className='mt-5'>Sorry Page Not Found</h1>
                <NavLink to="/admin/welcome">Back To Homepage</NavLink>
            </center>
        </div>
    )
}

export default Errorpage