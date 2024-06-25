$(document).ready(function () {
    let display = $('#display');
    display.val(0);
    let currentInput = '';

    function updateDisplay(value) {
        currentInput = value;
        display.val(value);
        if (currentInput !== '0') {
            display.removeClass('default').addClass('has-input');
        } else {
            display.removeClass('has-input').addClass('default');
        }
    }

    function handleInput(input) {
        if (display.val() === 'NaN' || display.val() === 'Infinity') {
            clearInput();
        }
        else if (input === '+/-') {
            toggleSign();
        }
        else if (/\d/.test(input) || /\+|\-|\*|\/|\.|\%/.test(input)) {
            if (/\d/.test(input)) {
                if (currentInput === '0') {
                    currentInput = input;
                } else {
                    currentInput += input;
                }
            } else {
                if (currentInput === '') {
                    currentInput = '0' + input;
                } else if (/\+|\-|\*|\/|\%/.test(currentInput[currentInput.length - 1])) {
                    currentInput = currentInput.slice(0, -1) + input;
                } else {
                    currentInput += input;
                }
            }
            updateDisplay(currentInput);
        }
    }

    function clearInput() {
        updateDisplay('0');
        currentInput = '';
    }

    function deleteInput() {
        if (display.val() === 'Infinity' || display.val() === 'NaN') {
            updateDisplay('0');
            currentInput = '';
        } else {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') {
                updateDisplay('0');
            } else {
                updateDisplay(currentInput);
            }
        }
    }

    function calculateResult() {
        try {
            let input = currentInput;
            if (/\+|\-|\*|\//.test(input[input.length - 1])) {
                let lastOperator = input[input.length - 1];
                let number = input.slice(0, -1);
                input += number;
            }

            if (input.includes('%')) {
                let parts = input.split('%');
                let firstInput = parseFloat(parts[0]);
                let lastInput = parseFloat(parts[1]);

                let percentage = `${lastInput / 100} * ${firstInput}`;

                let result = eval(percentage);
                result = parseFloat(result.toFixed(10));
                updateDisplay(result.toString());
            } else {
                let result = eval(input);
                result = parseFloat(result.toFixed(10)); 
                updateDisplay(result.toString());
            }
        } catch (error) {
            updateDisplay('Error');
        }
    }


    function toggleSign() {
        if (currentInput !== '' && currentInput !== 'Infinity' && currentInput !== 'Error' && currentInput !== 'NaN') {
            if (currentInput.charAt(0) === '-') {
                currentInput = currentInput.slice(1);
            } else {
                currentInput = '-' + currentInput;
            }
            updateDisplay(currentInput);
        }
    }

    function Inverse() {
        if (currentInput !== '') {
            currentInput = (1 / parseFloat(currentInput)).toString();
            updateDisplay(currentInput);
        }
    }

    function Square() {
        if (currentInput !== '') {
            currentInput = (Math.pow(parseFloat(currentInput), 2)).toString();
            updateDisplay(currentInput);
        }
    }

    function Sqrt() {
        if (currentInput !== '') {
            currentInput = (Math.sqrt(parseFloat(currentInput))).toString();
            updateDisplay(currentInput);
        }
    }


    $('.number, .operator, .negative').click(function () {
        handleInput($(this).text());
    });

    $('#clear').click(function () {
        clearInput();
    });

    $('#delete').click(function () {
        deleteInput();
    });

    $('#inverse').click(function () {
        Inverse();
    });

    $('#square').click(function () {
        Square();
    });

    $('#sqrt').click(function () {
        Sqrt();
    });

    $('#equals').click(function () {
        calculateResult();
    });


    $(document).keydown(function (e) {
        let key = e.key;

        if (key >= '0' && key <= '9') {
            handleInput(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '.') {
            handleInput(key);
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            calculateResult();
        } else if (key === 'Backspace') {
            deleteInput();
        } else if (key === 'Delete') {
            clearInput();
        }
    });
});
