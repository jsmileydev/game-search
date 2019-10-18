import React from 'react';

function SearchHome(props) {
	return (
		<div id="search-container">
			<form className="pure-form pure-form-stacked column" id="title-form">
				<fieldset>
					<legend>Top 10 Related Games</legend>
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
			{/*<div id="or" className="column">
				<h5>OR</h5>
	</div>*/}
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
							required
						/>
						<label htmlFor="search-plat-data">Select a platform: </label>
						<input
							type="text"
							id="search-plat-data"
							className="search"
							onChange={props.inputPlatData}
							placeholder="Example: pc"
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
	);
}

export default SearchHome;
