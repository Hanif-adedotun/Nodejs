import React from 'react';
import './docs.css';
import '../css/bootstrap.min.css';


//Highlighter
import SyntaxHighlighter from 'react-syntax-highlighter';
import { colorBrewer } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { cb } from 'react-syntax-highlighter/dist/esm/styles/prism';

class Docs extends React.Component{
     constructor(){
          super();
          this.state = {

          }
     }
     codeString = `
<html>
<body>
<form action='Url provided' method="POST" enctype='application/x-www-form-urlencoded''>
<input type='number'/>
</form>
</body>
</html>
     `;
     render(){
          return(
               <div className='docs'>

                    <header className='header'>
                    <h1>This is the documentation page</h1>
                    <h5>How to incoperate voltex middlewear into your static website</h5>
                    </header>
                    
                    <div className='code_container'>
                         <p>Insert link to form action</p>

                              <SyntaxHighlighter language="html" style={colorBrewer} className='code'>
                                   {this.codeString}
                              </SyntaxHighlighter>

                    </div>
                    
               </div>
          )
     }
}
export default Docs;