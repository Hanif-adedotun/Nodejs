import React from 'react';
import './dashboard.css';
import PropTypes from 'prop-types';
import '../css/bootstrap.min.css';


const Table = ({tableName}) =>{

        return(
            <div className='formTable'>
                    <h3>{(tableName) ? tableName: 'Table'}</h3>
                    <table className='table '>
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Head 1</th>
                            <th>Head 2</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>Field 1</th>
                                <th>Field 2</th>
                            </tr>
                            <tr>
                                <th>2</th>
                                <th>Field 1</th>
                                <th>Field 2</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
        );
}

Table.propTypes = {
    tableName: PropTypes.string.isRequired
}

export default Table;