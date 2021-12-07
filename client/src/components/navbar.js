import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Products</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/category" className="nav-link">Categories</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default navbar;
