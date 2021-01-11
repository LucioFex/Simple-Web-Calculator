// JavaScript document

var colors = ["#294192", "#2f4d0d", "#412781", "#811414"];
var nums = 0

function setUp () {

    // Functionality of the terms and privacy buttons
    let terms = document.getElementById("terms");
    let privacy = document.getElementById("privacy");

    for (element of [terms, privacy]) {
        element.addEventListener("click", notice, false);
    }

    // Change of the title background-color in intervals
    setInterval(multiColor, 1000 * 4, document.getElementById("title"));
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

        alert("But I wanna learn how to redirect you from this page to " +
            "another one, so... Let's look at the formal definition of privacy. 😁");
        
        window.open("https://en.wikipedia.org/wiki/Privacy", "_blank");
    }
}

function multiColor(title) {
    // Change of the background color of the title of the page.
    if (nums > (colors.length - 1)) {
        nums = 0
    }

    title.style.background = colors[nums];

    nums += 1
}


window.addEventListener('load', setUp, false);  // Starts the script