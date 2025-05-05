const { body } = require("express-validator");
const { readDb } = require("../utils/file.utils");

const RESOURCE = "product";

const index = async (req, res) => {
  const products = await readDb(RESOURCE);
  res.status(200).json({ status: "success", data: products });
};

const show = async (req, res) => {
  const products = await readDb(RESOURCE);
  const product = products.find((item) => item.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: product,
  });
};

const store = async (req, res) => {
  const products = await readDb(RESOURCE);
  const newId = (products[products.length - 1]?.id ?? 0) + 1;

  const newProduct = {
    id: newId,
    title: req.body.title,
    body: req.body.body,
  };
  const newProducts = [...products, ...newProduct];
  await writeDb(newProducts);
  res.status(200).json({ status: "success", data: newProduct });
};

const update = async (req, res) => {
  const products = await readDb(RESOURCE);
  const productIndex = products.findIndex(
    (item) => item.id === Number(req.params.id)
  );
  if (productIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }

  const updateProduct = [...products[productIndex], res.body];

  const updateProducts = [
    ...products.slice(0, productIndex),
    updateProduct,
    ...products.slice(productIndex + 1),
  ];
  await writeDb(RESOURCE, updateProducts);
  res.status(200).json({ status: "success", data: products[updateProduct] });
};

const destroy = async (req, res) => {
  const products = await readDb(RESOURCE);
  const productId = Number(req.params.id);

  const updateProduct = products.filter((item) => item.id !== productId);

  if (updateProduct.length === products.length) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }

  await writeResource(updateProduct);

  res.status(204).send();
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
