import React from 'react';
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import '../css/bootstrap.min.css';
import './nav.css';
import Dashboard from '../Dashboard/dashboard';
import Home from '../Home/home';

class Nav extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        return(
            <Router>
                <div className='nav'>
                    <nav className="navbar navbar-default">
                        <ul className='nav nav-pills nav-justified'>
                            <li className='nav-list'><Link to='/'>Home</Link></li>
                            <li className='nav-list'><Link to='/dashboard'>Dashboard</Link></li>
                        </ul>
                    </nav>
                </div>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/dashboard' exact component={Dashboard}/>
                </Switch>
            </Router>
        );
    }
}

export default Nav;