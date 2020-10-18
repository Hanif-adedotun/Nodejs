import React from 'react';
import './dashboard.css';
import '../css/bootstrap.min.css';
import Emptydash from './EmptyDash';
import Table from './table';
import {Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel} from 'react-accessible-accordion';



 class Dashboard extends React.Component {
     constructor(){
         super();
         this.state = {
             dashboard: [],
             activeDashboard: ''
         };
        //  this.handleSubmit = this.handleSubmit.bind(this);
     }

     componentDidMount(){
         fetch('/api/users/login/dashboard')//fetch the data from our express server running on localhost:8080
         .then(res => res.json())//parse the data in json format
         .then(dashboard => this.setState({dashboard}, () => console.log('Dashboard updated')))
         .catch( (error) =>{console.error('Unable to get data from database' + error);});
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
            var icon_down = 'glyphicon glyphicon-chevron-down';
            var icon_up = 'glyphicon glyphicon-chevron-up';

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
                <p className='medium'>Your form action should be <span className='unique'>{action_url}</span></p>
                  
                <Table tableName={this.state.dashboard.data[0].Tablename}/> {/*Table to display static file form*/}
            </div>
        );
     }

     renderContent(){
        // console.log(this.state.dashboard.status);
         switch(this.state.dashboard.status){
             default:
                 case 400:  return ('You need to Sign in to access dashboard, Sign in now!');
                 case 404: return <Emptydash />;
                 case 200: return this.dashboard_content();
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