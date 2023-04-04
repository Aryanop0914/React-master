import React,{ useEffect,useState}from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar () {
  const navigate=useNavigate();
  const[userdata,setUserdata]=useState("");
  const[loginbtn,setLoginbtn]=useState("true");

  const logout=()=>{
    window.localStorage.clear();
    window.localStorage.removeItem("loginbtn");
    setLoginbtn(true);
    navigate("/");
      };

  useEffect(()=> {
    fetch("http://localhost:5000/userData",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    }).then((res)=>res.json())
    .then((data)=>{
        console.log(data,"userData");
        setUserdata(data.data);
        setLoginbtn(false);
        if (data.data === "token expired") {
          window.localStorage.clear();
          window.localStorage.removeItem("loginbtn");
          setLoginbtn(true);
        }
    });
  },[])



  return (
    <>
        <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary">
            <div className="container-fluid">
                <NavLink to="/" className="logo">Homestay<span>.</span></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
              <div className="d-flex">
                  <div className="collapse navbar-collapse " id="navbarNavAltMarkup" >
                      <div className="navbar-nav">
                          <NavLink to="/" className="nav-link" activeclassname="nav-link active">Home</NavLink>
                             {loginbtn ? <div className="nav-link mx-3"> For Owners</div> :<NavLink to="/forowners" className="nav-link mx-3" activeclassname="nav-link active">For Owners</NavLink>}
                             {/* <Link to="/about" className="nav-link ">About</Link>
                             <Link to="/contact" className="nav-link mx-3">Contact</Link> */}
                             {loginbtn ?<NavLink to="/login" className=" loginbtn btn nav-link"> Login </NavLink> : <div className=" loginbtn btn nav-link">{userdata.username} </div>}
                             {loginbtn ? " ": <button className="btn btn-danger mx-3" onClick={logout}>Log Out</button>}
                      </div>
                  </div>
              </div>
            </div>
        </nav>
      
    </>
  )
}

