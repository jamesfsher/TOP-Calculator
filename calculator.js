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
let num1 = ""
let num2 = ""
let operator = ""
// Main display value
let displayValue = ""
// Small display value
let smallDisplay = ""
// Calculated result
let result = ""
// currentState designates that num1 is stored from previous operation. inital representing no past result, carryOver representing result caried over from past operation
let currentState = "initial";
// Detects if decimal has already been selected
let num1Decimal = "no";
let num2Decimal = "no";

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
        displayValue = result.toString();
    }
    else {
        displayValue = num1 || "0";
        if (operator) {
            displayValue += ` ${operator}`;
            if (num2) {
                displayValue += ` ${num2}`;
            }
        }
    }

    document.querySelector("#main-display-text").innerHTML = `${displayValue}`
}

function clearAll() {
    num1 = '';
    num2 = '';
    operator = '';
    result = '';
    displayValue = '';
    smallDisplay = ''
    num1Decimal = 'no';
    num2Decimal = 'no';
}

// Updates the main display and stores the user input values of num1, num2, and operator
function updateMain(event) {
    // If button is a number
    let currentButton = event.target.value;
    if (event.target.classList.value == "btn number") {
        if (!operator) {
            if (!num1 || currentState == "carryOver") {
                if (event)
                currentState = "initial";
                num1 = currentButton;
                result = '';
            }
            else {
                num1 += currentButton;
            }
        }
        else {
            if (!num2) {
                num2 = currentButton;
            }
            else {
                num2 += currentButton;
            }
        }
    }
    // If button is an executer (clear or delete)
    if (event.target.classList.value == "btn execute") {
        if (currentButton == "clear") {
            clearAll();
        }
        else if (currentButton == "delete") {
            if (num2) {
                num2 = num2.slice(0, -1);
            }
            else if (operator) {
                operator = '';
            }
            else if (num1) {
                num1 = num1.toString().slice(0, -1);
            }
            else {
                num1 = '';
                num2 = '';
                operator = '';
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
                    num2 = '';
                    result = '';
                }
                else if (selectedOperator == "equals") {
                    console.log("sent with equal");
                    result = operate(num1, num2, operator);
                    num1 = result;
                    num2 = '';
                    result = '';
                    operator = '';
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
    // Detect if there is already a decimal in each number
    let num1Search = num1.toString().indexOf(".");
    let num2Search = num2.toString().indexOf(".");
    if (num1Search !== -1) {
        num1Decimal = "yes";
        console.log("num1 has a decimal");
    }
    if (num2Search !== -1) {
        num2Decimal = "yes";
        console.log("num2 has a decimal");
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