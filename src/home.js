import React from 'react';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			game: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		//this.fetchResults = this.fetchResults.bind(this);
	}

	handleChange(e) {
		var search = e.target.value;
		this.setState({ game: search });
	}

	handleClick() {
		console.log(this.state.game);
		this.fetchResults();
	}

	/*componentDidMount() {
		this.fetchResults();
	}*/

	fetchResults() {
		// Use preventDefault() to stop the form submitting
		var data = null;

		var url = this.state.game;

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener('readystatechange', function() {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
				var gameobj = JSON.parse(this.responseText);
				console.log(gameobj.result);
				var html = '';
				gameobj.result.forEach(function(val) {
					var keys = Object.keys(val);
					html += "<div class=''>";
					keys.forEach(function(key) {
						html += '<strong>' + key + '</strong>: ' + val[key] + '<br>';
					});
					html += '</div><br>';
				});
				document.getElementById('game-results').innerHTML = html;
			}
		});

		xhr.open("GET", "https://chicken-coop.p.rapidapi.com/games?title=" + url);
		xhr.setRequestHeader("x-rapidapi-host", "chicken-coop.p.rapidapi.com");
		xhr.setRequestHeader("x-rapidapi-key", "5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde");

		xhr.send(data);
	}

	render() {
		return (
			<div>
				<h1>Game search</h1>

				<div className="wrapper">
					<div className="controls">
						<form>
							<p>
								<label htmlFor="search">Enter a SINGLE search term (required): </label>
								<input
									type="text"
									id="search"
									className="search"
									onChange={this.handleChange}
									required
								/>
							</p>
							<p>
								<input type="button" className="submit" onClick={this.handleClick} value="Submit search"/>
							</p>
						</form>
					</div>
				</div>
				<div id="game-results" />
			</div>
		);
	}
}

export default Home;
