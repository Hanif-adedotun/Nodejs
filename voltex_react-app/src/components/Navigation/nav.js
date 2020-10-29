import React from 'react';
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import '../css/bootstrap.min.css';
import './nav.css';
import Dashboard from '../Dashboard/dashboard';
import Home from '../Home/home';
import Profile from '../Profile/profile';
import Docs from '../Docs/docs';

class Nav extends React.Component{
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
                <div className='nav'>
                    <nav className="navbar navbar-default " data-spy="affix" data-offset-top="197">
                    
                        <ul className='nav nav-pills nav-justified'>
                            <li className='nav-list '><img src='https://drive.google.com/thumbnail?id=1Jz5p-jH2Lv8VzqNJPhKQLYcPnzeZWS4c' alt="Voltex Middlwear logo" className='logo'/></li>
                            <li className='nav-list'><Link to='/'>Home</Link></li>
                            <li className='nav-list'><Link to='/docs'>Documentation</Link></li>
                            <li className='nav-list'><Link to='/dashboard'>Dashboard</Link></li>
                            <li className='nav-list'><Link to='/profile'>{this.rendercontent()}</Link></li>
                        </ul>
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

export default Nav;