document.addEventListener("DOMContentLoaded", function () {
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
    })
    .then((data) => {
      //handles the promise returned by response.json
      if (Array.isArray(data)) {
        // Checks if data is an array
        courses = data;
        displayCourses(courses); // Sets courses array to the data
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
                  <p class="discription">${course.short_discription}</p>
                  <span class="priceDuration">
                    <p class="price ">Price</p>
                    <p class="duration ">Duration</p>
                    <p class="price">R${course.course_cost_peryear} /year</p>
                    <p class="duration ">${course.course_duration}</p>
                  </span>
                  <button id="${course.course_code}" class="readm">Read More</button>
                </div>
            `;
      courseList.appendChild(courseblock); //Moves each new div to the bottom
    });
    trackbutton();
  }

  //selected course
  let SelectedCourse;
  function trackbutton() {
    let numRMButtons = document.querySelectorAll(".card button").length; //counts all the buttons within the card class
    for (let i = 0; i < numRMButtons; i++) {
      document
        .querySelectorAll(".readm")
        [i].addEventListener("click", function () {
          //adds an eventlistener to each of these buttons.
          let clicked = this.id; //gets the id of the button pressed
          SelectedCourse = clicked;
          handleCourseCicked(SelectedCourse, courses);
        });
    }
  }

  function handleCourseCicked(clicked, courses) {
    removeAndAdd();
    let courseList = document.getElementById("courses");
    courses.forEach((course) => {
      if (course.course_code == clicked) {
        const courseblock = document.createElement("div");
        courseblock.classList.add("card");
        courseblock.innerHTML = `   
                <img src="Images/${course.title}.webp">
                <div class="card-body">
                  <h3 class="card-title">${course.title}</h3>
                  <p class="discription">${course.short_discription}</p>
                  <span class="priceDuration">
                    <p class="price ">Price</p>
                    <p class="duration ">Duration</p>
                    <p class="price">R${course.course_cost_peryear} /year</p>
                    <p class="duration">${course.course_duration}</p>
                  </span>
                  <button id="${course.course_code}" class="readm">Read More</button>
                </div>
            `;
        courseList.appendChild(courseblock);

        document.querySelector("#index-title-section h2").textContent = `${course.title}`;
        document.getElementById("index-title-section").style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('Images/${course.title}.webp') no-repeat scroll center`;
        document.getElementById("index-title-section").style.backgroundSize = 'cover';
      }
    });
  }

  function removeAndAdd() {
    let cards = document.querySelectorAll(".card"); //Selects all cards and adds the invisible class to it
    cards.forEach((element) => {
      element.classList.add("invisible");
    });

    //Removing the courses heading and adding the new heading and image
    document.querySelector("#courhead").classList.add("invisible");
    document
      .querySelector("#index-title-section")
      .classList.remove("invisible");

    //Adding the back button
    const newButt = document.createElement("button");
    newButt.classList.add("back");
    document
      .querySelector("#courses")
      .parentNode.insertBefore(newButt, document.querySelector("#courses"));
    newButt.textContent = "< Back";
  }
});

//dropdown
function toggleDropdown(dropdownId) {
  let DropDown = document.getElementById(dropdownId);
  if (DropDown.classList.contains("show")) {
    DropDown.classList.remove("show");
  } else {
    DropDown.classList.add("show");
  }
}
