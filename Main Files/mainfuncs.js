document.addEventListener("DOMContentLoaded", function () {
  // Define the handleSubmit function
  function handleSubmit(event) {
    event.preventDefault(); // Prevents page reload or similar behaviour
    console.log("Form submitted");
  }


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
});

let courses = []; //array where the json file's conent will be stored in

fetch(
  "https://raw.githubusercontent.com/zannlin/wprproject.github.io/Adding-Code/Main%20Files/Courses.json"
) //fetch the json file from github
  .then((response) => {
    if (!response.ok) {
      //if the response is not ok it throws a new error
      throw new Error("Networkk respons was not ok " + response.statusText);
    }
    return response.json(); //else it responses with the json file
  }) //handles the promise returned by fetch
  .then((data) => {
    //handles the promise returned by response.json
    if (Array.isArray(data)) {
      // Checks if data is an array
      courses = data;
    } else {
      throw new Error("Fetched data is not an array"); // if not an array throw new error
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error); //catches error and displays it in the console
  });

function displayCourses(courses) {
  let courseList = document.getElementById("courses"); //courselist is set to a div with courses as an id
  courses.forEach((course) => {
    const courseblock = document.createElement("div");
    courseblock.classList.add("card"); //creates a div for each course
    //Below is where you would insert the html code of the course while using the json file for the course details
    //Ads content inside the div
    courseblock.innerHTML = `   
            <img src="Images/${course.title}.webp">
            <div class="card-body">
              <h3 class="card-title">${course.title}</h3>
              <p class="discription">${course.lecturers}</p>
              <span class="priceDuration">
                <p class="price ">Price</p>
                <p class="duration ">Duration</p>
                <p class="price">${course.course_code}</p>
                <p class="duration ">${course.course_code}</p>
              </span>
              <button id="${course.course_code}" class="readm">Read More</button>
            </div>
        `;
    courseList.appendChild(courseblock); //Moves each new div to the bottom
  });
}


