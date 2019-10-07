import React from 'react';
import { platform } from 'os';

onClick={(item) => 
        this.setState({
            game: item.title
            plat: item.platform
        }); _this.submitGameData()}

class GameListItem extends React.Component {
	render() {
		return (
			<div className="title-result">
				<span className="title-key">
					<strong>Title:</strong>
				</span>
				<span className="title-value">
					<strong>{this.props.title}</strong>
				</span>
				<br />
				<span className="title-key">
					<strong>Platform:</strong>
				</span>
				<span className="title-value">
					<strong>{this.props.platform}</strong>
				</span>
				<br />
			</div>
		);
	}
}

renderItems = () => {
    const ListItem = gameobj.result.map((item, index) => (
        <div className="title-result" key={item.title + platform}>
            <span className="title-key">
                <strong>Title:</strong>
            </span>
            <span className="title-value">
                <strong>{item.title}</strong>
            </span>
            <br />
            <span className="title-key">
                <strong>Platform:</strong>
            </span>
            <span className="title-value">
                <strong>{item.platform}</strong>
            </span>
            <br />
        </div>
    ));
    return ListItem;
}

function ListItem(props) {
	var gameTitle = props.result.forEach(function(val) {
		var keys = Object.keys(val);
		keys.forEach(function(key) {
			return (
				<div className="title-result">
					<span className="title-key">
						<strong>
							{key.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/^./, function(str) {
								return str.toUpperCase();
							})}:{' '}
						</strong>
					</span>
					<span className="title-value">
						<strong>{val[key]}</strong>
					</span>
					<br />
				</div>
			);
		});
	});
	return { gameTitle };
}



				/*


				function gameTitle(obj) {
					obj.forEach(function(val) {
						var keys = Object.keys(val);
						keys.forEach(function(key) {
							return (
								<div className="title-result">
									<span className="title-key">
										<strong>
											{key.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/^./, function(str) {
												return str.toUpperCase();
											})}:
										</strong>
									</span>
									<span className="title-value">
										<strong>{val[key]}</strong>
									</span>
									<br />
								</div>
							);
						});
					});
				}

				_this.setState({
					results: <div></div>
				});
				
				//console.log(_this.state.results);

				//Create result div

				/*function gameTitle() {
					gameobj.result.forEach(function(val) {
						var keys = Object.keys(val);
						keys.forEach(function(key) {
							return (
								<div className="title-result">
									<span className="title-key">
										<strong>
											{key.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/^./, function(str) {
												return str.toUpperCase();
											})}:
										</strong>
									</span>
									<span className="title-value">
										<strong>{val[key]}</strong>
									</span>
									<br />
								</div>
							);
						});
					});
				}				

				/*<ListItem props={gameobj}/>

				var html = '<div id="title-result-container">';
				gameobj.result.forEach(function(val) {
					
					var keys = Object.keys(val);
					html += '<div className="title-result">';
					keys.forEach(function(key) {

						html +=
							'<span className="title-key" data-title=><strong>' +
							key.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/^./, function(str) {
								return str.toUpperCase();
							}) +
							':</strong></span>&nbsp;<span className="title-value"> ' +
							val[key] +
							'</span><br>';
					});
					html += '</div><br>';
					console.log(_this.state.game);
				});
				html += '</div>';
				document.getElementById('game-results').append(<ListItem props={gameobj}/>);*/

export default GameListItem;
