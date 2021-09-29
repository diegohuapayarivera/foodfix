import "./App.css";
import Navigation from "./components/Navigation";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "./pages/Main";
import Orders from "./pages/Orders";

function App() {
  return (
    <div>
      <Navigation />
      <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/pedidos" component={Orders} />
      </Router>
    </div>
  );
}

export default App;
