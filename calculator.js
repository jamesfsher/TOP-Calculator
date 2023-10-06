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
const numButtons = document.querySelectorAll('.btn.number');
numButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        numberHandler(e);
    });
});

const operatorButtons = document.querySelectorAll('.btn.operator');
operatorButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        operatorHandler(e);
    });
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    clearAll()
});

const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', () => {
    deleteHandler();
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
    num1 = result.toString();
    currentState = "carryOver";
    return result;
}

// function to update the small display box
function updateSmallDisplay() {
    if (result) {
        smallDisplay = `${num1} ${operator} ${num2} = ${result}`;
    }
    document.querySelector("#top-display-text").innerHTML = `${smallDisplay}`
    // TODO
    // make way to limit num of characters?
    // use flexbox instead
}

// Updates main display, reading through non empty values
function updateDisplay() {
    if (result) {
        displayValue = result.toString();
    }
    else {
        displayValue = num1.toString() || "0";
        if (operator) {
            displayValue += ` ${operator}`;
            if (num2) {
                displayValue += ` ${num2}`;
            }
        }
    }
    // Updates main display
    // TODO: store document.query... as its own global variable
    document.querySelector("#main-display-text").innerHTML = `${displayValue}`
}

// Clears all values
function clearAll() {
    num1 = '';
    num2 = '';
    operator = '';
    result = '';
    displayValue = '';
    smallDisplay = '';
    num1Decimal = 'no';
    num2Decimal = 'no';
    updateDisplay();
    updateSmallDisplay();
}

// Deletes most recent character from num1, operator, or num2
function deleteHandler() {
    // Goes through each value from last to first and detects & deletes
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
    // After updating values, updateDisplay called
    updateDisplay();
}

function decimalDetector() {
    // Detect if there is already a decimal in each number
    let num1Search = num1.toString().indexOf(".");
    let num2Search = num2.toString().indexOf(".");
    if (num1Search !== -1) {
        num1Decimal = "yes";
        console.log("num1 has a decimal");
    }
    else {
        num1Decimal = "no";
    }
    if (num2Search !== -1) {
        num2Decimal = "yes";
        console.log("num2 has a decimal");
    }
    else {
        num2Decimal = "no";
    }
}

// Handles number inputs
function numberHandler(event) {
    decimalDetector();
    let currentButton = event.target.value;
    if (!operator) {
        if (!num1 || currentState === "carryOver") {
            currentState = "initial";
            num1 = currentButton;
            result = '';
        }
        else {
            if (currentButton == '.') {
                if (num1Decimal == 'no') {
                    num1 += currentButton;
                }
            }
            else {
                num1 += currentButton;
            }
        }
    }
    else {
        if (!num2) {
            num2 = currentButton;
        }
        else {
            if (currentButton == '.') {
                if (num2Decimal == 'no') {
                    num2 += currentButton;
                }
            }
            else {
                num2 += currentButton;
            }
        }
    }
    updateDisplay();
}

// Updates the main display and stores the user input values of num1, num2, and operator
function operatorHandler(event) {
    // If button is an operator (PEMDAS)
    if (event.target.classList.value === "btn operator") {
        let selectedOperator = event.target.value;
        console.log(selectedOperator);
        if (num1) {
            if (num2) {
                if (selectedOperator === "+" || selectedOperator === "-" || selectedOperator === "/" || selectedOperator === "*") {
                    result = operate(num1, num2, operator);
                    updateSmallDisplay();
                    num2 = '';
                    result = '';
                }
                else if (selectedOperator === "equals") {
                    console.log("sent with equal");
                    result = operate(num1, num2, operator);
                    updateSmallDisplay();
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
    // Call function to update the main and small displays, called every time a button is clicked
    updateDisplay();

}