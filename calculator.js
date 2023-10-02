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
// Main display value
let displayValue;
// Small display value
let smallDisplay;
// Calculated result
let result;
// currentState designates that num1 is stored from previous operation. inital representing no past result, carryOver representing result caried over from past operation
let currentState = "initial";

// Add event listener to all buttons, passing the event information
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
    // Allow result to be stored as num1 for future calculations
    num1 = result;
    currentState = "carryOver";
    return result;
}

// function to update the small display box
function updateSmallDisplay() {
    smallDisplay = `${num1} ${operator} ${num2} = ${result}`;
    document.querySelector("#top-display-text").innerHTML = `${smallDisplay}`
    // make way to limit num of characters?
        // use flexbox instead
}

// Updates main display, reading through non null values
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

function clearAll() {
    num1 = null;
    num2 = null;
    operator = null;
    result = null;
    displayValue = '';
    smallDisplay = '';
}

// NOTE - need up update if statements from truthy to something else
    // 0 wont work with num1 or num2 since it is technically falsy
    // maybe and || val == 0?
    

// Updates the main display and stores the user input values of num1, num2, and operator
function updateMain(event) {
    // If button is a number
    if (event.target.classList.value == "btn number") {
        if (!operator) {
            if (!num1 || currentState == "carryOver") {
                currentState = "initial";
                num1 = event.target.value;
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
    // If button is an executer (clear or delete)
    if (event.target.classList.value == "btn execute") {
        if (event.target.value == "clear") {
            clearAll();
        }
        else if (event.target.value == "delete") {
            if (num2) {
                num2 = num2.slice(0, -1);
            }
            else if (operator) {
                operator = null;
            }
            else if (num1) {
                num1 = num1.toString().slice(0, -1);
            }
            else {
                num1 = null;
                num2 = null;
                operator = null;
            }
        }
    }
    // If button is an operator (PEMDAS)
    if (event.target.classList.value == "btn operator") {
        let selectedOperator = event.target.value;
        console.log(selectedOperator);
        if (num1) {
            if (num2) {
                if (selectedOperator == "+" || selectedOperator == "-" || selectedOperator == "/" || selectedOperator == "*") {
                    result = operate(num1, num2, operator);
                    num1 = result;
                    num2 = null;
                    result = null;
                }
                else if (selectedOperator == "equals") {
                    console.log("sent with equal");
                    result = operate(num1, num2, operator);
                    num1 = result;
                    num2 = null;
                    result = null;
                    operator = null;
                }
            }
            else {
                if (selectedOperator != "equals") {
                    console.log("regular operator");
                    operator = selectedOperator;
                }
            }
        }
    }
    // Call function to update the main and small displays, called every time a button is clicked
    updateDisplay();
    updateSmallDisplay();
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

// General notes
// make all fonts bigger