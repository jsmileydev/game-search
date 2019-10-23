import React from 'react';

function SearchHome(props) {
	return (
		<div id="search-container">
			{/*TITLE LIST SEARCH*/}
			<form className="pure-form pure-form-stacked column" id="title-form" >
				<fieldset>
					<legend>Top 10 Related Games</legend>
					<div>
						<label htmlFor="search-title">Search games: </label>
						<input type="text" id="search-title" className="search" onChange={props.inputTitle} onKeyPress={props.handleKeyDownTitle} required />
					</div>
				</fieldset>
			</form>
			{/*<div id="or" className="column">
				<h5>OR</h5>
	</div>*/}
			{/*GAME DATA SEARCH*/}
			<form className="pure-form pure-form-stacked column">
				<fieldset>
					<legend>Search By Name</legend>
					<div>
						<label htmlFor="search-title-data">Enter an EXACT game title: </label>
						<input
							type="text"
							id="search-title-data"
							className="search"
							onChange={props.inputTitleData}
							onKeyPress={props.handleKeyDownData}
							required
						/>
						<label htmlFor="search-plat-data">Enter a platform (required): </label>
						<input
							type="text"
							id="search-plat-data"
							className="search"
							onChange={props.inputPlatData}
							onKeyPress={props.handleKeyDownData}
							placeholder="Required"
							required
						/>
						{/*<select id="plat-drop" defaultValue="pc"
							onChange={props.inputPlatData}
							required>
							<option value="pc">PC</option>
							<option value="playstation4">PS4</option>
							<option value="xboxone">Xbox One</option>
							<option value="switch">Switch</option>
							<option value="wiiu">Wii U</option>
							<option value="3ds">3DS</option>
							<option value="playstation-vita">PS Vita</option>
							<option value="ios">IOS</option>
							<option value="playstation3">PS3</option>
							<option value="playstation2">PS2</option>
							<option value="playstation">Playstation</option>
							<option value="psp">PSP</option>
							<option value="x360">Xbox 360</option>
							<option value="xbox">Xbox</option>
							<option value="wii">Nintendo Wii</option>
							<option value="ds">Nintendo DS</option>
							<option value="gamecube">Gamecube</option>
							<option value="nintendo64">Nintendo 64</option>
							<option value="gameboyadvance">Game Boy Advance</option>
							<option value="dreamcast">Dreamcast</option>
</select>*/}
					</div>
				</fieldset>
			</form>
		</div>
	);
}

export default SearchHome;
