import React from 'react';
import SearchHome from './searchhome';
import ReactLoading from 'react-loading';


const LoadAni = ({ type, color }) => (
	<ReactLoading type={'bubbles'} color={'rgb(233, 232, 232)'} height={'10%'} width={'10%'} id='load-ani' />
);

class ChickenCoop extends React.Component {
	constructor() {
		super();
		this.state = {
			game: '',
			plat: '',
			isLoaded: null,
			showSearch: true,
			showNew: false
		};
		this.inputGameTitle = this.inputGameTitle.bind(this);
		this.submitGameTitle = this.submitGameTitle.bind(this);
		this.inputGameTitleData = this.inputGameTitleData.bind(this);
		this.inputGamePlatData = this.inputGamePlatData.bind(this);
		this.submitGameData = this.submitGameData.bind(this);
		this.loadResults = this.loadResults.bind(this);
		this.completeResults = this.completeResults.bind(this);
	}

	//SEARCH FOR ALL GAMES RELATED TO INPUT

	loadResults() {
		this.setState({
			isLoaded: false
		});
	}

	completeResults() {
		this.setState({
			isLoaded: true
		});
	}

	inputGameTitle(e) {
		var search = e.target.value;
		this.setState({ game: search});
	}

	submitGameTitle() {

		this.setState({isLoaded: true});

		//XMLHttpRequest to Metacritic Database

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

				//Create result div
				var html = '';
				html += '<div id="title-result-container">';
				gameobj.result.forEach(function(val) {
					var keys = Object.keys(val);
					html += "<div className='title-result'>";
					keys.forEach(function(key) {
						html +=
							'<span className="title-key"><strong>' +
							key.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/^./, function(str) {
								return str.toUpperCase();
							}) +
							':</strong></span>&nbsp;<span className="title-value"> ' +
							val[key] +
							'</span><br>';
					});
					html += '</div><br>';
				});
				html += '</div>';
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

		this.setState({isLoaded: true});

		//XMLHttpRequest to Metacritic Database

		var data = null;

		var title = this.state.game;
		var plat = this.state.plat;

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener('readystatechange', function() {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
				//Convert responseText string to useable object
				var gameobj = JSON.parse(this.responseText);
				console.log(gameobj.result);
				if (gameobj.result === 'No result') {
					console.log('Incorrect game title');
				}
				//Create result div
				var html = '';
				//Separate game cover & title first in 1st div
				html +=	'<div id="game-cover-title"><img src="' + gameobj.result['image'] +	'" alt="game cover" id="game-cover pure-img" /><p className="game-name"><strong>' +
					gameobj.result['title'] + '</strong></p></div><div id="game-info">';
				//Then loop through remaining info in 2nd div
				for (var key in gameobj.result) {
					if (gameobj.result.hasOwnProperty(key)) {
						if (key !== 'image' && key !== 'title') {
							html +=
								'<div className="data-result"><span className="data-key"><strong>' +
								key.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/^./, function(str) {
									return str.toUpperCase();
								}) +
								': </strong></span>&nbsp;<span className="data-value"> ' +
								gameobj.result[key].toString().replace(/,/g, ', ') +
								'</span><br></div><br>';
						}
					}
				}
				if (gameobj.result === 'No result') {
					html = '<div id="no-result"><span>Please enter a correct game title</span></div>';
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
		/*if ( isLoaded) {
			resultDiv =  <div id="game-results"></div> 
		} else {
			resultDiv = <ReactLoading type={'bubbles'} color={'rgb(233, 232, 232)'} height='667' width='375' />
		}*/

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
				<div id="game-results"> { this.state.isLoaded ? <LoadAni/> : <div></div> } </div> 
			</div>
		);
	}
}

export default ChickenCoop;
