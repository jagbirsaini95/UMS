import { createContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Errorpage from "./routes/Errorpage";
import Logout from "./routes/Logout";
import Navbar from './routes/Navbar'
import Signin from "./routes/Signin"
import Signup from './routes/Signup'
import Welcome from './routes/Welcome'
import { initialstate, reducer } from "./reducer/Reducer";
import Feedbackform from "./routes/Feedbackform";
import Getfeedbacks from "./routes/Getfeedbacks";
import { Firstpage } from "./routes/Firstpage";
import Aboutus from "./routes/Aboutus";
import Admininfo from "./routes/Admininfo";
import Contactus from "./routes/Contactus";
import ForgetPassword from "./routes/ForgetPassword";
import UserDashboard from "./routes/UserDashboard";
import Adduser from "./routes/Adduser";
import Gallery from "./routes/components-for-dashboard/Gallery";
//create context like store
export const usercontext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialstate)
  
  return (
    <>

      <usercontext.Provider value={{ state, dispatch }}>
        <Navbar />

        {/* <Errorpage/> */}
        <Routes>
        <Route exact path='/welcome' element={<Welcome />} />
        <Route exact path='/' element={<Firstpage />} />
        <Route path='/admin' element={<UserDashboard />} />

          <Route path='/admin/welcome' element={<Firstpage />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path='/admin/adduser' element={<Adduser />} />
          <Route path='/admin/allusers' element={<Dashboard />} />
          <Route path='/admin/admininfo' element={<Admininfo />} />
          <Route path='/admin/contactus' element={<Contactus />} />
          <Route path='/admin/feedback' element={<Feedbackform />} />
          <Route path='/admin/aboutus' element={<Aboutus />} />
          <Route path='/admin/getfeedbacks' element={<Getfeedbacks />} />

          <Route path='/user/dashboard' element={<UserDashboard />} />
          <Route path='/user/gallery' element={<Gallery/>} />


          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/logout" element={<Logout />} />

         


          <Route path="*" element={<Errorpage />} />

        </Routes>
      </usercontext.Provider>
    </>
  );
}

export default App;
