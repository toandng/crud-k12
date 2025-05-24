document.addEventListener("DOMContentLoaded", function () {
  const userInfo = document.querySelector(".user-profile");
  const userDropdown = document.getElementById("userDropdown");

  // Toggle dropdown when clicking on user info
  userInfo.addEventListener("click", function (e) {
    e.stopPropagation();
    userDropdown.classList.toggle("show");
    userInfo.classList.toggle("active");
    console.log("hello");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!userInfo.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.remove("show");
      userInfo.classList.remove("active");
    }
  });

  // Prevent dropdown from closing when clicking inside it
  userDropdown.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
