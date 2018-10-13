import React from 'react';

class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
        	<ul className="nav px-2">
                <li className="navbar-brand">
                    MemeMachine
                </li>
        		<li className="nav-item ml-auto">
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