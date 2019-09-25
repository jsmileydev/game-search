import React from 'react';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			title: ''
		};
        this.updateTitle = this.updateTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchResults = this.fetchResults.bind(this);
    }

    updateTitle(e) {
        this.setState({ title: e.target.value})
    }
    
    onSubmit(e) {
        console.log(this.state.title);
        this.fetchResults();
        e.preventDefault();
    }
    
    fetchResults() {
        
		// Use preventDefault() to stop the form submitting

		fetch('https://chicken-coop.p.rapidapi.com/games?title=`{this.state.title}`', {
			method: 'GET',
			headers: {
				'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
				'x-rapidapi-key': '5d0b4bd3ccmshb5942bd75f3f8b8p1c8bb5jsnb3247ba29bde'
			}
		})
			.then((resource) => {
                console.log(resource);
            })
            .then((resource) => {
                this.setState({
                    
                })
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
								<label htmlFor="search">Enter a SINGLE search term (required): </label>
								<input type="text" id="search" className="search" onChange={this.updateTitle} required />
							</p>
							<p>
								<button className="submit" onClick={this.onSubmit} >Submit search</button>
							</p>
						</form>
					</div>
				</div>
				<div className="results">
                    <p>{this.state.title}</p>
				</div>
			</div>
		);
	}
}

export default Home;
