const mongoose = require("mongoose");

function isValidDate(dateString) {
  // Ensure date string is in ISO format
  const isoDate = new Date(dateString).toISOString().substring(0, 10);
  // Extract date components
  const [year, month, day] = isoDate.split("-");
  // Ensure year, month, and day are all numbers
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return false;
  }
  // Ensure day and month are within valid ranges
  if (day < 1 || day > 31 || month < 1 || month > 12) {
    return false;
  }
  // Ensure year is greater than 1900
  if (year < 1900) {
    return false;
  }
  // Format date as dd/mm/yyyy
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

const OwnerDetailsScehma = new mongoose.Schema(
  {
    title: String,
    location: String,
    image: String,
    guest: String,
    rooms: String,
    price: String,
    email: String,
    cin: {
      type: String,
      required: true,
      validate: {
        validator: isValidDate,
        message: "Invalid date format, must be dd/mm/yyyy",
      },
    },
    cout: {
      type: String,
      required: true,
      validate: {
        validator: isValidDate,
        message: "Invalid date format, must be dd/mm/yyyy",
      },
    },
    price: String,
  },
  {
    collection: "OwnerInfo",
  }
);

mongoose.model("OwnerInfo", OwnerDetailsScehma);
