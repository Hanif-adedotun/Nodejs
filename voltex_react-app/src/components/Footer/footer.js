import React from 'react';
import './footer.css';
import logo from '../images/voltex.png';

//Import bootstrap 3
import '../css/bootstrap.min.css';

var year = new Date().getFullYear();
class footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <span>
                    <img className='footimg' src={logo} alt='Voltex logo'></img>   
                </span>
                <div className='row'>
                <div className='col-md-4 foot' id='contactLinks'>
                    <label>Contact US</label>
                    <ul>
                        <li><a >Github</a></li>
                        <li><a >twitter</a></li>
                        <li><a >Instagram</a></li>
                        <li><a >E-mail</a></li>
                    </ul>
                </div>
                <div className='col-md-4 foot' id='policies'>
                <label>Policies</label>
                    <ul>
                        <li><a>Private policies</a></li>
                        <li><a>Lincense</a></li>
                    </ul>
                </div>
                <div className='col-md-4 foot' id='site'>
                <label>Links</label>
                    <ul>
                        <li><a>Sitemap</a></li>
                        <li><a>Report problem</a></li>
                    </ul>
                </div>
                </div>
                <p className='footext'>&copy; Copyright Voltex Designs {year}</p>
            
            </div>
        )
    }

}

export default footer;