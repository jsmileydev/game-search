import React from 'react';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			game: '',
			plat: '',
			showSearch: true,
			showNew: false
		};
		this.inputGameTitle = this.inputGameTitle.bind(this);
		this.submitGameTitle = this.submitGameTitle.bind(this);
		//this.fetchTitleResults = this.fetchTitleResults.bind(this);
		this.inputGameTitleData = this.inputGameTitleData.bind(this);
		this.inputGamePlatData = this.inputGamePlatData.bind(this);
		this.submitGameData = this.submitGameData.bind(this);
		//this.fetchDataResults = this.fetchDataResults.bind(this);
	}

	//SEARCH FOR ALL GAMES RELATED TO INPUT

	inputGameTitle(e) {
		var search = e.target.value;
		this.setState({ game: search });
	}

	submitGameTitle() {
		/*console.log(this.state.game);
		this.fetchTitleResults();
	}

	fetchTitleResults() {*/
		// Use preventDefault() to stop the form submitting
		var data = null;

		var url = this.state.game;

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		//Function to sort result items
		function dynamicSort(property) {
			var sortOrder = 1;
			if (property[0] === '-') {
				sortOrder = -1;
				property = property.substr(1);
			}
			return function(a, b) {
				if (sortOrder === -1) {
					return b[property].localeCompare(a[property]);
				} else {
					return a[property].localeCompare(b[property]);
				}
			};
		}

		xhr.addEventListener('readystatechange', function() {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
				//Convert responseText string to useable object
				var gameobj = JSON.parse(this.responseText);
				console.log(gameobj.result);
				//Use dynamicSort to group result object by title (otherwise seemingly random?)
				gameobj.result = gameobj.result.sort(dynamicSort('title'));
				var html = '';
				gameobj.result.forEach(function(val) {
					var keys = Object.keys(val);
					html += "<div className='title-result'>";
					keys.forEach(function(key) {
						html +=
							'<span className="title-key"><strong>' +
							key.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/^./, function(str) {
								return str.toUpperCase();
							}) +
							'</strong></span><span className="title-value">: ' +
							val[key] +
							'</span><br>';
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

	// SEARCH FULL DATA FOR ONE GAME

	inputGameTitleData(e) {
		var search = e.target.value;
		this.setState({ game: search });
	}

	//Set state of platform to default value of input field ('pc') on initial load
	componentDidMount() {
		var platSearch = document.getElementById('search-plat-data').value;
		this.setState({
			plat: platSearch
		});
	}

	inputGamePlatData(e) {
		var platSearch = e.target.value;
		this.setState({ plat: platSearch });
	}

	submitGameData() {
		/*this.fetchDataResults();
	}

	fetchDataResults() {*/
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
				var html = '';
				html +=
					'<div className="game-cover"><img src="' +
					gameobj.result['image'] +
					'" alt="game cover" className="game-cover pure-img" /></div><div className="game-info">';
				for (var key in gameobj.result) {
					if (gameobj.result.hasOwnProperty(key)) {
						if (key !== 'image') {
							html +=
								'<div className="data-result"><span className="data-key"><strong>' +
								key.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/^./, function(str) {
									return str.toUpperCase();
								}) +
								'</strong></span><span className="data-value">: ' +
								gameobj.result[key] +
								'</span><br></div><br>';
						}
					}
				}
				html += '</div>';
				document.getElementById('game-results').innerHTML = html;
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
				<p>Powered by Chicken Coop's Metacritic API</p>
				<div className="wrapper">
					<div className="container">
						<form className="pure-form pure-form-stacked column">
							<fieldset>
								<legend>Return all related game titles and its released platforms</legend>
								<div>
									<label htmlFor="search-title">Enter a search term: </label>
									<input
										type="text"
										id="search-title"
										className="search"
										onChange={this.inputGameTitle}
										required
									/>
								</div>
								<div>
									<input
										type="button"
										className="submit"
										onClick={this.submitGameTitle}
										value="Submit search"
									/>
								</div>
							</fieldset>
						</form>
						<div id="or" className="column">
							<h3>OR</h3>
						</div>
						<form className="pure-form pure-form-stacked column">
							<fieldset>
								<legend>Return all information related to a specific game</legend>
								<div>
									<label htmlFor="search-title-data">Enter an EXACT game title: </label>
									<input
										type="text"
										id="search-title-data"
										className="search"
										onChange={this.inputGameTitleData}
										required
									/>
									<label htmlFor="search-plat-data">Enter a platform: </label>
									<input
										type="text"
										id="search-plat-data"
										className="search"
										placeholder="Example: pc"
										onChange={this.inputGamePlatData}
										required
									/>
									</div>
								<div>
									<input
										type="button"
										className="submit"
										onClick={this.submitGameData}
										value="Submit search"
									/>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
				{/*<div id="new-search">
					<button id="new" className="submit">New Search</button>
		</div>*/}
				<div id="game-results" />
			</div>
		);
	}
}



export default Home;
