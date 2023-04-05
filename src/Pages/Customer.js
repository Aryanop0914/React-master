import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
const Customer = () => {
  const { state } = useLocation();
  const location = state.location;
  const cin = state.cin;
  const cout = state.cout;
  console.log(location, cin, cout);
  const [hoteldata, setHoteldata] = useState([]);
  const [reload, setReload] = useState();

  const fetchData = () => {
    fetch("http://localhost:5000/hotels", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        location,
        cin,
        cout,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHoteldata(data.data);
        if (data.data === "token expired") {
          window.localStorage.clear();
        }
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <>
      <Navbar />
      <div className="hotelcard">
        <div className="reload-btn">
          <button onClick={() => setReload(!reload)}>Reload</button>
        </div>
      </div>

      {hoteldata.map((hotel) => (
        <div className="hotel">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="image">
                  <img alt=" " src={hotel.image} />
                </div>
              </div>
              <div className="col">
                <div className="info">
                  <h2>{hotel.title}</h2>
                  <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
                  {hotel.location}
                  <h6>Max.{hotel.guest} people</h6>
                  <h6>Rooms available: {hotel.rooms}</h6>
                  <h3>₹{hotel.price}</h3>
                  <h5>Dates Available:</h5>
                  <h6>Start Date: {hotel.cin}</h6>
                  <h6>End Date: {hotel.cout}</h6>
                  <div className="button">
                    <NavLink
                      to="/customerinfo"
                      state={{ title2: hotel.title }}
                      className="book btn"
                    >
                      Book
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Customer;
