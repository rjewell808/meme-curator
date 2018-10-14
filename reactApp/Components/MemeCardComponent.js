import React from 'react';
import Swing from 'react-swing';
import axios from 'axios';
import ActionBarComponent from './ActionBarComponent'

class MemeCardComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        	currentMemes: [{
        		imageUrl: "./images/sample1.jpg",
        		title: "NA",
        		subreddit: "Papa pls"
			}],
			memeWeights: {}
		}
		
		this.getNewMemes = this.getNewMemes.bind(this)
    }

    swiped(e) {
    	let newCurrentMemes = this.state.currentMemes
    	let currObj = newCurrentMemes.pop()
		
		let newMemeWeights = this.state.memeWeights;
		if (e.throwDirection.toString() === "Symbol(Right)") {
			newMemeWeights[currObj.subreddit]++;
		} else {
			newMemeWeights[currObj.subreddit]--;
		}

		this.setState({
			currentMemes: newCurrentMemes,
			memeWeights: newMemeWeights
		});

		if (this.state.currentMemes < 10) {
			this.getNewMemes();
		}
	}
	
	getNewMemes() {
		axios.post('/api/updatememes', {
			memeWeights: this.state.memeWeights
		})
		.then(function(result) {
			let newCurrentMemes = this.state.currentMemes
			for (var i = 0; i < data.data.result.length; i++) {
				newCurrentMemes.push(data.data.result[i])
				newCurrentMemes.push(data.data.result[i])
			}

			this.setState({
				currentMemes: newCurrentMemes,
				memeWeights: data.data.memeWeights
			})
		}.bind(this))
		.catch(function(err) {
			console.log(err)
		})
	}

    componentDidMount() {
    	axios.get('/api/getAllMemes')
    	.then(function(data) {
    		let newCurrentMemes = this.state.currentMemes;
    		for (var i = 0; i < data.data.result.length; i++) {
    			newCurrentMemes.push(data.data.result[i]);
    			newCurrentMemes.push(data.data.result[i]);
    		}
    		this.setState({
				currentMemes: newCurrentMemes,
				memeWeights: data.data.memeWeights
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
		let key = -1;
		
        return ( 

        	<div className="row mx-0 mt-4">
                <div className="col">
                </div>
                    
                <div className="col">
                    <Swing
	                className="stack"
	                tagName="div"
	                setStack={stack => this.setState({ stack: stack })}
	                ref="stack"
	                throwout={e => this.swiped(e)}
	                >
	                {	
	                	this.state.currentMemes.map((element) => {
	                		key++;
	                		var cardClass = "d-none"

	                		if(key == this.state.currentMemes.length - 1){
	                			cardClass = "card mx-auto";
	                		}

	                		return (
			                	<div key={key} className={ cardClass } id={key} ref={key} throwout={e => console.log('card throwout', e)}>
								  <div className="card-body">
								  	<div className="row mx-0">
								  		<h5 className="my-auto">{element.title}</h5>	
										<ActionBarComponent imageURL={element.imageUrl} />
								  	</div>
								  	<div className="card-img" style={{backgroundImage: `url(${element.imageUrl})`}}>
								  		<img src={`${element.imageUrl}`}></img>
								  	</div>
								  	<div>From: {element.subreddit}</div>
									<button onClick={() => {this.getNewMemes()}}>updatememes</button>
								  </div>
								</div>  
							)
	                	})
		        		//let meme = this.state.currentMemes[0];
	       
	                }
	                </Swing>
        		</div>

        		<div className="col">
            	</div>
            </div>
    	);
    }
}

export default MemeCardComponent;