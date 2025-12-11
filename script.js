document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            
            if (button.classList.contains('number')) {
                handleNumber(value);
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('equals')) {
                handleEquals();
            } else if (value === '.') {
                handleDecimal();
            }
            
            updateDisplay();
        });
    });
    
    function handleNumber(value) {
        if (currentInput === '0' || resetScreen) {
            currentInput = value;
            resetScreen = false;
        } else {
            currentInput += value;
        }
    }
    
    function handleOperator(value) {
        if (value === 'C') {
            currentInput = '0';
            previousInput = '';
            operation = null;
            return;
        }
        
        if (operation !== null) {
            handleEquals();
        }
        
        previousInput = currentInput;
        operation = value;
        resetScreen = true;
    }
    
    function handleEquals() {
        if (operation === null || resetScreen) {
            return;
        }
        
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    result = 'Error';
                    break;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        operation = null;
        resetScreen = true;
    }
    
    function handleDecimal() {
        if (resetScreen) {
            currentInput = '0';
            resetScreen = false;
        }
        
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }
    
    function updateDisplay() {
        display.textContent = currentInput;
    }
});