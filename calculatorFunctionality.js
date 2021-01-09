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
    let id = event.target.id;
    alert("I am supposed to show you something about " +
        `${id[0].toUpperCase() + id.slice(1)} and stuff like that.`);

    if (id == "terms") {
        alert("The license of this web site is the MIT LICENSE");
    }
    
    else if (id == "privacy") {
        alert("Knowing that this web site is about a calculator, there's " +
            "no need to set any kind of privacy politic. Relax...");
        alert("But I wanna learn how to redirect you from this page to" +
            "another one, so... Let's look at the formal definition of privacy. 😁")
    }
}


window.addEventListener('load', setUp, false);