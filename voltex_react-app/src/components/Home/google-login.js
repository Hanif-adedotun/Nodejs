// import { application, response } from 'express';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import {refreshTokenSetup} from '../utils/refreshToken';
//configure token

//Google sign in client id
const clientId = '135774644582-r6a0dsdvqlmpgt86vohomiim9sq9dfhi.apps.googleusercontent.com';

class Google extends React.Component{
    constructor(){
        super();
        this.state ={
            serverLogin: [],
            userState: []
        }
    }
    onSuccess = (res) =>{
        console.log('Login Success currentuser: ', res.profileObj);
        
        this.setState({userState: res.profileObj});
        fetch('api/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(res.profileObj)
        }).then((res) => res.json())
        .then((response) => {this.setState({serverLogin: response}) })
        .catch((error) =>{console.error('Unable to get results' + error)});
        //refresh token id
        refreshTokenSetup(res);
        window.location.reload();
      };
       onFailure = (res) => {
        console.log('[Login failed] result: ', res);
      };

      render(){
          return(
            <div className='GoogleSignIn'>
                <GoogleLogin 
                clientId={clientId}
                // render = {renderProps => (
                //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                //         MY cutom Google button
                //     </button>
                // )}
                buttonText="Login"
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '50px'}}
                isSignedIn={true}/>
              </div>
          );
      }
}
export default Google;

// googleId: '106164468137401050789',
// [0]   imageUrl: 'https://lh3.googleusercontent.com/a-/AOh14GgJ5bYiqVrE_M4TqtlyrjA3QFAZ3TXsko0ukZBo=s96-c',
// [0]   email: 'hanifadedotun2k19@gmail.com',
// [0]   name: 'Hanif Adedotun',
// [0]   givenName: 'Hanif',
// [0]   familyName: 'Adedotun'