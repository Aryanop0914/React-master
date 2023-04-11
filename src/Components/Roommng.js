import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Roommng() {
  let location = useLocation();
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [title1, setTitle1] = useState(info.title);
  const [location1, setLocation1] = useState(info.location);
  const [images1, setImages1] = useState(" ");
  const [guest1, setGuest1] = useState(info.guest);
  const [rooms1, setRooms1] = useState(info.rooms);
  const [cin1, setCin1] = useState("");
  const [cout1, setCout1] = useState("");
  const [price1, setPrice1] = useState(info.price);
  let tempt = location.state.title2;
  function updateinfo(e) {
    e.preventDefault();
    console.log(title1, location1, guest1, rooms1, price1);
    fetch("http://localhost:5000/updateinfo", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        tempt,
        title1,
        location1,
        images1,
        guest1,
        rooms1,
        cin1,
        cout1,
        price1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          console.log("Error occured");
        } else {
          console.log("Data Updated Successfully");
          window.alert("Data Updated Successfully");
          navigate("/forowners");
        }
      });
  }
  const fetchdata = () => {
    console.log(tempt);
    fetch("http://localhost:5000/infoupdate", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: tempt,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.data);
        console.log(data);
      });
  };
  function converttobase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImages1(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="roommng">
        <div className="oldinfo">
          <fieldset disabled>
            <div className="row g-6">
              <div className="col mb-3">
                <input
                  type="text"
                  id="text1"
                  className="form-controll"
                  value="Current Values"
                />
              </div>
              <div className="col mb-3">
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder={info.title}
                />
              </div>
              <div className="col mb-3">
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder={info.location}
                />
              </div>
              <div className="col mb-3">
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder={info.guest}
                />
              </div>
              <div className="col mb-3">
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder={info.rooms}
                />
              </div>
              <div className="col input-group mb-3">
                <span className="input-group-text">₹</span>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  placeholder={info.price}
                />
              </div>
            </div>
            <div className="row g-6">
              <div className="col mb-3">
                <label htmlFor="check-in" className="form-label">
                  Check in:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="disabledTextInput"
                  placeholder={info.cout}
                />
              </div>
              <div className="col mb-3">
                <label htmlFor="check-in" className="form-label">
                  Check out:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="disabledTextInput"
                  placeholder={info.cout}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="newinfo">
          <form method="POST" onSubmit={updateinfo}>
            <div className="row g-2">
              <div className="col mb-3">
                <label className="form-label">
                  <h3>Old Image Preview:</h3>
                </label>
                <img src={info.image} alt="" />
              </div>
              <div className="col mb-3">
                <label className="form-label">
                  <h3>New Image Preview:</h3>
                </label>
                {images1 === "" || images1 === null ? (
                  ""
                ) : (
                  <img alt=" " src={images1} />
                )}
              </div>
            </div>
            <div className="row g-7">
              <div className="col mb-3">
                <input
                  type="text"
                  id="text1"
                  className="form-control"
                  value="New Values"
                />
              </div>
              <div className="col mb-3">
                <input
                  type="text"
                  id="TextInput"
                  className="form-control"
                  placeholder="Enter title"
                  defaultValue={info.title}
                  onChange={(e) => {
                    setTitle1(e.target.value);
                  }}
                />
              </div>
              <div className="col mb-3">
                <input
                  type="text"
                  id="TextInput"
                  className="form-control"
                  placeholder="Enter Location"
                  defaultValue={info.location}
                  onChange={(e) => {
                    setLocation1(e.target.value);
                  }}
                />
              </div>
              <div className="col mb-3">
                <input
                  type="text"
                  id="TextInput"
                  className="form-control"
                  placeholder="Enter Guest"
                  defaultValue={info.guest}
                  onChange={(e) => {
                    setGuest1(e.target.value);
                  }}
                />
              </div>
              <div className="col mb-3">
                <select
                  className="form-select"
                  placeholder="Enter Rooms"
                  defaultValue={info.rooms}
                  onChange={(e) => {
                    setRooms1(e.target.value);
                  }}
                  required
                >
                  <option>Select No. of Rooms</option>
                  <option value="1">1 Room</option>
                  <option value="2">2 Room</option>
                  <option value="3">3 Room</option>
                </select>
              </div>
              <div className="col input-group mb-3">
                <span className="input-group-text">₹</span>
                <input
                  type="text"
                  id="TextInput"
                  className="form-control"
                  placeholder="Enter rooms"
                  defaultValue={info.price}
                  onChange={(e) => {
                    setPrice1(e.target.value);
                  }}
                />
              </div>
              <div className="row g-9">
                <div className="col mb-3">
                  <label htmlFor="check-in" className="form-label">
                    Check in:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="disabledTextInput"
                    defaultValue={info.cin}
                    placeholder="Enter the Check in date"
                    onChange={(e) => {
                      setCin1(e.target.value);
                    }}
                  />
                </div>
                <div className="col mb-3">
                  <label htmlFor="check-in" className="form-label">
                    Check out:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="disabledTextInput"
                    defaultValue={info.cout}
                    placeholder="Enter the checkout date"
                    onChange={(e) => {
                      setCout1(e.target.value);
                    }}
                  />
                </div>
                <div className="col mb-3">
                  <label htmlFor="check-in" className="form-label">
                    New Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    accepts="image/png/jpg"
                    defaultValue={info.image}
                    onChange={converttobase64}
                    id="formFileMultiple"
                    alt="Upload image to view"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
