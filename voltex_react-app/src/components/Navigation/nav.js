import React from 'react';
import {Switch, Route, BrowserRouter as Router, NavLink} from 'react-router-dom';


import './nav.css';
import '../css/bootstrap.min.css';
import Dashboard from '../Dashboard/dashboard';
import Home from '../Home/home';
import Profile from '../Profile/profile';
import Docs from '../Docs/docs';

//NavBar for react
import { Navbar, Nav } from 'react-bootstrap';


class navigation extends React.Component{
    
    constructor(){
        super();
        this.state = {
            imageUrl: null
        };
    }
    componentDidMount(){

        fetch('/api/auth/login/success')//fetch the data from our express server running on localhost:8080
        .then(res => res.json())//parse the data in json format
        .then(response => this.setState({imageUrl: response.user.imageUrl, user: response.user}, () => {console.log('User Image updated'+JSON.stringify(response.user)); this.rendercontent();}))
        .catch((error) =>{console.error('Unable to get user image' + error);});
    }
        defaultimage = () =>{
            return(
                <span className="glyphicon glyphicon-user"></span>
            );
        }
        userImage = (imgsrc) =>{
            return(
                <img src={imgsrc} alt='User icon' className='nav-img-circle' ></img>
            );
        }
        rendercontent(){
            switch(this.state.imageUrl){
                case null: return this.defaultimage();
                default: return this.userImage(this.state.imageUrl);
            }
        }

    render(){
        return(
            <Router>
                {/* <Navbar>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto' justify='true' variant='pills' fill>
                            <Nav.Item><Nav.Link className='Navlin' ><img src='https://drive.google.com/thumbnail?id=1Jz5p-jH2Lv8VzqNJPhKQLYcPnzeZWS4c' alt="Voltex Middlwear logo" className='logo'/></Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link className='Navlin'><NavLink activeClassName='NavActive' exact to='/'>Home</NavLink></Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link className='Navlin'><NavLink activeClassName='NavActive' to='/docs'>Documentation</NavLink></Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link className='Navlin'><NavLink activeClassName='NavActive' to='/dashboard'>Dashboard</NavLink></Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link className='Navlin' id='nav-profile'><NavLink activeClassName='NavActive' to='/profile'>{this.rendercontent()}</NavLink></Nav.Link></Nav.Item>
                        </Nav>
                    </Navbar.Collapse> 
                </Navbar> */}
              
                <div className='nav'>
                    <nav className="navbar navbar-default " data-spy="affix" data-offset-top="197">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mynavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className='collapse navbar-collapse'>
                        <ul className='nav nav-pills nav-justified'>
                            <li ><img src='https://drive.google.com/thumbnail?id=1Jz5p-jH2Lv8VzqNJPhKQLYcPnzeZWS4c' alt="Voltex Middlwear logo" className='logo'/></li>
                            <li className='Navlin' ><NavLink activeClassName='NavActive' exact to='/'>Home</NavLink></li>
                            <li className='Navlin' ><NavLink activeClassName='NavActive' to='/docs'>Documentation</NavLink></li>
                            <li className='Navlin' ><NavLink activeClassName='NavActive' to='/dashboard'>Dashboard</NavLink></li>
                            <li  className='Navlin' id='nav-profile'><NavLink activeClassName='NavActive' to='/profile'>{this.rendercontent()}</NavLink></li>
                        </ul>
                    </div>
                    </nav>
                </div>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/dashboard' exact component={Dashboard}/>
                    <Route path='/profile' exact component={Profile}/>
                    <Route path='/docs' exact component={Docs} />
                </Switch>
            </Router>
        );
    }
}

export default navigation;