import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Dashbored from './pages/Dashbored';
import SingleJob from './pages/SingleJob';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from 'react';
import { logout } from './store/slice/userSlice';
function App() {
  const dispatch = useDispatch();
  const {isAuthenticated,token} = useSelector((state) => state.user);

  useEffect(() => {
    if (!localStorage.getItem("token") && isAuthenticated) {
      dispatch(logout()); 
    }
  }, [isAuthenticated, dispatch,logout,token]);



  return (
    <>
      <BrowserRouter>
      {/* Navbar */}
      <Navbar/>

      {/* Routes diffine */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/dashborad" element={<Dashbored/>}/>
        <Route path="/jobs/:jobId" element={<SingleJob />} />

        <Route path='/register' element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {/* Footer */}
      <Footer/>
      {/* toast */}
      <ToastContainer position="top-right" theme="dark" />
      </BrowserRouter>
    </>
  )
}

export default App
