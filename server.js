require("module-alias/register");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const cors = require("cors");
const router = require("./src/routes/api");
const adminRouter = require("./src/routes/admin");

const notFoudHandler = require("./src/middlewares/notFoundHandler");
const errorHandler = require("./src/middlewares/errorHandler");
const handleSidebar = require("@/middlewares/admin/handleSidebar");

const app = express();

app.use(cors());
app.use(express.json());

// cau hình router đến public
app.use(express.static("public"));

//  view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(expressLayouts);
app.set("layout", "admin/layouts/default");

app.use("/admin", handleSidebar, adminRouter);
app.use("/api/v1", router);

app.use(notFoudHandler);
app.use(errorHandler);

app.listen(3001, () => {
  console.log("App running on port 3001");
});
