import React from 'react';
import './docs.css';
import '../css/bootstrap.min.css';


//Highlighter
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { colorBrewer } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { cb } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';
SyntaxHighlighter.registerLanguage('javascript', js);

//New Highlighter


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
     jscode = `
     function add-url-name(){
          var url = document.getElementById('url-name');
          document.url = url;
     }
     `;
     render(){
          return(
               <div className='docs'>
                    <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/railscasts.css" />
                    <header className='header'>
                    {/* <h1>This is the documentation page</h1> */}
                    <h3>How to incoperate voltex middlewear into your static website</h3>
                    </header>

                    <div className='code_container'>
                         <div className='code-tab'>
                              <h4>Insert link to form action</h4>
                              <div className='code-explained'>
                                   
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                              Integer varius ullamcorper nisl, et porttitor felis. 
                              Cras mollis porttitor dictum. Maecenas nec porttitor mi. 
                              
                              </div>
                              <SyntaxHighlighter language="html" style={materialOceanic} className='code'>
                                   {this.codeString}
                              </SyntaxHighlighter>
                         </div>
                         
                         <div className='code-tab'>
                              <h4>Add url-name to the body using a hidden value</h4>
                              <SyntaxHighlighter language="javascript" style={materialOceanic} className='code'>
                                   {this.jscode}
                              </SyntaxHighlighter>
                         </div>

                    </div>
                    
               </div>
          )
     }
}
export default Docs;