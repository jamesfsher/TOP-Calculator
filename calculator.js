// Add function
function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

// Subtract function
function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

// Multiplication function
function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

// Division function
function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

// Declaration of variables
let num1;
let num2;
let operator;
let displayValue;
let smallDisplay;
let result;

const buttons = document.querySelectorAll('.btn');
buttons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        updateMain(e);
    });
});

// Operate function which takes user input values and executes operation
function operate(a, b, operator) {
    if (operator == '+') {
        result = add(a, b);
    }
    else if (operator == '-') {
        result = subtract(a, b);
    }
    else if (operator == '*') {
        result = multiply(a, b);
    }
    else if (operator == '/') {
        result = divide(a, b);
    }
    else {
        return "Operator not found";
    }
    num1 = result;
    return result;
}

// function to update the small display box
function updateSmallDisplay() {
    smallDisplay = `${num1} ${operator} ${num2} = ${result}`;
    document.querySelector("#top-display-text").innerHTML = `${smallDisplay}`
    // make way to limit num of characters
}

function updateDisplay() {
    if (result) {
        displayValue = result;
    }
    else if (num1) {
        displayValue = `${num1}`;
        if (operator) {
            displayValue = `${num1} ${operator}`;
            if (num2) {
                displayValue = `${num1} ${operator} ${num2}`;
            }
        }
    }
    else {
        displayValue = '';
    }
    document.querySelector("#main-display-text").innerHTML = `${displayValue}`
}

// Updates the main display and stores the user input values of num1, num2, and operator
// NOTE - need up update if statements from truthy to something else
    // 0 wont work with num1 or num2 since it is technically falsy
    // maybe and || val == 0?
function updateMain(event) {
    console.log(event.target.value);
    if (event.target.classList.value == "btn number") {
        if (!operator) {
            if (!num1 || result) {
                num1 = event.target.value
                result = null;
            }
            else {
                num1 += event.target.value;
            }
        }
        else {
            if (!num2) {
                num2 = event.target.value
            }
            else {
                num2 += event.target.value;
            }
        }
    }
    if (event.target.classList.value == "btn execute") {
        if (event.target.value == "clear") {
            num1 = null;
            num2 = null;
            operator = null;
            result = null;
            displayValue = '';
            smallDisplay = '';
        }
        else if (event.target.value == "delete") {
            console.log("here");
            if (num2) {
                num2 = num2.slice(0, -1);
            }
            else if (operator) {
                operator = null;
            }
            else if (num1) {
                num1 = num1.slice(0, -1);
            }
            else {
                num1 = null;
                num2 = null;
                operator = null;
            }
        }
    }
    if (event.target.classList.value == "btn operator") {
        if (num1) {
            if (num2) {
                if (operator == "+" || operator == "-" || operator == "/" || operator == "*") {
                    result = operate(num1, num2, operator);
                    num1 = result;
                    num2 = null;
                    operator = null;
                    result = null;
                }
            }
            else {
                operator = event.target.value
            }
        }
    }

    updateDisplay();
    updateSmallDisplay();
    // document.querySelector("#main-display-text").innerHTML = `${displayValue}`
}




// create event listeners on the numbers and operators to populate display value
// Number has to be the first selection
// multiple numbers can be added to each variable
// Operator can be selected next
// if a different operator is selected, initial option is overwritten
// Next a string of numbers can be created again
// if any operator is selected next, the numbers and operators previously selected are executed
// the result of the previously operation should be moved to small display
// the result of the past operation should then be stored as initial number
// if user starts typing numbers, then stored past value is overwritten
