document.addEventListener('DOMContentLoaded', function() {
    let courses = [];   //array where the json file's conent will be stored in

    fetch("https://raw.githubusercontent.com/zannlin/wprproject.github.io/Adding-Code/Main%20Files/Courses.json")   //fetch the json file from github
    .then(response => {
        if (!response.ok){ //if the response is not ok it throws a new error
            throw new Error("Networkk respons was not ok " + response.statusText);
        }
        return response.json(); //else it responses with the json file    
    })  //handles the promise returned by fetch
    .then(data => { //handles the promise returned by response.json
        if (Array.isArray(data)) { // Checks if data is an array
            courses = data;
            displayCourses(courses);  // Sets courses array to the data
        } else {
            throw new Error("Fetched data is not an array");    // if not an array throw new error
        }   
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);  //catches error and displays it in the console
    });

    

});
