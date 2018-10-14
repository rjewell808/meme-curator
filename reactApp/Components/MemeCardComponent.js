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
        		subreddit: "Loading"
			}],
			memeWeights: {},
			total: 0
		}
		this.getNewMemes = this.getNewMemes.bind(this)
    }

    swiped(e) {
    	let newCurrentMemes = this.state.currentMemes
    	let currObj = newCurrentMemes.pop()
		
		let newMemeWeights = this.state.memeWeights;
		if (e.throwDirection.toString() === "Symbol(RIGHT)") {
			newMemeWeights[currObj.subreddit] += 4;
		} else {
			newMemeWeights[currObj.subreddit] -= 4;
		}

		// Prevent from going below 0
		if (newMemeWeights[currObj.subreddit] < 0) {
			newMemeWeights[currObj.subreddit] = 0
		}

		this.setState({
			currentMemes: newCurrentMemes,
			memeWeights: newMemeWeights
		});

		if (this.state.currentMemes.length < 10) {
			console.log("Current memes less than 10")
			this.getNewMemes();
		}
	}
	
	getNewMemes() {
		axios.post('/api/updatememes', {
			memeWeights: this.state.memeWeights
		})
		.then(function(data) {
			console.log("Received new memes")
			let newCurrentMemes = this.state.currentMemes
			for (var i = 0; i < data.data.result.length; i++) {
				newCurrentMemes.unshift(data.data.result[i])
				newCurrentMemes.unshift(data.data.result[i])
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
    		let newTotal = 0;
    		Object.keys(data.data.memeWeights).map((key) => {
				newTotal += data.data.memeWeights[key]
			})
    		for (var i = 0; i < data.data.result.length; i++) {
    			newCurrentMemes.push(data.data.result[i]);
    			newCurrentMemes.push(data.data.result[i]);
    		}
    		this.setState({
				currentMemes: newCurrentMemes,
				memeWeights: data.data.memeWeights,
				total: newTotal
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
		let key2 = -1;

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
								  </div>
								</div>  
							)
	                	})
		        		//let meme = this.state.currentMemes[0];
	       
	                }
	                </Swing>
        		</div>

        		<div className="col" id="memestats">
        			{
        				Object.keys(this.state.memeWeights).map((w_key) => {
        					key2++;
        					let element = this.state.memeWeights[w_key]
        					let width = (this.state.memeWeights[w_key] / this.state.total) * 100.0;

        					console.log(width)		
        					return (
        						<div className="row mx-0">
	        						<div className="col">
		        						<div className="row mb-0 mx-0">
		        							{w_key}
		        						</div>
		        						<div key={key2} className="row mb-2 stat-row mx-0" style={{width: `${width}%`}}>
		        							{element}
		        						</div>
	        						</div>
        						</div>
        					)
        				})
        			}
            	</div>
            </div>
    	);
    }
}

export default MemeCardComponent;