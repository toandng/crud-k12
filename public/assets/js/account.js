document.addEventListener("DOMContentLoaded", function () {
  // Initialize form validation
  initFormValidation("personalInfoForm");
  initFormValidation("passwordForm");
  initFormValidation("notificationForm");

  // Personal info form submission
  document
    .getElementById("personalInfoForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      if (validateForm("personalInfoForm")) {
        // Show success message
        showMessage(
          "successMessage",
          "Personal information has been updated successfully.",
          3000
        );
      }
    });

  // Password form submission
  document
    .getElementById("passwordForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      if (validateForm("passwordForm")) {
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword =
          document.getElementById("confirmPassword").value;

        if (newPassword !== confirmPassword) {
          showError(
            document.getElementById("confirmPassword"),
            "Passwords do not match."
          );
          return;
        }

        // Show success message
        showMessage(
          "successMessage",
          "Password has been changed successfully.",
          3000
        );

        // Clear password fields
        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";
      }
    });

  // Notification preferences form submission
  document
    .getElementById("notificationForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Show success message
      showMessage(
        "successMessage",
        "Notification preferences have been saved successfully.",
        3000
      );
    });

  // Handle 2FA button
  document
    .getElementById("enableTfaBtn")
    .addEventListener("click", function () {
      alert(
        "This feature is not implemented in this demo. In a real application, this would start the two-factor authentication setup process."
      );
    });

  // Handle avatar upload
  document
    .getElementById("avatarUpload")
    .addEventListener("change", function (event) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          // In a real app, this would upload the image to a server
          // For the demo, we'll just show a success message
          showMessage(
            "successMessage",
            "Avatar has been uploaded successfully.",
            3000
          );
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    });
});
