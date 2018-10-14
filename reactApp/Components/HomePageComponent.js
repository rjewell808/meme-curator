import React from 'react';
import HelloWorldComponent from './HelloWorldComponent'
import NavBarComponent from './NavBarComponent'
import MemeCardComponent from './MemeCardComponent'
import FavoriteComponent from './FavoriteComponent'
import ActionBarComponent from './ActionBarComponent'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import CustomFavoriteComponent from './CustomFavoriteComponent'

class HomePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.generateText = this.generateText.bind(this);
    }

    generateText() {
        return "Hello world!";
    }

    render() {
        return (
            <Router>
                <div className="container-fluid px-0">
                    <NavBarComponent />
                    <Route exact path="/" component={MemeCardComponent} />
                    <Route exact path="/favorites" component={FavoriteComponent} />
                    <Route exact path="/customfavorite" component={CustomFavoriteComponent} />
                </div>
            </Router>
        );
    }
}

export default HomePageComponent;