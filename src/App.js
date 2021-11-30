import "./App.css";
import Navigation from "./components/Navigation";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "./pages/Main";
import Orders from "./pages/Orders";
import Sales from "./pages/Sales";

function App() {
  return (
    <div>
      <Navigation />
      <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/pedidos" component={Orders} />
        <Route exact path="/sale" component={Sales} />
      </Router>
    </div>
  );
}

export default App;
