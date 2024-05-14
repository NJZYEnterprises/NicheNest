import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import "./App.css"

function App() {
  return (
    <>
      <h1 className="text-red-400">Welcome to Niche Nest!</h1>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </>
  )
}

export default App
