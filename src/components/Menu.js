import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Training from './Training';
import CustomerList from './CustomerList';

 function Menu() {

  return(
    <div>
      <BrowserRouter>
        <div>
            <Link to="/home">Home</Link>
            <Link to="/training">Training</Link>
            <Switch>
                <Route exact path="/home" component={CustomerList} />
              
                <Route path="/training" component={Training} />
        
                <Route render={() => <h1>Page not found</h1>} />
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Menu;
