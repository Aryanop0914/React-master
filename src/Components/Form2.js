import React, { useState } from "react";

export default function Form2() {
  const [title, setTitle] = useState(" ");
  const [location, setLocation] = useState(" ");
  const [images, setImages] = useState(" ");
  const [guest, setGuest] = useState(" ");
  const [rooms, setRooms] = useState(" ");
  const [cin, setCin] = useState("");
  const [cout, setCout] = useState("");
  const [price, setPrice] = useState(" ");
  function converttobase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImages(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }
  function handleinsert(e) {
    e.preventDefault();
    console.log(title, location, images, guest, rooms, price);
    fetch("http://localhost:5000/owner", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title,
        location,
        base64: images,
        guest,
        rooms,
        cin,
        cout,
        price,
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Addition Successful");
        window.alert("Your property registered successfully");
      });
  }

  return (
    <>
      <form className="form2" method="POST" onSubmit={handleinsert}>
        <div className="mb-4">
          <h3>Fill out the form to add your own property</h3>
        </div>
        <div className="mb-4 text-start ">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter the title"
            autoComplete=" "
            required
          />
        </div>
        <div className="mb-4 text-start ">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            placeholder="Enter the location"
            autoComplete=" "
            required
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="formFileMultiple" className="form-label">
            Images:
          </label>
          <input
            className="form-control"
            type="file"
            accepts="image/png/jpg"
            onChange={converttobase64}
            id="formFileMultiple"
            multiple
            required
          />
        </div>
        <div className="preview mb-3 text-start">
          <label className="form-label">Preview:</label>
          {images === "" || images === null ? "" : <img alt=" " src={images} />}
        </div>
        {/* <div className="mb-4 text-start">
                <label htmlFor="check-in" className="form-label">Check in:</label>
                <input type="date" className="form-control" id="check-in"/>
            </div>
            <div className="mb-4 text-start">
                <label htmlFor="check-out" className="form-label">Check out:</label>
                <input type="date" className="form-control" id="check-out"/>
            </div> */}
        <div className="mb-4 text-start ">
          <label htmlFor="guest" className="form-label">
            Guest:
          </label>
          <input
            type="text"
            className="form-control"
            id="guest"
            onChange={(e) => {
              setGuest(e.target.value);
            }}
            placeholder="Enter the Maximum no. of people can stay"
            autoComplete=" "
            required
          />
        </div>
        <div className="mb-4 text-start">
          <label htmlFor="guest" className="form-label">
            Rooms:
          </label>
          <select
            className="form-select"
            onChange={(e) => {
              setRooms(e.target.value);
            }}
            required
          >
            <option>Select No. of Rooms</option>
            <option value="1">1 Room</option>
            <option value="2">2 Room</option>
            <option value="3">3 Room</option>
          </select>
        </div>
        <div className="mb-4 text-start">
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
        <div className="mb-4 text-start">
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
        <div className="mb-4 text-start ">
          <label htmlFor="input-group" className="form-label">
            Price:
          </label>
          <div className="input-group">
            <span className="input-group-text">₹</span>
            <input
              type="text"
              className="form-control"
              id="TextInput"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Enter Price"
              autoComplete=" "
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn primary">
          Insert
        </button>
      </form>
    </>
  );
}
