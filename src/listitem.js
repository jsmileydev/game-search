import React from 'react';
import { platform } from 'os';

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

export default GameListItem;
