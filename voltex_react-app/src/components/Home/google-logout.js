import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '135774644582-r6a0dsdvqlmpgt86vohomiim9sq9dfhi.apps.googleusercontent.com';


class Googleogout extends React.Component{
    constructor(){
        super();
        this.state ={
            serverLogout: []
        }
    }
    onLogoutSuccess = () =>{
        alert('Logged out successfully');
        fetch('api/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: null
        })
        .then((res) => res.json())
        .then((response) => {this.setState({serverLogin: response}) })
        .catch((error) =>{console.error('Unable to get results' + error)});
        window.location.reload();
    }
    render(){
        return(
        <div className='Signout'>
            <GoogleLogout
            clientId={clientId}
            buttonText='Logout'
            onLogoutSuccess={this.onLogoutSuccess}
            ></GoogleLogout>
        </div>
        );
    }

}
export default Googleogout;