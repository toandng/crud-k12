require("module-alias/register");
const express = require("express");
const cors = require("cors");
const router = require("./src/routes");
const notFoudHandler = require("./src/middlewares/notFoundHandler");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.use(notFoudHandler);
app.use(errorHandler);

app.listen(3001, () => {
  console.log("App running on port 3001");
});
