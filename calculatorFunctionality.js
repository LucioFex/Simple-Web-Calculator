// JavaScript document - Luciano Esteban (2021)

// Fundamental variables
const topScreen = document.getElementById("nums-top");
const bottomScreen = document.getElementById("nums-bottom");
const calculator = document.getElementById("calculator");
const calculatorInterface = document.getElementById("calculator-interface");
const calculatorScreen = document.getElementById("calculator-screen");
const skull = document.getElementById("skull")
const colors = ["#294192", "#2f4d0d", "#790979", "#811414"];
const normalValues = {
    "num1": "1", "num2": "2", "num3": "3", "num4": "4", "num5": "5",
    "num6": "6", "num7": "7", "num8": "8", "num9": "9", "num0": "0",
    "comma": ",",
    "pi": "3,1415926535897932384", "euler": "2,7182818284590452353"};
var resultValue = "0";
// var calculateValues = [];
var calculateValues = "";
var colorNum = 0;


function setUp() {
    // Functionality of the terms and privacy buttons:
    let terms = document.getElementById("terms");
    let privacy = document.getElementById("privacy");
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
    // Change of the background color of the title of the page every 4 seconds
    if (colorNum > (colors.length - 1)) {
        colorNum = 0
    }

    title.style.background = colors[colorNum];
    colorNum += 1;
}


function buttonAction(input) {
    /*
    Button selection action:
        It prepares all AddEventListeners of the calculator buttons.

    This function prints in the bottom calculator
    screen the selected symbol or number.
    Also it adds the value to a list to be process by another function.

    If the ID of the input class has an special name such as
    "clear", "del", "ce" or any type of calculator system button,
    Then it will have an special tratment.

    If the input is a number or comma, then the function will print it in
    the bottom Screen.
    */

    let specialValues = [
        "equal-to", "over-x", "factorial", "square-root", "cube-root",
        "square-power", "division", "multiplication", "sum", "substraction"];

    if (specialValues.includes(input.id)) {
        return input.addEventListener(
            "click", function() {processValue(input.id)}, false);
    }
    // If input.id is a number or not in the 'specialValues' list:
    return input.addEventListener(
        "click", function() {bottomScreenPrint(input.id)}, false);
}


function processValue(sym) {  // Continue here
    /*
    Process the inserted symbol to print the
    process of the calculation in the top screen.
    */
    // Arithmetic section:
    if (sym == "sum" || sym == "substraction"
        || sym == "division" || sym == "multiplication") {

        // calculateValues.push(resultValue);
        calculateValues += resultValue;
        topScreen.innerHTML = calculateValues;
        bottomScreenPrint("ce");
    }
}


function bottomScreenPrint(sym) {
    /*
    Prints the selected number in the bottom screen,
    including variables such as "pi" or "e". Even the 'negate'.
    But if the input is a system calculator
    button such as "clear", "ce" or "del".
    */
    if (sym == "clear" || sym == "ce" || sym == "clear"
        || (sym == "del1" || sym == "del2") && resultValue.length == 1
        || sym == "num0" && (resultValue == "" || resultValue == "0")) {

        resultValue = "0";
    }

    if (sym == "clear") {
        // calculateValues = [];
        calculateValues = "";
    }

    else if (sym.includes("num") || sym == "comma"
    && resultValue.includes(",") == false) {
        if (resultValue == "0" && sym != "comma") {resultValue = "";}
        resultValue += normalValues[sym];
    }

    else if (sym == "pi" || sym == "euler") {
        resultValue = normalValues[sym];
    }

    else if (sym == "negate" && resultValue != "") {
        if (resultValue[0] != "-") {resultValue = "-" + resultValue;}
        else if (resultValue[0] == "-") {
            resultValue = resultValue.slice(1, resultValue.length);}
    }

    else if ((sym == "del1" || sym == "del2") && resultValue.length > 1) {
        resultValue = resultValue.slice(0, -1);
    }

    // Final print
    bottomScreen.innerHTML = resultValue;
    if (resultValue == "") {bottomScreen.innerHTML = "0";}
    skullPosition();
    return resultValue;
}


function skullPosition() {
    /*
    This function changes the position of the skull
    in the right of the calculator, including its image
    and increases or reduces the width of the calculator
    depending in the length of the calculator top and bottom screen.
    */
    let bottomWidth = (bottomScreen.innerHTML.length - 21) * 24;
    let topWidth = (topScreen.innerHTML.length - 51) * 10;

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

    console.log("Calculator:", calculator.clientWidth);
    console.log("Calculator Interace:", calculatorInterface.clientWidth);
    console.log("Calculator Screen:", calculatorScreen.clientWidth);
    console.log("bottomWidth:", bottomWidth);
    console.log("topWidth:", topWidth);
    console.log("greaterWidth:", greaterWidth);
    console.log("=".repeat("Calculator Interace:".length));
}


function notice(event) {
    // Usage of the "terms and conditions" and "privacy policy" buttons
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