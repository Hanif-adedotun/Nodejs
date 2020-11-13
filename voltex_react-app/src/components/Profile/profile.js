// import { request } from 'express';
import React from 'react';
import '../css/bootstrap.min.css';
import './profile.css';
// import Signin from '../Home/google-login';
// import Signout from '../Home/google-logout';

//Loader
import Load from '../objects/loading';
var gsign = (name, signin) =>{
    return(
        <div className='g-sign-in-button' {...(signin) ? 'signin': ''}>
            <div className='content-wrapper'>
                <span className='logo-wrapper'>
                    <img alt='Google logo' src="https://img.icons8.com/color/40/000000/google-logo.png"></img>
                </span>
                <span className='text-container'> {name} </span>
            </div>
        </div>
    );
}

class Profile extends React.Component{
    constructor(){
        super();
        this.state = {
            user: [],
            authenticate: false
        };
    }

    componentDidMount(){
        fetch('/api/auth/login/success')//fetch the data from our express server running on localhost:8080
        .then(res => res.json())//parse the data in json format
        .then(response => this.setState({user: response.user, authenticate: response.authenticate}, () => {console.log('Profile updated'); this.renderuser();}))
        .catch((error) =>{console.error('Unable to get user image' + error);});
    };
    
   
   handleusersignin = (e) =>{
    e.preventDefault();
    window.open('http://localhost:8080/api/auth/signin', '_self');
   }

   handlesignout  = (e) =>{
       e.preventDefault();
    //    alert('Sign out');

       fetch('/api/auth/logout')//fetch the data from our express server running on localhost:8080
        .then(res => res.json())//parse the data in json format
        .then(response => this.setState({authenticate: response.authenticate}, () => {console.log('User Signed out'); this.renderuser(); }))
        .catch((error) =>{console.error('Unable to sign out' + error);});

        window.location.reload();
   }


    userprofile = () =>{
        return(
            <div>
                <h1>Hello {this.state.user.name.givenName}</h1>
                <div className='user'>
                    <p><img src={this.state.user.imageUrl} alt='User icon' className='img-circle'></img></p>
                    <p>Welcome {this.state.user.username}</p>
                    <p>E-mail: {this.state.user.email[0].value}</p>
                    <p>Go to dashboard to access your tables</p>
                </div>
                <div className='gsign' onClick={this.handlesignout}>
                    {gsign('Sign out')}
                </div>
            </div>
        );
    }

    notsignedin = () =>{
        return(
            <div>
                <h2>Seems you are not signed in, sign in now!</h2>
                <div className='gsign' onClick={this.handleusersignin}>
                 {gsign('Sign in With Google')}
                </div>
            </div>
        );
    }

    renderuser(){
        // console.log(String(this.state.authenticate));
        
        switch(String(this.state.authenticate)){
            default: return <Load/>
                case 'false': return this.notsignedin();
                case 'true': return this.userprofile();
        }
    }

    render(){
        return(
            <div className='Profile'>
                {this.renderuser()}
            </div>
        );
    }
}

export default Profile;