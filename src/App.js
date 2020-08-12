import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Login from './pages/login/Login'
import Index from './pages/index/Index'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/" render={Index}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
