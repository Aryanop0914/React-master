import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup(){
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(username,email,password);
    fetch("http://localhost:5000/signup",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        username,
        email,
        password,
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      if( data.error ==='User Exists'){
              window.alert("User already Exists.");
              console.log("Invalid Registration");
        }else{
          console.log(data,"Registration Successful");
          window.alert("Registration Successful Login by the login page");
          navigate("/login");
        }

    })
  }
    return (
      <>

        <div className="signup">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2>Signup Form📂</h2>
            </div>
            <div className="mb-4 text-start ">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" name="username" id="username"  onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Your Username' autoComplete=''/>
            </div>
            <div className="mb-4 text-start">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' autoComplete=''/>
            </div>
            <div className="mb-4 text-start">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" id="password"  onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password' autoComplete=''/>
            </div>
            <p>Already registered... <Link to="/login">Login</Link></p>
            <button type="submit"  className="btn btn-primary">Sign Up</button>
          </form>

        </div>
      </>
    );
  }
