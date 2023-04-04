import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

export default function Roommng() {
    let location=useLocation();
    const navigate = useNavigate();
  let tempt=location.state.title2;
      fetch("http://localhost:5000/deleteinfo",{
        method:"POST",
        crossDomain:true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
          title:tempt,
        }),
      }).then((res)=>res.json())
      .then((data)=>{
        window.alert("Succesfully Deleted");
        navigate('/forowners');
      });
  return (
    <>
    
    </>
  )
}

