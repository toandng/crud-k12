const express = require("express");
const todoController = require("../controllers/todos.controller");
const {
  createTodoValidator,
  updateTodoValidator,
} = require("../validators/todo.validator");

const router = express.Router();

router.get("/", todoController.index);
router.get("/:id", todoController.show);
router.post("/", createTodoValidator, todoController.store);
router.put("/:id", updateTodoValidator, todoController.update);
router.delete("/:id", todoController.destroy);

module.exports = router;
