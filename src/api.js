var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://chicken-coop.p.rapidapi.com/games/skyrim?platform=pc");
xhr.setRequestHeader("x-rapidapi-host", "chicken-coop.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde");

xhr.send(data);