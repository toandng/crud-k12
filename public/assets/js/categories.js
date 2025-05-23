document.addEventListener("DOMContentLoaded", function () {
  // Initialize form validation
  initFormValidation("categoryForm");

  // Add Category button
  document
    .getElementById("addCategoryBtn")
    .addEventListener("click", function () {
      openCategoryModal();
    });

  // Handle auto slug generation
  document.getElementById("categoryName").addEventListener("blur", function () {
    const slugInput = document.getElementById("categorySlug");
    // Only auto-generate if slug is empty
    if (!slugInput.value.trim()) {
      // Convert name to slug
      const slug = this.value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "") // Remove special chars
        .replace(/\s+/g, "-"); // Replace spaces with hyphens

      slugInput.value = slug;
    }
  });

  // Icon selection in form
  const iconItems = document.querySelectorAll(".icon-selector .icon-item");
  iconItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all icons
      iconItems.forEach((i) => i.classList.remove("active"));

      // Add active class to clicked icon
      this.classList.add("active");

      // Update the icon input value
      const iconName = this.getAttribute("data-icon");
      document.getElementById("categoryIcon").value = iconName;

      // Update the selected icon preview
      const iconClass = `fas ${iconName}`;
      document.getElementById(
        "selectedIcon"
      ).innerHTML = `<i class="${iconClass}"></i>`;
    });
  });

  // Edit Category
  const editButtons = document.querySelectorAll(".edit-category");
  editButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const categoryId = this.getAttribute("data-id");
      editCategory(categoryId);
    });
  });

  // Delete Category
  const deleteButtons = document.querySelectorAll(".delete-category");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      const categoryId = this.getAttribute("data-id");
      const categoryName = this.getAttribute("data-name");

      // Show confirmation dialog
      document.getElementById("deleteCategoryName").textContent = categoryName;

      const result = await showConfirmDialog("confirmDeleteModal");

      if (result) {
        // In a real app, this would be an API call
        console.log(`Deleting category with ID: ${categoryId}`);

        // Remove the category from the table
        const row = document.querySelector(`tr[data-id="${categoryId}"]`);
        if (row) {
          row.remove();
        }

        // Show success message
        showMessage(
          "categoryDeleted",
          `Category "${categoryName}" has been deleted.`,
          3000
        );
      }
    });
  });

  // Save Category
  document
    .getElementById("saveCategory")
    .addEventListener("click", function () {
      const form = document.getElementById("categoryForm");

      if (validateForm("categoryForm")) {
        const categoryId = document.getElementById("categoryId").value;
        const categoryName = document.getElementById("categoryName").value;
        const categorySlug = document.getElementById("categorySlug").value;
        const categoryDescription = document.getElementById(
          "categoryDescription"
        ).value;
        const categoryIcon = document.getElementById("categoryIcon").value;

        // In a real app, this would be an API call
        console.log("Saving category:", {
          id: categoryId || "new",
          name: categoryName,
          slug: categorySlug,
          description: categoryDescription,
          icon: categoryIcon,
        });

        // Close the modal
        closeModal("categoryModal");

        // Show success message
        if (categoryId) {
          showMessage(
            "categoryUpdated",
            `Category "${categoryName}" has been updated.`,
            3000
          );

          // Update the row in the table
          updateCategoryRow(
            categoryId,
            categoryName,
            categorySlug,
            categoryDescription,
            categoryIcon
          );
        } else {
          showMessage(
            "categoryCreated",
            `Category "${categoryName}" has been created.`,
            3000
          );

          // Add a new row to the table with a random ID
          const newId = Math.floor(Math.random() * 1000) + 10;
          addCategoryRow(
            newId,
            categoryName,
            categorySlug,
            categoryDescription,
            categoryIcon
          );
        }
      }
    });

  // Cancel Category
  document
    .getElementById("cancelCategory")
    .addEventListener("click", function () {
      closeModal("categoryModal");
    });

  // Function to open the category modal
  function openCategoryModal(category = null) {
    const form = document.getElementById("categoryForm");
    const modalTitle = document.getElementById("modalTitle");

    // Reset form
    form.reset();
    document.getElementById("categoryId").value = "";

    // Reset icon selector
    document
      .querySelectorAll(".icon-selector .icon-item")
      .forEach((i) => i.classList.remove("active"));
    document
      .querySelector(`.icon-selector .icon-item[data-icon="fa-laptop"]`)
      .classList.add("active");
    document.getElementById("categoryIcon").value = "fa-laptop";
    document.getElementById("selectedIcon").innerHTML =
      '<i class="fas fa-laptop"></i>';

    if (category) {
      // Edit mode
      modalTitle.textContent = "Edit Category";

      // Set form values based on the category
      document.getElementById("categoryId").value = category.id;
      document.getElementById("categoryName").value = category.name;
      document.getElementById("categorySlug").value = category.slug;
      document.getElementById("categoryDescription").value =
        category.description;
      document.getElementById("categoryIcon").value = category.icon;

      // Update selected icon
      document
        .querySelectorAll(".icon-selector .icon-item")
        .forEach((i) => i.classList.remove("active"));
      const iconItem = document.querySelector(
        `.icon-selector .icon-item[data-icon="${category.icon}"]`
      );
      if (iconItem) {
        iconItem.classList.add("active");
      }

      document.getElementById(
        "selectedIcon"
      ).innerHTML = `<i class="fas ${category.icon}"></i>`;
    } else {
      // Add mode
      modalTitle.textContent = "Add New Category";
    }

    // Show modal
    const modal = document.getElementById("categoryModal");
    modal.classList.add("show");
  }

  // Function to close the modal
  function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("show");
  }

  // Function to edit a category
  function editCategory(categoryId) {
    // In a real app, this would be an API call to get category details
    // For now, we'll just get the data from the table
    const row = document.querySelector(`tr[data-id="${categoryId}"]`);
    if (row) {
      const name = row.querySelector(".category-name").textContent.trim();
      const slug = row.querySelector("td:nth-child(2)").textContent;
      const description = row.querySelector("td:nth-child(3)").textContent;

      // Extract icon class
      const iconElement = row.querySelector(".category-icon");
      const iconClasses = iconElement.className.split(" ");
      const iconClass = iconClasses.find((cls) => cls.startsWith("fa-"));

      const category = {
        id: categoryId,
        name: name,
        slug: slug,
        description: description,
        icon: iconClass,
      };

      openCategoryModal(category);
    }
  }

  // Function to add a new category row to the table
  function addCategoryRow(id, name, slug, description, icon) {
    const tbody = document.querySelector(".data-table tbody");
    const newRow = document.createElement("tr");
    newRow.setAttribute("data-id", id);

    newRow.innerHTML = `
                <td>
                    <div class="category-name">
                        <i class="fas ${icon} category-icon"></i>
                        ${name}
                    </div>
                </td>
                <td>${slug}</td>
                <td>${description}</td>
                <td><span class="badge badge-primary">0</span></td>
                <td>
                    <div class="action-buttons">
                        <a href="#" class="action-btn edit edit-category" data-id="${id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" class="action-btn delete delete-category" data-id="${id}" data-name="${name}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </a>
                    </div>
                </td>
            `;

    tbody.appendChild(newRow);

    // Add event listeners to new buttons
    const editButton = newRow.querySelector(".edit-category");
    editButton.addEventListener("click", function (e) {
      e.preventDefault();
      editCategory(id);
    });

    const deleteButton = newRow.querySelector(".delete-category");
    deleteButton.addEventListener("click", async function (e) {
      e.preventDefault();

      // Show confirmation dialog
      document.getElementById("deleteCategoryName").textContent = name;

      const result = await showConfirmDialog("confirmDeleteModal");

      if (result) {
        // In a real app, this would be an API call
        console.log(`Deleting category with ID: ${id}`);

        // Remove the category from the table
        newRow.remove();

        // Show success message
        showMessage(
          "categoryDeleted",
          `Category "${name}" has been deleted.`,
          3000
        );
      }
    });
  }

  // Function to update an existing category row
  function updateCategoryRow(id, name, slug, description, icon) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) {
      row.innerHTML = `
                    <td>
                        <div class="category-name">
                            <i class="fas ${icon} category-icon"></i>
                            ${name}
                        </div>
                    </td>
                    <td>${slug}</td>
                    <td>${description}</td>
                    <td>${row.querySelector("td:nth-child(4)").innerHTML}</td>
                    <td>
                        <div class="action-buttons">
                            <a href="#" class="action-btn edit edit-category" data-id="${id}" title="Edit">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href="#" class="action-btn delete delete-category" data-id="${id}" data-name="${name}" title="Delete">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                    </td>
                `;

      // Add event listeners to updated buttons
      const editButton = row.querySelector(".edit-category");
      editButton.addEventListener("click", function (e) {
        e.preventDefault();
        editCategory(id);
      });

      const deleteButton = row.querySelector(".delete-category");
      deleteButton.addEventListener("click", async function (e) {
        e.preventDefault();

        // Show confirmation dialog
        document.getElementById("deleteCategoryName").textContent = name;

        const result = await showConfirmDialog("confirmDeleteModal");

        if (result) {
          // In a real app, this would be an API call
          console.log(`Deleting category with ID: ${id}`);

          // Remove the category from the table
          row.remove();

          // Show success message
          showMessage(
            "categoryDeleted",
            `Category "${name}" has been deleted.`,
            3000
          );
        }
      });
    }
  }

  // Local version of showConfirmDialog for this page
  async function showConfirmDialog(modalId) {
    return new Promise((resolve) => {
      const modal = document.getElementById(modalId);
      const confirmBtn = modal.querySelector("[data-confirm]");
      const cancelBtn = modal.querySelector("[data-cancel]");

      function onConfirm() {
        cleanup();
        resolve(true);
      }

      function onCancel() {
        cleanup();
        resolve(false);
      }

      function cleanup() {
        modal.classList.remove("show");
        confirmBtn.removeEventListener("click", onConfirm);
        cancelBtn.removeEventListener("click", onCancel);
      }

      confirmBtn.addEventListener("click", onConfirm);
      cancelBtn.addEventListener("click", onCancel);

      modal.classList.add("show");
    });
  }
});
