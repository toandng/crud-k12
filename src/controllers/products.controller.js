const { body } = require("express-validator");
const { readDb, writeDb } = require("../utils/file.utils");
const { success } = require("../utils/response");

const RESOURCE = "product";

// Lấy danh sách sản phẩm
const index = async (req, res) => {
  const products = await readDb(RESOURCE);
  return success(res, 200, products);
};

// Lấy chi tiết một sản phẩm
const show = async (req, res) => {
  const products = await readDb(RESOURCE);
  const product = products.find((item) => item.id === Number(req.params.id));

  if (!product) throwError(404);

  return success(res, 200, products);
};

// Thêm mới sản phẩm
const store = async (req, res) => {
  const products = await readDb(RESOURCE);
  const newId = (products[products.length - 1]?.id ?? 0) + 1;

  const newProduct = {
    id: newId,
    title: req.body.title,
    body: req.body.body,
  };

  const newProducts = [...products, newProduct];
  await writeDb(RESOURCE, newProducts);

  return success(res, 200, products);
};

// Cập nhật sản phẩm
const update = async (req, res) => {
  const products = await readDb(RESOURCE);
  const productIndex = products.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Không tìm thấy sản phẩm",
    });
  }

  const updatedProduct = {
    ...products[productIndex],
    ...req.body,
  };

  const updatedProducts = [
    ...products.slice(0, productIndex),
    updatedProduct,
    ...products.slice(productIndex + 1),
  ];

  await writeDb(RESOURCE, updatedProducts);

  return success(res, 200, products);
};

// Xoá sản phẩm
const destroy = async (req, res) => {
  const products = await readDb(RESOURCE);
  const productId = Number(req.params.id);

  const filteredProducts = products.filter((item) => item.id !== productId);

  if (filteredProducts.length === products.length) {
    return res.status(404).json({
      status: "error",
      message: "Không tìm thấy sản phẩm",
    });
  }

  await writeDb(RESOURCE, filteredProducts);

  res.status(204).send();
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
