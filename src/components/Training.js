import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

function Training(){
  
const [trainings, setTrainings] =useState([]);
const [msg, setMsg] = useState('');
const [open, setOpen] =useState(false);


useEffect(() => {
    getTrainings();
   
},[]);



//get trainings list
const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data) )
    .catch(err => console.error(err))
}


//Delete training

const deleteTraining = (id) => {
    
    if(window.confirm('Are you sure?')){
        fetch('https://customerrest.herokuapp.com/api/trainings/'+id, {
            method: 'DELETE'
        })
        .then(_ => getTrainings())
        //.then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
        .then(_ => setMsg('Training was deleteed succesfully'))
        .then(_ =>  setOpen(true))
        .catch((err)=> console.error(err))
    }
};

const handleClose = () => {
    setOpen(false);
}



const columns = [
    {
        headerName: 'Date', 
        cellRendererFramework: (row) =>
        moment(row.data.date).format("DD.MM.YY.hh:mm"),
        sortable: true, 
        filter:true 
    },
    {headerName: 'Customer name', field: 'customer.lastname', sortable: true, filter:true },
    
    {headerName: 'Activity', field:'activity', sortable: true, filter:true },
    {headerName: 'Duration', field:'duration', sortable: true, filter:true },
    
    {
        headerName: '',
        width: 80,
        field: 'id',
        cellRendererFramework: params => 
        <Button
            color="secondary"
            size="small"
            onClick={() => deleteTraining(params.value)}
        >DELETE
        </Button> 
    }
 
];


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
export default Training;