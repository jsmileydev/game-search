import React from 'react';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			name: []
		};
		this.fetchResults = this.fetchResults.bind(this);
	}

	fetchResults(e) {
		// Use preventDefault() to stop the form submitting
		e.preventDefault();

	}

	componentDidMount() {
		var title = document.querySelector('.search');
		fetch('https://chicken-coop.p.rapidapi.com/games?title=' + title.value, {
			method: 'GET',
			headers: {
				'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
				'x-rapidapi-key': '5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde'
			}
		})
			.then((response) => {
                console.log(response);
                
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				<h1>Game search</h1>

				<div className="wrapper">
					<div className="controls">
						<form>
							<p>
								<label for="search">Enter a SINGLE search term (required): </label>
								<input type="text" id="search" className="search" required />
							</p>
							<p>
								<button className="submit" onClick={this.fetchResults} >Submit search</button>
							</p>
						</form>
					</div>
				</div>
				<div className="results">
					<section />
				</div>
			</div>
		);
	}
}

export default Home;
