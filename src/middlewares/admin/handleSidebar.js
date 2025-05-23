const sidebarItems = [
  {
    title: "Dashboard",
    icon: "fa  fa-home",
    path: "",
  },
  {
    title: "Categories",
    icon: "fa fa-tags",
    path: "/categories",
  },
  {
    title: "Products",
    icon: "fa fa-shopping-cart",
    path: "/products",
  },
  {
    title: "Topics",
    icon: "fa fa-file-alt",
    path: "/topics",
  },
  {
    title: "Posts",
    icon: " fa fa-file-alt",
    path: "/posts",
  },
  {
    title: "Comments",
    icon: "fa fa-comments",
    path: "/comments",
  },
  {
    title: "Users",
    icon: "fa fa-user",
    path: "/users",
  },
  {
    title: "Analytics",
    icon: "fa fa-chart-bar",
    path: "/analytics",
  },
  {
    title: "Setting",
    icon: "fa fa-cog",
    path: "/setting",
  },
];
function handleSidebar(req, res, next) {
  res.locals.path = req.path;
  res.locals.sidebarItems = sidebarItems;
  next();
}
module.exports = handleSidebar;
