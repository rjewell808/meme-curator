import React from 'react';
import Swing from 'react-swing';

class MemeCardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( <div>
        	<Swing
                className="stack"
                tagName="div"
                setStack={stack => this.setState({ stack: stack })}
                ref="stack"
                throwout={e => console.log('throwout', e)}
                >
                {
                    <div className="card mx-auto mt-4">
					  <div className="card-body">
					  	<h5 className="card-title">Now this is definitley me 😂</h5>
					  	<img className="card-img" src="/meme-images/sample1.jpg"></img>
					  </div>
					</div>
                }
                </Swing>
        </div> );
    }
}

export default MemeCardComponent;