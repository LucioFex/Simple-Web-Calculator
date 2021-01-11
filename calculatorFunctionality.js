// JavaScript document

var terms
var privacy

function setUp () {

    // Functionality of the terms and privacy buttons
    terms = document.getElementById("terms");
    privacy = document.getElementById("privacy");

    for (element of [terms, privacy]) {
        element.addEventListener("click", notice, false);
    }

    // Change of the title background-color in intervals
    multiColor(document.getElementById("title"), 1)
}

function notice(event) {
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

function multiColor(title, module) {  // Check this function later

    if (module % 2 == 0) {
        title.style.background = "red";
    }
    else if (module % 2 == 1) {
        title.style.background = "blue";
    }

    setInterval(multiColor(title, module + 1), 1000);

}


window.addEventListener('load', setUp, false);  // Starts the script