document.addEventListener("DOMContentLoaded", function () {
  // Initialize form validation
  initFormValidation("filterForm");

  // Setup filter form
  const filterForm = document.getElementById("filterForm");
  filterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm("filterForm")) {
      // Get filter values
      const name = document.getElementById("filterName").value;
      const role = document.getElementById("filterRole").value;
      const status = document.getElementById("filterStatus").value;

      // Filter users (in a real application, this would likely be an API call)
      console.log("Filtering with:", {
        name,
        role,
        status,
      });

      // Show success message
      showMessage(
        "filterSuccess",
        `Applied filters: Username="${name}", Role="${role}", Status="${status}"`,
        3000
      );
    }
  });

  // Reset filters
  document
    .getElementById("resetFilters")
    .addEventListener("click", function () {
      resetForm("filterForm");
    });

  // Validate alphanumeric input
  document.getElementById("filterName").addEventListener(
    "input",
    debounce(function () {
      const input = this;
      const value = input.value.trim();

      // Only validate if there's a value (the field is not required)
      if (value !== "" && !/^[a-zA-Z0-9\s]+$/.test(value)) {
        document.getElementById("filterNameError").style.display = "block";
        document.getElementById("filterNameError").textContent =
          "Username can only contain letters, numbers, and spaces.";
        input.classList.add("error");
      } else {
        document.getElementById("filterNameError").style.display = "none";
        input.classList.remove("error");
      }
    }, 300)
  );

  // Setup pagination
  const paginationLinks = document.querySelectorAll(".pagination li a");
  paginationLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      paginationLinks.forEach((l) =>
        l.parentElement.classList.remove("active")
      );

      // Add active class to clicked link
      this.parentElement.classList.add("active");

      // Get page number
      const page = this.getAttribute("data-page");

      // Update pagination info
      document.querySelector(".pagination-info").textContent = `Showing ${
        (page - 1) * 10 + 1
      }-${Math.min(page * 10, 42)} of 42 users`;
    });
  });

  // Setup delete confirmation
  const deleteButtons = document.querySelectorAll(".delete-item");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async function (e) {
      e.preventDefault();

      const itemId = this.getAttribute("data-id");
      const itemName = this.getAttribute("data-name");

      // Set item name in modal
      document.getElementById("deleteItemName").textContent = itemName;

      // Show confirmation dialog
      const result = await showConfirmDialog("confirmDeleteModal", {
        title: "Confirm Delete",
        message: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
      });

      if (result) {
        // Delete the user (in a real application, this would likely be an API call)
        console.log(`Deleting user with ID: ${itemId}`);

        // Remove user from table
        const itemRow = document.querySelector(`tr[data-id="${itemId}"]`);
        if (itemRow) {
          itemRow.remove();
        }
      }
    });
  });
});
