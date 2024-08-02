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
    let parentBlock = document.getElementById("Detail");  //The container in which we will add code into
    const courseInfoblock = document.createElement("div");  
    courseInfoblock.classList.add("courseDetail");
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
        });
        
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
                <table><iframe width="1864" height="762" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up (Official Music Video)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>"></table>
            `;
            parentBlock.appendChild(courseInfoblock);

        //Heading card,image, and text
        const mainSeg = document.querySelector("#index-title-section");
        let enrollCard = document.createElement("div");
        enrollCard.classList.add("EnrollCard");
        enrollCard.innerHTML=`
        <h3 class="ECtitle">${course.title}</h3>
        <span class="priceDuration">
          <p class="top">Price</p>
          <p class="top">Duration</p>
          <p class="bottom">R${course.course_cost_peryear} /year</p>
          <p class="bottom">${course.course_duration}</p>
        </span>
        <a href="Enroll.html" onclick="enroll()"><button>Enroll</button></a>
        `;
        mainSeg.appendChild(enrollCard);



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
  }

  //Removes cards Adds button and section
  function removeAndAdd() {
    //removes cards and heading
    let cards = document.querySelectorAll(".card"); //Selects all cards and adds the invisible class to it
    cards.forEach((element) => {
      element.classList.add("invisible");
    });
    document.querySelector("#index-title-section h2").classList.add("invisible");

    //Adds the back button
    document.querySelector("#back").classList.remove("invisible");
    document.querySelector("#Detail").classList.remove("invisible");
  }

  document.getElementById("back").addEventListener("click", function(){GoBack();});

  //Turn every thing back to normal
  function GoBack(){
    //resets the heading background
    resetheading();

    //adds cards and heading
    let cards = document.querySelectorAll(".card"); //Selects all cards and removes the invisible class to it
    cards.forEach((element) => {
      element.classList.remove("invisible");
    });

    document.querySelector("#index-title-section h2").classList.remove("invisible");
    
    //Removes back button, course detail text  
    document.querySelector("#back").classList.add("invisible");
    document.querySelector(".courseDetail").remove();
    document.getElementById("Detail").classList.add("invisible");
    document.querySelector(".EnrollCard").remove();
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

function enroll(course) {
  window.location.href = `Enroll.html?course=${course}`;
}