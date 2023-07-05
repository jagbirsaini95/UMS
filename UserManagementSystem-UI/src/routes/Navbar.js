import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { usercontext } from "../App";
import Sidebar from "./Sidebar";
function Navbar() {
  const { state } = useContext(usercontext)
  const Menu = () => {
     if (state === true) {
      return (
        <>
          <div className=" navbar-collapse "  id="navbarTogglerDemo02">
            <ul role="navigation" className="navbar-nav">
              <li className="nav-item ml-auto">
                <NavLink className="nav-link" role="navigation" to="/admin/welcome">Dashboard</NavLink>
              </li>
              <li className="nav-item ml-auto">
                <NavLink className="nav-link" role="navigation" to="/admin/aboutus">About Us</NavLink>
              </li>
              <li className="nav-item ml-auto">
                <NavLink className="nav-link" role="navigation" to="/admin/feedback">Feedback</NavLink>
              </li>
              <li className="nav-item navlogout">
                <NavLink className="nav-link" role="navigation" to="/logout">Logout</NavLink>
              </li>
            </ul>
          </div><br />
          <div className="sidebar">
            <Sidebar />
          </div>

        </>
      )
    }
    else if (state === 1) {
      return (
        <>

          <div className=" navbar-collapse " id="navbarTogglerDemo02">
            <ul className="navbar-nav">
              <li className="nav-item ml-auto">
                <NavLink className="nav-link" role="navigation" to="/user/dashboard">Dashboard</NavLink>
              </li>
              <li className="nav-item ml-auto">
                <NavLink className="nav-link" role="navigation" to="/admin/aboutus">About Us</NavLink>
              </li>
              <li className="nav-item ml-auto">
                <NavLink className="nav-link" role="navigation" to="/admin/feedback">Feedback</NavLink>
              </li>
              <li className="nav-item navlogout">
                <NavLink className="nav-link" role="navigation" to="/logout">Logout</NavLink>
              </li>
            </ul>
          </div>
        </>
      )
    }
    
    else{
      return (
        <>
          <div  className="navbar-collapse col-1">

            <ul className="navbar-nav">
              <li className="nav-item ">
                <NavLink className="nav-link" role="navigation" to="/user/dashboard">Dashboard</NavLink>
              </li>

              <li className="nav-item ml-auto">
                <NavLink className="nav-link" role="navigation" to="/sign-in">Login</NavLink>
              </li>
              <li className="nav-item ml-auto">
                <NavLink className="nav-link" role="navigation" to="/sign-up">Sign up</NavLink>
              </li>
              <li className="nav-item ml-auto">
                <NavLink className="nav-link" role="navigation" to="/admin/aboutus">About Us</NavLink>
              </li>
              <li className="nav-item ml-auto">
                <NavLink className="nav-link" role="navigation" to="/admin/feedback">Feedback</NavLink>
              </li>
              {/* remove for toogle of logout and login */}
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/logout">logout</NavLink>
              </li> */}

            </ul>
          </div>
        </>
      )
    }
  }
  return (
    <>

        <nav className="navbar navbar-expand-lg fixed-top ">
          <div className="container">
            <NavLink className="navbar-brand" role="heading" aria-label="website logo" to="/"><h3 >socialMedia</h3></NavLink>

            <Menu  />
            {/* <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
              <ul className="navbar-nav">
                <li className="nav-item ml-auto">
                  <NavLink className="nav-link" to="/dashboard">About us</NavLink>
                </li>
                <li className="nav-item ml-auto">
                  <NavLink className="nav-link" to="/sign-in">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">Sign up</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">logout</NavLink>
                </li>
              </ul>
            </div> */}
          </div>
        </nav>

    </>
  );
}

export default Navbar;
