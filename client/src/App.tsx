import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';


const App: React.FC = (props) => {
  return (
    <div className="App">

      <Router>
        <Route exact path="/" component={Login} />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
 
    </div>
  );
}

export default App;
