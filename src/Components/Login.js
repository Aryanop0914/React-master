 import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'

export default function Login() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    console.log(email,password);
    fetch("http://localhost:5000/login",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        email,
        password,
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      if( data.status ==='Login successful'){
              window.alert("Login successful");
              window.localStorage.setItem("token",data.data);
              window.localStorage.setItem("loggedin",true);
              navigate("/");
        }
      if(data.status==="perror")
      {
        window.alert("Password is incorrect");
      }
    })
  }
      return (
    <>
      <div className="login">
        <form method="POST" onSubmit={handleSubmit}> 
          <div className="mb-4">            
             <h2>Login Form📂</h2>
          </div>
          <div className="mb-4 text-start">            
            <label htmlFor="Inputemail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="Inputemail" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email'/>
          </div>
          <div className="mb-4 text-start">
            <label htmlFor="Inputpassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="Inputpassword" onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'/>
          </div>
             <p>Don't have an Account. <Link to="/signup">Signup</Link></p>
             <button className="btn btn-primary">Login</button>
         </form>
         
       </div>
    </>
  )
}

