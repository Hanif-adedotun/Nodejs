import React from 'react';
import './home.css';
import '../css/bootstrap.min.css';

//All the illustrations going to be used
import chat from '../images/illustrations/Chat.svg';
import Advertise from '../images/illustrations/Advertise.svg';
import Analyse from '../images/illustrations/Data analyse.svg';
import Startup from '../images/illustrations/Startup.svg';

//function (showTime) To get the current time and returns it in string format
//This function is to show the time, and it updates itself after every 15 seconds 
function showTime() {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    var meridian;
  
    if (currentHour >= 12 && currentHour < 24) {//if its betweeen 12pm and 12am, the meridian changes
        currentHour = currentHour - 12;
        if (currentHour === 0) {//if it is noon the hour changes to 12pm
            currentHour = '12';
        }
        meridian = 'pm';
    } else {
        meridian = 'am';
    }
  
    //console.log(currentMinute);
  
    if (currentMinute < 10) { //if the seconds is less than 10, it adds 0 at the begining of the minute value
        currentMinute = '0' + currentMinute;//addition of 0 
    }
    
    var Totaltime = currentHour + ' : ' + currentMinute + ' ' + meridian;
    String(Totaltime); //Converts the time to a String
   
    // console.log(Totaltime);
    return Totaltime;
  }

//function (tim) returns whether the user is online or offline
function tim () {
  // console.log('online: '+navigator.onLine);
  return String(navigator.onLine);
};

//check if internet connection is available
// function hostReachable() {

//   // Handle IE and more capable browsers
//   var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );

//   // Open new request as a HEAD to the root hostname with a random param to bust the cache
//   xhr.open( "GET", 'https://drive.google.com/thumbnail?id=1Jz5p-jH2Lv8VzqNJPhKQLYcPnzeZWS4c', false );


//   // Issue request and handle response
//   try {
//     xhr.send();
//     return ( xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304) );
//   } catch (error) {
//     return false;
//   }

// }

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            time: showTime(),
            user: [],
            internet: tim(),
        };
      }

      componentDidMount(){
        this.interval = setInterval(() => {
          this.setState({time: showTime()});
          this.setState({internet: tim()});
        }, 1500);
        
      }
    
      //function (offlineText) checks if there is internet connection in the state 
      //{returns} The text that warns the user
      offlineText = () =>{
        if(this.state.internet === 'false'){
          return(
            <div className='isContainer'>
              <p className='internet_status'><span className='glyphicon glyphicon-warning-sign'></span> Seems you are not connected to the internet</p>
            </div>
            
          )
        }
      }

      componentWillUnmount(){
        clearInterval(this.interval);
      }


      render(){
          return(
            <div className='Home'>
            <header className='  headGlass'>
                  <h1 className='color headGlass-head'>Voltex Middlwear</h1>
                  <p className='tagline'>Quickly integrate a back-end with your frontend with just a click</p>
                  <p>Time is <span className='time'>{this.state.time}</span></p>
                  <p className='cryptoPrice'><marquee behavior="scroll" direction="right" scrollamount='7'>Crypto Price Placeholder, Coming Soon.... </marquee></p>
                  {this.offlineText()}    
            </header>

            <div className='container-fluid'>
              <div className='row '>
                <div className="col-md-12  hm" >
                <span className='col-sm-7 hmIcon'><img className='hmicon' src={chat} alt="chat" /></span>
               
                <h5 className='col-sm-5 hmHead'>Simple and realiable back end provider</h5> 
                <p className='hmText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                </div>
                {/* col-md-offset-2 to space them */}
                <div className='row '>
                <div className="col-md-12   hm ">
                  <span className='col-sm-7 hmIcon'><img className='hmicon' src={Advertise} alt="chat" /></span>
                  
                    <h5 className=' col-sm-5 hmHead'>Unlimited memory to add  </h5>
                    <p className='hmText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                
                </div>
              </div>
              <div className='row '>
                <div className=" col-md-12 hm " >
                <span className='col-sm-7 hmIcon'><img className='hmicon' src={Analyse} alt="chat" /></span>
          
                  <h5 className='col-sm-5 hmHead'>Just one step click to integrate</h5>
                  <p className='hmText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
               
                </div>
              </div>
                {/* col-md-offset-2 to space them */}
              <div className='row '>
                <div className="col-md-12   hm">
                <span className='col-sm-7 hmIcon'><img className='hmicon' src={Startup} alt="chat" /></span>
               
                  <h5 className='col-sm-5 hmHead'>Secure and safe software</h5>
                  <p className='hmText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                
                </div>
              </div>
            </div>

            </div>
          );
      }
}

export default Home;