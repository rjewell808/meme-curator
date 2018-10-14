import React from 'react';

class ControlBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    swipeRight() {
    	
    }

    swipeLeft() {

    }

    render() {
        return <div className="row mx-0 p-2" id="controls">
        	<button type="button" className="btn btn-outline-info d-block mr-0" onClick={() => { this.swipeLeft() }}>No</button>
        	<button type="button" className="btn btn-outline-info d-block ml-auto" onClick={() => { this.swipeRight() }}>Yes</button>
        </div>
    }
}

export default ControlBarComponent;