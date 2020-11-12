import React, { useState, useEffect, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function CustomerList(){

const [customers, setCustomers] =useState([]);
useEffect(() => getCustomers(),[]);

const columns = [
        {headerName: 'firstname', field:'firstname', sortable: true, filter:true },
        {headerName: 'lastname', field:'lastname', sortable: true, filter:true },
        {headerName: 'streetaddress', field:'streetaddress', sortable: true, filter:true },
        {headerName: 'postcode', field:'postcode', sortable: true, filter:true },
        {headerName: 'city', field:'city', sortable: true, filter:true },
        {headerName: 'email', field:'email', sortable: true, filter:true },
        {headerName: 'phone', field:'phone', sortable: true, filter:true }
]
//fetch customers
const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content) )
    .catch(err => console.error(err))
}

    return(
        <div> 
            <h1>Customers</h1>
         
            <div className="ag-theme-material" 
            style={{height: '700px', width: '70%', margin: 'auto'}}>
          
            <AgGridReact  
            columnDefs={columns}
            rowData={customers}
            pagination={true}
            paginationPageSize={10}
            >
            </AgGridReact>
        
            </div>
       
        </div>
    );
}

export default CustomerList;