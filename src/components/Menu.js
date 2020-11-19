import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Training from './Training';
import CustomerList from './CustomerList';
import Calendar from './Calendar';

 function Menu() {

  return(
    <div>
      <BrowserRouter>
        <div>
            <Link to="/home" > Home </Link>
            
            <Link to="/training"> Training </Link>

            <Link to="/calendar"> Calendar </Link>
            <Switch>
                <Route exact path="/home" component={CustomerList} />
              
                <Route path="/training" component={Training}  />

                <Route path="/calendar" component={Calendar} />
        
                <Route render={() => <h1>Page not found</h1>} />
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Menu;
