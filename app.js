
const express = require("express");
const multer = require("multer");
const expressLayouts = require("express-ejs-layouts");

const {
  loadMobil,
  editSection,
  createSection,
  viewSearch,
  buatMobil,
  updateMobil,
  hapusMobil,
} = require("./controller/handler.js");


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

const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", loadMobil);
app.get("/create", createSection);
app.get("/update/:id", editSection);
app.get("/delete/:id", hapusMobil);
app.get("/:size", viewSearch);

app.post("/create", upload.single("up-photo"), buatMobil);
app.post("/update/:id", upload.single("edited-photo"), updateMobil);


app.listen(port, () => {
  console.log(`Server listened and running at http://localhost:${port}`);
});
