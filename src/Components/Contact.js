import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Contact() {
  return (
            <div className="Contact">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="fir">
                                <NavLink to="/" className="logo">Homestay<span>.</span></NavLink>
                                <p>We inspire and reach millions of travelers<br /> across 90 local websites</p>
                                <div className="fa-social">
                                    <i className="fa fa-facebook"></i>
                                    <i className="fa fa-twitter"></i>
                                    <i className="fa fa-instagram"></i>
                                    <i className="fa fa-youtube-play"></i>
                                </div>
                            
                            </div>
                        </div>

                        <div className="col">
                            <div className="sec">
                                <h3>Contact Us</h3>
                                <ul>
                                    <p>1234567899</p>
                                    <p>homestay@gmail.com</p>
                                    <p>A7, Charusat University, Changa, Gujarat</p>
                                </ul>
                            </div>
                        </div>

                        <div className="col">
                            <div className="third">
                                <h3>New latest</h3>
                                <p>Get the latest updates and offers.</p>
                                <form action="#" className="fn-form">
                                <input type="text" className="email_in" placeholder="Email"/>
                                <button type="submit" className="mail_btn"><i className="fa fa-send"></i></button>
                            </form>
                            </div>
                        </div>

                    </div>
      
                </div>
    
            </div>
  )
}