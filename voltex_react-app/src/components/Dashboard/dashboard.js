import React from 'react';
import './dashboard.css';
import '../css/bootstrap.min.css';
import Emptydash from './EmptyDash';
// import ReactDOM from 'react-dom';


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
         fetch('/dashboard')//fetch the data from our express server running on localhost:8080
         .then(res => res.json())//parse the data in json format
         .then(dashboard => this.setState({dashboard}, () => console.log('Dashboard updated', dashboard)))
         .catch( (error) =>{console.error('Unable to get data from database' + error);});
     }

     renderContent(){
         switch(String(this.state.activeDashboard)){
             default:
                 case '': return <Emptydash />;
                 case 'active': return ('Dashboard Active, get Dashboard from database');
         }
     }
      render() {
        return (
            <div className='dashboard'>
            <h2>Dashboard</h2>
            {this.renderContent()}

            {/* <table className='tables' >
           
                <thead className='tablehead'>
                <tr>
                {this.state.dashboard.map(value =>
                    
                    <td>{value.database}</td>
                    
                )}
                </tr>
                </thead>

                
                <tbody >
                {this.state.dashboard.map(value => (
                    <tr key={value.id}>
                        <td key={1}>{value.id}</td>
                        <td key={2}>{value.field1}</td>
                        <td key={3}>{value.field2}</td>
                    </tr>
                ))}
                </tbody>

            </table> */}
            </div>
        );
      }
}
export default Dashboard ;