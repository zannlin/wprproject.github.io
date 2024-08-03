    // Pre-select the course based on URL parameter
    function lockDropdown() {
        let courseDropdown = document.getElementById('course');
        if (courseDropdown.value !== "") {
            courseDropdown.disabled = true;
        }
    }

    window.onload = function() {
        // Retrieve the selected course name from local storage
        let selectedCourse = localStorage.getItem('selectedCourse');
        if (selectedCourse) {
            // Ensure the dropdown element is fully loaded
            setTimeout(() => {
                const dropdown = document.getElementById('courseDropdown');
                dropdown.value = selectedCourse;

                // Disable the dropdown to lock the selection
                dropdown.disabled = true;

                // Clear the local storage to prevent reuse
                localStorage.removeItem('selectedCourse');
            }, 100); // Add a slight delay to ensure the DOM is fully parsed
        }
    }



    document.getElementById('enrollmentForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');

        // Validate the form
        let isValid = true;

        const name = document.getElementById('name').value;
        if (!name) {
            document.getElementById('name-error').textContent = 'Name is required.';
            isValid = false;
        }

        const surname = document.getElementById('surname').value;
        if (!surname) {
            document.getElementById('surname-error').textContent = 'Surname is required.';
            isValid = false;
        }

        const email = document.getElementById('email').value;
        if (!email) {
            document.getElementById('email-error').textContent = 'E-Mail is required.';
            isValid = false;
        }

        const phone = document.getElementById('phone').value;
        if (phone && !phone.match(/\d{10}/)) {
            document.getElementById('phone-error').textContent = 'Phone number must be 10 digits.';
            isValid = false;
        }

        const courseDropdown = document.getElementById('courseDropdown');
        const selectedCourse = courseDropdown.value;
        if (!selectedCourse) {
            document.getElementById('course-error').textContent = 'Please select a course.';
            isValid = false;
        }

        const message = document.getElementById('message').value;
        if (!message) {
            document.getElementById('message-error').textContent = 'Reason for Enrollment is required.';
            isValid = false;
        }

        if (isValid) {
            // Define course start dates
            const courseStartDates = {
                'HCIT100': '2024-09-01T09:00:00',
                'DGD200': '2024-10-01T09:00:00',
                'BSC301': '2024-11-01T09:00:00',
                'MSC500': '2024-12-01T09:00:00'
            };

            // Populate the summary table
            const summarySection = document.getElementById('summarySection');
            const summaryTableBody = document.getElementById('summaryTable').getElementsByTagName('tbody')[0];
            summaryTableBody.innerHTML = ''; // Clear previous content

            // Create a summary row for each field
            const fields = [
                { label: 'Name', value: name },
                { label: 'Surname', value: surname },
                { label: 'E-Mail', value: email },
                { label: 'Phone Number', value: phone },
                { label: 'Course', value: courseDropdown.options[courseDropdown.selectedIndex].text },
                { label: 'Reason for Enrollment', value: message }
            ];

            fields.forEach(field => {
                const row = summaryTableBody.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.textContent = field.label;
                cell2.textContent = field.value;
            });

            // Add countdown to summary
            const selectedCourseStartDate = courseStartDates[selectedCourse];
            const countdownElement = document.createElement('tr');
            countdownElement.innerHTML = `<td>Countdown</td><td class="countdown" id="countdown"></td>`;
            summaryTableBody.appendChild(countdownElement);

            function updateCountdown() {
                const courseStartDate = new Date(selectedCourseStartDate);
                const now = new Date();
                const timeDifference = courseStartDate - now;
                
                if (timeDifference <= 0) {
                    document.getElementById('countdown').innerHTML = "The course has started!";
                    clearInterval(timerInterval);
                    return;
                }
                
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
                
                document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s remaining until the course starts.`;
            }

            const timerInterval = setInterval(updateCountdown, 1000);
            updateCountdown(); // Initial call to set the countdown right away

            // Display the summary section
            summarySection.style.display = 'block';

            document.getElementById('enrollmentForm').reset();
        }
    });