document.addEventListener("DOMContentLoaded", function () {
  // Settings tab navigation
  const tabLinks = document.querySelectorAll(".settings-nav li");
  const tabContents = document.querySelectorAll(".settings-tab");

  tabLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all links and tabs
      tabLinks.forEach((l) => l.classList.remove("active"));
      tabContents.forEach((t) => t.classList.remove("active"));

      // Add active class to selected link and tab
      this.classList.add("active");
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });

  // Handle form submissions
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // In a real app, this would save settings via API
      console.log(`Saving ${this.id} settings...`);

      // Show success message
      showMessage(
        "successMessage",
        "Settings have been saved successfully.",
        3000
      );
    });
  });

  // Color picker value display
  const colorPicker = document.getElementById("themeColor");
  const colorValue = document.querySelector(".color-value");

  colorPicker.addEventListener("input", function () {
    colorValue.textContent = this.value;
  });

  // Test Email button
  document
    .getElementById("testEmailBtn")
    .addEventListener("click", function () {
      showMessage("emailTest", "Test email has been sent successfully.", 3000);
    });

  // Create Backup button
  document
    .getElementById("createBackupBtn")
    .addEventListener("click", function () {
      showMessage("backupStarted", "Creating backup... Please wait.", 3000);

      // Simulate backup creation
      setTimeout(() => {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = "#";
        a.download = `backup-${new Date().toISOString().split("T")[0]}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        showMessage("backupComplete", "Backup created successfully!", 3000);
      }, 2000);
    });

  // Restore Backup button
  document
    .getElementById("restoreBackupBtn")
    .addEventListener("click", function () {
      const fileInput = document.getElementById("backupFile");

      if (!fileInput.files.length) {
        showMessage(
          "backupError",
          "Please select a backup file first.",
          3000,
          "error"
        );
        return;
      }

      // Show confirmation dialog
      if (
        confirm(
          "Warning: Restoring a backup will overwrite all current data. This action cannot be undone. Are you sure you want to proceed?"
        )
      ) {
        showMessage("restoreStarted", "Restoring backup... Please wait.", 3000);

        // Simulate restore process
        setTimeout(() => {
          showMessage("restoreComplete", "Backup restored successfully!", 3000);
        }, 2500);
      }
    });
});
