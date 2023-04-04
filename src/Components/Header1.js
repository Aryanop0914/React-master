import React from 'react'
import Form1 from '../Components/Form1';


export default function Header1() {
  return (
    <>
    <div className="header">
     <div className="container">
        <div className="row">
            <div className="col">
                <div className="part1">
                   <h1>Your Travel Home Away From Home</h1>
                   <p>Here are the best travel home booking sites,wich accomodates you with a local family,keeping the culture of our country alive at every corner of it.</p>
                </div>  
            </div>
            <div className="col">
                <div className="part2">
                <Form1/>
                </div>
            </div>
        </div>
     </div>
    </div>
    </>
  )
}
