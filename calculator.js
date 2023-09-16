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

let num1;
let num2;
let operator;