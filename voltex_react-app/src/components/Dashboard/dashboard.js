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
     //Load the databse values from the MongoDB
     loadDatabase = () => {
        fetch('/api/users/login/dashboard')//fetch the data from our express server running on localhost:8080
         .then(res => res.json())//parse the data in json format
         .then(dashboard => this.setState({dashboard}, () => console.log('Dashboard updated'+JSON.stringify(dashboard))))
         .catch((error) =>{console.error('Unable to get data from database' + error);});
     }

     componentDidMount(){
         this.loadDatabase();
     }

     //To copy the form name 
      copyUrl = (text) => {
        navigator.clipboard.writeText(text).then(function(){
            console.log('Copied: '+ text);
        }, function(err){
            console.error('Unable to copy to clipboard '+err);
        });
        //change the text of the copy button to copied
        this.setState({copyText: 'Copied to clipboard!'})

        //set the copied text back to copy , the original text
    //     setTimeout(function(){
    //         this.setState({copyText:'Copied'});
    //    }.bind(this),1000);

    this.interval = setInterval(() => {
        this.setState({copyText: 'Copy'});
      }, 200);
        // document.getElementById('custom_email').disabled = true;
    }
     
    
     dashboard_content = () => {
       
        const options ={
            name: this.state.dashboard.data[0].Tablename, 
            url: this.state.dashboard.data[0].url, 
            id: this.state.dashboard.data[0].uniqueid

        };
        
        const action_url = this.state.dashboard.action_url;
        // console.log(action_url);

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
                            <p><span className='acc-body-label'>Static page:</span> {options.url}</p>
                            <p><span className='acc-body-label'>Key:</span> {options.id}</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
                <div className='Faction'>Your form action should be <span className='unique url' id='copyurl'>{String(action_url)}</span>
                <p><button className='btn export' data-tip data-for='copytool'  id='copyT' onClick={()=> this.copyUrl(action_url)}><span className='glyphicon glyphicon-copy'></span> {this.state.copyText}</button></p>

                {/* <div class="alert alert-success alert-dismissible">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Success!</strong> Copied to clipboard.
                </div> */}
                
                {/* <Reactooltip place="right" id="copytool" type="success" event="click" effect="solid" delayHide={1000}><span>Copied to clipboard!</span> </Reactooltip> */}
                </div>
               {/* The table data */}
                <Table tableName={this.state.dashboard.data[0].Tablename} table={this.state.dashboard.table} delval={this.tableDelete} delText={this.state.delres} loadDatabase={this.loadDatabase}/> {/*Table to display static file form*/}
                <div className='table_details'>
                    {/* target="_blank" headers={Object.keys(this.state.dashboard.table[0].db_values)} */}
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
                {/* <div class="alert alert-success alert-dismissible fade in">
                <a href='#' class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Success!</strong> Indicates a successful or positive action.
                </div> */}
            </div>
        );
     }

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

     signedout = () =>{
        return(
            <div className='signedout'>
                <div className='s-text'>You need to Sign in to access dashboard, Go to <Link to='/profile'><span>profile</span></Link> to sign in now!</div>
            </div>
        )
     }
     loading = () =>{
         return(
            <div>
                <Load color=' #61dafb' type='bubbles'/> 
                <p className='unique space'>Please wait while we are checking for your table......</p>
            </div>
         )
     }
     serverError = () =>{
         return(
             <div>
                 <p className='serverErr'>There is either a connection error or Server Error, Check your internet connection and refresh!</p>
             </div>
         )
     }

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