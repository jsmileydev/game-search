import React from 'react';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			game: '',
			plat: ''
		};
		this.inputGameTitle = this.inputGameTitle.bind(this);
		this.submitGameTitle = this.submitGameTitle.bind(this);
		this.fetchTitleResults = this.fetchTitleResults.bind(this);
		this.inputGameTitleData = this.inputGameTitleData.bind(this);
		this.inputGamePlatData = this.inputGamePlatData.bind(this);
		this.submitGameData = this.submitGameData.bind(this);
		this.fetchDataResults = this.fetchDataResults.bind(this);
	}

	inputGameTitle(e) {
		var search = e.target.value;
		this.setState({ game: search });
	}

	submitGameTitle() {
		console.log(this.state.game);
		this.fetchTitleResults();
	}

	fetchTitleResults() {
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

		xhr.open('GET', 'https://chicken-coop.p.rapidapi.com/games?title=' + url);
		xhr.setRequestHeader('x-rapidapi-host', 'chicken-coop.p.rapidapi.com');
		xhr.setRequestHeader('x-rapidapi-key', '5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde');

		xhr.send(data);
	}

	inputGameTitleData(e) {
		var search = e.target.value;
		this.setState({ game: search });
	}

	componentDidMount() {
		var platSearch = document.getElementById('search-plat-data').value;
		this.setState({
			plat: platSearch
		})
	}

	

	inputGamePlatData(e) {
		var platSearch = e.target.value;
		this.setState({ plat: platSearch });
	}

	submitGameData() {
		this.fetchDataResults();
	}

	fetchDataResults() {
		var data = null;

		var title = this.state.game;
		var plat = this.state.plat;

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener('readystatechange', function() {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
				var gameobj = JSON.parse(this.responseText);
				console.log(gameobj.result);
				/*var html = '';
				gameobj.result.forEach(function(val) {
					var keys = Object.keys(val);
					html += "<div class=''>";
					keys.forEach(function(key) {
						html += '<strong>' + key + '</strong>: ' + val[key] + '<br>';
					});
					html += '</div><br>';
				});*/
				document.getElementById('game-results').innerHTML = gameobj.result;
			}
		});

		xhr.open('GET', 'https://chicken-coop.p.rapidapi.com/games/' + title + '?platform=' + plat);
		xhr.setRequestHeader('x-rapidapi-host', 'chicken-coop.p.rapidapi.com');
		xhr.setRequestHeader('x-rapidapi-key', '5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde');

		xhr.send(data);
	}

	render() {
		return (
			<div>
				<h1>Game search</h1>
				<h4>Returns all related game titles and the platforms released under</h4>

				<div className="wrapper">
					<div className="controls">
						<form>
							<p>
								<label htmlFor="search-title">Enter a SINGLE search term (required): </label>
								<input
									type="text"
									id="search-title"
									className="search"
									onChange={this.inputGameTitle}
									required
								/>
							</p>
							<p>
								<input
									type="button"
									className="submit"
									onClick={this.submitGameTitle}
									value="Submit search"
								/>
							</p>
						</form>
						<form>
							<p>
								<label htmlFor="search-title-data">Enter a SINGLE game title (required): </label>
								<input
									type="text"
									id="search-title-data"
									className="search"
									onChange={this.inputGameTitleData}
									required
								/>
								<label htmlFor="search-plat-data">Enter a SINGLE platform (required): </label>
								<input
									type="text"
									id="search-plat-data"
									className="search"
									value="pc"
									onChange={this.inputGamePlatData}
									required
								/>
							</p>
							<p>
								<input
									type="button"
									className="submit"
									onClick={this.submitGameData}
									value="Submit search"
								/>
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
