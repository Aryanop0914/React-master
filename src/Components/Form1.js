import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Form1() {
  const [location, setLocation] = useState(" ");
  return (
    <>
      <form className="form1">
        <div className="mb-4 text-start ">
          <label htmlFor="check-loc" className="form-label">
            Location:
          </label>
          <input
            type="text"
            className="form-control"
            id="check-loc"
            placeholder="Enter your Location"
            onChange={(e) => setLocation(e.target.value)}
          />
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-4 text-start">
          <label htmlFor="check-in" className="form-label">
            Check in:
          </label>
          <input
            type="date"
            className="form-control"
            id="check-in"
            required
            // onChange={(e) => setCin(e.target.value)}
          />
        </div>
        <div className="mb-4 text-start">
          <label htmlFor="check-out" className="form-label">
            Check out:
          </label>
          <input
            type="date"
            className="form-control"
            id="check-out"
            required
            // onChange={(e) => setCout(e.target.value)}
          />
        </div>
        <div className="mb-4 text-start">
          <label htmlFor="guest" className="form-label text-start">
            Guests:
          </label>
          <select className="form-select">
            <option value="">2 Adults</option>
            <option value="">3 Adults</option>
            <option value="">4 Adults</option>
            <option value="">5 Adults</option>
            <option value="">6 Adults</option>
          </select>
        </div>
        <div className="mb-4 text-start">
          <label htmlFor="guest" className="form-label">
            Rooms:
          </label>
          <select className="form-select" aria-label="Default select example">
            <option value="1">1 Room</option>
            <option value="2">2 Room</option>
            <option value="3">3 Room</option>
          </select>
        </div>
        <NavLink
          to="/hotels"
          state={{ location: location }}
          type="submit"
          className="hotel btn"
        >
          Check Availibity
        </NavLink>
      </form>
    </>
  );
}
