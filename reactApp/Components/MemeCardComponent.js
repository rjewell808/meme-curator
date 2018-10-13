import React from 'react';
import Swing from 'react-swing';
import axios from 'axios';

class MemeCardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	currentMemes: []
        }
        console.log(this.state)
    }

    swiped(e) {
    	let newCurrentMemes = this.state.currentMemes
    	newCurrentMemes.shift()
    	console.log(e)
    	this.setState({
    		currentMemes: newCurrentMemes
    	})
    }

    componentDidMount() {
    	axios.get('/api/getAllMemes')
    	.then(function(data) {
    		this.setState({
    			currentMemes: data.data.result
    		})
    	}.bind(this))
    	.catch(function(error) {
    		console.log(error);	
    	})
    }



    render() {

    	const imgStyle = {
	    	backgroundImage: `url(/meme-images/sample2.jpg)`,
	    	backgroundSize: "cover"
	    };
	    let key = 0;

	    let imageToRender = this.state.currentMemes.length > 0 ? this.state.currentMemes[0].imageUrl : './sample1.jpg';
        return ( <div>
        	<Swing
                className="stack"
                tagName="div"
                setStack={stack => this.setState({ stack: stack })}
                ref="stack"
                throwoutend={e => this.swiped(e)}
                >
                {	
	        		//let meme = this.state.currentMemes[0];
                	<div className="card mx-auto mt-4">
					  <div className="card-body">
					  	<h5 className="card-title">Now this is definitley me 😂</h5>
					  	<div className="card-img" style={{backgroundImage: `url(${imageToRender})`}}>
					  		<img src={`${imageToRender}`}></img>
					  	</div>
					  </div>
					</div>         
                }
                </Swing>
        </div> );
    }
}

export default MemeCardComponent;