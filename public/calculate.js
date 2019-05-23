const grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03, 49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

const lowerBoundLabels = ['F', 'D', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'Max'];
// defaults are same as the html entries
let lowerBounds = [0.00, 50.00, 55.00, 60.00, 65.00, 70.00, 75.00, 80.00, 85.00, 90.00, 95.00, 100.00];

const gradesToStudentsLen = 11;
let gradesToStudents = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const personIcon = "<img class='personIcon' src='https://tinyurl.com/y33nxupl'></img>";

// enum for types of error when entering into the inputs
const errorType = {
    bounds: 0,
    domain: 1
};


initialize();

function initialize() {
    hideErrorAlert();
    grades.sort(function(a,b) { return a - b;});
    updateHistogram();
}

function receiveInput(inputCategory) {
    // 1. Check all values to see if they're valid
    // 2. Check the bounds
    for (i = 0; i < gradesToStudentsLen + 1; i++) {
        let currLowerBoundInput = parseFloat(document.getElementById('Bounds' + lowerBoundLabels[i]).value);
        let isValidInput = /^\-?[0-9]+\.?[0-9]*$/.test(document.getElementById('Bounds' + lowerBoundLabels[i]).value);
        if (!isValidInput) {
            setErrorAlert(errorType.domain, inputCategory);
            return;
        }

        // This is valid input, but do not know if the bounds are in a valid order
        lowerBounds[i] = currLowerBoundInput;

        // Check if the bounds are in ascending order
        if (i !== 0 && lowerBounds[i-1] >= lowerBounds[i]) {
            setErrorAlert(errorType.bounds, inputCategory);
            return;
        }
    }

    hideErrorAlert();
    updateHistogram();
}

function updateHistogram() {
    // Reinitializes gradesToStudents
    gradesToStudents = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    computeGradesToStudents();
    renderHistogram();
}

function computeGradesToStudents() {
    let currGrade = 1;
    grades.forEach((grade) => {
        // if the grade is not within the bounds, omit it from the histogram
        if (grade < lowerBounds[0]) {
            return;
        // if the grade is larger than the max lower bound
        } else if (grade >= lowerBounds[gradesToStudentsLen]) {
            return;
        }

        while (!(grade >= lowerBounds[currGrade - 1] && grade < lowerBounds[currGrade])) {
            currGrade++;
        }

        gradesToStudents[currGrade - 1]++;
    });
}

function renderHistogram() {
    for (i = 0; i < gradesToStudentsLen; i++) {
        let gradeToStudentsTableEntry = document.getElementById('Hist' + lowerBoundLabels[i]);
        // Creates a whole line of icons of people
        const histogramVisual = personIcon.repeat(gradesToStudents[i]);
        gradeToStudentsTableEntry.innerHTML = histogramVisual;
    }
}

function setErrorAlert(error, inputCategory) {
    if (error === errorType.bounds) {
        document.getElementById('BoundsErrorAlertMessage').innerText = inputCategory + '\'s lower bound: Lower bounds should not overlap nor equal to another existing bound.';
    } else {
        document.getElementById('BoundsErrorAlertMessage').innerText = '';
    }

    if (error === errorType.domain) {
        document.getElementById('DomainErrorAlertMessage').innerText = inputCategory + '\'s lower bound: Input is not a number.';
    } else {
        document.getElementById('DomainErrorAlertMessage').innerText = '';
    }

    document.getElementById('ErrorAlert').style.opacity = 1;
}

function hideErrorAlert() {
    document.getElementById('ErrorAlert').style.opacity = 0;
}