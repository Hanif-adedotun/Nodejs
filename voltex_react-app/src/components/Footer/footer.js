import React from 'react';
import './footer.css';
import image from '../images/voltex.png';

var year = new Date().getFullYear();
class footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <span>
                    <img className='footimg' src={image} alt='Voltex logo'></img>   
                </span>
                <div id='contactLinks'>
                    <label>Contact US</label>
                    <ul>
                        <li><a href="#">Github</a></li>
                        <li><a href="#">twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">E-mail</a></li>
                    </ul>
                </div>
                <p className='footext'>&copy; Copyright Voltex Designs {year}</p>
                
            </div>
        )
    }

}

export default footer;