// JavaScript document - Simple Web Calculator - Luciano Esteban (2021)

// Fundamental variables
const topScreen = document.getElementById("nums-top");
const bottomScreen = document.getElementById("nums-bottom");
const calculator = document.getElementById("calculator");
const calculatorInterface = document.getElementById("calculator-interface");
const calculatorScreen = document.getElementById("calculator-screen");
const skull = document.getElementById("skull")
const colors = ["#294192", "#2f4d0d", "#790979", "#811414"];
const footer = document.getElementById("footer");
const calcValues = {
    "num1": "1", "num2": "2", "num3": "3", "num4": "4", "num5": "5",
    "num6": "6", "num7": "7", "num8": "8", "num9": "9", "num0": "0",
    "comma": ",", "sum": "+", "substract": "-", "divide": "÷",
    "multiply": "x", "over-x": "1/", "factorial": "!", "equal-to": "=",
    "square-root": "√", "cube-root": "∛", "square-power": "²",
    "pi": "3,1415926535897932384", "euler": "2,7182818284590452353"};
var calcHistory = [];
var resultValue = "0";
var givenResult = false;
var colorNum = 0;


function setUp() {
    /*
    Preparations for the usage of the calculator
    */
    let terms = document.getElementById("terms");
    let privacy = document.getElementById("privacy");

    // Functionality of the terms and privacy buttons:
    for (element of [terms, privacy]) {
        element.addEventListener("click", helpSection, false);
    }

    // Update of the footer's width when the user opens the page
    skullPosition()

    // Change of the title background color in intervals of 4 seconds:
    setInterval(multiColor, 1000 * 4, document.getElementById("title"));

    // Functionality of the calculator buttons:
    for (idName of document.getElementsByClassName("button")) {
        buttonAction(idName);
    }
}


function multiColor(title) {
    /*
    Change of the background color of the title of the page every 4 seconds
    */
    if (colorNum > colors.length - 1) {colorNum = 0}
    title.style.background = colors[colorNum];
    colorNum += 1;
}


function buttonAction(input) {
    /*
    Button selection action:
    It prepares all AddEventListeners() for the calculator buttons.
    It divides the 'specialValues' from the normals.
    */
    let specialValues = [
        "equal-to", "over-x", "factorial", "square-root", "cube-root",
        "square-power", "divide", "multiply", "sum", "substract"];

    if (specialValues.includes(input.id)) {
        input.addEventListener(
            "click", () => processValue(input.id), false);
    }
    else if (specialValues.includes(input.id) == false) {
        // If input.id is a number or not in the 'specialValues' list:
        input.addEventListener(
            "click", () => bottomScreenPrint(input.id), false);
    }
}


function arithmeticSection(total, symbol, number) {
    /*
    The 'Total' parameter will be processed by 'number' with arithmetic symbols
    */
    switch (symbol) {
        case "+": return total + parseFloat(number);
        case "-": return total - parseFloat(number);
        case "x": return total * parseFloat(number);
        case "÷": return total / parseFloat(number);
    }
}


function scientificSection(total, symbol) {  // Keep working here
    /*
    The 'Total' parameter will be processed by 'number' with scientific symbols
    */
    switch (symbol) {
        case "1/": return 1 / total;
        case "√": return Math.sqrt(total);
        case "∛": return Math.cbrt(total);
        case "²": return total = Math.pow(total, 2);
        case "!": let baseTotal = total.toString();
            if (baseTotal == "0") {total = 1;}
            else if (baseTotal.includes(".") == false && baseTotal[0] != "-") {
                for (let num = 1; num != baseTotal; num++) {total *= num}}
            return total;
    }
}


function calculateValues(history) {
    /*
    It process the history of values to send these numbers (depending
    of their symbols) to diferents functions to return the result.
    */
    if (Number.isNaN(parseFloat(history[0]))) {history.unshift("0");}
    let result = parseFloat(history[0]);

    for (value in history) {
        // Arithmetic section
        if (["+", "-", "x", "÷"].includes(history[value - 1])) {
            result = arithmeticSection(
                result, history[value -1], history[value]);
        }
        // Scientific section
        else if (["1/", "!", "√", "∛", "²"].includes(history[value])) {
            result = scientificSection(result, history[value]);
        }
    }
    return result;
}


function wrongInput(input) {
    /*
    Function that alerts if a scientific input has an incorrect symbol.
    */
    let sym = calcHistory.slice(-1)[0];

    let factorialError = sym == "!"  && input.includes("-", ".");
    let rootError      = sym == "√"  && input[1] == "-";
    let overXError     = sym == "1/" && input.slice(2) == "0";

    if (factorialError || rootError || overXError) {return true;}
    return false;
}


function screenModification(total) {
    /*
    Function that shows the output of the result in the bottom screen,
    but will also show the process in the top one.
    */
    topScreen.innerHTML = "";
    total = total.toString();

    if (total == "Infinity") {
        bottomScreenPrint("clear");
        return bottomScreen.innerHTML = "You can't divide by zero";
    }

    for (value in calcHistory) {
        if (["1/", "!", "√", "∛", "²", "="].includes(calcHistory[value])) {
            previous_result = calculateValues(calcHistory.slice(0, -1));
            
            if (wrongInput(total)) {
                topScreen.innerHTML = "Mathematical Error";
                calcHistory = []; resultValue = total; givenResult = true;break;
            }

            if (["!", "²"].includes(calcHistory.slice(-1)[0])) {
                topScreen.innerHTML =
                `(${previous_result})` + calcHistory.slice(-1)[0];
            }

            else if (["1/", "√", "∛"].includes(calcHistory.slice(-1)[0])) {
                topScreen.innerHTML =
                calcHistory.slice(-1)[0] + `(${previous_result})`;
            }

            // Beginning of the givenResult mode
            calcHistory = []; resultValue = total; givenResult = true; break;
        }

        // If there's a simple number or an arithmetic symbol
        topScreen.innerHTML += " " + calcHistory[value].replace(".", ",");
    }

    bottomScreen.innerHTML = total.replace(".", ",");
}


