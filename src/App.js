import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Graph from "./components/Graph.component";
import List from "./components/List.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" component={Graph} />
        <Route path="/list" component={List} />
      </div>
    </Router>
  );
}


export default App;