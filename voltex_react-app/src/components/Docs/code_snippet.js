import React from 'react';
import PropTypes from 'prop-types';

//Css
import './docs.css';
import '../css/bootstrap.min.css';


const Code = ({text}) =>{
     return(
          <div className='code'>
              <div className='code_text'> {text} </div>
          </div>
     )
}

Code.propTypes = {
     text: PropTypes.string.isRequired
}

export default Code;
