document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    
    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let shouldResetScreen = false;

    // Adiciona eventos de clique aos botões
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number')) {
                appendNumber(button.textContent);
            } else if (button.classList.contains('operator')) {
                handleOperator(button.textContent);
            } else if (button.classList.contains('equals')) {
                calculate();
            } else if (button.classList.contains('clear')) {
                clear();
            } else if (button.classList.contains('decimal')) {
                inputDecimal();
            } else if (button.classList.contains('backspace')) {
                backspace();
            }
            updateDisplay();
        });
    });

    // Adiciona suporte a teclado
    document.addEventListener('keydown', (e) => {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            appendNumber(e.key);
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            handleOperator(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            calculate();
        } else if (e.key === 'Escape') {
            clear();
        } else if (e.key === 'Backspace') {
            backspace();
        }
        updateDisplay();
    });

    function appendNumber(number) {
        if (shouldResetScreen) {
            currentInput = '';
            shouldResetScreen = false;
        }
        if (number === '0' && currentInput === '0') return;
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }

    function inputDecimal() {
        if (shouldResetScreen) {
            currentInput = '0.';
            shouldResetScreen = false;
            return;
        }
        if (currentInput === '') {
            currentInput = '0.';
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handleOperator(op) {
        if (operator && !shouldResetScreen) {
            calculate();
        }
        firstOperand = currentInput === '' ? '0' : currentInput;
        operator = op;
        shouldResetScreen = true;
    }

    function calculate() {
        if (operator === null || shouldResetScreen) return;
        if (operator === '/' && currentInput === '0') {
            alert('Não é possível dividir por zero!');
            clear();
            return;
        }
        
        const secondOperand = currentInput === '' ? firstOperand : currentInput;
        let result = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
        
        // Arredonda para no máximo 8 casas decimais
        result = Math.round(result * 100000000) / 100000000;
        
        currentInput = result.toString();
        operator = null;
        shouldResetScreen = true;
    }

    function operate(operator, a, b) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }

    function clear() {
        currentInput = '0';
        firstOperand = null;
        operator = null;
        shouldResetScreen = false;
    }

    function backspace() {
        if (currentInput.length <= 1) {
            currentInput = '0';
            shouldResetScreen = false;
        } else {
            currentInput = currentInput.slice(0, -1);
        }
    }

    function updateDisplay() {
        display.value = currentInput === '' ? '0' : currentInput;
    }

    // Inicializa a calculadora
    clear();
    updateDisplay();
});
