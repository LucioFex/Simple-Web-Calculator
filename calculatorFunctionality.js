// JavaScript document - Simple Web Calculator - Luciano Esteban (2021)

// Fundamental variables
const topScreen = document.getElementById("nums-top");
const bottomScreen = document.getElementById("nums-bottom");
const calculator = document.getElementById("calculator");
const calculatorInterface = document.getElementById("calculator-interface");
const calculatorScreen = document.getElementById("calculator-screen");
const skull = document.getElementById("skull")
const colors = ["#294192", "#2f4d0d", "#790979", "#811414"];
const calcValues = {
    "num1": "1", "num2": "2", "num3": "3", "num4": "4", "num5": "5",
    "num6": "6", "num7": "7", "num8": "8", "num9": "9", "num0": "0",
    "comma": ",", "sum": "+", "substract": "-", "divide": "/",
    "multiply": "*", "over-x": "1/", "factorial": "!", "equal-to": "=",
    "square-root": "√", "cube-root": "∛", "square-power": "²",
    "pi": "3,1415926535897932384", "euler": "2,7182818284590452353"};
var calculatorHistory = [];
var resultValue = "0";
var colorNum = 0;
var symbol = "+";


function setUp() {
    /*
    Preparations for the usage of the calculator
    */
    let terms = document.getElementById("terms");
    let privacy = document.getElementById("privacy");

    // Functionality of the terms and privacy buttons:
    for (element of [terms, privacy]) {
        element.addEventListener("click", notice, false);
    }

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
    if (colorNum > (colors.length - 1)) {
        colorNum = 0
    }

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
            "click", function() {processValue(input.id)}, false);
    }
    else if (specialValues.includes(input.id) == false) {
        // If input.id is a number or not in the 'specialValues' list:
        input.addEventListener(
            "click", function() {bottomScreenPrint(input.id)}, false);
    }
}


function arithmeticSection(total, number) {
    /*
    The 'Total' parameter will be processed by 'number' with arithmetic symbols
    */
    if      (symbol == "+") {total += parseFloat(number);}
    else if (symbol == "-") {total -= parseFloat(number);}
    else if (symbol == "*") {total *= parseFloat(number);}
    else if (symbol == "/") {total /= parseFloat(number);}
    return total;
}


function scientificSection(total) {
    /*
    The 'Total' parameter will be processed by 'number' with scientific symbols
    */
    if      (symbol == "1/") {total = 1 / total;}
    else if (symbol == "!")  {/* Continue here*/}
    else if (symbol == "√")  {total = total ** (1/2);}
    else if (symbol == "∛")  {total ** (1/3);}
    else if (symbol == "²")  {total = total ** 2;}
    return total;
}


function calculateValues(history) {
    /*
    It process the history of values to send these numbers (depending
    of their symbols) to diferents functions to return the result.
    */
    let result = 0;

    for (value of history) {
        if (["+", "-", "*", "/", "=",
            "1/", "!", "√", "∛", "²"].includes(value)) {symbol = value;}

        // Arithmetic section
        else if (["+", "-", "*", "/"].includes(symbol) && value != symbol) {
            result = arithmeticSection(result, value);
        }

        else if (["1/", "!", "√", "∛", "²"].includes(symbol)
        && value != symbol) {
            result = scientificSection(result);
        }

        // Result section
        else if ("=".includes(symbol)) {break;}
    }

    symbol = "+";
    return result;
}


function screenModification(array, total) {
    topScreen.innerHTML = "";

    if (total == "Infinity") {
        bottomScreenPrint("clear");
        return bottomScreen.innerHTML = "You can't divide by zero";
    }

    for (value of array) {
        topScreen.innerHTML += " " + value.replace(".", ",");
        if (value == "=") {calculatorHistory = []; resultValue = total; break;}
    }
}


function processValue(sym) {
    /*
    Function that process the inserted symbol to print the
    progress of the calculation's in the top screen and
    the result of it in the bottom screen.
    */
    if (resultValue.slice(-1) == ",") {resultValue = resultValue.slice(0, -1)}
    calculatorHistory.push(resultValue.replace(",", "."), calcValues[sym]);
    let total = calculateValues(calculatorHistory).toString();

    if (calculatorHistory.slice(-2)[0] == "0"
    && calculatorHistory.slice(-1)[0] != "=") {
        calculatorHistory = calculatorHistory.slice(0, -3);
        calculatorHistory.push(calcValues[sym]);
    }

    // Visual process of the calculation in the top and bottom screen:
    screenModification(calculatorHistory, total)

    // Preparation for the next calculation
    if (sym != "equal-to") {resultValue = "0";}
    bottomScreen.innerHTML = total.toString().replace(".", ",");
    skullPosition();
}


function bottomScreenPrint(sym) {
    /*
    Prints the selected number in the bottom screen,
    including variables such as "pi" or "e". Even the 'negate'.
    But if the input is a system calculator button such as
    "clear", "ce" or "del", then it will delete characters.
    */
    if (topScreen.innerHTML.slice(-1) == "=" && sym != "negate") {
        resultValue = "0";
        topScreen.innerHTML = "";
    }
    
    if (["clear", "ce"].includes(sym) || ["del1", "del2"].includes(sym)
    && resultValue.length == 1 || sym == "num0"
    && (resultValue == "" || resultValue == "0")) {
        resultValue = "0";
    }

    if (sym == "clear") {
        topScreen.innerHTML = "";
        calculatorHistory = [];
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
    depending in the length of the calculator top and bottom screen.
    */
    let bottomWidth = (bottomScreen.innerHTML.length - 21) * 24;
    let topWidth = (topScreen.innerHTML.length - 51) * 8;

    let greaterWidth = topWidth;
    if (bottomWidth >= topWidth) {greaterWidth = bottomWidth;}

    if (greaterWidth <= 0) {
        skull.style.left = "calc(50% + 300px)";
        skull.src = "imgs/limit-screen.png";
        calculator.style.width = "600px";
        calculatorInterface.style.width = "560px";
        calculatorScreen.style.width = "504px";
    }

    else if (greaterWidth > 0) {
        skull.style.left = `calc(50% + 300px + ${greaterWidth}px)`;
        skull.src = "imgs/over-limit-screen.png";
        calculator.style.width = `calc(600px + ${greaterWidth}px)`;
        calculatorInterface.style.width = `calc(560px + ${greaterWidth}px)`;
        calculatorScreen.style.width = `calc(504px + ${greaterWidth}px)`;
    }
}


function notice(event) {
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
        alert("Knowing that this web site is about a calculator, there's " +
            "no need to set any kind of privacy politic. Relax...");
        alert(
            "But I wanna learn how to redirect you from this page to another" +
            " one, so... Let's look at the formal definition of privacy :)");
        alert(
            "Oh, I olmost forget: \nIf you'd have read this, then surely your" +
            " navigator will cancel the next page that I will try to open." +
            "\n\nIf you skipped everything, then you will have no problem >:("
        )

        window.open("https://en.wikipedia.org/wiki/Privacy", "_blank");
    }
}


window.addEventListener('load', setUp, false);  // Starts the script