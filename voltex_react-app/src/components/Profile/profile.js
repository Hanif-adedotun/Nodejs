// import { request } from 'express';
import React from 'react';
import '../css/bootstrap.min.css';
// import Signin from '../Home/google-login';
// import Signout from '../Home/google-logout';

class Profile extends React.Component{
    constructor(){
        super();
        this.state = {
            user: [],
            authenticate: false
        };
    }

    componentDidMount(){
    (async ()=>{
        const request = await fetch('http://localhost:8080/api/auth/login/success', {
            method: 'GET',
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
        });
    
     const res = await request.json();
    if(request.statusCode === 200){
        this.setState({user: res.user, authenticate: res.authenticate});
        this.renderuser();
    }else{
        // console.error('Unable to authenticate user');
    }
    })();
    
    
   }

   handleusersignin = (e) =>{
    e.preventDefault();
    window.open('http://localhost:8080/api/auth/signin', '_self');
   }

    userprofile = () =>{
        return(
            <div>
                <h1>Profile section</h1>
                <div className='user'>
                    <p><img src={this.state.user.imageUrl} alt='User icon' className='img-circle' ></img></p>
                    <p>Welcome {this.state.user.username}</p>
                    <p>E-mail: {this.state.user.email}</p>
                    <p>Go to dashboard to access your tables</p>
                </div>
                <div>
                    Click here to sign out:
                  
                </div>
            </div>
        );
    }

    notsignedin = () =>{
        return(
            <div>
                <h2>Seems you are not signed in, sign in now!</h2>
                <button onClick={this.handleusersignin}> Sign in </button>
            </div>
        );
    }

    renderuser(){
        switch(String(this.state.authenticate)){
            default:
                case false: return this.notsignedin();
                case true: return this.userprofile();
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