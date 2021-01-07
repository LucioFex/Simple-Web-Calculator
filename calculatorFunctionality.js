// JavaScript document

var terms
var privacy

function setUp () {
    terms = document.getElementById("terms");
    privacy = document.getElementById("privacy");
    
    for (element of [terms, privacy]) {
        element.addEventListener("click", notice, false);
    }
}

function notice(event) {
    console.log("I WORK FOR", event.target.id) // Check later
}


window.addEventListener('load', setUp, false);