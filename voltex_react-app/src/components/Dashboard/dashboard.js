import React from 'react';
import './dashboard.css';
import '../css/bootstrap.min.css';
import Emptydash from './EmptyDash';
import Table from './table';
import {Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel} from 'react-accessible-accordion';

//Link
import {Link } from "react-router-dom";

//Loader
import Load from '../objects/loading';



//Export to CSV 
import { CSVLink } from "react-csv";
 class Dashboard extends React.Component {
     constructor(){
         super();
         
         this.state = {
             dashboard: [],
             activeDashboard: '',
             copyText: 'copy',
             //Table.js 
             delres: false,
             delText: null
         };
         
     }
     //Load the database values from the MongoDB
     loadDatabase = () => {
        fetch('/api/users/login/dashboard')//fetch the data from our express server running on localhost:8080
         .then(res => res.json())//parse the data in json format
         .then(dashboard => this.setState({dashboard}, () => console.log('Dashboard updated'+JSON.stringify(dashboard))))
         .catch((error) =>{console.error('Unable to get data from database' + error);});
     }

     componentDidMount(){
         this.loadDatabase();
     }

     //function (copyUrl) to copy the unique url to clipboard
     //@param {text} the text to copy to clipboard
     //To copy the form name 
      copyUrl = (text) => {
        navigator.clipboard.writeText(text).then(function(){
            console.log('Copied: '+ text);
        }, function(err){
            console.error('Unable to copy to clipboard '+err);
        });
        //change the text of the copy button to copied
        this.setState({copyText: 'Copied to clipboard!'})

    this.interval = setInterval(() => {
        this.setState({copyText: 'Copy'});
      }, 2000);
        // document.getElementById('custom_email').disabled = true;
    }
     
    //function (dashboard_content) to render the dashboard view to the user, with different components
     dashboard_content = () => {
       
        //table names
        const options ={
            name: this.state.dashboard.data[0].Tablename, 
            url: this.state.dashboard.data[0].url, 
            id: this.state.dashboard.data[0].uniqueid

        };

        //url to put in user form action
        const action_url = this.state.dashboard.action_url;
        // console.log(action_url);

        //Changes the icons to up and down when needed
        this.changeIcon = () =>{
            var icon = document.getElementById('acc-arrow');
            var icon_down = 'glyphicon glyphicon-chevron-down small';
            var icon_up = 'glyphicon glyphicon-chevron-up small';

            if(icon.className === icon_down){
                icon.className = icon_up;
            }else{
               icon.className = icon_down;
            }
        }
        

        return(
            // The section before the table itself, for the table properties
            <div className='dashboard_content'>
                <Accordion allowZeroExpanded={true} className='acc' onChange={this.changeIcon}>
                    <AccordionItem>
                        <AccordionItemHeading className='acc-head'>
                            <AccordionItemButton>
                                <span>Table details</span> <span id='acc-arrow' className='glyphicon glyphicon-chevron-down'></span>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className='acc-body'>
                            <p><span className='acc-body-label'>Table name:</span> {options.name}</p>
                            <p><span className='acc-body-label'>Static page:</span><a href={options.url}> {options.url}</a></p>
                            <p><span className='acc-body-label'>Key:</span> {options.id}</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
                <div className='Faction'>Your form action should be <span className='unique url' id='copyurl'>{String(action_url)}</span>
                <p><button className='btn export' data-tip data-for='copytool'  id='copyT' onClick={()=> this.copyUrl(action_url)}><span className='glyphicon glyphicon-copy'></span> {this.state.copyText}</button></p>
                </div>

               {/* The table data  */}
               {/*
                @param {tableName} The name of the user's table 
                @param {table} The full table details of all the data
                @param {delval} The function to delete the table row
                @param {delText} *IN CONSTRUCTION* The text to display while deleting value
                @param {loadDatabase} The function to refresh the table data from the server
               */}
                <Table tableName={this.state.dashboard.data[0].Tablename} table={this.state.dashboard.table} delval={this.tableDelete} delText={this.state.delres} loadDatabase={this.loadDatabase}/> 
                
                 {/* If there is table data, it displays all the table options */}
                <div className='table_details'> 
                    {(this.state.dashboard.table[0])?  <div>
                        <CSVLink  data={(JSON.stringify(this.state.dashboard.table[0]))} filename={this.state.dashboard.data[0].Tablename+".csv"} className="btn export" >
                                <span className='glyphicon glyphicon-export'></span>
                                <span> Export table</span>
                        </CSVLink>
                            <button className='btn btn-success disabled ' id='custom_email' disabled>
                                <span className='glyphicon glyphicon-envelope'></span>
                                <span> Send Cutom email</span>
                            </button>
                            <button className='btn btn-danger' >
                                <span className='glyphicon glyphicon-remove'></span>
                                <span> Drop table</span>
                            </button> </div>: ''}
                       
                </div>
              
            </div>
        );
     }

     //function (tableDelete) function to delete a row in the table
     //@param (val) the id of the row to delete
     //Functions for child element Table.js
     tableDelete = async (val) =>{
         
         this.setState({delText: 'Deleting...'});

        await fetch(`/api/users/delete/${val}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
               },
            })
            .then(resp => resp.json()) // or res.json()
            .then(delres => {this.setState({delres: delres.deleted}); this.setState({delText: null}); console.log('Deleted document: '+ val);})
            .catch((error) =>{console.error('Unable to delete data in database' + error); this.setState({delText: 'Unable to delete'}) });
        // Note that add effect of delete button loading when delete is pressed
        this.loadDatabase();
    }
     //function (signedout) returns the signed out view  
     signedout = () =>{
        return(
            <div className='signedout'>
                <div className='s-text'>You need to Sign in to access dashboard, Go to <Link to='/profile'><span>profile</span></Link> to sign in now!</div>
            </div>
        )
     }
      //function (loading) returns the loading animation with a text of waiting
     loading = () =>{
         return(
            <div>
                <Load color=' #61dafb' type='bubbles'/> 
                <p className='unique space'>Please wait while we are checking for your table......</p>
            </div>
         )
     }
     //function (serverError) returns an error by the server 
     serverError = () =>{
         return(
             <div>
                 <p className='serverErr'>There is either a connection error or Server Error, Check your internet connection and refresh!</p>
             </div>
         )
     }

     //function (renderContent) Switch for all the views of the dashboard
     renderContent(){
        // console.log('Status Server '+this.state.dashboard.status);
         switch(this.state.dashboard.status){
             default: return this.loading();
                 case 400: return this.signedout();
                 case 404: return <Emptydash />;
                 case 200: return this.dashboard_content();
                 case 500: return this.serverError();
         }
     }
    //function (render) Renders the views
      render() {
        return (
            <div className='dashboard'>
            <h2>Dashboard</h2>
            {this.renderContent()}
            </div>
        );
      }
}
export default Dashboard ;