const { body } = require("express-validator");
const { readDb } = require("../utils/file.utils");

const RESOURCE = "todo";

const index = async (req, res) => {
  const todos = await readDb(RESOURCE);
  res.status(200).json({ status: "success", data: todos });
};

const show = async (req, res) => {
  const todos = await readDb(RESOURCE);
  const todo = todos.find((item) => item.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Todo not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: todo,
  });
};

const store = async (req, res) => {
  const todos = await readDb(RESOURCE);
  const todoId = (todos[todos.length - 1]?.id ?? 0) + 1;

  const newTodo = {
    id: todoId,
    title: req.body.title,
    body: req.body.body,
  };
  const newTodos = [...products, ...newTodo];
  await writeDb(newTodos);
  res.status(200).json({ status: "success", data: newTodo });
};

const update = async (req, res) => {
  const todos = await readDb(RESOURCE);
  const todoIndex = todos.findIndex(
    (item) => item.id === Number(req.params.id)
  );
  if (todoIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }

  const updateTodo = [...todos[todoIndex], res.body];

  const updateTodos = [
    ...todos.slice(0, todoIndex),
    updateTodo,
    ...todos.slice(todoIndex + 1),
  ];
  await writeDb(RESOURCE, updateTodos);
  res.status(200).json({ status: "success", data: todos[updateTodo] });
};

const destroy = async (req, res) => {
  const todos = await readDb(RESOURCE);
  const todoId = Number(req.params.id);

  const updateTodo = todos.filter((item) => item.id !== todoId);

  if (updateTodo.length === todos.length) {
    return res.status(404).json({
      status: "error",
      message: "Category not found",
    });
  }

  await writeResource(updateTodo);

  res.status(204).send();
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
