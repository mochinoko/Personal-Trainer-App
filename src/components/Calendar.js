import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


export default function Calendar(){

    const [newEventDate, setNewEventDate] = useState([ {titile: '', start:'', end:''} ]);

    useEffect(() => {
        getTrainings();
    },[]);

    //get date's data from database

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        //.then(data => setTrainings(data) )
        .catch(err => console.error(err))
    }

    //list data to calendar



  return(
    <div className="ag-theme-material" 
    style={{height: '700px', width: '80%', margin: 'auto'}}>
        this is calendar
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                weekends={true}
            />

    </div>
  );

}
