import React from 'react';
import './dashboard.css';
import '../css/bootstrap.min.css';
import Emptydash from './EmptyDash';
import Table from './table';
import {Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel} from 'react-accessible-accordion';

//Loader
import Load from '../objects/loading';

//tooltip
import Reactooltip from 'react-tooltip';


 class Dashboard extends React.Component {
     constructor(){
         super();
         
         this.state = {
             dashboard: [],
             activeDashboard: '',
             //Table.js 
             delres: [],
             delText: null
         };
         
        //  this.handleSubmit = this.handleSubmit.bind(this);
     }

     componentDidMount(){
         fetch('/api/users/login/dashboard')//fetch the data from our express server running on localhost:8080
         .then(res => res.json())//parse the data in json format
         .then(dashboard => this.setState({dashboard}, () => console.log('Dashboard updated'+JSON.stringify(dashboard))))
         .catch((error) =>{console.error('Unable to get data from database' + error);});
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

        function copyUrl(text){
            navigator.clipboard.writeText(text).then(function(){
                console.log('Copied: '+ text);
                alert('Copied');
            }, function(err){
                console.error('Unable to copy to clipboard');
            });
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
                <p className='Faction'>Your form action should be <span className='unique' id='copyurl'>{String(action_url)}</span>
                <p><button className='btn export' data-tip data-for='copytool'  id='copyT' onClick={()=> copyUrl(action_url)}><span className='glyphicon glyphicon-copy'></span> Copy</button></p>
                <Reactooltip place="right" id="copytool" type="success" event="click" effect="solid" delayHide={2000}><span>Copied to clipboard!</span> </Reactooltip>
                </p>
 
                <Table tableName={this.state.dashboard.data[0].Tablename} table={this.state.dashboard.table} delval={this.tableDelete} delText={this.state.delText} /> {/*Table to display static file form*/}
                <div>
                    <button className='btn export'>
                        <span className='glyphicon glyphicon-export'></span>
                        <span> Export table</span>
                    </button>
                </div>
            </div>
        );
     }

     //Functions for child element Table.js
     tableDelete = (val) =>{
         console.log('Deleting....');
         this.setState({delText: 'Deleting...'});

        fetch(`/api/users/delete/${val}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
               },
               //mode: 'cors',
            })
            .then(resp => resp.json()) // or res.json()
            .then(delres => {this.setState({delres}); this.setState({delText: null});})
            .catch((error) =>{console.error('Unable to delete data in database' + error); this.setState({delText: 'Unable to delete'}) });
    // Note that add effect of delete button loading when delete is pressed
    
    }

     signedout = () =>{
        return(
            <div className='signedout'>
                <div className='s-text'>You need to Sign in to access dashboard, Go to profile to sign in now!</div>
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