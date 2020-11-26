import React, { useState, useEffect } from "react";

import { Calendar, momentLocalizer  } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function MyCalendar(){
    
    const localizer = momentLocalizer(moment);

    const [trainings, setTrainings] = useState([{
      
        title:'',
        start: '',
        end: ''
    },]);

    useEffect(() => {
        loadTrainings();
    },[]);

    //get date's data from database

    const loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(trainings =>  {
            return setTrainings(
                trainings.map((data) =>({
                  
                    title: data.activity + " / "+ data.customer.firstname +" " + data.customer.lastname,
                    start: new Date(moment(data.date)),
                    end: new Date(moment(data.date).add(data.duration, "minutes")),      
             }))
             );
            })
        .catch(err => console.error(err))
    };

  return(
    <div className="ag-theme-material" 
    style={{height: '700px', width: '80%', margin: 'auto'}}>
        <div style={{ height: 500 }}>
        <Calendar
          defaultView="month"
          events={trainings}
          defaultDate={new Date()}
          localizer={localizer}
        style={{height: "700px", width: "100%", margin: "15px"}}
         />
      </div>
    </div>
  );


}
