const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json({ limit: "25mb" }));
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false, limit: "25mb" }));
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
const mongoUrl =
  "mongodb+srv://Aryan:hetal1977@db.brvlcjn.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      username,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "Successful Registration" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "2days",
    });

    if (res.status(201)) {
      return res.json({ status: "Login successful", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "perror", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

require("./ownerDetails");
const Ownerde = mongoose.model("OwnerInfo");
app.post("/owner", async (req, res) => {
  const { title, location, base64, guest, rooms, price, cin, cout, token } =
    req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    Ownerde.create({
      title,
      location,
      image: base64,
      guest,
      rooms,
      price: price,
      cin,
      cout,
      email: useremail,
    });
    res.send({ Status: "Done" });
  } catch (error) {
    res.send({ Status: "error", data: error });
    console.log(error);
  }
});

app.post("/ownerdata", async (req, res) => {
  const { token } = req.body;
  try {
    const owner = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (owner == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    try {
      const owneremail = owner.email;
      await Ownerde.find({ email: owneremail }).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/infoupdate", async (req, res) => {
  const { title } = req.body;
  try {
    await Ownerde.findOne({ title: title }).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/updateinfo", async (req, res) => {
  const {
    tempt,
    title1,
    location1,
    image1,
    guest1,
    rooms1,
    price1,
    cin1,
    cout1,
  } = req.body;
  try {
    await Ownerde.updateOne(
      { title: tempt },
      {
        title: title1,
        location: location1,
        image: image1,
        guest: guest1,
        rooms: rooms1,
        cin: cin1,
        cout: cout1,
        price: price1,
      }
    ).then((data) => {
      res.send({ status: "Data Updated", data: data });
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/deleteinfo", async (req, res) => {
  const { title } = req.body;
  try {
    await Ownerde.deleteOne({ title: title }).then((data) => {
      res.send({ status: "ok" });
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/hotels", async (req, res) => {
  const { location } = req.body;
  // console.log(cin, cout);
  // const startDate = new Date(cin);
  // const endDate = new Date(cout);
  // console.log(startDate, endDate);
  try {
    await Ownerde.find({
      location: location,
    }).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/sendmail", async (req, res) => {
  const { title, email, name, number, city, state, pincode, cin, cout } =
    req.body;

  try {
    await Ownerde.findOne({ title: title }).then((data) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Regarding Hotel Booking Confirmation",
        html: `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Hotel Confirmation</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			background-color: #f5f5f5;
			color: #333;
			padding: 20px;
		}
		
		h1 {
			font-size: 24px;
			color: #333;
			margin: 0 0 20px 0;
		}
		
		p {
			font-size: 16px;
			line-height: 1.5;
			margin: 0 0 10px 0;
		}
		
		.container {
			max-width: 600px;
			margin: 0 auto;
			background-color: #fff;
			padding: 20px;
			border-radius: 5px;
			box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		}
		
		.header {
			background-color: #333;
			color: #fff;
			padding: 10px 20px;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			margin: -20px -20px 20px -20px;
		}
		
		.header h1 {
			margin: 0;
		}
		
		.footer {
			background-color: #eee;
			color: #666;
			padding: 10px 20px;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
			margin: 20px -20px -20px -20px;
			font-size: 14px;
		}
		
		.button {
			display: inline-block;
			background-color: #333;
			color: #fff;
			padding: 10px 20px;
			border-radius: 5px;
			text-decoration: none;
			margin-top: 20px;
		}
		
		.button:hover {
			background-color: #444;
		}
		
		@media only screen and (max-width: 600px) {
			.container {
				width: 100%;
			}
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>Hotel Confirmation</h1>
		</div>
		<p>Dear ${name},</p>
		<p>Thank you for choosing our hotel. Your reservation has been confirmed and the details are as follows:</p>
		<ul>
      <li>Title: ${data.title}</li>
			<li>Check-in date: ${cin}</li>
			<li>Check-out date: ${cout}</li>
      <li>Mobile-no: ${number}</li>
      <li>Address: ${city}, ${state}, ${pincode}</li>
			<li>Number of guests: ${data.guest}</li>
			<li>Room rate: ₹${data.price}</li>
		</ul>
		<p>If you have any questions or would like to make changes to your reservation, please contact us at 1235678912.</p>
		<a href="http://localhost:5001/" class="button">Visit Our Website</a>
		<div class="footer">
			<p>Thank you for choosing our hotel. We look forward to welcoming you!</p>
		</div>
	</div>
</body>
</html>
          `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error" + error);
        } else {
          console.log("Email sent:" + info.response);
          res.status(201).json({ status: 201, info });
        }
      });
    });
  } catch (error) {
    console.log("Error" + error);
    res.status(401).json({ status: 401, error });
  }
});

app.listen(5000, () => {
  console.log("Server Started");
  console.log(`Listening on ${process.env.PORT}`);
});
