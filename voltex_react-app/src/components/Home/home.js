import React from 'react';
import './home.css';
import '../css/bootstrap.min.css';



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
        currentMinute = '0' + currentMinute;//addition of 0, check for error later 
  
    }
    var Totaltime = currentHour + ' : ' + currentMinute + ' ' + meridian;
    String(Totaltime); //Converts the time to a String
   
    // console.log(Totaltime);
    return Totaltime;
  }
 
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

            <header className='headGlass'>
                  <h1 className='headGlass-head'>Voltex Middlwear</h1>
                  <p className='tagline'>Quickly integrate a back-end with your frontend with just a click</p>
                  <p>Time is <span className='time'>{this.state.time}</span></p>
                  {this.offlineText()}    
            </header>

            <div className='container-fluid'>
              <div className='row '>
                <div className="col-md-6  hm" >
                <h5>Simple and realiable back end provider</h5>
                <p><span className='large color glyphicon glyphicon-cloud '></span></p>
                </div>
                {/* col-md-offset-2 to space them */}
                <div className="col-md-6   hm ">
                  <h5>Column </h5>
                  <p><span className='large color glyphicon glyphicon-tasks'></span></p>
                </div>
              </div>
              <div className='row '>
                <div className=" col-md-6 hm " >
                <h5>Just one step click to integrate</h5>
                <p><span className='large color glyphicon glyphicon-globe'></span></p>
                </div>
                {/* col-md-offset-2 to space them */}
                <div className="col-md-6   hm">
                  <h5>Secure and safe software</h5>
                  <p><span className='large color glyphicon glyphicon-lock'></span></p>
                </div>
              </div>
            </div>

            </div>
          );
      }
}

export default Home;