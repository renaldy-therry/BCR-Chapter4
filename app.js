// ? Call the modules
const express = require("express");
const multer = require("multer");
const expressLayouts = require("express-ejs-layouts");

// ? Call the directory needs
const {
  loadCars,
  viewEdit,
  viewCreate,
  viewSearch,
  createCar,
  updateCar,
  deleteCar,
} = require("./controller/handler.js");

//* Multer storage configure
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/cars");
  },
  filename: (req, file, cb) => {
    const unique = Date.now();
    cb(null, unique + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// TODO Instance
const app = express();
const port = 3000;

//* View Engine Configure
app.set("view engine", "ejs");
app.use(expressLayouts);

//* Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ? Routes
app.get("/", loadCars);
app.get("/create", viewCreate);
app.get("/update/:id", viewEdit);
app.get("/delete/:id", deleteCar);
app.get("/:size", viewSearch);

app.post("/create", upload.single("up-photo"), createCar);
app.post("/update/:id", upload.single("edited-photo"), updateCar);

// ! Listened port
app.listen(port, () => {
  console.log(`Server listened and running at http://localhost:${port}`);
});
