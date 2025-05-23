const { readDb, writeDb } = require("../../utils/file.utils");

const RESOURCE = "category";

const index = async (req, res) => {
  const categories = await readDb(RESOURCE);
  res.status(200).json({
    status: "success",
    data: categories,
  });
};

const show = async (req, res) => {
  const categories = await readDb(RESOURCE);
  const category = categories.find((prod) => prod.id === Number(req.params.id));

  if (!category) {
    return res.status(404).json({
      status: "error",
      message: "No comments found for this category.",
    });
  }
  res.status(200).json({
    status: "success",
    data: category,
  });
};

const store = async (req, res) => {
  const categories = await readDb(RESOURCE);
  const newId = (categories[categories.length - 1]?.id ?? 0) + 1;

  const newCategory = {
    id: newId,
    title: req.body.title,
    body: req.body.body,
  };

  const newCategories = [...categories, ...newCategory];
  await writeDb(newCategories);
  res.status(200).json({ status: "success", data: newCategory });
};

const update = async (req, res) => {
  const categories = await readDb(RESOURCE);
  const categoryIndex = categories.findIndex(
    (prod) => prod.id === Number(req.params.id)
  );
  if (categoryIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }

  const updatedCategory = [...categories[categoryIndex], res.body];

  const updatedCategories = [
    ...categories.slice(0, categoryIndex),
    updatedCategory,
    ...categories.slice(categoryIndex + 1),
  ];
  await writeDb(RESOURCE, updatedCategories);
  res
    .status(200)
    .json({ status: "success", data: categories[updatedCategory] });
};

const destroy = async (req, res) => {
  const categories = await readDb(RESOURCE);
  const categoryId = Number(req.params.id);

  const updatedCategories = categories.filter((prod) => prod.id !== categoryId);

  if (updatedCategories.length === categories.length) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }

  await writeResource(updatedCategories);

  res.status(204).send();
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
