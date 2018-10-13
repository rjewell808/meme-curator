import React from 'react';
import HelloWorldComponent from './HelloWorldComponent'
import NavBarComponent from './NavBarComponent'

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
            <NavBarComponent />
        </div>
    }
}

export default HomePageComponent;