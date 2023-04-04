import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const Ownercard = () => {
  const [ownerdata, setOwnerdata] = useState([]);
  const [reload, setReload] = useState();

  const fetchData = () => {
    fetch("http://localhost:5000/ownerdata", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOwnerdata(data.data);
        if (data.data === "token expired") {
          window.localStorage.clear();
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  function deleteinfo(a) {
    fetch("http://localhost:5000/deleteinfo", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: a,
      }),
    }).then((res) => res.json());
  }
  useEffect(() => {
    deleteinfo();
  });

  return (
    <>
      <div className="ownercard">
        <div className="owner-title">
          <h2>Manage Your properties</h2>
          {/* <h6>Reload if added property not visible:</h6> */}
          <div className="reload-btn">
            <button onClick={() => setReload(!reload)}>Reload</button>
          </div>
        </div>

        {ownerdata.map((owner) => (
          <div className="owner">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="image">
                    <img alt=" " src={owner.image} />
                  </div>
                </div>
                <div className="col">
                  <div className="info">
                    <h2>{owner.title}</h2>
                    <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
                    {owner.location}
                    <h6>Max.{owner.guest} people</h6>
                    <h6>Rooms available: {owner.rooms}</h6>
                    <h3>₹{owner.price}</h3>
                    <h5>Dates Available:</h5>
                    <h6>Start Date: {owner.cin}</h6>
                    <h6>End Date: {owner.cout}</h6>
                    <div className="button">
                      <div className="btn1">
                        <NavLink
                          to="/infoupdate"
                          state={{ title2: owner.title }}
                          className="update btn"
                        >
                          Update
                        </NavLink>
                      </div>
                      <div className="btn2">
                        <NavLink
                          to="/deleteinfo"
                          state={{ title2: owner.title }}
                          className="delete btn btn-danger"
                        >
                          Delete
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Ownercard;
