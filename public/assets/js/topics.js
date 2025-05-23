document.addEventListener("DOMContentLoaded", function () {
  // Initialize form validation
  initFormValidation("topicForm");

  // Add Topic button
  document.getElementById("addTopicBtn").addEventListener("click", function () {
    openTopicModal();
  });

  // Handle auto slug generation
  document.getElementById("topicName").addEventListener("blur", function () {
    const slugInput = document.getElementById("topicSlug");
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
      document.getElementById("topicIcon").value = iconName;

      // Update the selected icon preview
      const iconClass = `fas ${iconName}`;
      document.getElementById(
        "selectedIcon"
      ).innerHTML = `<i class="${iconClass}"></i>`;
    });
  });

  // Edit Topic
  const editButtons = document.querySelectorAll(".edit-topic");
  editButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const topicId = this.getAttribute("data-id");
      editTopic(topicId);
    });
  });

  // Delete Topic
  const deleteButtons = document.querySelectorAll(".delete-topic");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      const topicId = this.getAttribute("data-id");
      const topicName = this.getAttribute("data-name");

      // Show confirmation dialog
      document.getElementById("deleteTopicName").textContent = topicName;

      const result = await showConfirmDialog("confirmDeleteModal");

      if (result) {
        // In a real app, this would be an API call
        console.log(`Deleting topic with ID: ${topicId}`);

        // Remove the topic from the table
        const row = document.querySelector(`tr[data-id="${topicId}"]`);
        if (row) {
          row.remove();
        }

        // Show success message
        showMessage(
          "topicDeleted",
          `Topic "${topicName}" has been deleted.`,
          3000
        );
      }
    });
  });

  // Save Topic
  document.getElementById("saveTopic").addEventListener("click", function () {
    const form = document.getElementById("topicForm");

    if (validateForm("topicForm")) {
      const topicId = document.getElementById("topicId").value;
      const topicName = document.getElementById("topicName").value;
      const topicSlug = document.getElementById("topicSlug").value;
      const topicDescription =
        document.getElementById("topicDescription").value;
      const topicIcon = document.getElementById("topicIcon").value;

      // In a real app, this would be an API call
      console.log("Saving topic:", {
        id: topicId || "new",
        name: topicName,
        slug: topicSlug,
        description: topicDescription,
        icon: topicIcon,
      });

      // Close the modal
      closeModal("topicModal");

      // Show success message
      if (topicId) {
        showMessage(
          "topicUpdated",
          `Topic "${topicName}" has been updated.`,
          3000
        );

        // Update the row in the table
        updateTopicRow(
          topicId,
          topicName,
          topicSlug,
          topicDescription,
          topicIcon
        );
      } else {
        showMessage(
          "topicCreated",
          `Topic "${topicName}" has been created.`,
          3000
        );

        // Add a new row to the table with a random ID
        const newId = Math.floor(Math.random() * 1000) + 10;
        addTopicRow(newId, topicName, topicSlug, topicDescription, topicIcon);
      }
    }
  });

  // Cancel Topic
  document.getElementById("cancelTopic").addEventListener("click", function () {
    closeModal("topicModal");
  });

  // Function to open the topic modal
  function openTopicModal(topic = null) {
    const form = document.getElementById("topicForm");
    const modalTitle = document.getElementById("modalTitle");

    // Reset form
    form.reset();
    document.getElementById("topicId").value = "";

    // Reset icon selector
    document
      .querySelectorAll(".icon-selector .icon-item")
      .forEach((i) => i.classList.remove("active"));
    document
      .querySelector(`.icon-selector .icon-item[data-icon="fa-landmark"]`)
      .classList.add("active");
    document.getElementById("topicIcon").value = "fa-landmark";
    document.getElementById("selectedIcon").innerHTML =
      '<i class="fas fa-landmark"></i>';

    if (topic) {
      // Edit mode
      modalTitle.textContent = "Edit Topic";

      // Set form values based on the topic
      document.getElementById("topicId").value = topic.id;
      document.getElementById("topicName").value = topic.name;
      document.getElementById("topicSlug").value = topic.slug;
      document.getElementById("topicDescription").value = topic.description;
      document.getElementById("topicIcon").value = topic.icon;

      // Update selected icon
      document
        .querySelectorAll(".icon-selector .icon-item")
        .forEach((i) => i.classList.remove("active"));
      const iconItem = document.querySelector(
        `.icon-selector .icon-item[data-icon="${topic.icon}"]`
      );
      if (iconItem) {
        iconItem.classList.add("active");
      }

      document.getElementById(
        "selectedIcon"
      ).innerHTML = `<i class="fas ${topic.icon}"></i>`;
    } else {
      // Add mode
      modalTitle.textContent = "Add New Topic";
    }

    // Show modal
    const modal = document.getElementById("topicModal");
    modal.classList.add("show");
  }

  // Function to close the modal
  function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("show");
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

  // Function to edit a topic
  function editTopic(topicId) {
    // In a real app, this would be an API call to get topic details
    // For now, we'll just get the data from the table
    const row = document.querySelector(`tr[data-id="${topicId}"]`);
    if (row) {
      const name = row.querySelector(".topic-name").textContent.trim();
      const slug = row.querySelector("td:nth-child(2)").textContent;
      const description = row.querySelector("td:nth-child(3)").textContent;

      // Extract icon class
      const iconElement = row.querySelector(".topic-icon");
      const iconClasses = iconElement.className.split(" ");
      const iconClass = iconClasses.find((cls) => cls.startsWith("fa-"));

      const topic = {
        id: topicId,
        name: name,
        slug: slug,
        description: description,
        icon: iconClass,
      };

      openTopicModal(topic);
    }
  }

  // Function to add a new topic row to the table
  function addTopicRow(id, name, slug, description, icon) {
    const tbody = document.querySelector(".data-table tbody");
    const newRow = document.createElement("tr");
    newRow.setAttribute("data-id", id);

    newRow.innerHTML = `
                <td>
                    <div class="topic-name">
                        <i class="fas ${icon} topic-icon"></i>
                        ${name}
                    </div>
                </td>
                <td>${slug}</td>
                <td>${description}</td>
                <td><span class="badge badge-primary">0</span></td>
                <td>
                    <div class="action-buttons">
                        <a href="#" class="action-btn edit edit-topic" data-id="${id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" class="action-btn delete delete-topic" data-id="${id}" data-name="${name}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </a>
                    </div>
                </td>
            `;

    tbody.appendChild(newRow);

    // Add event listeners to new buttons
    const editButton = newRow.querySelector(".edit-topic");
    editButton.addEventListener("click", function (e) {
      e.preventDefault();
      editTopic(id);
    });

    const deleteButton = newRow.querySelector(".delete-topic");
    deleteButton.addEventListener("click", async function (e) {
      e.preventDefault();

      // Show confirmation dialog
      document.getElementById("deleteTopicName").textContent = name;

      const result = await showConfirmDialog("confirmDeleteModal");

      if (result) {
        // In a real app, this would be an API call
        console.log(`Deleting topic with ID: ${id}`);

        // Remove the topic from the table
        newRow.remove();

        // Show success message
        showMessage("topicDeleted", `Topic "${name}" has been deleted.`, 3000);
      }
    });
  }

  // Function to update an existing topic row
  function updateTopicRow(id, name, slug, description, icon) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) {
      row.innerHTML = `
                    <td>
                        <div class="topic-name">
                            <i class="fas ${icon} topic-icon"></i>
                            ${name}
                        </div>
                    </td>
                    <td>${slug}</td>
                    <td>${description}</td>
                    <td>${row.querySelector("td:nth-child(4)").innerHTML}</td>
                    <td>
                        <div class="action-buttons">
                            <a href="#" class="action-btn edit edit-topic" data-id="${id}" title="Edit">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href="#" class="action-btn delete delete-topic" data-id="${id}" data-name="${name}" title="Delete">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                    </td>
                `;

      // Add event listeners to updated buttons
      const editButton = row.querySelector(".edit-topic");
      editButton.addEventListener("click", function (e) {
        e.preventDefault();
        editTopic(id);
      });

      const deleteButton = row.querySelector(".delete-topic");
      deleteButton.addEventListener("click", async function (e) {
        e.preventDefault();

        // Show confirmation dialog
        document.getElementById("deleteTopicName").textContent = name;

        const result = await showConfirmDialog("confirmDeleteModal");

        if (result) {
          // In a real app, this would be an API call
          console.log(`Deleting topic with ID: ${id}`);

          // Remove the topic from the table
          row.remove();

          // Show success message
          showMessage(
            "topicDeleted",
            `Topic "${name}" has been deleted.`,
            3000
          );
        }
      });
    }
  }
});
