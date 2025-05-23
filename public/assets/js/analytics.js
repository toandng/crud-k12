document.addEventListener("DOMContentLoaded", function () {
  // Initialize charts
  initializeCharts();

  // Setup date range filter
  const dateRangeSelect = document.getElementById("dateRange");
  const customDateContainer = document.getElementById("customDateContainer");
  const customDateEndContainer = document.getElementById(
    "customDateEndContainer"
  );

  dateRangeSelect.addEventListener("change", function () {
    if (this.value === "custom") {
      customDateContainer.style.display = "block";
      customDateEndContainer.style.display = "block";
    } else {
      customDateContainer.style.display = "none";
      customDateEndContainer.style.display = "none";
    }
  });

  // Apply button click
  document
    .getElementById("applyDateFilter")
    .addEventListener("click", function () {
      // Here you would update the data based on the selected date range
      showMessage(
        "dateFilterApplied",
        "Date filter applied. Data updated.",
        3000
      );

      // Reinitialize charts with new data
      initializeCharts();
    });

  // Export button click
  document.getElementById("exportBtn").addEventListener("click", function () {
    showMessage(
      "exportStarted",
      "Export started. Your report will be downloaded shortly.",
      3000
    );
    // In a real app, this would trigger a download
    setTimeout(() => {
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = "#";
      a.download = "analytics-report.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1500);
  });

  // Refresh button click
  document.getElementById("refreshBtn").addEventListener("click", function () {
    showMessage("refreshing", "Refreshing data...", 1500);
    setTimeout(() => {
      initializeCharts();
      showMessage("refreshComplete", "Data refreshed successfully!", 3000);
    }, 1500);
  });
});

function initializeCharts() {
  // Traffic Overview Chart
  const trafficCtx = document.getElementById("trafficChart").getContext("2d");
  new Chart(trafficCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "This Week",
          data: [3250, 3800, 4200, 3950, 4100, 3700, 3900],
          borderColor: "#3a86ff",
          backgroundColor: "rgba(58, 134, 255, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Previous Week",
          data: [2800, 3300, 3600, 3550, 3300, 3400, 3200],
          borderColor: "#8ecaff",
          backgroundColor: "rgba(142, 202, 255, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
    },
  });

  // Traffic Sources Chart
  const sourcesCtx = document.getElementById("sourcesChart").getContext("2d");
  new Chart(sourcesCtx, {
    type: "doughnut",
    data: {
      labels: ["Direct", "Search", "Social", "Referral", "Email"],
      datasets: [
        {
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            "#3a86ff",
            "#ff006e",
            "#8338ec",
            "#fb5607",
            "#ffbe0b",
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
      },
      cutout: "65%",
    },
  });

  // User Devices Chart
  const devicesCtx = document.getElementById("devicesChart").getContext("2d");
  new Chart(devicesCtx, {
    type: "bar",
    data: {
      labels: ["Desktop", "Mobile", "Tablet"],
      datasets: [
        {
          label: "Users by Device",
          data: [45, 40, 15],
          backgroundColor: ["#3a86ff", "#ff006e", "#8338ec"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
    },
  });

  // Page Performance Chart
  const performanceCtx = document
    .getElementById("performanceChart")
    .getContext("2d");
  new Chart(performanceCtx, {
    type: "radar",
    data: {
      labels: [
        "Load Time",
        "Interactivity",
        "Accessibility",
        "SEO",
        "Best Practices",
      ],
      datasets: [
        {
          label: "Current",
          data: [85, 78, 92, 88, 95],
          backgroundColor: "rgba(58, 134, 255, 0.2)",
          borderColor: "#3a86ff",
          pointBackgroundColor: "#3a86ff",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#3a86ff",
        },
        {
          label: "Previous",
          data: [75, 65, 85, 80, 90],
          backgroundColor: "rgba(255, 0, 110, 0.2)",
          borderColor: "#ff006e",
          pointBackgroundColor: "#ff006e",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#ff006e",
        },
      ],
    },
    options: {
      responsive: true,
      elements: {
        line: {
          borderWidth: 2,
        },
      },
      scales: {
        r: {
          angleLines: {
            display: true,
          },
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    },
  });
}
