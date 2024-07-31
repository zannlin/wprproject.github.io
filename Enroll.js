    // Pre-select the course based on URL parameter
    window.onload = function() {
        let urlParams = new URLSearchParams(window.location.search);
        let course = urlParams.get('course');
        if (course) {
            document.getElementById('course').value = course;
        }


        let courseStartDate = new Date('2024-09-01T09:00:00'); // Set course start date and time here
        let countdownElement = document.getElementById('countdown');

        function updateCountdown() {
            let now = new Date();
            let timeDifference = courseStartDate - now;
            
            if (timeDifference <= 0) {
                countdownElement.innerHTML = "The course has started!";
                clearInterval(timerInterval);
                return;
            }
            
            let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s remaining until the course starts.`;
        }

        let timerInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call to set the countdown right away
    };