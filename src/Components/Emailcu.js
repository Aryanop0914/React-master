import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Alert from "react-bootstrap/Alert";

export default function Emailcu() {
  let location = useLocation();
  let title = location.state.title2;
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [cin, setCin] = useState("");
  const [cout, setCout] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const sendEmail = async (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/sendmail", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title,
        name,
        email,
        number,
        city,
        state,
        pincode,
        cin,
        cout,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status === 401 || !data) {
          console.log("error");
        } else {
          setShow(true);
          setEmail("");
          console.log("Email sent");
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="alert">
        {show ? (
          <Alert variant="primary" onClose={() => setShow(false)} dismissible>
            Your Email Succesfully Send
          </Alert>
        ) : (
          ""
        )}
      </div>

      <div className="email">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputfname4" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputfname4"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Mobile No.
            </label>
            <div className="input-group">
              <span className="input-group-text">+91</span>
              <input
                type="tel"
                className="form-control"
                pattern="[0-9]{10}"
                id="inputNumber4"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="inputState"
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              Pin code
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="check-in" className="form-label">
              Check in:
            </label>
            <input
              type="date"
              className="form-control"
              id="check-in"
              onChange={(e) => setCin(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="check-out" className="form-label">
              Check out:
            </label>
            <input
              type="date"
              className="form-control"
              id="check-out"
              onChange={(e) => setCout(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={sendEmail}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
