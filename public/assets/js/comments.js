document.addEventListener("DOMContentLoaded", function () {
  // Initialize form validation
  initFormValidation("filterForm");

  // Setup filter form
  const filterForm = document.getElementById("filterForm");
  filterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm("filterForm")) {
      // Get filter values
      const text = document.getElementById("filterText").value;
      const post = document.getElementById("filterPost").value;
      const status = document.getElementById("filterStatus").value;

      // Filter comments (in a real application, this would likely be an API call)
      console.log("Filtering with:", {
        text,
        post,
        status,
      });

      // Show success message
      showMessage(
        "filterSuccess",
        `Applied filters: Text="${text}", Post="${post}", Status="${status}"`,
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
      }-${Math.min(page * 10, 24)} of 24 comments`;
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
        // Delete the comment (in a real application, this would likely be an API call)
        console.log(`Deleting comment with ID: ${itemId}`);

        // Remove comment from table
        const itemRow = document.querySelector(`tr[data-id="${itemId}"]`);
        if (itemRow) {
          itemRow.remove();
        }
      }
    });
  });

  // Setup select all checkbox
  const selectAllCheckbox = document.getElementById("selectAll");
  const commentCheckboxes = document.querySelectorAll(".comment-checkbox");

  selectAllCheckbox.addEventListener("change", function () {
    commentCheckboxes.forEach((checkbox) => {
      checkbox.checked = this.checked;
    });
    updateBulkButtons();
  });

  commentCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateBulkButtons);
  });

  function updateBulkButtons() {
    const checkedCount = document.querySelectorAll(
      ".comment-checkbox:checked"
    ).length;
    const bulkApproveBtn = document.getElementById("bulkApproveBtn");
    const bulkRejectBtn = document.getElementById("bulkRejectBtn");

    bulkApproveBtn.disabled = checkedCount === 0;
    bulkRejectBtn.disabled = checkedCount === 0;
  }

  // Setup bulk action buttons
  document
    .getElementById("bulkApproveBtn")
    .addEventListener("click", function () {
      processSelectedComments("approve");
    });

  document
    .getElementById("bulkRejectBtn")
    .addEventListener("click", function () {
      processSelectedComments("reject");
    });

  function processSelectedComments(action) {
    const selectedCheckboxes = document.querySelectorAll(
      ".comment-checkbox:checked"
    );
    const count = selectedCheckboxes.length;

    if (count === 0) return;

    // Get selected comment IDs
    const commentIds = Array.from(selectedCheckboxes).map((checkbox) => {
      return checkbox.closest("tr").getAttribute("data-id");
    });

    // In a real app, this would be an API call
    console.log(
      `${action === "approve" ? "Approving" : "Rejecting"} comments with IDs:`,
      commentIds
    );

    // Show feedback to user
    showMessage(
      "actionSuccess",
      `${count} comment${count > 1 ? "s" : ""} ${
        action === "approve" ? "approved" : "rejected"
      } successfully`,
      3000
    );

    // Update UI to reflect changes
    selectedCheckboxes.forEach((checkbox) => {
      const row = checkbox.closest("tr");
      const statusCell = row.querySelector("td:nth-child(6) .badge");

      if (action === "approve") {
        statusCell.className = "badge badge-success";
        statusCell.textContent = "Approved";
      } else {
        statusCell.className = "badge badge-danger";
        statusCell.textContent = "Rejected";
      }

      // Uncheck the checkbox
      checkbox.checked = false;
    });

    // Uncheck "select all" checkbox
    document.getElementById("selectAll").checked = false;
    updateBulkButtons();
  }

  // Initialize bulk buttons state
  updateBulkButtons();
});
