import React from 'react';
import SearchHome from './searchhome';
import ReactLoading from 'react-loading';

const LoadAni = ({ type, color }) => (
	<ReactLoading type={'bubbles'} color={'rgb(233, 232, 232)'} height={'10%'} width={'10%'} id="load-ani" />
);

class ChickenCoop extends React.Component {
	constructor() {
		super();
		this.state = {
			game: '',
			plat: '',
			isLoaded: null,
			results: '',
			gameItem: ''
		};
		this.inputGameTitle = this.inputGameTitle.bind(this);
		this.submitGameTitle = this.submitGameTitle.bind(this);
		this.inputGameTitleData = this.inputGameTitleData.bind(this);
		this.inputGamePlatData = this.inputGamePlatData.bind(this);
		this.submitGameData = this.submitGameData.bind(this);
		this.searchTitle = this.searchTitle.bind(this);
	}

	//SEARCH FOR ALL GAMES RELATED TO INPUT

	inputGameTitle(e) {
		var search = e.target.value;
		this.setState({ game: search });
	}

	submitGameTitle() {
		this.setState({ isLoaded: true });
		var data = null;
		var url = this.state.game;
		var _this = this;

		//XMLHttpRequest to Metacritic Database

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
				//Use dynamicSort to group result object by title (otherwise seemingly random?)
				gameobj.result = gameobj.result.sort(dynamicSort('title'));
				console.log(gameobj.result, typeof gameobj.result);
				const ListItem = gameobj.result.map((item) => {
					return (
						<div className="title-result" key={item.title + item.platform}>
							<input
								type="button"
								className="submit title-submit button-success pure-button"
								value="Search this game"
								data-title={item.title}
								data-plat={item.platform}
								onClick={_this.searchTitle}
							/>
							<br />
							<span className="title-key">
								<strong>Title:</strong>
							</span>
							<span className="title-name">{item.title}</span>
							<br />
							<span className="title-key">
								<strong>Platform:</strong>
							</span>
							<span className="title-platform">{item.platform}</span>
							<br />
						</div>
					);
				});
				_this.setState({ gameItem: ListItem });
			}
		});

		xhr.open('GET', 'https://chicken-coop.p.rapidapi.com/games?title=' + url);
		xhr.setRequestHeader('x-rapidapi-host', 'chicken-coop.p.rapidapi.com');
		xhr.setRequestHeader('x-rapidapi-key', '5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde');

		xhr.send(data);
	}

	//FROM LIST OF TITLE RESULTS, SEARCH FOR DATA ON ONE

	searchTitle(e) {
		var newName = e.target.getAttribute('data-title');
		var newPlatform = e.target.getAttribute('data-plat');
		this.setState({
			game: newName,
			plat: newPlatform,
			isLoaded: true
		});
		console.log(newName, newPlatform);
	}

	// SEARCH FULL DATA FOR ONE GAME

	inputGameTitleData(e) {
		var search = e.target.value;
		this.setState({ game: search });
	}

	//Set state of platform to default value of input field ('pc') on initial load
	componentDidMount() {
		var platSearch = document.getElementById('search-plat-data').value;
		this.setState({ plat: platSearch });
	}

	inputGamePlatData(e) {
		var platSearch = e.target.value;
		this.setState({ plat: platSearch });
	}

	submitGameData() {
		this.setState({ isLoaded: true });
		var data = null;
		var title = this.state.game;
		var plat = this.state.plat.replace(/\s/g, '-').replace('ps', 'playstation').replace(/([0-9])/g, '-$1');
		var _this = this;

		//XMLHttpRequest to Metacritic Database

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener('readystatechange', function() {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
				_this.setState({ isLoaded: null });
				//Convert responseText string to useable object
				var gameobj = JSON.parse(this.responseText);
				console.log(gameobj.result);
				if ('error' in gameobj)
					if (gameobj.result === 'No result') {
						console.log('Incorrect game title');
					}
				console.log(
					'https://www.metacritic.com/game/' + plat.replace(/\s/g, '-') + '/' + title.replace(/\s/g, '-')
				);
				//Create result div

				const gameListItem = (
						<div id="title-result-container">
							<div id="game-cover-title">
								<img src={gameobj.result['image']} alt="game cover" id="game-cover pure-img" />
								<p className="game-name">
									<strong>{gameobj.result['title']}</strong>
								</p>
							</div>
							<div id="game-info">
								<div className="data-result">
									<span className="data-key">
										<strong>Also Available On: </strong>
									</span>
									<span className="data-value">
										{gameobj.result['alsoAvailableOn'].toString().replace(/,/g, ', ')}
									</span><br/>
									<span className="data-key">
										<strong>Description: </strong>
									</span>
									<span className="data-value">
										{gameobj.result['description']}
									</span><br/>
									<span className="data-key">
										<strong>Genre: </strong>
									</span>
									<span className="data-value">
										{gameobj.result['genre'].toString().replace(/,/g, ', ')}
									</span><br/>
									<span className="data-key">
										<strong>Publisher: </strong>
									</span>
									<span className="data-value">
										{gameobj.result['publisher'].toString().replace(/,/g, ', ')}
									</span><br/>
									<span className="data-key">
										<strong>Rating: </strong>
									</span>
									<span className="data-value">
										{gameobj.result['rating']}
									</span><br/>
									<span className="data-key">
										<strong>Release Date: </strong>
									</span>
									<span className="data-value">
										{gameobj.result['releaseDate']}
									</span>
								</div>
							</div>
						</div>
					);

				_this.setState({ gameItem: gameListItem });

				/*var html = '';
				//Separate game cover & title first in 1st div
				html += '<div id="game-cover-title"><img src="' + gameobj.result['image'] + '" alt="game cover" id="game-cover pure-img" /><p  className="game-name"><strong>' + gameobj.result['title'] + '</strong></p></div><div id="game-info">';
				//Then loop through remaining info in 2nd div

				for (var key in gameobj.result) {
					if (gameobj.result.hasOwnProperty(key)) {
						if (key !== 'image' && key !== 'title' && key !== 'score') {
							html +=
								'<div className="data-result"></div><span className="data-key"><strong>' +
								key.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/^./, function(str) {
									return str.toUpperCase();
								}) +
								': </strong></span>&nbsp;<span className="data-value"> ' +
								gameobj.result[key].toString().replace(/,/g, ', ') +
								'</span><br/>';
						}
					}
				}
				html +=
					'<strong>Metacritic Score: </strong><span id="game-score" className="">' +
					gameobj.result['score'] +
					'</span> <a href="https://www.metacritic.com/game/' +
					plat.replace(/\s/g, '-') +
					'/' +
					title.replace(/\s/g, '-') +
					'" alt="Metacritic review" id="game-review">View Full Review</a></div></div>';
				if (gameobj.result === 'No result') {
					html = '<div id="no-result"><span>Please enter a correct game title or platform</span></div>';
				}
				document.getElementById('game-results').innerHTML = html;
				/*var score = gameobj.result['score'];
				if (score >= 75) {
					score.classList.add('green-bg');
				} else if (score >= 50) {
					score.classList.add('yellow-bg');
				} else {
					score.classList.add('red-bg');
				}*/
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
				<div id="head-ellipse" />
				<header>
					<div id="gameboy-head">
						<img
							src={require('./images/icons8-visual-game-boy-768.png')}
							alt="gameboy-head"
							className="pure-css"
						/>
						<p>Powered by Chicken Coop's Metacritic API</p>
					</div>
				</header>
				<SearchHome
					inputGameTitle={this.inputGameTitle}
					inputGameTitleData={this.inputGameTitleData}
					inputGamePlatData={this.inputGamePlatData}
					submitGameTitle={this.submitGameTitle}
					submitGameData={this.submitGameData}
				/>
				<div id="game-results"> {this.state.isLoaded ? <LoadAni /> : <div>{this.state.gameItem} </div>} </div>
			</div>
		);
	}
}

export default ChickenCoop;
