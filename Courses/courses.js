document.addEventListener("DOMContentLoaded", function () {
  resetheading();
  let courses = []; //array where the json file's conent will be stored in
  let completedCourses = []; //All the courrses the user has completed
  let filteredCourse = [];

  fetch(
    "https://raw.githubusercontent.com/zannlin/wprproject.github.io/Adding-Code/Courses/Courses.json"
  ) //fetch the json file from github
    .then((response) => {
      if (!response.ok) {
        //if the response is not ok it throws a new error
        throw new Error("Network respons was not ok " + response.statusText);
      }
      return response.json(); //else it responses with the json file
    })
    .then((data) => {
      //handles the promise returned by response.json
      if (data && Array.isArray(data.courses)) {
        // Checks if data is an array
        courses = data.courses;
        displayOrSearch(courses);
        // Sets courses array to the data
      } else {
        throw new Error("Fetched data is not an array"); // if not an array throw new error
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error); //catches error and displays it in the console
    });

  function displayOrSearch() {
    if (localStorage.searchedCourse) {
      searchedCourse(courses);
    } else {
      displayCourses(courses);
    }
  }

  function displayCourses(courses) {
    let courseList = document.getElementById("courses"); //courselist is set to a div with courses as an id

    courses.forEach((course) => {
      const courseblock = document.createElement("div");
      courseblock.classList.add("card"); //creates a div for each course
      //Below is where you would insert the html code of the course while using the json file for the course details
      //Ads content inside the div
      courseblock.innerHTML = `   
                <img src="../Images/${course.title}.webp">
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
    courseList.classList.remove("invisible");
    trackbutton();
  }

  function searchedCourse(courses) {
    let searchTerm = localStorage.getItem("searchedCourse");
    filteredCourse = courses.filter(
      (course) => course.title.toLowerCase() === searchTerm
    ); //filters the courses array to find a matching course

    if (filteredCourse.length > 0) {
      displayCourses(filteredCourse);
    } else {
      alert("Course not found");
      displayCourses(courses);
    }

    // Clear the search term from localStorage
    localStorage.removeItem("searchedCourse");
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

  let EorCButton; //Enrolled or Complete button

  //Handles the Read more button on each card
  function handleCourseCicked(clicked, courses) {
    removeAndAdd();
    let parentBlock = document.getElementById("Detail"); //The container in which we will add code into
    const courseInfoblock = document.createElement("div");
    courseInfoblock.classList.add("courseDetail");

    let enrolledCourse = localStorage.getItem("Applied");
    let enrolledArr = [];
    if (enrolledCourse !== null) {
      enrolledArr = enrolledCourse.split(",");
    }

    courses.forEach((course) => {
      if (course.course_code == clicked) {
        //declaring variables to store html in
        let lecturers = course.lecturers;
        let modules = course.modules;
        let venues = course.venues;

        let lecRow1 = "";
        lecturers.forEach((lecturer) => {
          lecRow1 = `${lecRow1} <td>${lecturer}</td>`; //used to split the lecturer name and profile pic
        });

        let lecRow2 = "";
        lecturers.forEach((lecturer) => {
          lecRow2 = `${lecRow2} <td><img src="../Images/${lecturer}.jpg" class="profilePhoto"></td>`;
        });

        let eOrC = ""; //Enrolled or Complete
        let modhtml = ""; //modules

        //determines if the button in the harding card is an enroll card or complete course card

        if (enrolledArr.includes(course.title)) {
          //If selected array from local storage includes the course title
          eOrC = "Complete";
          EorCButton = document.createElement("button");
          EorCButton.id = course.title;
          EorCButton.innerText = eOrC;

          //creates a table to display all the modules with checkboxes to mark as complete
          modules.forEach((module) => {
            modhtml = `${modhtml} <tr><td><div class="mod"><input type="checkbox" name="${module}" class="${course.title}"><label for="${module}" class="checklable">${module}</lable></div></td></tr>`;
          });
        }
        //the button in the heading card is enroll
        else {
          eOrC = "Enroll";
          EorCButton = document.createElement("a");
          EorCButton.id = "enroll";
          EorCButton.innerHTML = `<button>${eOrC}</button>`;
          EorCButton.addEventListener("click", function () {
            enroll(course.course_code);
          });

          modules.forEach((module) => {
            modhtml = `${modhtml} <tr><td>${module}</td></tr>`;
          });
        }

        let venhtml = "";
        venues.forEach((venue) => {
          venhtml = `${venhtml} <tr><td>${venue}</td></tr>`;
        });

        courseInfoblock.innerHTML = ` 
                <h3>About the course</h3>
                <div class="description">${course.full_description}</div>
                <h3>Lecturers</h3>
                <table>
                <tr class="lecName">${lecRow1}</tr>
                <tr class="lecPic">${lecRow2}</tr>
                </table>
                <span class="Modue">
                <h3>Modules</h3>
                <table class="modules">${modhtml}</table>
                <table class="completedMods "><tr><td><h4>Completed Modules</h4></td></tr></table>
                <h3>Venues</h3>
                <table class="venues">${venhtml}</table>
                <table class="butts">
                <tr><td><button id="printScreen">Print</button></td>
                <td><a href="../Images/WPR 281 Study Guide [2024] v1.4.pdf" download><button>Study Guide</button></a</td></tr>
                </table>
                </span>                
                
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" height="500" title="Rick Astley - Never Gonna Give You Up (Official Music Video)" frameborder="0"></iframe>
            `;
        parentBlock.appendChild(courseInfoblock);

        //Heading card,image, and text
        const mainSeg = document.querySelector("#index-title-section");
        let enrollCard = document.createElement("div");
        enrollCard.classList.add("EnrollCard");
        enrollCard.innerHTML = `
        <h3 class="ECtitle">${course.title}</h3>
        <span class="priceDuration">
          <p class="top">Price</p>
          <p class="top">Duration</p>
          <p class="bottom">R${course.course_cost_peryear} /year</p>
          <p class="bottom">${course.course_duration}</p>
        </span>
        `;
        enrollCard.appendChild(EorCButton);
        mainSeg.appendChild(enrollCard);

        document.getElementById("printScreen").addEventListener("click", () => {
          window.print();
        });

        //Finds all the checkboxes on the page and adds an eventlistener to it to add or remove a class
        let checkBoxes = document.querySelectorAll("input[type=checkbox]");
        let completed =
          document.querySelector("h4").parentElement.parentElement
            .parentElement;
        checkBoxes.forEach((box) => {
          box.addEventListener("change", () => {
            let label = document.querySelector(`label[for="${box.name}"]`);
            let originalRow = label.parentElement.parentElement.parentElement;

            if (label.classList.contains("completedMod")) {
              // Uncheck remove completedMod class, remove invisible class, and delete newRow
              label.classList.remove("completedMod");
              originalRow.classList.remove("invisible");

              let newRow = completed.querySelector(`input[name="${box.name}"]`)
                .parentElement.parentElement.parentElement;
              newRow.remove();
            } else {
              //Check add completedMod class add invisible class, and create newRow
              label.classList.add("completedMod");
              originalRow.classList.add("invisible");

              let newRow = document.createElement("tr");
              newRow.classList.add("dupMod");
              newRow.innerHTML = originalRow.innerHTML;

              completed.appendChild(newRow);

              let newBox = newRow.querySelector("input[type=checkbox]"); //the check box inside new row searching inside newRow
              newBox.addEventListener("change", () => {
                if (newBox.checked) {
                  label.classList.remove("completedMod");
                  originalRow.classList.remove("invisible");

                  originalRow.querySelector(
                    "input[type=checkbox]"
                  ).checked = false; //earch inside of original row
                  newRow.remove();
                } else {
                  label.classList.add("completedMod");
                  originalRow.classList.add("invisible");
                }
              });
            }
          });
        });

        document.getElementById(
          "index-title-section"
        ).style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('../Images/${course.title}.webp') no-repeat scroll center`;
        document.getElementById("index-title-section").style.backgroundSize =
          "cover";
      }
    });
    completeAll(EorCButton);
    completeAddTrack(EorCButton);
  }

  function resetheading() {
    //adding the heading's img and text
    document.getElementById(
      "index-title-section"
    ).style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url('../Images/courses_header.jpg') no-repeat scroll center`;
    document.getElementById("index-title-section").style.backgroundSize =
      "cover";
  }

  //Removes cards Adds button and section
  function removeAndAdd() {
    //removes cards and heading
    let cards = document.querySelectorAll(".card"); //Selects all cards and adds the invisible class to it
    cards.forEach((element) => {
      element.classList.add("invisible");
    });
    document
      .querySelector("#index-title-section h2")
      .classList.add("invisible");

    //Adds the back button
    document.querySelector("#back").classList.remove("invisible");
    document.querySelector("#Detail").classList.remove("invisible");
  }

  function completeAddTrack(button) {
    //adds and eventlister to the complete button
    button.addEventListener("click", function () {
      let comps = document.querySelectorAll(".dupMod");
      comps.forEach((comp) => {
        comp.remove();
      });
      let classname = button.id;
      let boxes = document.getElementsByClassName(classname);
      if (completedCourses.includes(classname)) {
        completedCourses.pop(classname);
        //For each check box set the to unchecked
        for (let i = 0; i < boxes.length; i++) {
          boxes[i].checked = false;
          document
            .querySelector(`label[for="${boxes[i].name}"]`)
            .classList.remove("completedMod");
          boxes[i].parentElement.parentElement.parentElement.classList.remove(
            "invisible"
          );
          boxes[i].disabled = false;
        }
      } else {
        completedCourses.push(classname);
        //For each check box set the to checked
        for (let i = 0; i < boxes.length; i++) {
          boxes[i].checked = true;
          document
            .querySelector(`label[for="${boxes[i].name}"]`)
            .classList.add("completedMod");
          boxes[i].parentElement.parentElement.parentElement.classList.remove(
            "invisible"
          );
          boxes[i].disabled = true;
        }
      }
    });
  }

  function completeAll(element) {
    let comps = document.querySelectorAll(".dupMod");
    comps.forEach((comp) => {
      comp.remove();
    });
    let classname = element.id;
    let boxes = document.getElementsByClassName(classname);
    if (completedCourses.includes(classname)) {
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].checked = true;
        document
          .querySelector(`label[for="${boxes[i].name}"]`)
          .classList.add("completedMod");
          boxes[i].disabled = true;
      }
    }
  }

  document.getElementById("back").addEventListener("click", function () {
    GoBack();
  });

  //Turn every thing back to normal
  function GoBack() {
    //resets the heading background
    resetheading();

    //adds cards and heading
    let cards = document.querySelectorAll(".card"); //Selects all cards and removes the invisible class to it
    cards.forEach((element) => {
      element.classList.remove("invisible");
    });

    document
      .querySelector("#index-title-section h2")
      .classList.remove("invisible");

    //Removes back button, course detail text
    document.querySelector("#back").classList.add("invisible");
    document.querySelector(".courseDetail").remove();
    document.getElementById("Detail").classList.add("invisible");
    document.querySelector(".EnrollCard").remove();
  }
});

function enroll(courseName) {
  // Store the selected course name in local storage
  localStorage.setItem("selectedCourse", courseName);
  window.location.href = "../Enroll/Enroll.html";
}
