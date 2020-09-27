import React from 'react';
import './footer.css';
import image from '../images/voltex.png';

class footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <span>
                    <img className='footimg' src={image} alt='Voltex logo'></img>   
                </span>
                <p className='footext'>&copy; Copyright Voltex Designs 2020</p>
                
            </div>
        )
    }

}

export default footer;