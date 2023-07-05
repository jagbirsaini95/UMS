import { RiAdminLine } from 'react-icons/ri'
import { BiUserCircle, BiLogOut } from 'react-icons/bi'
import { AiOutlineContacts } from 'react-icons/ai'
import { VscFeedback } from 'react-icons/vsc'

export default function Sidebar(props) {


  return (
    <div >
      <div className="canvass fixed-top">
        <div role="menu" aria-label='left sidebar' >
          <h2 tabIndex={0} >Admin portal</h2>
        </div >
        <br />
        <div  >
         
          <a href="/admin/allusers"  className="sidebaranchor"><BiUserCircle />&nbsp;&nbsp; All Users</a>
          <a href="/admin/adduser" className="sidebaranchor"><BiUserCircle />&nbsp;&nbsp; Add User</a>
          {/* <a  href="/security">security</a><br/> */}
          <a href="/admin/admininfo" className="sidebaranchor"><RiAdminLine />&nbsp;&nbsp; Admin Info</a>
          {/* <a href="/admin/contactus" className="sidebaranchor"><AiOutlineContacts />&nbsp;&nbsp; Contact Us</a> */}
          {/* <a href="/admin/feedback" className="sidebaranchor">Feedback Form</a><br /> */}
          <a href="/admin/getfeedbacks" className="sidebaranchor"><VscFeedback />&nbsp;&nbsp; Feedbacks</a>
          <a href="/logout" className="sidebaranchor"><BiLogOut />&nbsp;&nbsp; Logout</a>
          <div tabIndex={0}>

        &copy; copyrights 2022

          </div>
        </div>
      </div>
    </div>
  );
}