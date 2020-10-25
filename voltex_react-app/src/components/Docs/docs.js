import React from 'react';
import './docs.css';
import '../css/bootstrap.min.css';

//code 
import Code from './code_snippet';

class Docs extends React.Component{
     constructor(){
          super();
          this.state = {

          }
     }
     render(){
          return(
               <div className='docs'>
                    <h1>This is the documentation page</h1>
                    <h5 className='end_header'>How to incoperate voltex middlewear into your static website</h5>
                    
                    <div className='code_container'>
                         <p>Insert link to form action</p>
                         <Code text='<html>Code</html>'>
                              <p>Html text 2</p>
                         </Code>
                    </div>
                    
               </div>
          )
     }
}
export default Docs;