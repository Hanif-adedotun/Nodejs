import React from 'react';
import './dashboard.css';
import PropTypes from 'prop-types';
import '../css/bootstrap.min.css';

//popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

var delete_button = () =>{  
        return(
            <Popup className='popup' trigger={<button className='btn btn-primary bold'> Delete </button>} modal>
                
            {close=>(
                <div className='popup'>
                    
                <button className="close" onClick={close}> &times;</button>
                <div className="content">
                <div>Are you sure you want to delete?</div>
                </div>

                </div>
            )}
                
          </Popup>
        );
}
const _delete = (id) => {
    if(alert(`Do you want to delete field ${id} ?`)){
        //Send the id to the backed server to process and Delete
    }
}
_delete.propTypes = {
    id: PropTypes.string.isRequired
}


const Table = ({tableName, table}) =>{

        return(
            <div className='formTable'>
                    <h3>{(tableName) ? tableName: 'Table'}</h3>
                    <table className='table '>
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Head 1</th>
                            <th>Head 2</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>Field 1</th>
                                <th>Field 2</th>
                                <th id={1} >{delete_button()}</th>
                            </tr>
                            <tr>
                                <th>2</th>
                                <th>Field 1</th>
                                <th>Field 2</th>
                                <th id={2} >{delete_button()}</th>
                            </tr>
                            <tr>
                                <th>
                                    The table data is {table}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
        );
}

Table.propTypes = {
    tableName: PropTypes.string.isRequired,
    table: PropTypes.object.isRequired
}

export default Table;