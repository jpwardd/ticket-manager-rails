import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import Services from './pages/services/Services';
import Register from './pages/auth/Register';
import NavBar from './components/NavBar/NavBar';
import SideDrawer from './pages/SideDrawer';


const App: React.FC = (props) => {
  return (
    <div className="App">

      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/services" component={Services} />
        </Switch>
      </Router>
 
    </div>
  );
}

export default App;
