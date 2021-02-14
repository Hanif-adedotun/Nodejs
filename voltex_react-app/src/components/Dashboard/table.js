import React from 'react';
import './dashboard.css';
import PropTypes from 'prop-types';
import '../css/bootstrap.min.css';
import {Link } from "react-router-dom";

//popup
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

//Void SVG Logo
import VoidLogo from '../images/empty_green.svg';

//function (delete_button) The component for the delete button
//@param {i} index of the row to be deleted
//@param {val} the Object Id of the row, to be sent to the server
//@param {del}  A function called from the dashboard.js to communicate with the server
var delete_button = (i, val, del) =>{
        return(
            <Popup className='popup' trigger={<button className='btn btn-primary bold' > Delete </button>} modal>
                
            {close=>(
                <div className='popup'>    
                <button className="close" id={i} onClick={close}> &times;</button>
                <div className="content">
                <div className='text-primary' value={val}>Are you sure you want to delete field {i+1}?</div>
                </div>
                <button className='btn btn-success del_button' onClick={()=>{del(val); close()}} >{'Delete'}</button>
                <button className='btn btn-danger del_button' onClick={close}>Close</button>
                </div>
            )}
                
          </Popup>
          
        );
        
}
//The propety type of the function (delete_button)
delete_button.propTypes = {
        i: PropTypes.number.isRequired,
        val: PropTypes.string.isRequired
}

//function (Table) The component for the user table
//@param {tableName} The name of the user's table 
//@param {table} The full table details of all the data
//@param {delval} The function to delete the table row
//@param {delText} *IN CONSTRUCTION* The text to display while deleting value
//@param {loadDatabase} The function to refresh the table data from the server
const Table = ({tableName, table, delval, delText, loadDatabase}) =>{
    
    if(!table[0]){
        return(
            <div>
                <p className="App">
                <img id='empty_logo' src={VoidLogo} alt="Void Logo" />
                </p>
                <p>No user has used your form yet, paste your unique link and start using, thank you</p>
                <p>If you want learn more about how to integrate us with your website, <Link to='/docs'><span className="unique">Go to documentations</span></Link></p>
            </div>
        )
    }
    //To get the the keys of the data
    var head = Object.keys(table[0].db_values);

        return(
            <div className='formTable'>
                    <h3>{(tableName) ? tableName+' Table': 'Table'}</h3>
                    <table className='table table-responsive table-bodered'>
                        <thead>
                        <tr>
                        <th>S/N</th>{
                            head.map((key, index)=>
                                 <th key={index}>{key.toUpperCase()}</th>
                            )
                            }
                            <th><button className='btn btn-primary medium' onClick={loadDatabase}><span className='glyphicon glyphicon-refresh '></span></button></th> {/* for the delete row*/}
                        </tr>
                        </thead>
                        <tbody>
                            {
                                table.map((item, index) =>
                                <tr key={index}> 
                                    <th>{index+1}</th>
                                    {/* <th>{item._id}</th> */}
                                    {/* <th>{item.key}</th> */}
                                    {Object.values(item.db_values).map((val, ind)=>
                                        <th key={ind}>{val}</th>
                                    )
                                    }                                    
                                    <th id={index}>{delete_button(index, item._id, delval)}</th>
                                </tr>
                                )
                            }
                            
                        </tbody>
                        </table>
                        <p className='Tunique'>{(delText) ? delText: ''}</p>
                </div>
        );
}

//Property of the function (Table)
Table.propTypes = {
    tableName: PropTypes.string.isRequired,
    table: PropTypes.array.isRequired,
    delval: PropTypes.func.isRequired,
    delText: PropTypes.string,
    loadDatabase: PropTypes.func.isRequired
}

export default Table;