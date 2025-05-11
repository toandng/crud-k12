const express = require("express");
const todoController = require("../controllers/todos.controller");
const toDoValidators = require("../validators/todo.validator");
const router = express.Router();

router.get("/", todoController.index);
router.get("/:id", todoController.show);
router.post("/", toDoValidators.createTodValidator, todoController.store);
router.put("/:id", toDoValidators.updateTodoValidator, todoController.update);
router.delete("/:id", todoController.destroy);

module.exports = router;
