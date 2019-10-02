import React from 'react';

class SearchHome extends React.Component {
    render() {
        return (
				<div className="wrapper">
					<div className="container">
						<form className="pure-form pure-form-stacked column">
							<fieldset>
								<legend>
									Get all related game titles and their released platforms
								</legend>
								<div>
									<label htmlFor="search-title">Enter a search term: </label>
									<input
										type="text"
										id="search-title"
										className="search"
										onChange={this.props.inputGameTitle}
										required
									/>
								</div>
								<div>
									<input 
										type="button"
										className="submit button-success pure-button"
										onClick={this.props.submitGameTitle}
										value="Submit Search"
									/>
								</div>
							</fieldset>
						</form>
						<div id="or" className="column">
							<h3>OR</h3>
						</div>
						<form className="pure-form pure-form-stacked column">
							<fieldset>
								<legend>Get all details about a specific game</legend>
								<div>
									<label htmlFor="search-title-data">Enter an EXACT game title: </label>
									<input
										type="text"
										id="search-title-data"
										className="search"
										onChange={this.props.inputGameTitleData}
										required
									/>
									<label htmlFor="search-plat-data">Enter a platform: </label>
									<input
										type="text"
										id="search-plat-data"
										className="search"
										placeholder="Example: pc"
										onChange={this.props.inputGamePlatData}
										required
									/>
								</div>
								<div>
									<input
										type="button"
										className="submit button-success pure-button"
										onClick={this.props.submitGameData}
										value="Submit Search"
									/>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
				/*<div id="game-results" />
        </div>*/
        )
    }
}

export default SearchHome;