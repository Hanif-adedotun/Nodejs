// import React from 'react';
// import './loading.css';

// const load = ()=>{
//      return(
//      <div className='loader'>
//      </div>
//      );
// };

// export default load;
import React from 'react';
import ReactLoading from 'react-loading';
 
const Example = ({ type, color }) => (
    <ReactLoading type={type} color={color} className='loader' delay={1} />
    //height={'20%'} width={'20%'}
);
 
export default Example;