function processValue(sym) {
    /*
    Function that process the inserted symbol to print the
    progress of the calculation's in the top screen and
    the result of it in the bottom screen.
    */
    if (resultValue.slice(-1) == ",") {resultValue = resultValue.slice(0, -1)}
    calcHistory.push(resultValue.replace(",", "."), calcValues[sym]);

    if (calcHistory.slice(-2)[0] == "0"
    && calcHistory.slice(-1)[0] != "=") {
        calcHistory = calcHistory.slice(0, -3);
        calcHistory.push(calcValues[sym]);
    }

    // Visual process of the calculation in the top and bottom screen:
    screenModification(calculateValues(calcHistory));

    // Preparation for the next calculation
    if (["1/", "!", "√", "∛", "²", "="].includes(calcValues[sym]) == false) {
        resultValue = "0";}
    skullPosition();
}


function givenResultCheck(sym) {
    /*
    Looks if the user got a result, after that checks if the 
    next input is a number or a symbol.

    If the input is a number:
        It restart the values of every screen.

    If the input is a symbol:
        It adds the last number in the top screen and then the
        arithmetic operator.
    */
    if (givenResult && sym != "negate" && (calcHistory.length == 0 ||
        calcHistory.slice(-2)[0].includes("+", "-", "x", "÷"))) {
        givenResult = false;
        resultValue = "0";
        topScreen.innerHTML = "";
    }
}


function bottomScreenPrint(sym) {
    /*
    Prints the selected number in the bottom screen,
    including variables such as "pi" or "e". Even the 'negate'.
    But if the input is a system calculator button such as
    "clear", "ce" or "del", then it will delete characters.
    */
    givenResultCheck(sym);

    if (["clear", "ce"].includes(sym) || ["del1", "del2"].includes(sym)
    && resultValue.length == 1 || sym == "num0"
    && (resultValue == "" || resultValue == "0")) {
        resultValue = "0";
    }

    if (sym == "clear") {
        topScreen.innerHTML = "";
        calcHistory = [];
    }

    else if (sym.includes("num") || sym == "comma"
    && resultValue.includes(",") == false) {
        if (resultValue == "0" && sym != "comma") {resultValue = "";}
        resultValue += calcValues[sym];
    }

    else if (["pi", "euler"].includes(sym)) {
        resultValue = calcValues[sym];
    }

    else if (sym == "negate" && resultValue != "0") {
        if      (resultValue[0] != "-") {resultValue = "-" + resultValue;}
        else if (resultValue[0] == "-") {resultValue = resultValue.slice(1);}
    }

    else if (["del1", "del2"].includes(sym) && resultValue.length > 1) {
        resultValue = resultValue.slice(0, -1);
    }

    // Final print
    bottomScreen.innerHTML = resultValue;
    skullPosition();
}


function skullPosition() {
    /*
    This function changes the position of the skull
    in the right of the calculator, including its image.
    It also increases or reduces the width of the calculator
    depending of the calculator's top and bottom screen length.
    */
    let bottomWidth = (bottomScreen.innerHTML.length - 21) * 24;
    let topWidth = (topScreen.innerHTML.length - 51) * 8;

    let greaterWidth = topWidth;
    if (bottomWidth >= topWidth) {greaterWidth = bottomWidth;}

    switch (greaterWidth <= 0) {
        case true:
            skull.style.left = "calc(50% + 300px)";
            skull.src = "imgs/limit-screen.png";
            calculator.style.width = "600px";
            calculatorInterface.style.width = "560px";
            calculatorScreen.style.width = "504px";
            footer.style.width = "100%";
            break;

        case false:
            skull.src = "imgs/over-limit-screen.png";
            skull.style.left = `calc(50% + 300px + ${greaterWidth}px)`;
            calculator.style.width = `calc(600px + ${greaterWidth}px)`;
            calculatorInterface.style.width = `calc(560px + ${greaterWidth}px)`;
            calculatorScreen.style.width = `calc(504px + ${greaterWidth}px)`;
            footer.style.width = `calc(100% + ${greaterWidth}px)`;
            break;
    }
}


function helpSection(event) {
    /*
    Usage of the "terms and conditions" and "privacy policy" buttons.
    */
    let id = event.target.id;
    alert("I am supposed to show you something about " +
        `${id[0].toUpperCase() + id.slice(1)} and stuff like that.`);

    if (id == "terms") {
        alert("The license of this web site is the MIT LICENSE.");
    }

    else if (id == "privacy") {
        privacyTexts = [
            "Knowing that this web site is about a calculator, there's " +
            "no need to set any kind of privacy politic. Relax...",

            "But I wanna learn how to redirect you from this page to another" +
            " one, so... Let's look at the formal definition of privacy :)",

            "Oh, I almost forget: \nIf you'd have read this, then surely your" +
            " navigator will cancel the next page that I will try to open." +
            "\n\nIf you skipped everything, then you will have no problem >:("]

        for (text of privacyTexts) {alert(text);}
        window.open("https://en.wikipedia.org/wiki/Privacy", "_blank");
    }
}

window.addEventListener('load', setUp, false);  // Starts the script
