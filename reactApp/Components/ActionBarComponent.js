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
  		console.log(document.getElementById("fav-but").className)
		document.getElementById("fav-but").setAttribute("class", "btn btn-success d-block my-2")
		console.log(document.getElementById("fav-but").className)
    }

    render() {
        return <div className="d-inline ml-auto">
        	<button type="button" id="fav-but" className="btn btn-outline-success d-block my-2" onClick={() => { this.addFavorite() }}>♥</button>
        </div>
    }
}

export default ActionBarComponent;