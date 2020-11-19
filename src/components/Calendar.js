import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";


 function Calendar() {

  const [date, changeDate] = useState(new Date());
  return(
    <div>
      <DatePicker
        autoOk
        variant="static"
        openTo="year"
        value={date}
        onChange={changeDate}
      />

      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={date}
        onChange={changeDate}
      />
    </div>
  );
}

export default Calendar;
