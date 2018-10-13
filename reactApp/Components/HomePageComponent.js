import React from 'react';
import HelloWorldComponent from './HelloWorldComponent'

class HomePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.generateText = this.generateText.bind(this);
    }

    generateText() {
        return "Hello world!";
    }

    render() {
        return <div>
            <HelloWorldComponent text={this.generateText()}  />
        </div>
    }
}

export default HomePageComponent;