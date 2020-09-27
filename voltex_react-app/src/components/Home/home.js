import React from 'react';
import './home.css';
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

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            time: showTime(),
        };
      }

      componentDidMount(){
        this.interval = setInterval(() => this.setState({time: showTime()}), 15000);
      }
    
      componentWillUnmount(){
        clearInterval(this.interval);
      }

      render(){
          return(
              <div className='Home'>
              {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
        </header> */}
            <h2>Home Page</h2>
            <p>Time is {this.state.time}</p>
            </div>
          );
      }
}
export default Home;