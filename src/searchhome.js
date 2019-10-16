import React from 'react';

function SearchHome(props) {
	return (
		<div id="search-container">
			<form className="pure-form pure-form-stacked column">
				<fieldset>
					<legend>Get Top 10 related game titles</legend>
					<div>
						<label htmlFor="search-title">Enter a search term: </label>
						<input type="text" id="search-title" className="search" onChange={props.inputTitle} required />
					</div>
					<div>
						<input
							type="button"
							className="submit button-success button-small pure-button"
							onClick={props.submitTitle}
							value="Submit Search"
						/>
					</div>
				</fieldset>
			</form>
			<div id="or" className="column">
				<h5>OR</h5>
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
							onChange={props.inputTitleData}
							required
						/>
						<label htmlFor="search-plat-data">Enter a platform: </label>
						<input
							type="text"
							id="search-plat-data"
							className="search"
							placeholder="Example: pc"
							onChange={props.inputPlatData}
							required
						/>
					</div>
					<div>
						<input
							type="button"
							className="submit button-success pure-button"
							onClick={props.submitData}
							value="Submit Search"
						/>
					</div>
				</fieldset>
			</form>
		</div>
		/*<div id="game-results" />
        </div>*/
	);
}

export default SearchHome;
