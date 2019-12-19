import React from 'react';
import ReactLoading from 'react-loading';
 

class GameResults extends React.Component {

    render() {
        if(this.props.isLoaded === null) {
            return <div />
        }
        return ( this.props.isLoaded ? <div id="game-results" /> : <ReactLoading type={'bubbles'} color={'rgb(233, 232, 232)'} height='667' width='375' />);
    }
}

export default GameResults;