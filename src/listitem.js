import React from 'react';



/*class GameListItem extends React.Component {
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
}*/

class GameListItem extends React.Component {
    render(){
        return(
            <div>
                <div id="game-cover-title">
                    <img src={this.props.results['image']} alt="game cover" id="game-cover pure-img" />
                    <p className="game-name"><strong>{this.props.results['title']}</strong></p>
                </div>
                <div id="game-info">
                    {this.props.results.map((item) => (
                        <ListInfo 
                            key={item.title}
                            title={item.title}
                            image={item.image}
                            availableplats={item.alsoAvailableOn}
                            description={item.description}
                            developer={item.developer}
                            genre={item.gennre}
                            publisher={item.publisher}
                            rating={item.rating}
                            release={item.releaseDate}
                            score={item.score}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

function ListInfo(props) {
    return (
        <div className="data-result">
            <span className="data-key"><strong>Also Available On: </strong></span>
            <span className="data-value"><strong>{this.props.availableplats}</strong></span>
            <span className="data-key"><strong>Description: </strong></span>
            <span className="data-value"><strong>{this.props.description}</strong></span>
            <span className="data-key"><strong>Genre: </strong></span>
            <span className="data-value"><strong>{this.props.genre}</strong></span>
            <span className="data-key"><strong>Publisher: </strong></span>
            <span className="data-value"><strong>{this.props.publisher}</strong></span>
            <span className="data-key"><strong>Rating: </strong></span>
            <span className="data-value"><strong>{this.props.rating}</strong></span>
            <span className="data-key"><strong>Release Date: </strong></span>
            <span className="data-value"><strong>{this.props.release}</strong></span>
        </div>
    );
}

/*function ListItem() {
    render() {
        const listInfo = []
        for(var key in gameobj.result) {
            if (gameobj.result.hasOwnProperty(key)) {
                if (key !== 'image' && key !== 'title' && key !== 'score') {
                    listInfo.push(
                        <div className="data-result">
                        <span className="data-key"><strong>{key.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/^./, function(str) {
                        return str.toUpperCase();})}: </strong></span>
                        <span className="data-value">{gameobj.result[key].toString().replace(/,/g, ', ')}</span><br/></div>);
                    
                }
            }
        };
        return (
            <div>
                <div id="game-cover-title">
                    <img src={gameobj.result['image']} alt="game cover" id="game-cover pure-img" />
                    <p className="game-name"><strong>{gameobj.result['title']}</strong></p>
                </div>
                <div id="game-info">
                    {listInfo}
                </div>
            </div>
        );
    }  
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

export default ListInfo;
