import React from 'react';
import TopNav from './components/TopNav/TopNav';
import Landing from './components/Landing/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ProfileList } from './components/ProfileList/ProfileList';
import { PatientList } from './components/ProfileList/PatientList';
import { DUser } from './components/DUser/DUser';
import { Prescription } from './components/Prescription/Prescription';
function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/apoinment" component={ProfileList} />
        <Route path="/patients" component={PatientList} />
        <Route path="/mypres" component={Prescription} />
        <Route path="/emp" component={DUser} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
