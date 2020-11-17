import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditCustomer(props) {

    const [open, setOpen] = useState(false);

    const [customer, setCustomer] = useState({
      firstname:'',
      lastname: '',
      color:'',
      streetaddress: '',
      postcode: '',
      city:'',
      email:'',
      phone:''
    });
    

    return(
        <div>
        
        </div>
    );

}