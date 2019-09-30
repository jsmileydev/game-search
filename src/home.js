import React from 'react';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			game: []
		};
		this.updateTitle = this.updateTitle.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.fetchResults = this.fetchResults.bind(this);
	}

	updateTitle(e) {
		//this.setState({ title: e.target.value });
	}

	onSubmit(e) {
		console.log(this.state.game);
		//this.fetchResults();
		e.preventDefault();
	}

	componentDidMount() {
		this.fetchResults();
	}

	fetchResults() {
		// Use preventDefault() to stop the form submitting
		var data = null;

		var url = 'tomb%20raider';

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener('readystatechange', function() {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
				var obj = JSON.parse(this.responseText);
				console.log(obj.result);
				document.getElementById('game-results').innerHTML = obj.result;
			}
		});

		xhr.open('GET', 'https://chicken-coop.p.rapidapi.com/games?title=' + url);
		xhr.setRequestHeader('x-rapidapi-host', 'chicken-coop.p.rapidapi.com');
		xhr.setRequestHeader('x-rapidapi-key', '5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde');

		xhr.send(data);


		/*fetch('https://chicken-coop.p.rapidapi.com/games?title=', {
			method: 'GET',
			headers: {
				'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
				'x-rapidapi-key': '5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde'
			}
		})
			.then(response => {
                response.json()
                console.log(response.results)
			})
			.then((data) => {
				let games = data.response.map((games) => {
					return <li key={games.response}>{games.result.title}</li>;
				});
				this.setState({
					game: games
                });
                console.log('state', this.state.game);
            })
            .then(result => {
                this.setState({
                    game: result
                })
            })
			.catch(err => {
				console.log(err);
			});*/
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
									onChange={this.updateTitle}
									required
								/>
							</p>
							<p>
								<button className="submit" onClick={this.onSubmit}>
									Submit search
								</button>
							</p>
						</form>
					</div>
				</div>
				<div className="results">
					<ul id="game-list">{this.state.game.map((game) => <li key={game.id}>{game.game}</li>)}</ul>
				</div>
				<div id="game-results">

				</div>
			</div>
		);
	}
}

export default Home;
