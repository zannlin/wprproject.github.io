document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBTN = document.querySelector(".hamburger-btn");
  const nav = document.querySelector("header nav");
  const form = document.querySelector("header nav form");
  const ul = document.querySelector("header nav ul");
  const header = document.querySelector("header");

  hamburgerBTN.addEventListener("click", () => {
    hamburgerBTN.classList.toggle("active");

    // Toggle display of the navigation
    nav.style.display = nav.style.display === "block" ? "none" : "block";

    // Move the search form before the ul when menu is opened
    if (hamburgerBTN.classList.contains("active")) {
      header.querySelector("nav").insertBefore(form, ul);
    } else {
      // Move the search form back to its original position
      header.querySelector("nav").appendChild(form);
    }
  });

  function handleResize() {
    if (window.innerWidth >= 768) {
      // Adjust this breakpoint as needed
      nav.style.display = "flex"; // Show nav when viewport is larger than breakpoint
      hamburgerBTN.classList.remove("active"); // Ensure button is not active
      // Move the search form back to its original position
      header.querySelector("nav").appendChild(form);
    } else {
      nav.style.display = "none"; // Hide nav on smaller viewports
    }
  }

  // Create to fix nav becoming block and then needing to go back to flex
  window.addEventListener("resize", function () {
    handleResize();
  });

  const searchBar = document.querySelector('form[role="search"]');
  searchBar.addEventListener("submit", initiateSearch);

  function initiateSearch(event) {
    event.preventDefault(); // Prevent page reload

    const currentPath = window.location.pathname;
    const page = currentPath.substring(currentPath.lastIndexOf("/") + 1);

    const searchInput = document.getElementById("search");
    const searchTerm = searchInput.value.toLowerCase();

    if (page !== "Courses.html") {
      localStorage.setItem("searchedCourse", searchTerm);
      window.location.href = "./Courses.html";
      return;
    }
  }
});
