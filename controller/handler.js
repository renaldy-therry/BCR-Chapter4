const { Cars } = require("../models");

const loadCars = async (req, res) => {
  const search = req.query.s;
  console.log(search);
  if (search) {
    const data = await Cars.findAll({
      where: { name: search },
    });
    if (data.length == 0) {
      return res.render("404", {
        layout: "web-layout/index",
        title: "Not Found",
        data,
        info: "404 | Data Not Found",
      });
    } else {
      return res.render("carlist", {
        layout: "web-layout/index",
        title: "List Car",
        data,
      });
    }
  } else {
    const data = await Cars.findAll({});
    return res.render("carlist", {
      layout: "web-layout/index",
      title: "List Car",
      data,
    });
  }
};

const viewSearch = async (req, res) => {
  const data = await Cars.findAll({
    where: { size: req.params.size },
  });
  return res.render("carlist", {
    layout: "web-layout/index",
    title: "List Car",
    data,
  });
};

const viewCreate = (req, res) => {
  return res.render("createcar", {
    layout: "web-layout/index",
    title: "Create New Car",
    info: undefined,
  });
};

const viewEdit = async (req, res) => {
  const id = req.params.id;
  const data = await Cars.findOne({
    where: { id },
  });
  return res.render("updatecar", {
    layout: "web-layout/index",
    title: "Update Car",
    data,
    info: undefined,
  });
};

const createCar = async (req, res) => {
  const save = Cars.create({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    type: req.body.type,
    image: req.file.filename,
  });
  return res.render("createcar", {
    layout: "web-layout/index",
    title: "Create New Car",
    info: "Create Car Successfully",
  });
};

const updateCar = async (req, res) => {
  const updated = await Cars.update(
    {
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      type: req.body.type,
    },
    {
      where: { id: req.params.id },
    }
  );
  return res.render("updatecar", {
    layout: "web-layout/index",
    title: "Update Car",
    data: updated,
    info: "Update Car Succesfully",
  });
};

const deleteCar = async (req, res) => {
  const data = await Cars.destroy({ where: { id: req.params.id } });
  return res.render("deletecar", {
    layout: "web-layout/index",
    title: "Delete Car",
    info: "Delete Car Succesfully",
  });
};
module.exports = {
  loadCars,
  viewEdit,
  viewCreate,
  viewSearch,
  createCar,
  updateCar,
  deleteCar,
};
