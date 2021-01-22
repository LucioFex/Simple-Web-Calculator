// JavaScript document - Luciano Esteban (2021)


// Fundamental variables
const colors = ["#294192", "#2f4d0d", "#790979", "#811414"];
const numsTop = document.getElementById("nums-top");
const numsBottom = document.getElementById("nums-bottom");
var colorNum = 0;
var calculatorValues = [];
var resultValue = "";


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
    colorNum += 1
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

    If the input is a number, then the function will print it in
    the bottom Screen it if it's the first in the list (new calculus).
    If not, then it will be added to the top screen.
    */

    let specialValues = [
        "negate", "ce", "del", "clear", "equal-to", "over-x",
        "factorial", "square-root", "cube-root", "square-power",
        "division", "multiplication", "sum", "substraction"];

    if (specialValues.includes(input.id)) {
        return input.addEventListener("click", topScreenPrint(input), false);
    }
    // If input.id is a number or var number:
    return input.addEventListener("click", bottomScreenPrint, false);
}

function topScreenPrint(sym) {
    /*
    Process the inserted symbol to print the
    progress of the calculation in the top screen.
    */
}

function bottomScreenPrint(num) {  // Beggining of the develop of this function
    /*
    Prints the selected number in the bottom screen,
    including variables such as "pi" or "e".
    */
    if (num.target.id == "comma" && resultValue.includes(",")) {
        return resultValue
    }

    resultValue += num.target.innerHTML
    numsBottom.innerHTML = resultValue;
    return resultValue
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
            "\n\nIf you didn't read anything, then you will have no problem >:("
        )
        
        window.open("https://en.wikipedia.org/wiki/Privacy", "_blank");
    }
}


window.addEventListener('load', setUp, false);  // Starts the script