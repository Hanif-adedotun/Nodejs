import React from 'react';
// import PropTypes from 'prop-types';
import './dashboard.css';
import '../css/bootstrap.min.css';

class Emptydash extends React.Component{
    constructor(){
        super();
        this.state = {
            // State of form inputs
            htmlUrl: [],
            dbname: '',
            uniqueId: '',
            // Response from server after submitting form
            serverRes: [],
            // To set the view to fill the form of the database
            configuredatabase: []
        };
    }
    // Section to handle form inputs

    openConfigDB = (event) => {//function to open form to 
        event.preventDefault();
       this.setState({configuredatabase : 'showForm'})
    }

    // Handle all the inputs of the form
    handleurl = (event) =>{//sets the state to input value
        let url = event.target.value;
        this.setState({htmlUrl: url})
        let regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
        if(regex.test(url)){
             console.log("Successful match"); 
        }else{ 
            console.log("No match")
        }
     }

     
    handledbname = (event) =>{
        let dbname = event.target.value;
        this.setState({dbname: dbname})
     };

     //End of handle all inputs

    //  Form button controls
    generateID = (event) =>{
        event.preventDefault();
        // console.log('Generating Unique ID')
        
        this.setState({uniqueId: 'Generating...'});
        //uses the fetch api to generate a unique id from our server
        fetch('/api/users/generateId', {
            method: 'POST'
        })
        .then((result) => result.json())
        .then((responseid) => {this.setState({uniqueId: responseid}) })
        .catch( (error) =>{
            this.setState({uniqueId: 'Unable to generate id'});
            document.getElementById('uniqueId').style.color = 'red';
            console.error('Unable to validate error ' + error);
        });
    }
    

    uploadValues = (event) =>{
        event.preventDefault();
        console.log('Submitting form to server');

       const data = {
           htmlUrl: this.state.htmlUrl,
           dbname: this.state.dbname,
           uniqueId: this.state.uniqueId
        };
       
        // console.log(JSON.stringify(data));

        fetch('/api/users/createDB' , {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then((result) => result.json())
            .then((response) => {this.setState({serverRes: response.errors}) })
            .catch( (error) =>{console.error('Unable to validate error ' + error);});

     }

        serverResponse = () =>{
            if(this.state.serverRes){
                console.log(this.state.serverRes);
                return(
                    <div >
                        <ul className='form-error'>
                        {this.state.serverRes.map(error =>(
                        <li className='error-li' key={error.id}> {error.msg}</li>
                    ))}
                        </ul>
                    </div>
                );
            }else{
                window.location.reload();
                return(
                    <div className='form-good'>
                        <p className='good'>All inputs are good!</p>
                    </div>
                );
                
            }
            

        } 
    

    configureDatabase = () =>{//form to collect info to set up database
        return(
           <form action='/submit' onSubmit={this.uploadValues} className='configForm' method='post'>
               <span className='formHead'>Configure database</span>
              <p className='form-group'>
                
              <label className='control-label'>Url of your html file</label>
                  <input className='form-control' name='htmlUrl' type='text' value={this.state.htmlUrl} placeholder='Url of your HTML page' onChange={this.handleurl}/>
            </p>
            <p className='form-group'>
                <label className='control-label'>Table Name</label>
                  <input className='form-control' name='dbname' type='text' value={this.state.dbname} placeholder='Name to set table' onChange={this.handledbname}/>
            </p>
            <p className='form-group'>
                <button className="btn btn-primary" onClick={this.generateID}>Click to generate unique key</button>
                  <input className="readonly" id='uniqueId' name='uniqueId' type="text" value={this.state.uniqueId} placeholder="Unique key..." readOnly/>
            </p>   
                {this.serverResponse()}
               <button type="submit" className="btn btn-unique ">Configure</button>
           </form>
       );
    }

    renderContent(){
        switch(this.state.configuredatabase){
            default:
                case []: return (<div><p>Your Dashboard is empty.</p> 
                                <button className='btn btn-primary' onClick={this.openConfigDB}>Click to configure your database</button>
                                </div>);
                case  'showForm'  : return this.configureDatabase();
        }
    }


    render(){
        return(
            <div className='emptyDash'>
                {this.renderContent()}
             </div>
        );
    }
}
// Emptydash.proptype = {

// }

export default Emptydash;
