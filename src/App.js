import React from 'react';
import TopNav from './components/TopNav/TopNav';
import Landing from './components/Landing/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ProfileList } from './components/ProfileList/ProfileList';
function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/apoinment" component={ProfileList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
