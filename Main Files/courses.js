document.addEventListener("DOMContentLoaded", function () {
  resetheading();
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
    let courseInfoblock = document.getElementById("courseDetail");
    courses.forEach((course) => {
      if (course.course_code == clicked) {
        
        let lecturers = course.lecturers;
        let modules = course.modules;
        let venues = course.venues;

        let lecRow1 = "";
        lecturers.forEach(lecturer =>{
          lecRow1 = `${lecRow1} <td>${lecturer}</td>`
        });

        let lecRow2 = "";
        lecturers.forEach(lecturer =>{
          lecRow2 = `${lecRow2} <td><img src="Images/${lecturer}.jpg" class="profilePhoto"></td>`
        });

        let modhtml = "";
        modules.forEach(module =>{
          modhtml = `${modhtml} <tr><td>${module}</td></tr>`
        });

        let venhtml ="";
        venues.forEach(venue =>{
          venhtml = `${venhtml} <tr><td>${venue}</td></tr>`
        })




        courseInfoblock.innerHTML = ` 
                <h3>About the course</h3>
                <p class="desctiption">${course.full_description}</p>
                <h3>Lecturers</h3>
                <table>
                <tr>${lecRow1}</tr>
                <tr>${lecRow2}</tr>
                </table>
                <span class="Modue">
                <h3>Modules</h3>
                <table>${modhtml}</table>
                <h3>Venues</h3>
                <table>${venhtml}</table>
                </span>
            `;

        //Heading image and text
        document.querySelector("#index-title-section h2").textContent = `${course.title}`;
        document.getElementById("index-title-section").style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('Images/${course.title}.webp') no-repeat scroll center`;
        document.getElementById("index-title-section").style.backgroundSize =
          "cover";
      }
    });
  }

  function resetheading() {
    //adding the heading's img and text
    document.getElementById(
      "index-title-section"
    ).style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url('Images/home_header.jpg') no-repeat scroll center`;
    document.getElementById("index-title-section").style.backgroundSize =
      "cover";
    document.querySelector("#index-title-section h2").textContent = "Courses";
  }

  //Removes cards Adds button and section
  function removeAndAdd() {
    //removes cards
    let cards = document.querySelectorAll(".card"); //Selects all cards and adds the invisible class to it
    cards.forEach((element) => {
      element.classList.add("invisible");
    });

    //Adds the back button
    const newButt = document.createElement("button");
    newButt.classList.add("back");
    document.querySelector("#courses").parentNode.insertBefore(newButt, document.querySelector("#courses"));
    newButt.textContent = "Back";
    document.querySelector("#courseDetail").classList.remove("invisible");
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
