function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let num1;
let num2;
let operator;
let displayValue;


function operate(a, b, operator) {
    if (operator == 'add') {
        return add(a, b);
    }
    else if (operator == 'subtract') {
        return subtract(a, b);
    }
    else if (operator == 'multiply') {
        return multiply(a, b);
    }
    else if (operator == 'divide') {
        return multiply(a, b);
    }
    else {
        return "Operator not found";
    }
}


function updateMain(event) {
    if (!operator) {
        if (!num1) {
            num1 = event.value
        }
        else {
            num1 += event.value;
        }
        console.log(num1);

    }
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        updateMain(button);
    });
});




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


// Structure of passing variables with buttons
// each button needs an event listener

