let courses = [];   //array where the json file's conent will be stored in

fetch("https://raw.githubusercontent.com/zannlin/wprproject.github.io/Adding-Code/Main%20Files/Courses.json")   //fetch the json file from github
.then(response => {
    if (!response.ok){ //if the response is not ok it throws a new error
        throw new Error("Networkk respons was not ok " + response.statusText);
    }
    return response.json(); //else it responses with the json file    
})  //handles the promise returned by fetch
.then(data => { //handles the promise returned by response.json
    console.log(data);
    if (Array.isArray(data)) { // Checks if data is an array
        courses = data;  // Sets courses array to the data
        displayCourses(courses);    //calls dispay function to display the courses
    } else {
        throw new Error("Fetched data is not an array");    // if not an array throw new error
    }   
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);  //catches error and displays it in the console
});

function displayCourses(courses) {
    let courseList = document.getElementById("courses");    //courselist is set to a div with courses as an id
    courses.forEach(course => { 
        const courseblock = document.createElement("div");  //creates a div for each course
        //Below is where you would insert the html code of the course while using the json file for the course details
        //Ads content inside the div
        courseblock.innerHTML = `       
        <h2>${course.title}</h2>
        <p>Discription: ${course.full_description}</p>
        <p>Modules: </p>
        <ul><li>${course.modules}</li></ul>
        <p>Course code: ${course.course_code}</p>
        <p>Lecturers: ${course.lecturers}</p>
        <p>Venues: ${course.venues}</p>
        `;
        courseList.appendChild(courseblock);    //Moves each new div to the bottom
    });
}