import React from 'react'
import axios from 'axios'

class FavoriteComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			favorites: []
		}
		console.log(this.state.favorites)

	}

	componentDidMount() {
    	axios.get('/api/getFavorites')
    	.then(function(data) {
    		let newFavorites = [];
    		for (var i = 0; i < data.data.result.length; i++) {
    			newFavorites.push(data.data.result[i]);
    		}
    		console.log(newFavorites)
    		this.setState({
    			favorites: newFavorites
    		})
    	}.bind(this))
    	.catch(function(error) {
    		console.log(error);	
    	})
    }

	render() {
		return ( <div className="row favorites mx-0">
		{
			this.state.favorites.map((element) => {
				return <div className="col-2 fav-img"><a target="_blank" href={`${element.image_url}`}><img src={`${element.image_url}`}></img></a></div>
			})
		}
			</div> );
	}
}

export default FavoriteComponent