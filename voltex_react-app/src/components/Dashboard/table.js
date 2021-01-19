import React from 'react';
import './dashboard.css';
import PropTypes from 'prop-types';
import '../css/bootstrap.min.css';

//popup
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

//loader
// import Loader from '../objects/loading';

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
delete_button.propTypes = {
        i: PropTypes.number.isRequired,
        val: PropTypes.string.isRequired
}


const Table = ({tableName, table, delval, delText, loadDatabase}) =>{
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
                    {/* this.setState({error: true},
  () => this.setTimeout(
     this.setState({error: false}), 5000
  )
) */}
                <p className='unique'>{(delText) ? setTimeout( 'A row has been deleted', 2000): ''}</p>
                {/* Attend to this error */}
                </div>
        );
}

Table.propTypes = {
    tableName: PropTypes.string.isRequired,
    table: PropTypes.array.isRequired,
    delval: PropTypes.func.isRequired
}

export default Table;