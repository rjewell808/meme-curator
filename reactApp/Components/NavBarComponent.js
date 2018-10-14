import React from 'react';
import { Link } from 'react-router-dom'

class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
        	<ul className="nav px-2">
                <li className="navbar-brand">
                    <Link to="/">MemeMachine</Link>
                </li>
                <li className="nav-item ml-auto">
                    <a className="nav-link"><Link to="/favorites">Favorites</Link></a>
                </li>
        		<li className="nav-item">
        			<a className="nav-link" href="#">Sign In</a>
        		</li>
        		<li className="nav-item">
        			<a className="nav-link" href="#">Register</a>
        		</li>
        	</ul>
        </div> )
    }
}

export default NavBarComponent;