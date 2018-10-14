import React from 'react';
import axios from 'axios';

class ActionBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    addFavorite() {
    	axios.post('/api/addFavorite', {
		    image: this.props.imageURL
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
    }

    render() {
        return <div className="d-inline">
        	<button type="button" className="btn btn-outline-success mx-auto d-block mb-2" onClick={() => { this.addFavorite() }}>♥</button>
        </div>
    }
}

export default ActionBarComponent;