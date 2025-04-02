
let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.querySelector('.display');

document.querySelector('.buttons').addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const button = e.target;
    const buttonValue = button.textContent;

    if (!isNaN(buttonValue) || buttonValue === '.') {
      inputDigit(buttonValue);
    } else {
      handleOperator(buttonValue);
    }
    updateDisplay();
  }
});

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function handleOperator(nextOperator) {
  if (nextOperator === 'AC') {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    return;
  }

  if (nextOperator === '+/-') {
    displayValue = String(-parseFloat(displayValue));
    return;
  }

  if (nextOperator === '%') {
    displayValue = String(parseFloat(displayValue) / 100);
    return;
  }

  const inputValue = parseFloat(displayValue);

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    displayValue = String(result);
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

function calculate(first, second, op) {
  switch (op) {
    case '+': return first + second;
    case '-': return first - second;
    case '×': return first * second;
    case '÷': return first / second;
    case '=': return second;
  }
  return second;
}

function updateDisplay() {
  display.textContent = displayValue;
}
