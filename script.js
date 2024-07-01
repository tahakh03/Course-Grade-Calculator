let courseCount = 0;

function addCourse() {
    if (courseCount >= 5) {
        alert("You can add a maximum of 5 courses.");
        return;
    }

    courseCount++;

    const coursesDiv = document.getElementById('courses');

    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course');
    courseDiv.innerHTML = `
        <h3>Course ${courseCount}</h3>
        <div id="assignmentsContainer${courseCount}">
            <!-- Assignments will be dynamically added here -->
        </div>
        <button onclick="addAssignment(${courseCount})">Add Assignment</button>
        <button onclick="calculateGrade(${courseCount})">Calculate Grade</button>
        <div id="result${courseCount}" class="result"></div>
    `;

    coursesDiv.appendChild(courseDiv);

    // Initialize assignment count for the course
    courseDiv.dataset.assignmentCount = 0;

}

function addAssignment(courseNumber) {
    const assignmentsContainer = document.getElementById(`assignmentsContainer${courseNumber}`);

    // Get the current assignment count for this course
    let assignmentCount = assignmentsContainer.children.length;

    // Limit the number of assignments to a reasonable number, e.g., 10
    if (assignmentCount >= 10) {
        alert("You can add a maximum of 10 assignments per course.");
        return;
    }

    assignmentCount++;

    const assignmentDiv = document.createElement('div');
    assignmentDiv.classList.add('assignment');
    assignmentDiv.innerHTML = `
        <div>
            <label for="assignmentWeight${courseNumber}_${assignmentCount}">Assignment ${assignmentCount} Weight (%)</label>
            <input type="number" id="assignmentWeight${courseNumber}_${assignmentCount}" min="0" max="100" required>
        </div>
        <div>
            <label for="assignmentGrade${courseNumber}_${assignmentCount}">Assignment ${assignmentCount} Grade (%)</label>
            <input type="number" id="assignmentGrade${courseNumber}_${assignmentCount}" min="0" max="100" required>
        </div>
    `;

    assignmentsContainer.appendChild(assignmentDiv);
}

function calculateGrade(courseNumber) {
    const assignmentsContainer = document.getElementById(`assignmentsContainer${courseNumber}`);
    const assignmentWeightInputs = assignmentsContainer.querySelectorAll(`[id^="assignmentWeight${courseNumber}_"]`);
    const assignmentGradeInputs = assignmentsContainer.querySelectorAll(`[id^="assignmentGrade${courseNumber}_"]`);

    let totalWeight = 0;
    let weightedSum = 0;

    // Iterate over each assignment input
    assignmentWeightInputs.forEach((weightInput, index) => {
        const assignmentWeight = parseFloat(weightInput.value);
        const assignmentGrade = parseFloat(assignmentGradeInputs[index].value);

        // Validate inputs
        if (isNaN(assignmentWeight) || isNaN(assignmentGrade)) {
            alert(`Please enter valid numbers for Assignment ${index + 1}`);
            return;
        }

        if (assignmentWeight < 0 || assignmentWeight > 100 || assignmentGrade < 0) {
            alert(`Assignment ${index + 1} weight and grade must be between 0 and 100`);
            return;
        }

        totalWeight += assignmentWeight;
        weightedSum += (assignmentGrade * assignmentWeight);
    });

    // Check if total weight is not 100
    if (totalWeight !== 100) {
        alert(`Total assignment weights for Course ${courseNumber} do not add up to 100%.`);
        return;
    }

    const weightedAverageGrade = weightedSum / 100; // Divide by 100 to normalize to 0-100 scale

    // Display the result
    const resultDiv = document.getElementById(`result${courseNumber}`);
    resultDiv.textContent = `Course ${courseNumber} Grade: ${weightedAverageGrade.toFixed(2)}%`;
}