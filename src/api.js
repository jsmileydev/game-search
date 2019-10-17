import React from 'react';
import SearchHome from './searchhome';
import ReactLoading from 'react-loading';

const LoadAni = ({ type, color }) => (
	<div id="load-overlay">
	<ReactLoading type={'bubbles'} color={'rgb(233, 232, 232)'} height={'10%'} width={'10%'} id="load-ani" />
	</div>
);

class ChickenCoop extends React.Component {
	constructor() {
		super();
		this.state = {
			game: '',
			plat: 'pc',
			isLoaded: null,
			results: '',
			gameItem: ''
		};
		this.inputTitle = this.inputTitle.bind(this);
		this.submitTitle = this.submitTitle.bind(this);
		this.inputTitleData = this.inputTitleData.bind(this);
		this.inputPlatData = this.inputPlatData.bind(this);
		this.submitData = this.submitData.bind(this);
		this.searchTitle = this.searchTitle.bind(this);
	}

	//SEARCH FOR ALL GAMES RELATED TO INPUT

	inputTitle(e) {
		var search = e.target.value;
		this.setState({ game: search });
	}

	submitTitle() {
		//Turn on loading animation and convert input to readable data
		this.setState({ isLoaded: true });
		var data = null;
		var url = this.state.game;
		var _this = this;

		//XMLHttpRequest to Metacritic Database

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		//Function to sort results
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

				//Turn off loading animation and clear input fields
				_this.setState({ isLoaded: null });
				document.getElementById('search-title').value = '';

				//Convert responseText string to useable object
				var gameobj = JSON.parse(this.responseText);

				const noResult = (
					<div id="no-result">
						<span>Error: Can't read input</span>
					</div>
				);

				if (gameobj.result === 'No result') {
					_this.setState({ gameItem: noResult });
				} else {
					//Use dynamicSort to group result object by title (otherwise seemingly random?)
					gameobj.result = gameobj.result.sort(dynamicSort('title'));
					console.log(gameobj.result, typeof gameobj.result);

					//Create result div

					const ListItem = gameobj.result.map((item) => {
						return (
							<div className="title-result" key={item.title + item.platform}>
								<div className="title-result-btn">
									<input
										type="image"
										src={require("./images/icons8-search-30.png")}
										alt="search title"
										className="title-submit button-success pure-button"
										value="Search this game"
										data-title={item.title}
										data-plat={item.platform}
										onMouseOver={_this.searchTitle}
										onClick={_this.submitData}
									/>
								</div>
								<div className="title-info">
									<span className="title-key">
										<strong>Title:</strong>
									</span>
									<span className="title-name">{item.title}</span>
									<br />
									<span className="title-key">
										<strong>Platform:</strong>
									</span>
									<span className="title-platform">{item.platform}</span>
								</div>
							</div>
						);
					});

					_this.setState({ gameItem: ListItem });
				}
			}
		});

		xhr.open('GET', 'https://chicken-coop.p.rapidapi.com/games?title=' + url);
		xhr.setRequestHeader('x-rapidapi-host', 'chicken-coop.p.rapidapi.com');
		xhr.setRequestHeader('x-rapidapi-key', '5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde');

		xhr.send(data);
	}

	// SEARCH FULL DATA FOR ONE GAME

	//Set state of platform to default value of input field ('pc') on initial load
	componentDidMount() {
		var platSearch = document.getElementById('plat-drop').value;
		this.setState({ plat: platSearch });
	}

	//Take title and platform from input fields

	inputTitleData(e) {
		var search = e.target.value;
		this.setState({ game: search });
		console.log(search);
	}

	inputPlatData(e) {
		var platSearch = e.target.value;
		this.setState({ plat: platSearch });
		console.log(platSearch);
	}

	//FROM LIST OF TITLE RESULTS, SEARCH FOR DATA ON ONE

	searchTitle(e) {
		var newName = e.target.getAttribute('data-title');
		var newPlatform = e.target.getAttribute('data-plat');
		this.setState({
			game: newName,
			plat: newPlatform
		});
		console.log(this.state.game, this.state.plat);
		console.log(newName, newPlatform);
	}

	submitData() {
		//Turn on loading animation and convert input to readable data for database request
		this.setState({ isLoaded: true });
		console.log(this.state.game, this.state.plat);
		var data = null;
		var title = this.state.game.replace(':', '').toLowerCase();
		var plat = this.state.plat
			.toLowerCase()
			.trim()
			.replace(/ +/g, '')
			.replace('nintendo 64', 'n64')
			.replace('nintendo', '')
			.replace('ps', 'playstation')
			.replace('xone', 'xbox-one')
			.replace('x360', 'xbox360')
			.replace('game boy advance', 'gba')
			.replace(/([0-9]+)/g, '-$1');
		var metalink = 'https://www.metacritic.com/game/' + plat.replace(/\s/g, '-') + '/' + title.replace(/\s/g, '-');
		var _this = this;

		//XMLHttpRequest to Metacritic Database

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener('readystatechange', function() {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
				//Turn off loading animation and clear input fields
				_this.setState({ isLoaded: null });
				document.getElementById('search-title-data').value = '';
				document.getElementById('search-plat-data').value = '';

				//Convert responseText string to useable object
				var gameobj = JSON.parse(this.responseText);
				console.log(gameobj.result);
				if (gameobj.result === 'No result') {
					console.log('Incorrect game title');
				}
				console.log(
					'https://www.metacritic.com/game/' + plat.replace(/\s/g, '-') + '/' + title.replace(/\s/g, '-')
				);
				//Create result and no result div

				const noResult = (
					<div id="no-result">
						<span>Please enter a correct game title and platform</span>
					</div>
				);

				if (gameobj.result === 'No result') {
					_this.setState({ gameItem: noResult });
				} else {
					var scoreBg = '';
					if (gameobj.result['score'] >= 75) {
						scoreBg = 'green-bg';
					} else if (gameobj.result['score'] >= 50) {
						scoreBg = 'yellow-bg';
					} else {
						scoreBg = 'red-bg';
					}
					const gameItemData = (
						<div id="title-result-container">
							<div id="game-cover-title">
								<img src={gameobj.result['image']} alt="game cover" id="game-cover" className="pure-img" />
								<div id="game-title">
									<p id="game-name">
										<strong>{gameobj.result['title']}</strong>
									</p>
									<p>
										<span>
											<strong>Metacritic Score: </strong>
										</span>
										<span id="game-score" className={scoreBg}>
											{gameobj.result['score']}
										</span>
									</p>
									<p>
										<a href={metalink} alt="Metacritic review" id="game-review">
											{' '}
											View Full Metacritic Review
										</a>
									</p>
								</div>								
							</div>
							<div id="game-info">
								<div className="data-result">
									<span>
										<strong>Metacritic Score: </strong>
									</span>
									<span id="game-score" className={scoreBg}>
										{gameobj.result['score']}
									</span>
									<a href={metalink} alt="Metacritic review" id="game-review">
										{' '}
										View Full Metacritic Review
									</a>
									<br />
									<span className="data-key">
										<strong>Description: </strong>
									</span>&nbsp;
									<span className="data-value">{gameobj.result['description']}</span>
									<br />
									<span className="data-key">
										<strong>Genre: </strong>
									</span>&nbsp;
									<span className="data-value">
										{gameobj.result['genre'].toString().replace(/,/g, ', ')}
									</span>
									<br />
									<span className="data-key">
										<strong>Publisher: </strong>
									</span>&nbsp;
									<span className="data-value">
										{gameobj.result['publisher'].toString().replace(/,/g, ', ')}
									</span>
									<br />
									<span className="data-key">
										<strong>Rating: </strong>
									</span>&nbsp;
									<span className="data-value">{gameobj.result['rating']}</span>
									<br />
									<span className="data-key">
										<strong>Release Date: </strong>
									</span>&nbsp;
									<span className="data-value">{gameobj.result['releaseDate']}</span>
									<br />
									<span className="data-key">
										<strong>Also Available On: </strong>
									</span>&nbsp;
									<span className="data-value">
										{gameobj.result['alsoAvailableOn'].toString().replace(/,/g, ', ')}
									</span>
									<br />
								</div>
							</div>
						</div>
					);
					_this.setState({ gameItem: gameItemData });
				}
			}
		});

		xhr.open('GET', 'https://chicken-coop.p.rapidapi.com/games/' + title + '?platform=' + plat);
		xhr.setRequestHeader('x-rapidapi-host', 'chicken-coop.p.rapidapi.com');
		xhr.setRequestHeader('x-rapidapi-key', '5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde');

		xhr.send(data);
	}

	render() {
		return (
			<main>
			<p id="api-tag">Powered by Chicken Coop's Metacritic API</p>
				<div id="head-ellipse" />
				<header>
					<div id="gameboy-head">
						<img
							src={require('./images/icons8-visual-game-boy-768.png')}
							alt="gameboy-head"
							className="pure-css"
						/>
					</div>
				</header>

				<div id="wrapper">
					<SearchHome
						inputTitle={this.inputTitle}
						inputTitleData={this.inputTitleData}
						inputPlatData={this.inputPlatData}
						submitTitle={this.submitTitle}
						submitData={this.submitData}
						game={this.state.game}
						platform={this.state.plat}
					/>
					<div id="game-results">
						{' '}
						{this.state.isLoaded ? <LoadAni /> : <div>{this.state.gameItem} </div>}{' '}
					</div>
				</div>
			</main>
		);
	}
}

export default ChickenCoop;
