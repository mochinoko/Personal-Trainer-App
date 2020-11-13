import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Training(){
  

const [trainings, setTrainings] =useState([]);

useEffect(() => getTrainings(),[]);

const columns = [
        {headerName: 'date', field:'date', sortable: true, filter:true },
        {headerName: 'activity', field:'activity', sortable: true, filter:true },
        {headerName: 'duration', field:'duration', sortable: true, filter:true }     
]
//fetch customers
const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(response => response.json())
    .then(data => setTrainings(data.content) )
    
    .catch(err => console.error(err))
}

    return(
        <div> 
            <h1>Trainings</h1>
            
            <div className="ag-theme-material" 
            style={{height: '700px', width: '70%', margin: 'auto'}}>
          
            <AgGridReact  
            columnDefs={columns}
            rowData={trainings}
            pagination={true}
            paginationPageSize={10}
            >
            </AgGridReact>
        
            </div>
        
        </div>
    );
}

export default Training;