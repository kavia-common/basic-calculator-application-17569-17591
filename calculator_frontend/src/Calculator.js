import React, { useState } from 'react';
import './Calculator.css';

// PUBLIC_INTERFACE
const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // PUBLIC_INTERFACE
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  // PUBLIC_INTERFACE
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  // PUBLIC_INTERFACE
  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  // PUBLIC_INTERFACE
  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  // Helper function to perform calculations
  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  // Handle equals operation
  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-value">{display}</div>
      </div>
      
      <div className="calculator-keypad">
        <div className="calculator-row">
          <button 
            className="calculator-key key-clear" 
            onClick={clear}
          >
            C
          </button>
          <button 
            className="calculator-key key-sign" 
            onClick={() => setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display)}
          >
            ±
          </button>
          <button 
            className="calculator-key key-percent" 
            onClick={() => setDisplay(String(parseFloat(display) / 100))}
          >
            %
          </button>
          <button 
            className="calculator-key key-operator" 
            onClick={() => performOperation('/')}
          >
            ÷
          </button>
        </div>

        <div className="calculator-row">
          <button 
            className="calculator-key key-digit" 
            onClick={() => inputDigit(7)}
          >
            7
          </button>
          <button 
            className="calculator-key key-digit" 
            onClick={() => inputDigit(8)}
          >
            8
          </button>
          <button 
            className="calculator-key key-digit" 
            onClick={() => inputDigit(9)}
          >
            9
          </button>
          <button 
            className="calculator-key key-operator" 
            onClick={() => performOperation('*')}
          >
            ×
          </button>
        </div>

        <div className="calculator-row">
          <button 
            className="calculator-key key-digit" 
            onClick={() => inputDigit(4)}
          >
            4
          </button>
          <button 
            className="calculator-key key-digit" 
            onClick={() => inputDigit(5)}
          >
            5
          </button>
          <button 
            className="calculator-key key-digit" 
            onClick={() => inputDigit(6)}
          >
            6
          </button>
          <button 
            className="calculator-key key-operator" 
            onClick={() => performOperation('-')}
          >
            −
          </button>
        </div>

        <div className="calculator-row">
          <button 
            className="calculator-key key-digit" 
            onClick={() => inputDigit(1)}
          >
            1
          </button>
          <button 
            className="calculator-key key-digit" 
            onClick={() => inputDigit(2)}
          >
            2
          </button>
          <button 
            className="calculator-key key-digit" 
            onClick={() => inputDigit(3)}
          >
            3
          </button>
          <button 
            className="calculator-key key-operator" 
            onClick={() => performOperation('+')}
          >
            +
          </button>
        </div>

        <div className="calculator-row">
          <button 
            className="calculator-key key-digit key-zero" 
            onClick={() => inputDigit(0)}
          >
            0
          </button>
          <button 
            className="calculator-key key-digit" 
            onClick={inputDecimal}
          >
            .
          </button>
          <button 
            className="calculator-key key-equals" 
            onClick={handleEquals}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
