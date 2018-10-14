import React from 'react';
import HelloWorldComponent from './HelloWorldComponent'
import NavBarComponent from './NavBarComponent'
import MemeCardComponent from './MemeCardComponent'
import ActionBarComponent from './ActionBarComponent'

class HomePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.generateText = this.generateText.bind(this);
    }

    generateText() {
        return "Hello world!";
    }

    render() {
        return <div className="container-fluid px-0">
            <NavBarComponent />
            <div className="row mx-0 mt-4">
                <div className="col">
                </div>
                <div className="col">
                    <MemeCardComponent />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    }
}

export default HomePageComponent;