import React from 'react';
import TopNav from './components/TopNav/TopNav';
import Landing from './components/Landing/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ProfileList } from './components/ProfileList/ProfileList';
import { PatientList } from './components/ProfileList/PatientList';
function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/apoinment" component={ProfileList} />
        <Route path="/patients" component={PatientList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
