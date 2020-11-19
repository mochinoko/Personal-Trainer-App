import React, { useState, useEffect, useRef} from 'react';
import AddCustomer from './AddCustomer';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import EditCustomer from './EditCustomer';
import Training from './Training';



function CustomerList(){

const [customers, setCustomers] =useState([]);

useEffect(() =>{
    getCustomers();
}, []);

const gridRef = useRef();

const [open, setOpen] =useState(false);
const [msg, setMsg] = useState('');

const columns = [
        {
            headerName: '', 
            field: 'links.rel.self.href',
            cellRendererFramework: params => 
            <Button
            size="small"
            onClick={() => Training(params.value)}
            >Add Training 
            </Button>
            
        },
        {headerName: 'firstname', field:'firstname', sortable: true, filter:true,  width: 120 },
        {headerName: 'lastname', field:'lastname', sortable: true, filter:true,  width: 120  },
        {headerName: 'streetaddress', field:'streetaddress', sortable: true, filter:true },
        {headerName: 'postcode', field:'postcode', sortable: true, filter:true,  width: 110},
        {headerName: 'city', field:'city', sortable: true, filter:true },
        {headerName: 'email', field:'email', sortable: true, filter:true},
        {headerName: 'phone', field:'phone', sortable: true, filter:true},
        { 
            headerName: '',
            width: 80, 
            field: 'links.0.href',
            cellRendererFramework: params => 
            <Button
                color="secondary"
                size="small"
                onClick={() => deleteCustomer(params.value)}
            >DELETE
            </Button> 
        },
        {
            headerName: '',
            width: 80,
            field: 'links.0.href',
            cellRendererFramework: params => 
            <EditCustomer updateCustomer={updateCustomer} params={params} />
        }

];
//fetch customers
const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content) )
    .catch(err => console.error(err))
}


//Delete customer
const deleteCustomer = (link) => {
    if(window.confirm('Are you sure?')){
        fetch(link, {
            method: 'DELETE'
        })
        .then(_ => getCustomers())
        .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
        .then(_ => setMsg('Car was deleteed succesfully'))
        .then(_ =>  setOpen(true))
        .catch(err=> console.err(err))
    }
};
//add customer
const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST', 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newCustomer)
    })
    .then(_ => getCustomers())
    .catch(err => console.error(err))
}

const handleClose = () => {
    setOpen(false);
}

//update customer
const updateCustomer = (link, customer) => {
    fetch(link, {
        method: 'PUT',
        headers:{
            'Content-type':  'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(_ => getCustomers())
    .catch(err => console.err(err))
}


    return(
        <div>
            <AddCustomer addCustomer={addCustomer} />

            <div className="ag-theme-material" 
            style={{height: '700px', width: '80%', margin: 'auto'}}
            >
                <AgGridReact  
                    ref={gridRef}
                    onGridReady={ params => {
                        gridRef.current = params.api
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
                <Snackbar 
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={msg}
                />
            </div>
       
        </div>
 
    );
}

export default CustomerList;